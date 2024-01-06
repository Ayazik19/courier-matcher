import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    token: null,
    displayName: null,
    password: null,
    email: null,
    photoAcc: null,
    dateBirth: null,
    phoneNumber: null,
    townLocation: null,
    streetLocation: null,
    gender: null
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
        },
        setUserProfile(state, action) {
            state.photoAcc = action.payload.photoAcc;
            state.dateBirth = action.payload.dateBirth;
            state.gender = action.payload.gender;
            state.townLocation = action.payload.townLocation;
            state.streetLocation = action.payload.streetLocation;
            state.phoneNumber = action.payload.phoneNumber;
        },
        removeUser(state) {
            state.token = null;
            state.id = null;
            state.displayName = null;
            state.password = null;
            state.email = null;
            state.photoAcc = null;
            state.dateBirth = null;
            state.phoneNumber = null;
            state.gender = null;
            state.streetLocation = null;
            state.townLocation = null;
        },
    },
});


export const {setUser, setUserProfile, removeUser} = userSlice.actions;

export default userSlice.reducer;