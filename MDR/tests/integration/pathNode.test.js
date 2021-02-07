const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "pathNode_test1", "node": "node_test1", "duration": "12", "distance": "500" }, { "key": "pathNode_test2", "node": "node_test2", "duration": "15", "distance": "600" }] };
var dataComplete = { "data": [{ "_id": "id5", "key": "pathNode_test5", "node": "node_test5", "duration": "540", "distance": "4500", "__v": 0 }, { "_id": "id6", "key": "pathNode_tets3", "node": "node_test6", "duration": "360", "distance": "3200", "__v": 0 }] };
var pathNodeById = { "key": "pathNode_test7", "node": "node_test7", "duration": "600", "distance": "5000" };
var postBody = { "key": "pathNode_test4", "node": "node_test4", "duration": "55", "distance": "66" };

jest.mock('axios');

describe('Path Nodes Integration Tests', () => {
    
    afterEach(() => { jest.clearAllMocks(); });

    test('get all path nodes using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const pathNodes = await index.getAllPathNodesDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes/));
        expect(pathNodes).toEqual(dataDTO);
    });

    test('get all path nodes complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const pathNodes = await index.getAllPathNodes();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes\/complete/));
        expect(pathNodes).toEqual(dataComplete);
    });

    test('get path node by id', async () => {
        axios.get = jest.fn().mockResolvedValue(pathNodeById);
        var id = "pathNode_test1";
        const pathNode = await index.getPathNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes\/.+/));
        expect(pathNode).toEqual(pathNodeById);
    });

    test('get pathNodes by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const pathNode = await index.getPathNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes\/.+/));
        expect(pathNode).not.toEqual(pathNodeById);
        expect(pathNode).toMatchObject(new Map());
    });

    test('get path node by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(pathNodeById);
        var id = "fake node path id";
        var expectedNode = "fake node";
        const pathNode = await index.getPathNodeById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes\/.+/));
        expect(pathNode.node).not.toEqual(expectedNode);
    });

    test('post path nodes', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedPathNode = await index.postPathNode(postBody);
        await expect(index.postPathNode(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes/), postBody);
        expect(postedPathNode).toEqual(postBody);
    });

    test('post path nodes null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedPathNode = await index.postPathNode(null);
        await expect(index.postPathNode(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });

});