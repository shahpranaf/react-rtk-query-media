import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk('users/addUser', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.person.fullName()
    })
    return response.data;
})

export { addUser };