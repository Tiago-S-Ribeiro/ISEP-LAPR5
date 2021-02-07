const axios = require('axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "linePath_test1", "path": "path_test1", "orientation": "Return" }, { "key": "linePath_test2", "path": "path_test2", "orientation": "Go" }] };
var dataComplete = { "data": [{ "_id": "id3", "key": "linePath_test3", "path": "path_test3", "orientation": "Return", "__v": 0 }, { "_id": "id4", "key": "linePath_test4", "path": "path_test4", "orientation": "Go", "__v": 0 }] };
var linePathById = { "key": "linePath_test5", "path": "path_test5", "orientation": "Return" };
var postBody = { "key": "linePath_test6", "path": "path_test6", "orientation": "Return" };

jest.mock('axios');

describe('Line Paths Integration Tests', () => {
    
    afterEach(() => { jest.clearAllMocks(); });

    test('get all line paths using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const linePaths = await index.getAllLinePathsDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths/));
        expect(linePaths).toEqual(dataDTO);
    });

    test('get all line paths complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const linePaths = await index.getAllLinePaths();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths\/complete/));
        expect(linePaths).toEqual(dataComplete);
    });

    test('get line path by id', async () => {
        axios.get = jest.fn().mockResolvedValue(linePathById);
        var id = "linePath_test1";
        const linePpath = await index.getLinePathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths\/.+/));
        expect(linePpath).toEqual(linePathById);
    });

    test('get line path by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const linePath = await index.getLinePathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths\/.+/));
        expect(linePath).not.toEqual(linePathById);
        expect(linePath).toMatchObject(new Map());
    });

    test('get line path by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(linePathById);
        var id = "fake line path id";
        var expectedNode = "fake path";
        const linePath = await index.getLinePathById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths\/.+/));
        expect(linePath.node).not.toEqual(expectedNode);
    });

    test('post path nodes', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedLinePath = await index.postLinePath(postBody);
        await expect(index.postLinePath(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths/), postBody);
        expect(postedLinePath).toEqual(postBody);
    });

    test('post line paths null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedLinePath = await index.postLinePath(null);
        await expect(index.postLinePath(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });

});