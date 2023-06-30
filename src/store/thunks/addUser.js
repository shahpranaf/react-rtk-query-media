import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3005';

const addUser = createAsyncThunk('users/addUser', async () => {
    const response = await axios.post(`${BASE_URL}/users`, {
        name: faker.person.fullName()
    })
    return response.data;
})

export { addUser };