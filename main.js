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

var customFunctions = require('customfunctions');
require('prototype.spawn')();
var roles = ['harvester','upgrader','miner','builder','scavanger','repairer'];

module.exports.loop = function () {
    
    customFunctions.cleanUp(); // Memory cleanup for dead creeps

    var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); }});
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var scavangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavanger');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var transports = _.filter(Game.creeps, (creep) => creep.memory.role == 'transport');
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var longDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester');

    console.log('Miners: ' + miners.length + ' Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Scavangers: ' + scavangers.length + ' Repairers: ' + repairers.length + '\nContainers: ' + containers.length + ' Transports: ' + transports.length);

    var energyCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    if(harvesters.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester',source: '',upgrading: false});
        console.log('Spawning new harvester: ' + newName);
    }

    if((upgraders.length < 4) && (miners.length == containers.length) && (Game.getObjectById('59538980f728105070060ea4').store.energy > 30000)) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'upgrader');
        console.log('Spawning new upgrader: ' + newName);
    }

    if(builders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder',upgrading: false,source: ''});
        console.log('Spawning new builder: ' + newName);
    }
    if(scavangers.length < 4) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'scavanger');
        console.log('Spawning new scavanger: ' + newName);
    }
    if(miners.length < containers.length) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'miner');
        console.log('Spawning new miner: ' + newName);
    }
    if(repairers.length < 4) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'repairer');
        console.log('Spawning new repairer: ' + newName);
    }
    if(transports.length < 4) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'transport');
        console.log('Spawning new transport: ' + newName);
    }

    if(attackers.length < 0) {
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'attacker');
        console.log('Spawning new attacker: ' + newName);
    }

    if(claimers.length < 1) {
        var newName = customFunctions.spawnClaimer('W59S91');
        console.log('Spawning new claimer: ' + newName);
     }

    if(longDistanceHarvesters.length < 8) {
        var newName = customFunctions.spawnLongDistanceHarvester();
        console.log('Spawning new longDistanceHarvester: ' + newName);
    }

    roleTower.run('W59S92');

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            try {roleUpgrader.run(creep);} catch(err) {creep.suicide();}
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'scavanger') {
            try {
                roleScavanger.run(creep);
            } catch(err) {
                console.log(err);
            }
        }
        if (creep.memory.role == 'repairer') {
            try {roleRepairer.run(creep);} catch(err) {
                console.log(err + '\n' + creep);
            }
        }
        if (creep.memory.role == 'transport') {
            try {roleTransport.run(creep);} catch(err) {
                console.log(err + '\n' + creep);
            }
        }
        if (creep.memory.role == 'longDistanceHarvester') {
            try {roleLongDistanceHarvester.run(creep);} catch(err) {
                console.log(err + '\n' + creep);
            }
        }
        if (creep.memory.role == 'attacker') {
            try {roleAttacker.run(creep);} catch(err) {
                console.log(err + '\n' + creep);
            }
        }
        if (creep.memory.role == 'claimer') {
            try {roleClaimer.run(creep);} catch(err) {
                console.log(err + '\n' + creep);
            }
        }
    }
    }