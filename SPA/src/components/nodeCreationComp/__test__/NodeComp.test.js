import React from 'react'
import ReactDOM from 'react-dom'
import NodeCreationComp from '../NodeCreationComp';
import { render } from '@testing-library/react';
import { Input, Switch} from "antd";
const axios = require('axios');
const index = require('./nodeFunction.js');
var postBody = { "key": "Node:4", "name": "Test Name 1", "latitude": 5.4321, "longitude": 9.876, "shortName": "NODE4", "isDepot": true, "isReliefPoint": false }

test('Renders NodeCreationComp entirely', () => {
    render(<NodeCreationComp />);
    //overall
});

test('Renders Antd Node Switch properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Switch></Switch>, div);
});

test('Renders Antd Node Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
});

// // MOCKS -> POSTS

jest.mock('axios');
describe('Node Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });
    test('post Node', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedNode = await index.postNode(postBody);
        await expect(index.postNode(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/nodes/), postBody);
        expect(postedNode).toEqual(postBody);
    });

    test('post Node null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedNode = await index.postNode(null);
        await expect(index.postNode(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});