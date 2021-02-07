const mongoose = require('mongoose');

const Line = require('../../models/line');
const lineData = { key: 'test_key', name: 'lineNameTest', color: [], linePaths: [] };
const lineData2 = { key: 'test_key2', name: 'lineNameTest2', color: [1, 2, 3], linePaths: [] };

describe('Line Unit Testing', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('create a line: empty arrays', async () => {
        const validLine = new Line(lineData);
        const savedLine = await validLine.save();

        expect(savedLine._id).toBeDefined();
        expect(savedLine.key).toBe(lineData.key);
        expect(savedLine.name).toBe(lineData.name);
        expect(Array.from(savedLine.color)).toStrictEqual(lineData.color);
        expect(Array.from(savedLine.linePaths)).toStrictEqual(lineData.linePaths);

        savedLine.remove();

    });

    test('create a line: correct color array and empty linepaths array', async () => {
        const validLine = new Line(lineData2);
        const savedLine = await validLine.save();

        expect(savedLine._id).toBeDefined();
        expect(savedLine.key).toBe(lineData2.key);
        expect(savedLine.name).toBe(lineData2.name);
        expect(Array.from(savedLine.color)).toStrictEqual(lineData2.color);
        expect(Array.from(savedLine.linePaths)).toStrictEqual(lineData2.linePaths);

        savedLine.remove();

    });

    test('expect line with same key to not create', async () => {
        const validLine = new Line(lineData);
        const savedLine = await validLine.save();

        const validLine2 = new Line(lineData);

        await expect(validLine2.save()).rejects.toThrowError("duplicate key");
    });

    afterAll(async done => {
        mongoose.connection.close();
        done();
    });
})