var roleRepairer = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.target = '';}
        if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.upgrading == false)) {
            creep.memory.source = '59538980f728105070060ea4';
            creep.memory.sourcetype = 'container';

            if (creep.memory.source.length < 1) { // if source field of scavanger is blank, do this
                var sources = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (dropped_resources) => {
                        return (dropped_resources.energy > 2000);
                    }});

                if (sources.length) {
                    sources.sort(function (a, b) {
                        return a.energy > b.energy ? -1 : 1
                    });

                    try {creep.memory.source = sources[0].id;} catch(err) {console.log("Resources" + err);}

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

                        try {creep.memory.source = containers[0].id;} catch(err) {console.log("Containers" + err);}
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
                    if(creep.withdraw(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.source), {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        } else {
            creep.memory.upgrading = true; // Creep is full of energy, time to get to work
            creep.memory.source = '';
            creep.memory.sourcetype = '';
            if (creep.memory.target.length < 1) {

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (targets) => targets.hits < targets.hitsMax
            });

            if (targets.length) {
                targets.sort(function (a, b) {
                    return a.hits < b.hits ? -1 : 1
                });
                creep.memory.target = targets[0].id;}} else {
                if (Game.getObjectById(creep.memory.target).hits < Game.getObjectById(creep.memory.target).hitsMax) {
                if (creep.repair(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ff0000'}})
                }} else {
                    creep.memory.upgrading = false;
                    creep.memory.target = '';
                }
        }
    }
}
};

module.exports = roleRepairer;
