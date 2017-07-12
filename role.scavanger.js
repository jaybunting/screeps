var roleScavanger = {
    run: function(creep) {
    if (creep.carry.energy == 0) {creep.memory.upgrading = false;}

    if ((creep.carry.energy < creep.carryCapacity) && (creep.memory.upgrading == false)) {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0));
                    }
                });
        creep.memory.source = containers[0].id;        
        Game.getObjectById(creep.memory.source).harvestEnergy(creep);
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
