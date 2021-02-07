const mongoose = require('mongoose');
const VehicleType = require('../../models/vehicleType');
const vehicleTypeData = { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeData2 = { key: 'test_key2', name: 'vehicleName2', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataNoName = { key: 'test_key', name: '', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataStringAutonomy = { key: 'test_key', name: 'vehicleName', autonomy: 'a', cost: 0, averageSpeed: 0, energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataStringCost= { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 'a', averageSpeed: 0, energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataStringSpeed = { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 0, averageSpeed: 'a', energySource: 0, consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataStringEnergy = { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 'a', consumption: 0, emissions: 0,vehicles: []};
const vehicleTypeDataStringConsumption = { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 0, consumption: 'a', emissions: 0,vehicles: []};
const vehicleTypeDataStringEmissions = { key: 'test_key', name: 'vehicleName', autonomy: 0, cost: 0, averageSpeed: 0, energySource: 0, consumption: 0, emissions: 'a',vehicles: []};
const vehicleTypeDataWithRequiredParamsOnly = { key: 'test_key'};

describe('Driver Type Unit Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a basic vehicle type', async () => {
        const validVehicleType = new VehicleType(vehicleTypeData);
        const savedVehicleType = await validVehicleType.save();

        expect(savedVehicleType._id).toBeDefined();
        expect(savedVehicleType.key).toBe(vehicleTypeData.key);
        expect(savedVehicleType.name).toBe(vehicleTypeData.name);
        expect(savedVehicleType.autonomy).toBe(vehicleTypeData.autonomy);
        expect(savedVehicleType.cost).toBe(vehicleTypeData.cost);
        expect(savedVehicleType.averageSpeed).toBe(vehicleTypeData.averageSpeed);
        expect(savedVehicleType.energySource).toBe(vehicleTypeData.energySource);
        expect(savedVehicleType.consumption).toBe(vehicleTypeData.consumption);
        expect(savedVehicleType.emissions).toBe(vehicleTypeData.emissions);
        expect(Array.from(savedVehicleType.vehicles)).toStrictEqual(vehicleTypeData.vehicles);

        await savedVehicleType.remove();

    });

    test('create a vehicle type with same key', async () => {
        const validVehicleType = new VehicleType(vehicleTypeData);
        const savedVehicleType = await validVehicleType.save();
        
        await expect(new VehicleType(vehicleTypeData).save()).rejects.toThrowError("duplicate key");

        await savedVehicleType.remove();

    });

    test('create a vehicle type with no name', async () => {
        const validVehicleType = new VehicleType(vehicleTypeDataNoName);
        const savedVehicleType = await validVehicleType.save();

        expect(savedVehicleType.name).toBe(vehicleTypeDataNoName.name);

        await savedVehicleType.remove();

    });

    test('create a vehicle type with a string for autonomy', async () => {

        await expect(new VehicleType(vehicleTypeDataStringAutonomy).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with a string for cost', async () => {

        await expect(new VehicleType(vehicleTypeDataStringCost).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with a string for speed', async () => {

        await expect(new VehicleType(vehicleTypeDataStringSpeed).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with a string for energy', async () => {

        await expect(new VehicleType(vehicleTypeDataStringEnergy).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with a string for consumptions', async () => {

        await expect(new VehicleType(vehicleTypeDataStringConsumption).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with a string for emissions', async () => {

        await expect(new VehicleType(vehicleTypeDataStringEmissions).save()).rejects.toThrowError(Error);

    });

    test('create a vehicle type with required parameters only', async () => {
        const validVehicleType = new VehicleType(vehicleTypeDataWithRequiredParamsOnly);
        const savedVehicleType = await validVehicleType.save();

        expect(savedVehicleType._id).toBeDefined();
        expect(savedVehicleType.key).toBe(vehicleTypeDataWithRequiredParamsOnly.key);
        expect(savedVehicleType.name).toBe(undefined);
        expect(savedVehicleType.autonomy).toBe(undefined);
        expect(savedVehicleType.cost).toBe(undefined);
        expect(savedVehicleType.averageSpeed).toBe(undefined);
        expect(savedVehicleType.energySource).toBe(undefined);
        expect(savedVehicleType.consumption).toBe(undefined);
        expect(savedVehicleType.emissions).toBe(undefined);
        expect(Array.from(savedVehicleType.vehicles)).toStrictEqual([]);

        await savedVehicleType.remove();
    });


    afterAll(async done => {
        mongoose.connection.close();
        done();
    });

});