import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3005';

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    await pause(1000);
    return response.data;
})

const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

export { fetchUsers }