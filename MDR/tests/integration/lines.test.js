const axios = require('axios');
const { getLineById } = require('../axios');
const index = require('../axios');

var dataDTO = { "data": [{ "key": "line_test1", "name": "Line Test 1", "linePaths": ["linepath_test1", "linepath_test2"] }, { "key": "line_test2", "name": "Line Test 2", "linePaths": ["linepath_test3", "linepath_test4"] }] };
var dataComplete = { "data": [{ "color": [1, 2, 3], "linePaths": ["linepath_test1", "linepath_test2"], "_id": "id1", "key": "line_test1", "name": "Line Test 1", "__v": 0 }, { "color": [4, 5, 6], "linePaths": ["linepath_test3", "linepath_test4"], "_id": "id2", "key": "line_test2", "name": "Line Test 2", "__v": 0 }] };
var lineById = { "key": "line_test1", "name": "Line Test 1", "linePaths": ["linepath_test1", "linepath_test2"] };
var postBody = { "key": "line_test3", "name": "Line Test 3", "color": [7, 8, 9], "linePaths": ["linepath_test5", "linepath_test6"] };

jest.mock('axios');

describe('Lines Integration Tests', () => {

    afterEach(() => { jest.clearAllMocks(); });

    test('get all lines using DTO', async () => {
        axios.get = jest.fn().mockResolvedValue(dataDTO);
        const lines = await index.getAllLinesDTO();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines/));
        expect(lines).toEqual(dataDTO);
    });

    test('get all lines complete information', async () => {
        axios.get = jest.fn().mockResolvedValue(dataComplete);
        const lines = await index.getAllLines();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines\/complete/));
        expect(lines).toEqual(dataComplete);
    });

    test('get line by id', async () => {
        axios.get = jest.fn().mockResolvedValue(lineById);
        var id = "line_test1";
        const lines = await index.getLineById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines\/.+/));
        expect(lines).toEqual(lineById);
    });

    test('get line by id not equal', async () => {
        axios.get = jest.fn().mockResolvedValue(getLineById);
        var id = "fake line id";
        var expectedName = "fake name";
        const line = await index.getLineById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines\/.+/));
        expect(line.name).not.toEqual(expectedName);
    });

    test('get line by id error', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Not Found'));
        var id = "not found";
        const line = await index.getLineById(id);
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines\/.+/));
        expect(line).not.toEqual(lineById);
        expect(line).toMatchObject(new Map());
    });

    test('post lines', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedLine = await index.postLine(postBody);
        await expect(index.postLine(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines/), postBody);
        expect(postedLine).toEqual(postBody);
    });

    test('post lines null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedLine = await index.postLine(null);
        await expect(index.postLine(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});