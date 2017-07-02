var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let flag = Game.flags.AttackFlag;
        if (flag) {
            if (creep.pos.roomName === flag.pos.roomName) {
                var targets = creep.room.find(FIND_HOSTILE_CREEPS);
                if(targets.length && creep.memory.fight == true) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff0000'}});
                    creep.attack(targets[0]);
                } else {
                    let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
                    if (spawn) {
                        creep.memory.fight = false;
                        if (creep.attack(spawn) < 0) {creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});}
                    } else {
                        creep.memory.fight = true;
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
                    }
                }
            } else {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
};

module.exports = roleAttacker;