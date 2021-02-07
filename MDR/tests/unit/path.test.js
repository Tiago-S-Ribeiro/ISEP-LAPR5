const mongoose = require('mongoose');
const Path = require('../../models/path');
const PathNode = require('../../models/pathNode');
const pathData = { key: 'test_key', isEmpty: true, pathNodes: [] };

var pathNode1 = new PathNode();
var pathNode2 = new PathNode();
var pathNodesArray = [];

pathNodesArray.push(pathNode1._id);
pathNodesArray.push(pathNode2._id);

const pathData2 = { key: 'test_key2', isEmpty: false, pathNodes: pathNodesArray };

describe('Path Unit Testing', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a path: empty array of path nodes', async () => {
        const validPath = new Path(pathData);
        const savedPath = await validPath.save();

        expect(savedPath._id).toBeDefined();
        expect(savedPath.key).toBe(pathData.key);
        expect(savedPath.isEmpty).toBe(pathData.isEmpty);
        expect(Array.from(savedPath.pathNodes)).toStrictEqual(pathData.pathNodes);

        savedPath.remove();

    });

    test('create a path: pathNodes array with id values', async () => {
        const validPath = new Path(pathData2);
        const savedPath = await validPath.save();

        expect(savedPath._id).toBeDefined();
        expect(savedPath.key).toBe(pathData2.key);
        expect(savedPath.isEmpty).toBe(pathData2.isEmpty);
        expect(Array.from(savedPath.pathNodes)).toStrictEqual(pathData2.pathNodes);

        savedPath.remove();

    });

    test('expect path with same key to not create', async () => {
        const validPath = new Path(pathData);
        const savedPath = await validPath.save();

        const validPath2 = new Path(pathData);

        await expect(validPath2.save()).rejects.toThrowError("duplicate key");
    });

    afterAll(async done => {
        mongoose.connection.close();
        done();
    });
})