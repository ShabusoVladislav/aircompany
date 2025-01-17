const chai = require('chai');
chai.use(require("chai-sorted"));

const { assert, expect } = chai;    

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const ExperimentalPlane = require('../Planes/experimentalPlane');

const Airport = require('../airport/Airport');

const MILITARY_TYPES = require('../models/militaryTypes');
const EXPERIMENTAL_TYPES = require('../models/ExperimentalTypes');
const CLASSIFICATION_LEVELS = require('../models/classificationLevels');

describe('Airport test.', () => {
    const PassengerPlanes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196)
    ];

    const militaryBomberPlanes = [
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MILITARY_TYPES.BOMBER)
    ];

    const militaryFighterPlanes = [
        new MilitaryPlane('F-15', 1500, 12000, 10000, MILITARY_TYPES.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MILITARY_TYPES.FIGHTER)
    ]

    const militaryTransportPlanes = [new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MILITARY_TYPES.TRANSPORT)];

    const experimentalSecretPlanes = [new ExperimentalPlane("Bell X-14", 277, 482, 500, EXPERIMENTAL_TYPES.HIGH_ALTITUDE, CLASSIFICATION_LEVELS.SECRET)];

    const experimentalTopSecretPlanes = [new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, EXPERIMENTAL_TYPES.VTOL, CLASSIFICATION_LEVELS.TOP_SECRET)];
    
    const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    const planeWithMaxSpeed = new MilitaryPlane('F-30', 1600, 13500, 11300, MILITARY_TYPES.FIGHTER);

    
    const planes = [
        ...PassengerPlanes,
        ...militaryBomberPlanes,
        ...militaryFighterPlanes,
        ...militaryTransportPlanes,
        ...experimentalSecretPlanes,
        ...experimentalTopSecretPlanes,
        planeWithMaxPassengerCapacity,
        planeWithMaxSpeed
    ];

    const dataForSorts = [
        {
          methodName: "sortByMaxFlightDistance",
          sortField: "maxFlightDistance"
        },
        {
          methodName: "sortByMaxLoadCapacity",
          sortField: "maxLoadCapacity"
        },
        {
          methodName: "sortByMaxSpeed",
          sortField: "maxSpeed"
        }
    ];

    it('Should have military Planes with transport type', () => {
        const airport = new Airport(planes);
        const filteredPlanes = airport.getTransportMilitaryPlanes();

        expect(filteredPlanes).to.have.members(militaryTransportPlanes);
    });

    it('Should have military Planes with fighter type', () => {
        const airport = new Airport(planes);
        const filteredPlanes = airport.getFighterMilitaryPlanes();

        expect(filteredPlanes).to.have.members([...militaryFighterPlanes, planeWithMaxSpeed]);
    });

    it('Should check that at least one bomber is present in military planes.', () => {
        const airport = new Airport(planes);

        expect(airport.getBomberMilitaryPlanes()).to.have.members(militaryBomberPlanes);
    });

    it('Should have passenger plane with max capacity', () => {
        const airport = new Airport(planes);
        const expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();

        assert.deepEqual(expectedPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
    });

    it('Should have plane with max speed', () => {
        const airport = new Airport(planes);
        const expectedPlaneWithMaxSpeed = airport.getPlaneWithMaxSpeed();

        assert.deepEqual(expectedPlaneWithMaxSpeed, planeWithMaxSpeed);
    });

    dataForSorts.forEach(({methodName, sortField}) => {
        it(`Should sort planes by ${sortField}.`, () => {
          const airport = new Airport(planes);

          expect(airport[methodName]().planes).to.be.ascendingBy(sortField);
        })
    });

    it('should check that experimental planes has classification level higher than unclassified', () => {
        const airport = new Airport(planes);

        expect(airport.getExperimentalPlanes()).to.have.members([...experimentalSecretPlanes, ...experimentalTopSecretPlanes]);
    });
});