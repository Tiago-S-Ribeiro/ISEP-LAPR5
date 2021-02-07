import React from 'react'
import ReactDOM from 'react-dom'
import DriverTypeCreationComp from '../DriverTypeCreationComp';
import { render } from '@testing-library/react';
import { Input, Button} from "antd";

const axios = require('axios');
const index = require('./driverTypeFunctions.js');
var postBody = { "key": "drivertype_test3", "name": "DriverType Name 3", "description": "DriverType Desc 3" };

test('Renders DriverTypeComp entirely', () => {
    render(<DriverTypeCreationComp />);
    //overall
});

it('Renders Antd Button properties without crashing', () => {
  console.log("Antd Button Renderer")
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
});

it('Renders Antd Input Box properties without crashing', () => {
  console.log("Antd Input Renderer")
  const div = document.createElement("div");
  ReactDOM.render(<Input></Input>, div);
});


// MOCKS -> POSTS

jest.mock('axios');
describe('DriverType Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });

    //Standard
    test('post driverType', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedDriverType = await index.postDriverType(postBody);
        await expect(index.postDriverType(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/driverTypes/), postBody);
        expect(postedDriverType).toEqual(postBody);
    });

    //Post com null body
    test('post driverType null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedDriverType = await index.postDriverType(null);
        await expect(index.postDriverType(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});