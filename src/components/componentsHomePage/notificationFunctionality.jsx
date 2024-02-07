import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import CheckOperationNotificationsUser from './checkOperationNotificationsUser';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors';
import iconNotification from './bell.png';
import imgSsCoorchik from './imagelogoSSCoorchik.png';
import suppServiceIcon from './suppServiceIcon.png';
import iconActionNot from './iconActionNot.png';
import logoSite from './logoSite.png';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import './notificationFunctionality.css';
import { useAuth } from '../globalHooks/useauth';
import { useDispatch } from 'react-redux';
import { setOperationUserNotifications, setHideNotifications, setBannedNotfications } from '../store/slices/userSlice.js';
import { useHooksProcessingDatabaseUserNotificationsContext } from '../globalHooks/hooksProcessingDatabaseUserNotifications.js';
import { doc, getDoc, getFirestore, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import { useScrollBar } from '../globalHooks/hooksProcessingDatabaseUserNotifications.js'
import moment from 'moment';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function NotificationFunctionality() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isAuth,
        email,
        notificationsViewed,
        notificationsUnseen,
        notificationsHide,
        notificationsBanned
    } = useAuth();
    const {
        hideIconAddCourier, 
        hideContIconUserAcc, 
        hideNotificationIcon, 
        setHideNotificationIcon
    } = useHookHeaderIconsEmergenceContext();
    const { isSelectedElement } = useHookMouseFunctionalityErrorsContext();
    const {
        calculateCountUnseenNotifications, calculateCountViewedNotifications,
        setCalculateCountUnseenNotifications
    } = useHooksProcessingDatabaseUserNotificationsContext();

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