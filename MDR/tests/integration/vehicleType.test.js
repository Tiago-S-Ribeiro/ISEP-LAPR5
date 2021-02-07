const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "VehicleTypeTest1", "name": "Vehicle Type Test 1", "vehicles": [] }, { "key": "VehicleTypeTest2", "name": "Vehicle TypeTest 2", "vehicles": [] }] };
var dataComplete = { "vehicleTypes": [{ "vehicles": [], "_id": "idtest1", "key": "VehicleTypeTest1", "name": "Vehicle Type Test 1", "autonomy": 500000, "cost": 10, "averageSpeed": 30, "energySource": 23, "consumption": 30, "emissions": 1050, "__v": 0 }, { "vehicles": [], "_id": "idtest2", "key": "VehicleTypeTest2", "name": "Vehicle Type Test 2", "autonomy": 600000, "cost": 5, "averageSpeed": 32, "energySource": 23, "consumption": 18, "emissions": 700, "__v": 0 }] };
var vehicleTypeById = { "key": "VehicleTypeTest1", "name": "Vehicle Type Test 1", "vehicles": [] };
var postBody = { "key": "VehicleTypeTest3", "name": "Vehicle Type Test 3", "autonomy": 20, "cost": 30, "averageSpeed": 40, "energySource": 23, "consumption": 10, "emissions": 77, "vehicles": [] };

describe('VehicleType Integration Tests', () => {

    afterEach(() => { jest.clearAllMocks(); });

    test('get all vehicleTypes using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const vehicleTypes = await index.getAllVehicleTypesDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes/));
        expect(vehicleTypes).toEqual(dataDTO);
    });

    test('get all vehicleTypes complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const vehicleTypes = await index.getAllVehicleTypes();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes\/complete/));
        expect(vehicleTypes).toEqual(dataComplete);
    });

    test('get vehicleTypes by id equal', async () => {
        axios.get = jest.fn().mockResolvedValue(vehicleTypeById);
        var id = "vehicleType1";
        const vehicleType = await index.getVehicleTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes\/.+/));
        expect(vehicleType).toEqual(vehicleTypeById);
    });

    test('get vehicleTypes by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(vehicleTypeById);
        var id = "fake vehicleType id";
        var expectedName = "fake name";
        const vehicleType = await index.getVehicleTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes\/.+/));
        expect(vehicleType.name).not.toEqual(expectedName);
    });

    test('get vehicleTypes by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const vehicleType = await index.getVehicleTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes\/.+/));
        expect(vehicleType).not.toEqual(vehicleTypeById);
        expect(vehicleType).toMatchObject(new Map());
    });

    test('post vehicleType', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedVehicleType = await index.postVehicleType(postBody);
        await expect(index.postVehicleType(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes/), postBody);
        expect(postedVehicleType).toEqual(postBody);
    });

    test('post vehicleType null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedVehicleType = await index.postVehicleType(null);
        await expect(index.postVehicleType(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});