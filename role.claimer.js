var roleClaimer = {
     /** @param {Creep} creep **/
    run: function(creep) {
        let flag = Game.flags.Claim;
        if (flag) {
            if (creep.pos.roomName === flag.pos.roomName) {
                 if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                var exit = creep.room.findExitTo(flag.pos.roomName);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ff0000'}});
                // creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
};
module.exports = roleClaimer;