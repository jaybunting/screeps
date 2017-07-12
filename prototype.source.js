module.exports = function() {
    Source.prototype.gatherEnergy =
        function(creep) {
            return creep.harvest(this);
        };
};