const mongoose = require('mongoose');
const DriverType = require('../../models/driverType');

const driverTypeData = { key: 'test_key', name: 'lineNameTest', description: '' };
const driverTypeData2 = { key: 'test_key2', name: 'lineNameTest2', discription: 'description2'};

describe('Driver Type Unit Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a driver type: no description', async () => {
        const validDriverType = new DriverType(driverTypeData);
        const savedDriverType = await validDriverType.save();

        expect(savedDriverType._id).toBeDefined();
        expect(savedDriverType.key).toBe(driverTypeData.key);
        expect(savedDriverType.name).toBe(driverTypeData.name);
        expect(savedDriverType.description).toBe(driverTypeData.description);

        savedDriverType.remove();

    });

    test('create a driver type: with a description', async () => {
        const validDriverType = new DriverType(driverTypeData2);
        const savedDriverType = await validDriverType.save();

        expect(savedDriverType._id).toBeDefined();
        expect(savedDriverType.key).toBe(driverTypeData2.key);
        expect(savedDriverType.name).toBe(driverTypeData2.name);
        expect(savedDriverType.description).toBe(driverTypeData2.description);

        savedDriverType.remove();

    });

    test('expect driver type with same key to not create', async () => {
        const validDriverType = new DriverType(driverTypeData);
        const savedDriverType = await validDriverType.save();

        const validDriverType2 = new DriverType(driverTypeData);

        await expect(validDriverType2.save()).rejects.toThrowError("duplicate key");

    });


    afterAll(async done => {
        mongoose.connection.close();
        done();
    });

});