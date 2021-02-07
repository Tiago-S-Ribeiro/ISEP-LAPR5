const mongoose = require('mongoose');
const LinePath = require('../../models/linePath');
const Node = require('../../models/path');
const linePathData = { key: 'test_key', path: null, orientation: 'Go'};

var testPath = new LinePath();

const linePathData2 = { key: 'test_key2', node: testPath._id, orientation: 'Return'};

describe('Path Unit Testing', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a linePath: without a path id', async () => {
        const validLinePath = new LinePath(linePathData);
        const savedLinePath = await validLinePath.save();

        expect(savedLinePath._id).toBeDefined();
        expect(savedLinePath.key).toBe(linePathData.key);
        expect(savedLinePath.path).toBe(linePathData.path);
        expect(savedLinePath.orientation).toBe(linePathData.orientation);

        await savedLinePath.remove();

    });

    test('create a linePath: with a path id', async () => {
        const validLinePath = new LinePath(linePathData2);
        const savedLinePath = await validLinePath.save();

        expect(savedLinePath._id).toBeDefined();
        expect(savedLinePath.key).toBe(linePathData2.key);
        expect(savedLinePath.path).toBe(linePathData2.path);
        expect(savedLinePath.orientation).toBe(linePathData2.orientation);

        await savedLinePath.remove();

    });

    afterAll(async done => {
        mongoose.connection.close();
        done();
    });
})