import React from 'react'
import ReactDOM from 'react-dom'
import LineCreationComp from '../LineCreationComp';
import { render } from '@testing-library/react';
import { Input, Button, Select } from "antd";
import { SliderPicker } from 'react-color';

const { Option } = Select;

const axios = require('axios');
const index = require('./lineFunctions.js');
var postBody = { "key": "line_test3", "name": "Line Test 3", "color": [7, 8, 9], "linePaths": ["linepath_test5", "linepath_test6"] };

test('Renders LineCreationComp entirely', () => {
    render(<LineCreationComp />);
    //overall
});

it('Renders Antd Line Button properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});

it('Renders Antd Line Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
});

it('Renders Antd Line SliderPicker properties without crashing', () => {
    console.log("React-Color SliderPicker Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<SliderPicker></SliderPicker>, div);
});

it('Renders Antd Line Select properties without crashing', () => {
    console.log("Antd Select Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Select></Select>, div);
});

it('Renders Antd Line Option properties without crashing', () => {
    console.log("Antd Option (From Select) Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Option></Option>, div);
});

// MOCKS -> POSTS

jest.mock('axios');
describe('Line Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });

    //Standard
    test('post lines', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedLine = await index.postNewLine(postBody);
        await expect(index.postNewLine(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/lines/), postBody);
        expect(postedLine).toEqual(postBody);
    });

    //Null body post
    test('post lines null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedLine = await index.postNewLine(null);
        await expect(index.postNewLine(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});