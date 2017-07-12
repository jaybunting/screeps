module.exports = function() {
    StructureContainer.prototype.gatherEnergy =
        function(creep) {
            if (creep.withdraw(this, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(this, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        };
};