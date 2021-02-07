const mongoose = require('mongoose');
const PathNode = require('../../models/pathNode');
const Node = require('../../models/node');
const pathNodeData = { key: 'test_key', nodes: [], duration: 15, distance: 150 };

var testNode = new Node();

const pathNodeData2 = { key: 'test_key2', node: testNode._id, duration: 12, distance: 300 };

describe('Path Unit Testing', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a pathNode: without a node id', async () => {
        const validPathNode = new PathNode(pathNodeData);
        const savedPathNode = await validPathNode.save();

        expect(savedPathNode._id).toBeDefined();
        expect(savedPathNode.key).toBe(pathNodeData.key);
        expect(savedPathNode.node).toBe(pathNodeData.node);
        expect(savedPathNode.duration).toBe(pathNodeData.duration);
        expect(savedPathNode.distance).toBe(pathNodeData.distance);

        await savedPathNode.remove();

    });

    test('create a pathNode: with a node id', async () => {
        const validPathNode = new PathNode(pathNodeData2);
        const savedPathNode = await validPathNode.save();

        expect(savedPathNode._id).toBeDefined();
        expect(savedPathNode.key).toBe(pathNodeData2.key);
        expect(savedPathNode.node._id).toBe(pathNodeData2.node._id);
        expect(savedPathNode.duration).toBe(pathNodeData2.duration);
        expect(savedPathNode.distance).toBe(pathNodeData2.distance);

        await savedPathNode.remove();

    });

    afterAll(async done => {
        mongoose.connection.close();
        done();
    });
})