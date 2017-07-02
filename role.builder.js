var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                targets.sort(function (a, b) {
                    return a.progress > b.progress ? -1 : 1
                });
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10});
                }

                /* var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                 if(targets.length) {
                 if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                 }
                 } */
            }}
            else {

            if (creep.memory.source.length < 1) {
                var sources = creep.room.find(FIND_SOURCES);

                for (var name in sources) {
                    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.source == sources[name].id);
                    if (harvesters.length < 2) {
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

            var containers = creep.room.find(FIND_DROPPED_RESOURCES);
            var source = creep.pos.findClosestByPath(containers);
            if(creep.pickup(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            /*
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                    }
                });
                var source = creep.pos.findClosestByPath(containers);
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
                */
            };
    }
}
module.exports = roleBuilder;