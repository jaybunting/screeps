var roles = {
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

module.exports = function() {
    Creep.prototype.runRole =
        function() {
            roles[this.memory.role].run(this);
        };
};
