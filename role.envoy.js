var roleEnvoy = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let flag = Game.flags.AttackFlag;
        if (flag) {
            if (creep.pos.roomName === flag.pos.roomName) {
                creep.memory.role = 'scavanger';
                creep.memory.upgrading = 'false';
                creep.memory.source = '';
                creep.memory.sourcetype = '';
                creep.memory.target = '';
                creep.memory.homeRoom = creep.pos.roomName;
            } else {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
};

module.exports = roleEnvoy;