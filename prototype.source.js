module.exports = function() {
    Source.prototype.gatherEnergy =
        function(creep) {
            if (creep.pickup(this) == ERR_NOT_IN_RANGE) {
                creep.moveTo(this, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        };
};