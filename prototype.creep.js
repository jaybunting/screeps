module.exports = function() {
    Creep.prototype.runRole() =
        function() {
                    switch(this.memory.role) {
                        case 'harvester':
                            roleHarvester.run(this);
                            break;
                        case 'upgrader':
                            roleUpgrader.run(this);
                            break;
                        case 'miner':
                            roleMiner.run(this);
                            break;
                        case 'builder':
                            roleBuilder.run(this);
                            break;
                        case 'scavanger':
                            roleScavanger.run(this);
                            break;
                        case 'repairer':
                            roleRepairer.run(this);
                            break;
                        case 'transport':
                            roleTransport.run(this);
                            break;
                        case 'longDistanceHarvester':
                            roleLongDistanceHarvester.run(this);
                            break;
                        case 'attacker':
                            roleAttacker.run(this);
                            break;
                        case 'claimer':
                            roleClaimer.run(this);
                            break;
                        case 'envoy':
                            roleEnvoy.run(this);
                            break;
                        default:
                    }
        }
};
