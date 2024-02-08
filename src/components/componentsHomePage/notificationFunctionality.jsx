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

    const lengthArrUnseen = notificationsUnseen && notificationsUnseen.length ? notificationsUnseen.length : 0;

    const lengthArrViewed = notificationsViewed && notificationsViewed.length ? notificationsViewed.length : 0;

    const checkNots = lengthArrUnseen || lengthArrViewed ? true : false;



    const [updateArrDataViewedNotHookData, setUpdateArrDataViewedNotHookData] = useState([]);
    const [updateArrDataUnseenNotHookData, setUpdateArrDataUnseenNotHookData] = useState([]);
    const [isLoadingDataNots, setLoadingDataNots] = useState(false);

    const handleShowContNotifications = async () => {
        setLoadingDataNots(true);
        setHideNotificationIcon(false);
        const updatedArrDataViewedNot = [];
        const updatedArrDataUnseenNot = [];
        if (lengthArrViewed > 0) {
            for (let i = 0; i < lengthArrViewed; i++) {
                const idObj = i + 0;
                const textNotDataObjectArr = notificationsViewed[i]?.payload[0]?.textNotification;
                const dateNotDataObjectArr = notificationsViewed[i]?.payload[0]?.dateNotification;
                const categNotDataObjecetArr = notificationsViewed[i]?.payload[0]?.categoryNotification;
                const senderNotDataOgjectArr = notificationsViewed[i]?.payload[0]?.senderNotification;
                const isHideNot = notificationsViewed[i]?.payload[0]?.isHideNot;
                const isBannedNot = notificationsViewed[i]?.payload[0]?.isBannedNot;

                const addingObjArrViewedNot = {
                    id: idObj,
                    textNotification: textNotDataObjectArr,
                    dateNotification: dateNotDataObjectArr,
                    categoryNotification: categNotDataObjecetArr,
                    senderNotification: senderNotDataOgjectArr,
                    isHideNot: isHideNot,
                    isBannedNot: isBannedNot
                };
                updatedArrDataViewedNot.push(addingObjArrViewedNot);
            }
            setUpdateArrDataViewedNotHookData(updatedArrDataViewedNot);
        }
        if (lengthArrUnseen > 0) {
            for (let i = 0; i < lengthArrUnseen; i++) {
                const id = i + 0;
                const textNotDataObjectArr = notificationsUnseen[i]?.payload[0]?.textNotification;
                const dateNotDataObjectArr = notificationsUnseen[i]?.payload[0]?.dateNotification;
                const categNotDataObjecetArr = notificationsUnseen[i]?.payload[0]?.categoryNotification;
                const senderNotDataOgjectArr = notificationsUnseen[i]?.payload[0]?.senderNotification;
                const isHideNot = notificationsUnseen[i]?.payload[0]?.isHideNot;
                const isBannedNot = notificationsUnseen[i]?.payload[0]?.isBannedNot;

                const addingObjArrUnseenNot = {
                    id: id,
                    textNotification: textNotDataObjectArr,
                    dateNotification: dateNotDataObjectArr,
                    categoryNotification: categNotDataObjecetArr,
                    senderNotification: senderNotDataOgjectArr,
                    isHideNot: isHideNot,
                    isBannedNot: isBannedNot
                };
                updatedArrDataUnseenNot.push(addingObjArrUnseenNot);
            }
            setUpdateArrDataUnseenNotHookData(updatedArrDataUnseenNot);
        }
        setCalculateCountUnseenNotifications(0);
        setEventClickTracking(eventClickTracking + 1);
        setLoadingDataNots(false);
        if (!hideNotificationIcon) {
            if (eventClickTracking % 2 == 0) {
                setCalculateCountUnseenNotifications(0);
                setHideNotificationIcon(true);
                if (lengthArrUnseen > 0) {
                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const userNotificationDocSnapshots = await getDoc(userNotificationRef);
                    const dataUserNotifications = userNotificationDocSnapshots.data();
                    const arrayUserNotifcationsViewedDb = dataUserNotifications && dataUserNotifications.arrayUserNotifcationsViewed ? true : false;


                    for (let i = 0; i < lengthArrUnseen; i++) {
                        const objectArrDateTimeReceivingNotification = notificationsUnseen[i]?.payload[0]?.dateNotification;
                        const objectArrTextNotification = notificationsUnseen[i]?.payload[0]?.textNotification;
                        const objectArrSenderNotification = notificationsUnseen[i]?.payload[0]?.senderNotification;
                        const categNotDataObjecetArr = notificationsUnseen[i]?.payload[0]?.categoryNotification;
                        const isHideNot = notificationsUnseen[i]?.payload[0]?.isHideNot;
                        const isBannedNot = notificationsUnseen[i]?.payload[0]?.isBannedNot;

                        //dispatching and adding data db viewed notification
                        dispatch(setOperationUserNotifications({
                            type: 'ADD_NOTIFICATIONS_VIEWED',
                            payload: [
                                {
                                    isViewedNotifcation: true,
                                    dateNotification: objectArrDateTimeReceivingNotification,
                                    textNotification: objectArrTextNotification,
                                    senderNotification: objectArrSenderNotification,
                                    categoryNotification: categNotDataObjecetArr,
                                    isHideNot: isHideNot,
                                    isBannedNot: isBannedNot
                                }
                            ]
                        }));

                        const dataObjViewedArrNotificaion = {
                            isViewedNotifcation: true,
                            dateNotification: objectArrDateTimeReceivingNotification,
                            textNotification: objectArrTextNotification,
                            senderNotification: objectArrSenderNotification,
                            categoryNotification: categNotDataObjecetArr,
                            isHideNot: isHideNot,
                            isBannedNot: isBannedNot
                        }

                        if (!arrayUserNotifcationsViewedDb) {
                            const fieldName = 'arrayUserNotifcationsViewed';

                            const addArrayNotificationsViewedData = [dataObjViewedArrNotificaion];

                            const updateNotificationsField = async (email, fieldName, addArrayNotificationsViewedData) => {
                                const notificationsRef = doc(db, 'usersNotifications', email);
                                try {
                                    await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addArrayNotificationsViewedData) });
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            };
                            await updateNotificationsField(email, fieldName, addArrayNotificationsViewedData);
                        }
                        else {
                            const field = 'arrayUserNotifcationsViewed';
                            const value = [];
                            value.push(dataObjViewedArrNotificaion);

                            const userNotificationRef = doc(db, 'usersNotifications', email);
                            const setDataField = { [field]: value };

                            try {
                                await setDoc(userNotificationRef, setDataField, { merge: true })
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    //deleting data db unseen notifications and
                    //dispatching empty unseen notificatons array in action
                    const fieldName = 'arrayUserNotifcationsUnseen';

                    const deletingObjectsElsArrayNotificiatosUnseen = [];

                    const updateNotificationsField = async (email, fieldName, deletingObjectsElsArrayNotificiatosUnseen) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: deletingObjectsElsArrayNotificiatosUnseen });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsField(email, fieldName, deletingObjectsElsArrayNotificiatosUnseen);

                    dispatch(setOperationUserNotifications({ type: 'REMOVE_UNSEEN_NOTIFICATIONS' }));

                    setUpdateArrDataViewedNotHookData([]);
                    setUpdateArrDataUnseenNotHookData([]);
                }
            }
            else {
                setHideNotificationIcon(false);
            }
        }
    }
    const adaptiveSizeUnScrollNots = useCallback(() => {
        setIsNotsEqualsNull(notificationsViewed.length === 0 && notificationsUnseen.length === 0);
        setIsOneViewed(notificationsViewed.length === 1);
        setIsTwoViewed(notificationsViewed.length === 2);
        setIsOneUnseen(notificationsUnseen.length === 1);
        setIsTwoUnseen(notificationsUnseen.length === 2);
        setIsThreeViewed(notificationsViewed.length === 3);
        setIsThreeUnseen(notificationsUnseen.length === 3);
        setIsNotsEqualsLessThree(!isThreeViewed && !isThreeUnseen);

        setIsOneOrTwoNots((isOneUnseen && isTwoViewed) || (isTwoUnseen && isOneViewed));
        setIsOneOrThreeNots((isOneUnseen && isThreeViewed) || (isThreeUnseen && isOneViewed));
        setIsTwoOrThreeNots((isTwoUnseen && isThreeViewed) || (isThreeUnseen && isTwoViewed))
    }, [
        isOneViewed,
        isTwoViewed,
        isOneUnseen,
        isTwoUnseen,
        isThreeViewed,
        isThreeUnseen,
        isOneOrTwoNots,
        isTwoOrThreeNots,
        isOneOrThreeNots,
        isNotsEqualsLessThree,
        isClickHideNot,
        !hideNotificationIcon
    ]);

    useEffect(() => {
        adaptiveSizeUnScrollNots();
    }, [adaptiveSizeUnScrollNots])

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