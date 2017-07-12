module.exports = function() {
    StructureContainer.prototype.gatherEnergy =
        function(creep) {
            if (creep.withdraw(this, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(this, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if (this.store[RESOURCE_ENERGY] < 10) {
                creep.memory.source = '';
                creep.memory.upgrading = true;
            }
        };
};