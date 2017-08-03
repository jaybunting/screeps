var roleTower = require('role.tower');
var customFunctions = require('customfunctions');
var rolesRequire = {
    upgrader: require('role.upgrader'),
    miner: require('role.miner'),
    builder: require('role.builder'),
    scavanger: require('role.scavanger'),
    repairer: require('role.repairer'),
    transport: require('role.transport'),
    longDistanceHarvester: require('role.longdistanceharvester'),
    attacker: require('role.attacker'),
    claimer: require('role.claimer'),
    envoy: require('role.envoy')
};

module.exports.loop = function () {
    customFunctions.cleanUp(); // Memory cleanup for dead creeps
    customFunctions.pollCreeps(); // Count living creeps
    var roles = [];

    for (var each in Object.keys(rolesRequire)) {
        roles.push(each);
    }
    var roomlist = customFunctions.getRooms(); // Get list of rooms with Spawns I control
    
    for (var eachroom in roomlist) {
        console.log("Doing stuff for room: " + roomlist[eachroom]);

        var roomspawn = Game.getObjectById(Game.rooms[roomlist[eachroom]].memory.spawn);

        var containers = Game.getObjectById(Game.rooms[roomlist[eachroom]].memory.spawn).room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); }});
        var energyCapacity = Game.rooms[roomlist[eachroom]].energyCapacityAvailable;
        var energyAvailable = Game.rooms[roomlist[eachroom]].energyAvailable;
        
        roleTower.run(roomlist[eachroom]);

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

    console.log('Miners: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['miner'] +
            ' Upgraders: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['upgrader'] + 
             ' Builders: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['builder'] +
           ' Scavangers: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['scavanger'] + 
            ' Repairers: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['repairer'] + 
           ' Containers: ' + containers.length + 
           ' Transports: ' + Game.rooms[roomlist[eachroom]].memory.activeCreeps['transport']);
    console.log(energyAvailable + "/" + energyCapacity + " energy for spawning.");
    }

    var creepCost = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        try {creep.runRole();} catch(err) {console.log("Creep " + name + " err " + err);}

        if (!creep.memory.cost) {
            creep.memory.cost = customFunctions.getCost(creep);
        }
        creepCost = creepCost + creep.memory.cost;
    }
    console.log("Total creep value is: " + creepCost + "/30,000. " + Math.floor((creepCost/30000)*100) + "%");
}