var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
         // if in target room
            if (creep.room.name == creep.memory.targetroom) {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.targetroom);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
};
module.exports = roleClaimer;