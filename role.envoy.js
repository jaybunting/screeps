var roleEnvoy = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let flag = Game.flags.Claim;
        if (flag) {
            if (creep.pos.roomName === flag.pos.roomName) {
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
            }
            } else {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
};

module.exports = roleEnvoy;