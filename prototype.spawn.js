module.exports = function() {
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {

            var body = [];

            switch(roleName) {
                case 'miner':
                    body = [WORK,WORK,WORK,WORK,WORK,MOVE];
                    break;
                case 'transport':
                    var numberOfParts = Math.floor(energy / 100);
                    for (let i = 0; i < numberOfParts; i++) {
                        body.push(CARRY);
                    }
                    for (let i = 0; i < numberOfParts; i++) {
                        body.push(MOVE);
                    }
                    break;
                case 'attacker':
                    body = [TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK];
                    break;
                case 'claimer':
                    body = [CLAIM,MOVE,MOVE,MOVE];
                    break;
                default:
                    var numberOfParts = Math.floor(energy / 200);
                    for (let i = 0; i < numberOfParts; i++) {
                        body.push(WORK);
                    }
                    for (let i = 0; i < numberOfParts; i++) {
                        body.push(CARRY);
                    }
                    for (let i = 0; i < numberOfParts; i++) {
                        body.push(MOVE);
                    }
            }
           return this.createCreep(body, undefined, {role: roleName, source: '',upgrading: false, target: ''});
        };
};