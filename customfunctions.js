module.exports = {
    cleanUp: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    spawninit: function () {
        var roles = ["harvester","upgrader","miner","builder","scavanger","repairer"];
        Game.spawns['Spawn1'].memory.minCreeps = [];
        for (var name in roles) {
            Game.spawns['Spawn1'].memory.minCreeps.roles[name] = 0;
        }
    },

    spawnLongDistanceHarvester: function () {
        var energyCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;
        var newName = Game.spawns.Spawn1.createCustomCreep(energyCapacity, 'longDistanceHarvester');
        try {
            if (newName) {
                console.log(newName);
                Game.creeps[newName].memory.home = 'W59S92';
                Game.creeps[newName].memory.target = 'W59S91';
                Game.creeps[newName].memory.sourceIndex = '0';
                Game.creeps[newName].memory.working = false;
            }
        } catch(err) {
            
        }
    },

    spawnClaimer: function (targetroom) {
        var newName = Game.spawns.Spawn1.createCustomCreep(0,'claimer');
        try {if (Game.creeps[newName].memory.role == 'claimer') {Game.creeps[newName].memory.targetroom = targetroom;}} catch (err) {console.log(err);}
    },

    getCost: function (creep) {
        var body = creep.body;
        return body.reduce(function (cost, part) {
            return cost + BODYPART_COST[part.type];}, 0);
    },

    getRooms: function () {
        var rooms = [];
        for (var each in Game.spawns) {
            if (rooms.indexOf(Game.spawns[each].room.name) < 0) {
                rooms.push(Game.spawns[each].room.name);
                console.log(Game.spawns[each].room.name);
            }
        }
        return rooms;
    }
}