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
    notificationsHistory: [],
    errorsInformation: [],
    notificationsViewed: [],
    notificationsUnseen: [],
    notificationsHide: [],
    notificationsBanned: []
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
        setOperationInformErrors(state, action) {
            switch (action.payload.type) {
                case 'ADD_INFORM_ERROR':
                    return{
                        ...state,
                        errorsInformation: [
                            ...(state.errorsInformation || []), action.payload
                        ]
                    };
                case 'REMOVE_INFORM_ERRORS':
                    return{
                        ...state,
                        errorsInformation: [] 
                    }
                default:
                    return state;
            }
        },
        setOperationUserNotifications(state, action) {
            switch(action.payload.type){
                case 'ALL_NOTIFICATIONS_HISTORY':
                    return{
                        ...state,
                        notificationsHistory: [
                        ...(state.notificationsHistory || []), action.payload
                        ]
                    };
                case 'ADD_NOTIFICATIONS_VIEWED':
                    return{
                        ...state,
                        notificationsViewed: [
                            ...(state.notificationsViewed || []), action.payload
                        ]
                    };
                case 'ADD_NOTIFICATIONS_UNSEEN':
                    return{
                        ...state,
                        notificationsUnseen: [
                            ...(state.notificationsUnseen || []), action.payload
                        ]
                    };
                case 'REMOVE_UNSEEN_NOTIFICATIONS':
                    return{
                        ...state,
                        notificationsUnseen: []
                    }
                case 'REMOVE_VIEWED_NOTIFICATIONS':
                    return{
                        ...state,
                        notificationsViewed: []
                    }
                case 'REMOVE_ALL_NOTIFICATIONS':
                    return{
                        ...state,
                        notificationsHistory: [],
                        notificationsViewed: [],
                        notificationsUnseen: []
                    }
                default:
                    return state;
            }   
        },
        setHideNotifications: (state, action) => {
            if (!state.notificationsHide) {
              state.notificationsHide = [];
            }
            state.notificationsHide.push(action.payload);
        },
        setBannedNotfications: (state, action) => {
            if(!state.notificationsBanned){
                state.notificationsBanned = [];
            }
            state.notificationsBanned.push(action.payload);
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
        setRemoveBannedNotifications: (state) => {
            state.notificationsBanned = [];
        },
        setRemoveHideNotificaitons: (state) => {
            state.notificationsHide = [];
        },
    },
});


    

export const {
    setUser, 
    setUserProfile, 
    setOperationInformErrors,  
    setOperationUserNotifications, 
    setHideNotifications, 
    setRemoveHideNotificaitons,
    setBannedNotfications,
    setRemoveBannedNotifications,
    removeUser} = userSlice.actions;

export default userSlice.reducer;