var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy == 0) {creep.memory.upgrading = false;}
        try {if (Game.getObjectById(creep.memory.source).store[RESOURCE_ENERGY] < 200) {creep.memory.source = '';}} catch(err) {}
        if (creep.carry.energy < creep.carryCapacity && creep.memory.upgrading == false) {

            if (creep.memory.source.length < 1) {
                var sources = creep.room.find(FIND_SOURCES);

                for (var name in sources) {
                    var harvesters = _.filter(Game.creeps, (creep) => {(creep.memory.source == sources[name].id) && (creep.memory.role == 'miner')});
                    if (harvesters.length < 3) {
                        var source = sources[name].id;
                        creep.memory.source = sources[name].id;
                        break;
                    }
                }
            }
            if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            /*
            // Harvest Resources Block


            if(creep.memory.source.length < 1) { //Select source if source is empty
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 500);
                    }
                });
                if (containers.length) {
                    containers.sort(function (a, b) {
                        return a.store[RESOURCE_ENERGY] > b.store[RESOURCE_ENERGY] ? -1 : 1
                    });
                    creep.memory.source = containers[0].id;
                } /* else {
                    var sources = creep.room.find(FIND_SOURCES);
                    for (var name in sources) {
                        var harvesters = _.filter(Game.creeps, (creep) => ((creep.memory.source == sources[name].id) && (creep.memory.role == 'harvester')));
                        if (harvesters.length < 2) {
                            var source = sources[name].id;
                            creep.memory.source = sources[name].id;
                            break;
                        }
                    }
                    if (creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffaa00'}});
                }

                //
            }
                if(creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            */

        } else { // Do Stuff Block
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    creep.memory.upgrading = true;
                    targets.sort(function (a, b) {
                        return a.progress > b.progress ? -1 : 1
                    });
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                } else {
                    creep.memory.upgrading = true;
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;