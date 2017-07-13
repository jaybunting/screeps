module.exports = function() {
    var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleMiner = require('role.miner');
var roleBuilder = require('role.builder');
var roleScavanger = require('role.scavanger');
var roleTower = require('role.tower');
var roleRepairer = require('role.repairer');
var roleTransport = require('role.transport');
var roleLongDistanceHarvester = require('role.longdistanceharvester');
var roleAttacker = require('role.attacker');
var roleClaimer = require('role.claimer');
var roleEnvoy = require('role.envoy');

    Creep.prototype.runRole =
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
        };
};
