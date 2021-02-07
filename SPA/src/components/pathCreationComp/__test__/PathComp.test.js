import React from 'react'
import ReactDOM from 'react-dom'
import PathCreationComp from '../PathCreationComp';
import { render } from '@testing-library/react';
import { Input, Switch} from "antd";
const axios = require('axios');
const index = require('./pathFunction.js');
var postBody = { "key": "path_test7", "isEmpty": "false", "pathNodes": ["pathNode_test3", "pathNode_test2", "pathNode_test5"]};

test('Renders NodeCreationComp entirely', () => {
    render(<PathCreationComp />);
    //overall
});

test('Renders Antd Node Switch properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Switch></Switch>, div);
});

test('Renders Antd Path Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
});

// // MOCKS -> POSTS

jest.mock('axios');
describe('Path Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });
    
    test('post paths', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedPath = await index.postPath(postBody);
        await expect(index.postPath(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/paths/), postBody);
        expect(postedPath).toEqual(postBody);
    });

    test('post paths null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedPath = await index.postPath(null);
        await expect(index.postPath(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});