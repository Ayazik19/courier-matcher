import { useSelector } from "react-redux";

export function useAuth() {
    const { id, displayName, password, token,
        email, photoAcc, dateBirth, phoneNumber, townLocation, streetLocation, gender, 
        errorsInformation,  idInformErrors, fixedInformErrors, idInformErrorsFixed, isFixed, textFeedBack,
        notificationsHistory, notificationsUnseen, notificationsViewed, notificationsBanned, notificationsHide} = useSelector(state => state.user);

    return{
        isAuth: !!email,
        id, token, displayName, password,
        email, photoAcc, dateBirth, phoneNumber, townLocation, streetLocation, gender,
        errorsInformation, idInformErrors, fixedInformErrors, idInformErrorsFixed, isFixed, textFeedBack,
        notificationsHistory, notificationsUnseen, notificationsViewed, notificationsBanned, notificationsHide
    };
}