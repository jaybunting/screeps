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
var roles = ["harvester","upgrader","miner","builder","scavanger","repairer","transport"];

module.exports.loop = function () {
    customFunctions.cleanUp(); // Memory cleanup for dead creeps
    customFunctions.pollCreeps(); // Count living creeps
    var roomlist = customFunctions.getRooms(); // Get list of rooms with Spawns I control

    for (var eachroom in roomlist) {
        console.log("Doing stuff for room: " + roomlist[eachroom]);

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
        var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

        console.log(energyAvailable + "/" + energyCapacity + " energy for spawning.");

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        } else {
            var newName = '';
            if (energyCapacity == energyAvailable) {
                for (eachrole in roles) {
                    if ((Game.rooms[roomlist[eachroom]].memory.activeCreeps[roles[eachrole]] < Game.rooms[roomlist[eachroom]].memory.minCreeps[roles[eachrole]]) && !(newName)) {
                        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, roles[eachrole]);
                        console.log('Spawning new ' + roles[eachrole] +': ' + newName);
                        break;
                    }
                }

                if ((upgraders.length < 2) && !(newName) && (miners.length == containers.length) && (Game.getObjectById('59538980f728105070060ea4').store.energy > 30000)) {
                    var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'upgrader');
                    console.log('Spawning new upgrader: ' + newName);
                }
            } else {
                if ((scavangers.length < 4) && (energyAvailable >= 300) && !(newName)) {
                    var newName = Game.spawns.Spawn1.createCustomCreep(energyAvailable, 'scavanger');
                    console.log('Spawning backup scavanger: ' + newName);
                }
                if ((miners.length < containers.length) && (energyAvailable >= 450) && !(newName)) {
                    var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'miner');
                    console.log('Spawning new miner: ' + newName);
                }
            }

        }

    console.log('Miners: ' + miners.length + ' Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Scavangers: ' + scavangers.length + ' Repairers: ' + repairers.length + '\nContainers: ' + containers.length + ' Transports: ' + transports.length);
    console.log(energyAvailable + "/" + energyCapacity + " energy for spawning.");
    }

    roleTower.run('W59S92');

    var creepCost = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch(creep.memory.role) {
            case 'harvester':
                try {roleHarvester.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'upgrader':
                try {roleUpgrader.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'miner':
                try {roleMiner.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'builder':
                try {roleBuilder.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'scavanger':
                try {roleScavanger.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'repairer':
                try {roleRepairer.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'transport':
                try {roleTransport.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
            case 'longDistanceHarvester':
                try {roleLongDistanceHarvester.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'attacker':
                try {roleAttacker.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            case 'claimer':
                try {roleClaimer.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
                break;
            default:
        }
        if (!creep.memory.cost) {
            creep.memory.cost = customFunctions.getCost(creep);
        }
        creepCost = creepCost + creep.memory.cost;
    }
    console.log("Total creep value is: " + creepCost + "/30,000. " + Math.floor((creepCost/30000)*100) + "%");
}