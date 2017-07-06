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

var customFunctions = require('customfunctions');
require('prototype.spawn')();
var roles = ["harvester","upgrader","miner","builder","scavanger","repairer","transport","claimer"];

module.exports.loop = function () {
    customFunctions.cleanUp(); // Memory cleanup for dead creeps
    customFunctions.pollCreeps(); // Count living creeps
    var roomlist = customFunctions.getRooms(); // Get list of rooms with Spawns I control

    for (var eachroom in roomlist) {
        console.log("Doing stuff for room: " + roomlist[eachroom]);

        var roomspawn = Game.getObjectById(Game.rooms[roomlist[eachroom]].memory.spawn);

        var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); }});
        var energyCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;
        var energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

        console.log(energyAvailable + "/" + energyCapacity + " energy for spawning.");

        if(roomspawn.spawning) {
            var spawningCreep = Game.creeps[roomspawn.spawning.name];
            roomspawn.room.visual.text(spawningCreep.memory.role,
                roomspawn.pos.x + 1,
                roomspawn.pos.y,
                {align: 'left', opacity: 0.8});
        } else {
            var newName = '';
            if (energyCapacity == energyAvailable) {
                for (eachrole in roles) {
                    if ((Game.rooms[roomlist[eachroom]].memory.activeCreeps[roles[eachrole]] < Game.rooms[roomlist[eachroom]].memory.minCreeps[roles[eachrole]]) && !(newName)) {
                        var newName = roomspawn.createCustomCreep(energyCapacity, roles[eachrole]);
                        console.log('Spawning new ' + roles[eachrole] +': ' + newName);
                        break;
                    }
                }

                if ((Game.rooms[roomlist[eachroom]].memory.activeCreeps['upgraders'] < Game.rooms[roomlist[eachroom]].memory.minCreeps['upgraders']) && !(newName) && (Game.rooms[roomlist['eachroom']].memory.activeCreeps['miner'] < Game.rooms[roomlist[eachroom]].memory.minCreeps['miner']) && (Game.getObjectById('59538980f728105070060ea4').store.energy > 30000)) {
                    var newName = roomspawn.createCustomCreep(energyCapacity, 'upgrader');
                    console.log('Spawning new upgrader: ' + newName);
                }
            } else {
                if ((Game.rooms[roomlist[eachroom]].memory.activeCreeps['scavanger'] < Game.rooms[roomlist[eachroom]].memory.minCreeps['scavanger']) && (energyAvailable >= 300) && !(newName)) {
                    var newName = roomspawn.createCustomCreep(energyAvailable, 'scavanger');
                    console.log('Spawning backup scavanger: ' + newName);
                }
                if ((Game.rooms[roomlist[eachroom]].memory.activeCreeps['miner'] < Game.rooms[roomlist[eachroom]].memory.minCreeps['miner']) && (energyAvailable >= 450) && !(newName)) {
                    var newName = roomspawn.createCustomCreep(energyCapacity, 'miner');
                    console.log('Spawning new miner: ' + newName);
                }
            }

        }

    console.log('Miners: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['miner']
         + ' Harvesters: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['harvester'] + 
            ' Upgraders: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['upgrader'] + 
             ' Builders: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['builder'] +
           ' Scavangers: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['scavanger'] + 
            ' Repairers: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['repairer'] + 
           ' Containers: ' + containers.length + 
           ' Transports: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['transport']);
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
            case 'envoy':
                try {roleEnvoy.run(creep);} catch(err) {console.log("Creep " + name + " err " + err);}
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