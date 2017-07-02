var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.source.length < 1) {
                var sources = creep.room.find(FIND_SOURCES);
                for (var name in sources) {
                    var harvesters = _.filter(Game.creeps, (creep) => {return (creep.memory.source == sources[name].id) && (creep.memory.role == 'miner')});
                    if (harvesters.length < 1) {
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
 };

module.exports = roleMiner;