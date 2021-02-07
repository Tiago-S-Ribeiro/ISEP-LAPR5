import React from 'react'
import ReactDOM from 'react-dom'
import VehicleTypeCreationComp from '../VehicleTypeCreationComp';
import { render } from '@testing-library/react';
import { Input, Button, Select, InputNumber} from "antd";
const axios = require('axios');
const index = require('./vehicleTypeFunction.js');
const { Option } = Select;
var postBody = { "key": "VehicleTypeTest3", "name": "Vehicle Type Test 3", "autonomy": 20, "cost": 30, "averageSpeed": 40, "energySource": 23, "consumption": 10, "emissions": 77, "vehicles": [] };

test('Renders NodeCreationComp entirely', () => {
    render(<VehicleTypeCreationComp />);
    //overall
});

test('Renders Antd VehicleType Select properties without crashing', () => {
    console.log("Antd Select Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Select></Select>, div);
});

test('Renders Antd VehicleType Options properties without crashing', () => {
    console.log("Antd Option Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Option></Option>, div);
});

test('Renders Antd VehicleType Input Box properties without crashing', () => {
    console.log("Antd Input Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Input></Input>, div);
}); 

test('Renders Antd VehicleType InputNumber properties without crashing', () => {
    console.log("Antd InputNumber Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<InputNumber></InputNumber>, div);
});

test('Renders Antd VehicleType Create Button properties without crashing', () => {
    console.log("Antd Button Renderer")
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div);
});

// // MOCKS -> POSTS

jest.mock('axios');
describe('VehicleType Mock Testing', () => {

    afterEach(() => { jest.clearAllMocks(); });
    test('post vehicleType', async () => {
        axios.post = jest.fn().mockResolvedValue(postBody);
        const postedDriverType = await index.postVT(postBody);
        await expect(index.postVT(postBody)).not.toEqual(new Map());
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/.+\/vehicleTypes/), postBody);
        expect(postedDriverType).toEqual(postBody);
    });

    test('post vehicleType null post body', async () => {
        axios.post = jest.fn().mockImplementation(() => { throw new Error('Null Post Body') });
        const postedDriverType = await index.postVT(null);
        await expect(index.postVT(null)).toStrictEqual(Promise.resolve());
        expect(axios.post).not.toHaveBeenCalled();
        expect(axios.post).toThrow('Null Post Body');
    });
});