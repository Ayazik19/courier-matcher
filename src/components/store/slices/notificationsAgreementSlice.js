import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: true,
    multipleNotifications: true,
    notificationsAdmin: true,
    notificationsSs: true,
    notificationsCouriers: true,
};

const notificationsAgreementSlice = createSlice({
    name: 'notificationsAgreement',
    initialState,
    reducers: {
        setUserNotificationsSettings(state, action) {
            if (action.payload && action.payload.notifications) {
                state.notifications = action.payload.notifications;
            }
            if (action.payload && action.payload.multipleNotifications) {
                state.multipleNotifications = action.payload.multipleNotifications;
            }
            if (action.payload && action.payload.notificationsSs) {
                state.notificationsSs = action.payload.notificationsSs;
            }
            if (action.payload && action.payload.notificationsAdmin) {
                state.notificationsAdmin = action.payload.notificationsAdmin;
            }
            if (action.payload && action.payload.notificationsCouriers) {
                state.notificationsCouriers = action.payload.notificationsCouriers;
            }
        },
        setUpdNotificationsSsSettings(state, action){
            state.notificationsSs = action.payload;
        },
        setUpdNotificationsSettings(state, action){
            state.notifications = action.payload;
        },
        setUpdNotificationsAdminSettings(state, action){
            state.notificationsAdmin = action.payload;
        },
        setUpdNotificationsCouriersSettings(state, action){
            state.notificationsCouriers = action.payload;
        },
        setUpdMultipleNotificationsSettings(state, action){
            state.multipleNotifications = action.payload;
        },
        removeSettings(state) {
            state.multipleNotifications = null;
            state.notificationsCouriers = null;
            state.notificationsAdmin = null;
            state.notificationsSs = null;
            state.notifications = null;
        },
    }
})

export const {
    setUserNotificationsSettings, removeSettings,
    setUpdMultipleNotificationsSettings,
    setUpdNotificationsCouriersSettings,
    setUpdNotificationsAdminSettings,
    setUpdNotificationsSettings,
    setUpdNotificationsSsSettings,
} = notificationsAgreementSlice.actions;

export default notificationsAgreementSlice.reducer;