const mongoose = require('mongoose');

const Node = require('../../models/node');
const nodeData = {  key: 'test_key1', name: 'nodeNameTest1', latitude:41.234, longitude:120.5, shortName: 'NN1', isDepot: false, isReliefPoint: false};
const nodeData2 = {  key: 'test_key1', name: 'nodeNameTest1', latitude:41.234, longitude:120.5, shortName: 'NN2', isDepot: false, isReliefPoint: false};
const nodeDataStringLatitude = {  key: 'test_key1', name: 'nodeNameTest1', latitude:'a', longitude:120.5, shortName: 'NN2', isDepot: false, isReliefPoint: false};
const nodeDataStringLongitude = {  key: 'test_key1', name: 'nodeNameTest1', latitude:41.234, longitude:'a', shortName: 'NN2', isDepot: false, isReliefPoint: false};
const nodeDataOnlyRequiredParams = {  key: 'test_key1', shortName: 'NN2'};

describe('Node Unit Testing', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a node: basic node', async () => {
        const validNode = new Node(nodeData);
        const savedNode = await validNode.save();

        expect(savedNode._id).toBeDefined();
        expect(savedNode.key).toBe(nodeData.key);
        expect(savedNode.name).toBe(nodeData.name);
        expect(savedNode.latitude).toBe(nodeData.latitude);
        expect(savedNode.longitude).toBe(nodeData.longitude);
        expect(savedNode.shortName).toBe(nodeData.shortName);
        expect(savedNode.isDepot).toBe(nodeData.isDepot);
        expect(savedNode.isReliefPoint).toBe(nodeData.isReliefPoint);

        await savedNode.remove();

    });

    test('create a node: same key', async () => {
        const validNode = new Node(nodeData);
        const savedNode = await validNode.save();
        
        await expect(new Node(nodeData2).save()).rejects.toThrowError("duplicate key");

        await savedNode.remove();

    });

    test('create a node: same short name', async () => {
        const validNode = new Node(nodeData);
        const savedNode = await validNode.save();
        
        await expect(new Node(nodeData).save()).rejects.toThrowError("duplicate key");

        await savedNode.remove();

    });

    test('create a node with a string for latitude', async () => {

        await expect(new Node(nodeDataStringLatitude).save()).rejects.toThrowError(Error);

    });

    test('create a node with a string for latitude', async () => {

        await expect(new Node(nodeDataStringLongitude).save()).rejects.toThrowError(Error);

    });

    test('create a node with only the required parameters', async () => {
        const validNode = new Node(nodeDataOnlyRequiredParams);
        const savedNode = await validNode.save();

        expect(savedNode._id).toBeDefined();
        expect(savedNode.key).toBe(nodeDataOnlyRequiredParams.key);
        expect(savedNode.name).toBe(undefined);
        expect(savedNode.latitude).toBe(undefined);
        expect(savedNode.longitude).toBe(undefined);
        expect(savedNode.shortName).toBe(nodeDataOnlyRequiredParams.shortName);
        expect(savedNode.isDepot).toBe(undefined);
        expect(savedNode.isReliefPoint).toBe(undefined);

        await savedNode.remove();

    });

    
    afterAll(async done => {
        mongoose.connection.close();
        done();
    });
})