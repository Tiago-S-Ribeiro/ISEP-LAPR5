import React from 'react'
import ReactDOM from 'react-dom'
import LinePathCreationComp from '../LinePathCreationComp';
import { render } from '@testing-library/react';
import { Input, Button, Select } from "antd";

const { Option } = Select;

const axios = require('axios');
const index = require('./linePathFunction.js');
var postBody = { "key": "linePath_test6", "path": "path_test6", "orientation": "Return" };

test('Renders LinePathCreationComp entirely', () => {
    render(<LinePathCreationComp />);
    //overall
});

test('Renders Antd LinePath Button properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});

test('Renders Antd LinePath Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
});

test('Renders Antd LinePath Select properties without crashing', () => {
    console.log("Antd Select Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Select></Select>, div);
});

test('Renders Antd LinePath Option properties without crashing', () => {
    console.log("Antd Option (From Select) Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Option></Option>, div);
});

// // MOCKS -> POSTS

jest.mock('axios');
describe('LinePath Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });

    //Standard
    test('post linePaths', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedLinePath = await index.postNewLinePath(postBody);
        await expect(index.postNewLinePath(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/linePaths/), postBody);
        expect(postedLinePath).toEqual(postBody);
    });

    //Null body post
    test('post linePaths null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedLinePath = await index.postNewLinePath(null);
        await expect(index.postNewLinePath(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});