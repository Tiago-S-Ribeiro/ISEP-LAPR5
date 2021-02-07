const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "Node:1", "name": "Test Name 1", "shortName": "NODE1", "isDepot": false, "isReliefPoint": false }, { "key": "Node:2", "name": "Test Name 2", "shortName": "NODE2", "isDepot": false, "isReliefPoint": true }, { "key": "Node:3", "name": "Test Name 3", "shortName": "NODE3", "isDepot": true, "isReliefPoint": true }] };
var dataComplete = { "nodes": [{ "_id": "idtest1", "key": "Node:1", "name": "Test Name 1", "latitude": 1.23, "longitude": 7.89, "shortName": "NODE1", "isDepot": false, "isReliefPoint": false, "__v": 0 }, { "_id": "idtest2", "key": "Node:2", "name": "Test Name 2", "latitude": 4.56, "longitude": 4.56, "shortName": "NODE2", "isDepot": false, "isReliefPoint": true, "__v": 0 }, { "_id": "idtest3", "key": "Node:3", "name": "Test Name 3", "latitude": 7.89, "longitude": 1.23, "shortName": "NODE3", "isDepot": true, "isReliefPoint": true, "__v": 0 }] };
var nodeById = { "key": "Node:1", "name": "Test Name 1", "shortName": "NODE1", "isDepot": false, "isReliefPoint": false, };
var postBody = { "key": "Node:4", "name": "Test Name 1", "latitude": 5.4321, "longitude": 9.876, "shortName": "NODE4", "isDepot": true, "isReliefPoint": false }

describe('Nodes Integration Tests', () => {

    afterEach(() => { jest.clearAllMocks(); });

    test('get all Nodes using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const nodes = await index.getAllNodesDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes/));
        expect(nodes).toEqual(dataDTO);
    });

    test('get all Nodes complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const nodes = await index.getAllNodes();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes\/complete/));
        expect(nodes).toEqual(dataComplete);
    });

    test('get Nodes by id equal', async () => {
        axios.get = jest.fn().mockResolvedValue(nodeById);
        var id = "idtest1";
        const node = await index.getNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes\/.+/));
        expect(node).toEqual(nodeById);
    });

    test('get Nodes by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(nodeById);
        var id = "fake node id";
        var expectedName = "fake name";
        const node = await index.getNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes\/.+/));
        expect(node.name).not.toEqual(expectedName);
    });

    test('get Nodes by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const node = await index.getNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes\/.+/));
        expect(node).not.toEqual(nodeById);
        expect(node).toMatchObject(new Map());
    });

    test('post Node', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedNode = await index.postNode(postBody);
        await expect(index.postNode(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes/), postBody);
        expect(postedNode).toEqual(postBody);
    });

    test('post Node null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedNode = await index.postNode(null);
        await expect(index.postNode(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});