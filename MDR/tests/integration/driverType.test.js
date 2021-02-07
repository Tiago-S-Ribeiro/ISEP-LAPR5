const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "drivertype_test1", "name": "DriverType Name 1", "description": "DriverType Desc 1" }, { "key": "drivertype_test2", "name": "DriverType Name 2", "description": "DriverType Desc 2" }] };
var dataComplete = { "data": [{ "_id": "id_test1", "key": "drivertype_test1", "name": "DriverType Name 1", "description": "DriverType Desc 1" }, { "_id": "id_test2", "key": "drivertype_test2", "name": "DriverType Name 2", "description": "DriverType Desc 2" }] };
var driverTypeById = { "key": "drivertype_test1", "name": "DriverType Name 1", "description": "DriverType Desc 1" };
var postBody = { "key": "drivertype_test3", "name": "DriverType Name 3", "description": "DriverType Desc 3" };

describe('DriverType Integration Tests', () => {

    afterEach(() => { jest.clearAllMocks(); });

    test('get all driverTypes using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const driverType = await index.getAllDriverTypesDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/));
        expect(driverType).toEqual(dataDTO);
    });

    test('get all driverTypes complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const driverType = await index.getAllDriverTypes();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/complete/));
        expect(driverType).toEqual(dataComplete);
    });

    test('get driverTypes by id equal', async () => {
        axios.get = jest.fn().mockResolvedValue(driverTypeById);
        var id = "line_test1";
        const driverType = await index.getDriverTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
        expect(driverType).toEqual(driverTypeById);
    });

    test('get driverTypes by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(driverTypeById);
        var id = "fake driverType id";
        var expectedName = "fake name";
        const driverType = await index.getDriverTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
        expect(driverType.name).not.toEqual(expectedName);
    });

    test('get driverTypes by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const driverType = await index.getDriverTypeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes\/.+/));
        expect(driverType).not.toEqual(driverTypeById);
        expect(driverType).toMatchObject(new Map());
    });

    test('post driverType', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedDriverType = await index.postDriverType(postBody);
        await expect(index.postDriverType(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/), postBody);
        expect(postedDriverType).toEqual(postBody);
    });

    test('post driverType null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedDriverType = await index.postDriverType(null);
        await expect(index.postDriverType(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});