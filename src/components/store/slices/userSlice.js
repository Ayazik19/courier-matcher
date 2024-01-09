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
    gender: null,
    errorsInformation: [],
    updatedErrorsInformation: []
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
        setUserInformErrors(state, action) {
            switch(action.payload.type){
                case 'ADD_INFORM_ERROR':
                    return{
                        ...state,
                        errorsInformation: [
                            ...state.errorsInformation, action.payload
                        ]
                    };
                case 'REMOVE_ID_INFORM_ERROR':
                    const updatedErrorsInformation = state.errorsInformation.filter(item => item.idInformErrors !== action.payload.idInformErrors);
                    return{
                        ...state,
                        errorsInformation: updatedErrorsInformation
                    };
                case 'REMOVE_ALL_INFORM_ERRORS':
                    return {
                        ...state,
                        errorsInformation: [],
                        updatedErrorsInformation: []
                    };
                default:
                    return state;
            }   
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

    

export const {setUser, setUserProfile, setUserInformErrors, removeUser} = userSlice.actions;

export default userSlice.reducer;