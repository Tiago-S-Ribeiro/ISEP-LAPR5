import React from 'react'
import ReactDOM from 'react-dom'
import PathNodeCreationComp from '../PathNodeCreationComp';
import { render } from '@testing-library/react';
import { Input, Button, InputNumber, Select} from "antd";
const axios = require('axios');
const index = require('./pathNodeFunction.js');
const { Option } = Select;
var postBody = { "key": "pathNode_test4", "node": "node_test4", "duration": "55", "distance": "66" };

test('Renders PathNodeCreationComp entirely', () => {
    render(<PathNodeCreationComp />);
    //overall
});

test('Renders Antd PathNode Select properties without crashing', () => {
    console.log("Antd Select Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Select></Select>, div);
});

test('Renders Antd PathNode Options properties without crashing', () => {
    console.log("Antd Option Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Option></Option>, div);
});

test('Renders Antd PathNode Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
}); 

test('Renders Antd PathNode InputNumber properties without crashing', () => {
    console.log("Antd InputNumber Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<InputNumber></InputNumber>, div);
});

test('Renders Antd PathNode Create Button properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});

// // MOCKS -> POSTS

jest.mock('axios');
describe('PathNode Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });
    test('post pathNode', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedPathNode = await index.postPN(postBody);
        await expect(index.postPN(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/pathNodes/), postBody);
        expect(postedPathNode).toEqual(postBody);
    });

    test('post pathNode null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedDriverType = await index.postPN(null);
        await expect(index.postPN(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});