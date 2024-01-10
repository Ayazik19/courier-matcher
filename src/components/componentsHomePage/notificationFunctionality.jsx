import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import CheckOperationNotificationsUser from './checkOperationNotificationsUser';
import {useHookMouseFunctionalityErrorsContext} from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors';
import iconNotification from './bell.png';
import imgSsCoorchik from './logoSite.png';
import {useState, useEffect} from 'react';
import './notificationFunctionality.css';
import { useAuth } from '../globalHooks/useauth';

export default function NotificationFunctionality(){
    const {
        isNotificationsUser
    } = useAuth();
    const {
        hideIconAddCourier, 
        hideContIconUserAcc, 
        hideNotificationIcon, 
        setHideNotificationIcon
    } = useHookHeaderIconsEmergenceContext();
    const {isSelectedElement} = useHookMouseFunctionalityErrorsContext();

    const [eventClickTracking, setEventClickTracking] = useState(1);

    const handleShowContNotifications = () => {
        setHideNotificationIcon(false);
        setEventClickTracking(eventClickTracking + 1);
        if(!hideNotificationIcon){
            if(eventClickTracking % 2 == 0){
                setHideNotificationIcon(true);
            }
            else{
                setHideNotificationIcon(false);
            }
        }
    }

    useEffect(() => {
        if(!hideIconAddCourier || !hideContIconUserAcc || isSelectedElement) {
            setHideNotificationIcon(true);
        }
    },[hideIconAddCourier, hideContIconUserAcc, isSelectedElement]);


    return(
        //The code is under development...
        <div>
            
            <div className='icon-notification' onClick = {handleShowContNotifications}>
                <img src={iconNotification} className='img-icon-notifcation'/>
                {/* <CheckOperationNotificationsUser /> */}
            </div>
        </div>
    );
}