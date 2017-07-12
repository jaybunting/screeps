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
            Game.getObjectById(creep.memory.source).gatherEnergy(creep);
        }
 };

module.exports = roleMiner;