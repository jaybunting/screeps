var roleTransport = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.target = '';
        }
        if ((creep.memory.source.length > 0) && (Game.getObjectById(creep.memory.source).store[RESOURCE_ENERGY] < 200)) {
            creep.memory.source = '';
            creep.memory.sourcetype = '';
            creep.memory.target = '';
            creep.memory.upgrading = true;
            console.log("Turning in early.");
        }
        if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.upgrading == false)) {
            if (creep.memory.source.length < 1) { // if source field of scavanger is blank, do this
                var sources = ''/*creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (dropped_resources) => {
                        return (dropped_resources.energy > 1000);
                    }
                })*/;

                if (sources.length) {
                    sources.sort(function (a, b) {
                        return a.energy > b.energy ? -1 : 1
                    });

                    try {
                        creep.memory.source = sources[0].id;
                    } catch (err) {
                        console.log("Resources" + err);
                    }

                    creep.memory.sourcetype = 'dropped_energy';

                } else {
                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0));
                        }
                    });

                    if (containers.length) {
                        containers.sort(function (a, b) {
                            return a.store[RESOURCE_ENERGY] > b.store[RESOURCE_ENERGY] ? -1 : 1
                        });

                        try {
                            creep.memory.source = containers[0].id;
                        } catch (err) {
                            console.log("Containers" + err);
                        }
                        creep.memory.sourcetype = 'container';
                    }
                }
            }

            if (creep.memory.sourcetype == 'dropped_energy') {
                if (creep.pickup(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if (creep.memory.sourcetype == 'container') {
                    if (creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    if (Game.getObjectById(creep.memory.source).energy < 200) {
                        creep.memory.source = '';
                        creep.memory.sourcetype = '';
                        creep.memory.upgrading = true;
                        console.log("Turning in early.");
                    }
                }
            }
        } else {
            creep.memory.upgrading = true; // Creep is full of energy, time to get to work
            creep.memory.source = '';
            creep.memory.sourcetype = '';
            if (creep.memory.target.length < 1) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            (structure.energy < structure.energyCapacity);
                    }
                });
                if (targets.length > 0) {
                    targets.sort(function (a, b) {
                        return a.energy < b.energy ? -1 : 1
                    });
                    creep.memory.target = targets[0].id;
                    // creep.memory.target = creep.pos.findClosestByPath(targets).id;
                } else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE);
                        }
                    });
                    if (targets.length > 0) {
                        targets.sort(function (a, b) {
                            return a.store[RESOURCE_ENERGY] < b.store[RESOURCE_ENERGY] ? -1 : 1
                        });
                        creep.memory.target = targets[0].id;
                }}
            } else {
                let outcome = creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
                if (outcome == ERR_NOT_IN_RANGE) {creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#00ff00'}});}
                if (outcome == ERR_FULL) {creep.memory.target = '';}
            }
        }
    }
};

module.exports = roleTransport;