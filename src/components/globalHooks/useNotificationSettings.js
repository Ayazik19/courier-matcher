import { useSelector } from "react-redux";

export function useNotificationSettings(){
    const {
        notifications, notificationsSs, 
        multipleNotifications, notificationsAdmin, notificationsCouriers,
        hiddenNotifications
    } = useSelector(state => state.notificationsAgreement);

    return{
        notifications, notificationsSs, 
        multipleNotifications, notificationsAdmin, notificationsCouriers,
        hiddenNotifications
    };
}