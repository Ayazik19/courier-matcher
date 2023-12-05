import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    token: null,
    displayName: null,
    password: null,
    email: null,
    photoAcc: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.displayName = action.payload.displayName;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.photoAcc = action.payload.photoAcc;
            state.cookie = action.payload.cookie;
        },
        removeUser(state) {
            state.token = null;
            state.id = null;
            state.displayName = null;
            state.password = null;
            state.email = null;
            state.photoAcc = null;
        },
    },
});


export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;