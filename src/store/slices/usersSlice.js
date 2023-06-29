import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    reducers: {
        addUser(state, action) {
            state.data.push({

            });
        }
    }
})

export const { addUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;