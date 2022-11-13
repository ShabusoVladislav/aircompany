const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/experimentalPlane');

const MILITARY_TYPES = require('./models/militaryTypes');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    getPlanes = () => this.planes;

    getPlanesByType = (planeType) => this.planes.filter((plane) => plane instanceof planeType);
    
    getPassengerPlanes = () => this.getPlanesByType(PassengerPlane);
    getMilitaryPlanes = () => this.getPlanesByType(MilitaryPlane);
    getExperimentalPlanes = () => this.getPlanesByType(ExperimentalPlane);
    
    getMilitaryPlanesByType = (militaryPlaneType) => this.getMilitaryPlanes().filter((plane) => plane.militaryType === militaryPlaneType);
    
    getTransportMilitaryPlanes = () => this.getMilitaryPlanesByType(MILITARY_TYPES.TRANSPORT);
    getBomberMilitaryPlanes = () => this.getMilitaryPlanesByType(MILITARY_TYPES.BOMBER);

    getPassengerPlaneWithMaxPassengersCapacity() {
        return this.getPassengerPlanes().reduce((prev, cur) => 
            prev.b >= cur.b ? prev : cur
        );
    }

    sortByMaxDistance() {
        this.getPlanes().sort((a, b) => a.maxFlightDistance - b.maxFlightDistance);

        return this;
    }

    sortByMaxSpeed() {
        this.getPlanes().sort((a, b) => a.maxSpeed - b.maxSpeed);

        return this;
    }

    sortByMaxLoadCapacity() {
        this.getPlanes().sort((a, b) => a.maxLoadCapacity - b.maxLoadCapacity);

        return this;
    }

    static print = (planes) => JSON.stringify(planes);
}

module.exports = Airport;