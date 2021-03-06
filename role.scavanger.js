var roleScavanger = {
    run: function(creep) {
    if (creep.carry.energy == 0) {creep.memory.upgrading = false;}

    if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.upgrading == false)) {
        if ((Game.getObjectById(creep.room.memory.storage)) && (Game.getObjectById(creep.room.memory.storage).store.energy > 1000)) {
            creep.memory.source = creep.room.memory.storage;
            }
            
        if (creep.memory.source.length < 1) {
           var sources = creep.room.find(FIND_DROPPED_RESOURCES, {
             filter: (dropped_resources) => {
                return (dropped_resources.energy > 20);
             }});
             
            if (sources.length) {
                sources.sort(function (a, b) {
                    return a.energy > b.energy ? -1 : 1
                });
                
                try {creep.memory.source = sources[0].id;} catch(err) {console.log("Resources" + err);}
        
            } else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0));
                    }
                });
                
                if (containers.length) {
                    containers.sort(function (a, b) {
                        return a.store[RESOURCE_ENERGY] > b.store[RESOURCE_ENERGY] ? -1 : 1
                    });
                    try {creep.memory.source = containers[0].id;} catch(err) {console.log("Containers" + err);}
                }
            }
        }
            if ((creep.memory.source.length < 1) && (Game.rooms[creep.pos.roomName].memory.activeCreeps['miner'] < 1)) {
                var sources = creep.room.find(FIND_SOURCES);
                for (var name in sources) {
                    var harvesters = _.filter(Game.creeps, (creep_) => {return ((creep_.memory.source == sources[name].id) && (creep_.pos.roomName == creep.pos.roomName))});
                    if (harvesters.length < 2) {
                        creep.memory.source = sources[name].id;
                        creep.memory.sourcetype = 'source';
                        break;
                    }
                }
            }
            
        if (Game.getObjectById(creep.memory.source)) {
            Game.getObjectById(creep.memory.source).gatherEnergy(creep);
        } else {
            creep.memory.source = '';
        };

    } else {
        creep.memory.upgrading = true; // Creep is full of energy, time to get to work
        creep.memory.source = '';
        creep.memory.sourcetype = '';
        var targets = creep.room.find(FIND_STRUCTURES, { // Look for extensions and spawns that are low on energy
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) { // If extensions and structures are low on energy, fill them if in range, move to them if not
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00'}});
        }} else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets) {
                targets.sort(function (a, b) {
                    return a.progress > b.progress ? -1 : 1
                });
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00'}});
            } else {
            // If extensions are full, upgrade controller
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }}
    }
}}};

module.exports = roleScavanger;
