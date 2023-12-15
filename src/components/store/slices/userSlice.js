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
    locationUser: null,
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
        setUserPhotoProfile(state, action) {
            state.photoAcc = action.payload.photoAcc;
            state.dateBirth = action.payload.dateBirth;
            state.gender = action.payload.gender;
            state.locationUser = action.payload.locationUser;
            state.phoneNumber = action.payload.phoneNumber;
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


export const {setUser, setUserPhotoProfile, removeUser} = userSlice.actions;

export default userSlice.reducer;