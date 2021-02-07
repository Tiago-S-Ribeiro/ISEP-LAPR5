const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "path_test1", "isEmpty": "false", "pathNodes": ["pathNode_test1", "pathNode_test2"]}, { "key": "path_test2", "isEmpty": "false", "pathNodes": "pathNode_test2" }] };
var dataComplete = { "data": [{ "_id": "id5", "key": "path_test3", "isEmpty": "false", "pathNodes": ["pathNode_test4", "pathNode_test4"], "__v": 0 }, { "_id": "id6","key": "path_test4", "isEmpty": "true", "pathNodes": ["pathNode_test5", "pathNode_test3"], "__v": 0}] };
var pathById = { "key": "path_test6", "isEmpty": "true", "pathNodes": ["pathNode_test1", "pathNode_test2", "pathNode_test3"]};
var postBody = { "key": "path_test7", "isEmpty": "false", "pathNodes": ["pathNode_test3", "pathNode_test2", "pathNode_test5"]};

jest.mock('axios');

describe('Path Integration Tests', () => {
    
    afterEach(() => { jest.clearAllMocks(); });

    test('get all paths using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const path = await index.getPathsUsingDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths/));
        expect(path).toEqual(dataDTO);
    });

    test('get all path complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const paths = await index.getAllPaths();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths\/complete/));
        expect(paths).toEqual(dataComplete);
    });

    test('get path by id', async () => {
        axios.get = jest.fn().mockResolvedValue(pathById);
        var id = "path_test1";
        const path = await index.getPathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths\/.+/));
        expect(path).toEqual(pathById);
    });

    test('get path by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const path = await index.getPathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths\/.+/));
        expect(path).not.toEqual(pathById);
        expect(path).toMatchObject(new Map());
    });

    test('get path by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(pathById);
        var id = "fake path id";
        var expectedPath = "fake path";
        const path = await index.getPathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths\/.+/));
        expect(path.path).not.toEqual(expectedPath);
    });

    test('post paths', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedPath = await index.postPath(postBody);
        await expect(index.postPath(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths/), postBody);
        expect(postedPath).toEqual(postBody);
    });

    test('post paths null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedPath = await index.postPath(null);
        await expect(index.postPath(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });

});