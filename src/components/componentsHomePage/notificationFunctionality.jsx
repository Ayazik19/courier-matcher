import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import CheckOperationNotificationsUser from './checkOperationNotificationsUser';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors';
import iconNotification from './bell.png';
import imgSsCoorchik from './imagelogoSSCoorchik.png';
import suppServiceIcon from './suppServiceIcon.png';
import iconActionNot from './iconActionNot.png';
import logoSite from './logoSite.png';
import imgBlockedNotAction from './imgBlockedNotAction.png';
import imgHideNotAction from './imgHideNotAction.png';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import './notificationFunctionality.css';
import { useAuth } from '../globalHooks/useauth';
import { useDispatch } from 'react-redux';
import { setOperationUserNotifications, setHideNotifications, setBannedNotfications, setRemoveBannedNotifications, setRemoveHideNotificaitons, setUpdNotificationsSettings } from '../store/slices/userSlice.js';
import { setUpdNotificationsSsSettings, setUpdNotificationsAdminSettings, setUpdNotificationsCouriersSettings } from '../store/slices/notificationsAgreementSlice.js';
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
        setCalculateCountUnseenNotifications,
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
        if (lengthArrViewed > 0) {
            const updatedArrDataViewedNot = [];
            for (let i = 0; i < lengthArrViewed; i++) {
                const checkTypePayloadData = notificationsViewed[i]?.payload.findObjToHideNot ? true : false;
                if (checkTypePayloadData) {
                    const textNotDataObjectArr = notificationsViewed[i]?.payload.findObjToHideNot.textNotification;
                    const dateNotDataObjectArr = notificationsViewed[i]?.payload.findObjToHideNot.dateNotification;
                    const categNotDataObjecetArr = notificationsViewed[i]?.payload.findObjToHideNot.categoryNotification;
                    const senderNotDataOgjectArr = notificationsViewed[i]?.payload.findObjToHideNot.senderNotification;
                    const isBannedNot = notificationsViewed[i]?.payload.findObjToHideNot.isBannedNot;

                    const addingObjArrViewedNot = {
                        id: i,
                        textNotification: textNotDataObjectArr,
                        dateNotification: dateNotDataObjectArr,
                        categoryNotification: categNotDataObjecetArr,
                        senderNotification: senderNotDataOgjectArr,
                        isBannedNot: isBannedNot
                    };
                    updatedArrDataViewedNot.push(addingObjArrViewedNot);
                }
                else {
                const textNotDataObjectArr = notificationsViewed[i]?.payload[0]?.textNotification;
                const dateNotDataObjectArr = notificationsViewed[i]?.payload[0]?.dateNotification;
                const categNotDataObjecetArr = notificationsViewed[i]?.payload[0]?.categoryNotification;
                const senderNotDataOgjectArr = notificationsViewed[i]?.payload[0]?.senderNotification;
                const isBannedNot = notificationsViewed[i]?.payload[0]?.isBannedNot;

                const addingObjArrViewedNot = {
                        id: i,
                    textNotification: textNotDataObjectArr,
                    dateNotification: dateNotDataObjectArr,
                    categoryNotification: categNotDataObjecetArr,
                    senderNotification: senderNotDataOgjectArr,
                    isBannedNot: isBannedNot
                };
                updatedArrDataViewedNot.push(addingObjArrViewedNot);
            }
            }
            setShowHideNots(false);
            setUpdateArrDataViewedNotHookData(updatedArrDataViewedNot);
        }
        if (lengthArrUnseen > 0) {
            const updatedArrDataUnseenNot = [];
            for (let i = 0; i < lengthArrUnseen; i++) {
                const textNotDataObjectArr = notificationsUnseen[i]?.payload[0]?.textNotification;
                const dateNotDataObjectArr = notificationsUnseen[i]?.payload[0]?.dateNotification;
                const categNotDataObjecetArr = notificationsUnseen[i]?.payload[0]?.categoryNotification;
                const senderNotDataOgjectArr = notificationsUnseen[i]?.payload[0]?.senderNotification;
                const isBannedNot = notificationsUnseen[i]?.payload[0]?.isBannedNot;

                const addingObjArrUnseenNot = {
                    id: i,
                    textNotification: textNotDataObjectArr,
                    dateNotification: dateNotDataObjectArr,
                    categoryNotification: categNotDataObjecetArr,
                    senderNotification: senderNotDataOgjectArr,
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
                //deleting data db unseen notifications and
                dispatch(setOperationUserNotifications({ type: 'REMOVE_UNSEEN_NOTIFICATIONS' }));
                setHideNotificationIcon(true);
                if (updateArrDataUnseenNotHookData.length > 0) {
                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const userNotificationDocSnapshots = await getDoc(userNotificationRef);
                    const dataUserNotifications = userNotificationDocSnapshots.data();
                    const arrayUserNotifcationsViewedDb = dataUserNotifications && dataUserNotifications.arrayUserNotifcationsViewed ? true : false;

                    for (let i = 0; i < updateArrDataUnseenNotHookData.length; i++) {
                        const objectArrDateTimeReceivingNotification = updateArrDataUnseenNotHookData[i]?.dateNotification;
                        const objectArrTextNotification = updateArrDataUnseenNotHookData[i]?.textNotification;
                        const objectArrSenderNotification = updateArrDataUnseenNotHookData[i].senderNotification;
                        const categNotDataObjecetArr = updateArrDataUnseenNotHookData[i].categoryNotification;
                        const isBannedNot = updateArrDataUnseenNotHookData[i].isBannedNot;

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

                    setUpdateArrDataViewedNotHookData([]);
                    setUpdateArrDataUnseenNotHookData([]);
                }
            }
            else {
                setHideNotificationIcon(false);
            }
        }
    }


    const [operationDataUpdNotViewed, setOperationDataUpdNotViewed] = useState(null);
    const [operationDataUpdNotUnseen, setOperationDataUpdNotUnseen] = useState(null);

    const [saveHideDataNotObjHook, setSaveHideDataNotObjHook] = useState(false);

    const [isClickHideNot, setIsClickHideNot] = useState(false);

    useEffect(() => {
        const displayDataNotViewed = (updateArrDataViewedNotHookData.map((notification, index) => {
            const senderIsSs = notification.senderNotification === 'SS Coorchik';

            const createdAtMoment = moment(notification.dateNotification);
            let formattedDate = '';
            if (createdAtMoment.isSame(moment(), 'day')) {
                formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
            } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
                formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
            } else {
                formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
            }



            const handleOperationHideNot = async (idNot) => {
                setIsClickHideNot(true);
                const userNotsDocRef = doc(db, 'usersNotifications', email);
                const userNotsDocSnapshot = await getDoc(userNotsDocRef);
                const dataUsersNots = userNotsDocSnapshot.data();

                const findObjToHideNot = updateArrDataViewedNotHookData.find(item => item.id === idNot);
                const filteredArrViewed = updateArrDataViewedNotHookData.filter(item => item.id !== idNot);

                setUpdateArrDataViewedNotHookData(filteredArrViewed);
                setSaveHideDataNotObjHook(findObjToHideNot);
                dispatch(setOperationUserNotifications({
                    type: 'REMOVE_VIEWED_NOTIFICATIONS',
                    payload: {}
                }));
                const field = 'arrayUserNotifcationsViewed';
                const value = [];

                const userNotificationRef = doc(db, 'usersNotifications', email);
                const setDataField = { [field]: value };

                try {
                    await setDoc(userNotificationRef, setDataField, { merge: true })
                }
                catch (error) {
                    console.log(error);
                }
                // adding new data viewed nots in action and db
                for (let i = 0; i < filteredArrViewed.length; i++) {
                    const textNotDataObjectArr = filteredArrViewed[i]?.textNotification;
                    const dateNotDataObjectArr = filteredArrViewed[i]?.dateNotification;
                    const categNotDataObjecetArr = filteredArrViewed[i]?.categoryNotification;
                    const senderNotDataOgjectArr = filteredArrViewed[i]?.senderNotification;
                    const isBannedNot = filteredArrViewed[i]?.isBannedNot;

                    dispatch(setOperationUserNotifications({
                        type: 'ADD_NOTIFICATIONS_VIEWED',
                        payload: [
                            {
                                textNotification: textNotDataObjectArr,
                                dateNotification: dateNotDataObjectArr,
                                categoryNotification: categNotDataObjecetArr,
                                senderNotification: senderNotDataOgjectArr,
                                isBannedNot: isBannedNot
                            }
                        ]
                    }))
                    const objViewedAction = {
                        textNotification: textNotDataObjectArr,
                        dateNofification: dateNotDataObjectArr,
                        categoryNotification: categNotDataObjecetArr,
                        senderNotification: senderNotDataOgjectArr,
                        isBannedNot: isBannedNot
                    };
                    const fieldName = 'arrayUserNotifcationsViewed';

                    const updateDataNotViewed = [objViewedAction];


                    const updateNotificationsArrHideField = async (email, fieldName, updateDataNotViewed) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...updateDataNotViewed) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, updateDataNotViewed);
                }
                const arrHideNots = dataUsersNots.arrHideNots ? true : false;
                if (arrHideNots) {
                    const fieldName = 'arrHideNots';

                    const addDataHideNot = [findObjToHideNot];

                    const updateNotificationsArrHideField = async (email, fieldName, addDataHideNot) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addDataHideNot) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, addDataHideNot);
                }
                else {
                    const field = 'arrHideNots';
                    const value = [];
                    value.push(findObjToHideNot);

                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const setDataField = { [field]: value };

                    try {
                        await setDoc(userNotificationRef, setDataField, { merge: true })
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                dispatch(setHideNotifications({ findObjToHideNot }));
                adaptiveSizeUnScrollNots();
            }

            const handleOperationBanningNot = async (idNot) => {
                const userNotsDocRef = doc(db, 'usersNotifications', email);
                const userNotsDocSnapshot = await getDoc(userNotsDocRef);
                const dataUsersNots = userNotsDocSnapshot.data();

                const filteredArrViewed = updateArrDataViewedNotHookData.filter(item => item.id !== idNot);
                const findObjIdToBanned = updateArrDataViewedNotHookData.find(item => item.id === idNot);

                let removeSenderSsNots;

                if (findObjIdToBanned && findObjIdToBanned.senderNotification === 'SS Coorchik') {
                    removeSenderSsNots = filteredArrViewed.filter(item => item.senderNotification !== 'SS Coorchik');
                }

                setSaveHideDataNotObjHook(findObjIdToBanned);


                dispatch(setOperationUserNotifications({
                    type: 'REMOVE_VIEWED_NOTIFICATIONS',
                    payload: {}
                }));

                const field = 'arrayUserNotifcationsViewed';
                const value = [];
                const userNotificationRef = doc(db, 'usersNotifications', email);
                const setDataField = { [field]: value };
                try {
                    await setDoc(userNotificationRef, setDataField, { merge: true })
                }
                catch (error) {
                    console.log(error);
                }

                // adding new data viewed nots in action and db
                if (removeSenderSsNots.length > 0) {
                    for (let i = 0; i < removeSenderSsNots.length; i++) {
                        const textNotDataObjectArr = removeSenderSsNots[i]?.textNotification;
                        const dateNotDataObjectArr = removeSenderSsNots[i]?.dateNotification;
                        const categNotDataObjecetArr = removeSenderSsNots[i]?.categoryNotification;
                        const senderNotDataOgjectArr = removeSenderSsNots[i]?.senderNotification;
                        const isBannedNot = removeSenderSsNots[i]?.isBannedNot;
                    dispatch(setOperationUserNotifications({
                        type: 'ADD_NOTIFICATIONS_VIEWED',
                        payload: [
                            {
                                textNotification: textNotDataObjectArr,
                                dateNotification: dateNotDataObjectArr,
                                categoryNotification: categNotDataObjecetArr,
                                senderNotification: senderNotDataOgjectArr,
                                isBannedNot: isBannedNot
                            }
                        ]
                    }))
                    const objViewedAction = {
                        textNotification: textNotDataObjectArr,
                        dateNofification: dateNotDataObjectArr,
                        categoryNotification: categNotDataObjecetArr,
                        senderNotification: senderNotDataOgjectArr,
                        isBannedNot: isBannedNot
                    };
                    const fieldName = 'arrayUserNotifcationsViewed';

                    const updateDataNotViewed = [objViewedAction];


                    const updateNotificationsArrHideField = async (email, fieldName, updateDataNotViewed) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...updateDataNotViewed) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, updateDataNotViewed);
                    }
                }
                else {
                    setUpdateArrDataViewedNotHookData([]);
                }
                const arrBannedNots = dataUsersNots.arrBannedNots ? true : false;
                if (arrBannedNots) {
                    const fieldName = 'arrBannedNots';

                    const addDataBannedNot = [notification.senderNotification];

                    const updateNotificationsArrHideField = async (email, fieldName, addDataBannedNot) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addDataBannedNot) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, addDataBannedNot);
                }
                else {
                    const field = 'arrBannedNots';
                    const value = [];
                    value.push(notification.senderNotification);

                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const setDataField = { [field]: value };

                    try {
                        await setDoc(userNotificationRef, setDataField, { merge: true })
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                const fieldSettinsNot = 'notificationsSs';
                const valueSettingsNot = false;
                
                const updateNotificationsSettingsField = async (email, fieldSettinsNot, valueSettingsNot) => {
                    const notificationsRef = doc(db, 'usersNotifications', email);
                    try {
                        await updateDoc(notificationsRef, { [fieldSettinsNot]: valueSettingsNot });
                    }
                    catch (error) {
                        console.log(error);
                    }
                };
                await updateNotificationsSettingsField(email, fieldSettinsNot, valueSettingsNot);
                dispatch(setUpdNotificationsSsSettings(false));
                dispatch(setBannedNotfications(notification.senderNotification));
                adaptiveSizeUnScrollNots();
            }

            return (
                <div>
                    <div className='user-notification_sender-supp-serv' key={index}>
                        {senderIsSs ?
                            (
                                <>
                                    <div className='user-notification_sender-supp-serv' key={index}>
                                        <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                        <div className='sender-not-departm'>
                                            <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                        </div>
                                        <div className='text-nofication-cont'>
                                            <span className='text-notification_sender-supp-serv'>
                                                The support service has successfully solved the technical
                                                problem, you have been awarded bonuses!
                                            </span>
                                            <br></br>
                                            <span className='date-notification'>{formattedDate}</span>
                                        </div>
                                        <div className='actions-not'>
                                            <img src={iconActionNot} className='img-action-not' />
                                        </div>
                                        <div className='nots-action'>
                                            <div className='element-list-actions'></div>
                                            <div className='list-actions'>
                                                <div className='action_hide-not' onClick={() => handleOperationHideNot(notification.id)}>
                                                    <img src={imgHideNotAction} className='icon-hide-not-action' alt='hide notification' />
                                                    <span className='action-text'>
                                                        Hide
                                                    </span>
                                                </div>
                                                <div className='action_do-not-notify' onClick={() => handleOperationBanningNot(notification.id)}>
                                                    <img src={imgBlockedNotAction} className='icon-blocked-not-action' alt='banned notification' />
                                                    <span className='action-text'>
                                                        Do not notify
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            : null}
                    </div>
                </div>
            );
        }).reverse());

        const displayDataNotUnseen = (updateArrDataUnseenNotHookData.map((notification, index) => {
            const senderIsSs = notification.senderNotification === 'SS Coorchik';

            const createdAtMoment = moment(notification.dateNotification);
            let formattedDate = '';
            if (createdAtMoment.isSame(moment(), 'day')) {
                formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
            } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
                formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
            } else {
                formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
            }


            const handleOperationHideNot = async (idNot) => {
                setIsClickHideNot(true);
                const userNotsDocRef = doc(db, 'usersNotifications', email);
                const userNotsDocSnapshot = await getDoc(userNotsDocRef);
                const dataUsersNots = userNotsDocSnapshot.data();
                
                const findObjToHideNot = updateArrDataUnseenNotHookData.find(item => item.id === idNot);
                const filteredArrUnseen = updateArrDataUnseenNotHookData.filter(item => item.id !== idNot);

                setUpdateArrDataUnseenNotHookData(filteredArrUnseen);
                setSaveHideDataNotObjHook(findObjToHideNot);
                dispatch(setOperationUserNotifications({
                    type: 'REMOVE_UNSEEN_NOTIFICATIONS',
                    payload: {}
                }));
                const field = 'arrayUserNotifcationsUnseen';
                const value = [];

                const userNotificationRef = doc(db, 'usersNotifications', email);
                const setDataField = { [field]: value };

                try {
                    await setDoc(userNotificationRef, setDataField, { merge: true })
                }
                catch (error) {
                    console.log(error);
                }
                // adding new data viewed nots in action and db
                for (let i = 0; i < filteredArrUnseen.length; i++) {
                    const textNotDataObjectArr = filteredArrUnseen[i]?.textNotification;
                    const dateNotDataObjectArr = filteredArrUnseen[i]?.dateNotification;
                    const categNotDataObjecetArr = filteredArrUnseen[i]?.categoryNotification;
                    const senderNotDataOgjectArr = filteredArrUnseen[i]?.senderNotification;
                    const isBannedNot = filteredArrUnseen[i]?.isBannedNot;
                    dispatch(setOperationUserNotifications({
                        type: 'ADD_NOTIFICATIONS_UNSEEN',
                        payload: [
                            {
                                textNotification: textNotDataObjectArr,
                                dateNotification: dateNotDataObjectArr,
                                categoryNotification: categNotDataObjecetArr,
                                senderNotification: senderNotDataOgjectArr,
                                isBannedNot: isBannedNot
                            }
                        ]
                    }))
                    const objUnseenAction = {
                        textNotification: textNotDataObjectArr,
                        dateNofification: dateNotDataObjectArr,
                        categoryNotification: categNotDataObjecetArr,
                        senderNotification: senderNotDataOgjectArr,
                        isBannedNot: isBannedNot
                    };
                    const fieldName = 'arrayUserNotifcationsUnseen';

                    const updateDataNotUnseen = [objUnseenAction];


                    const updateNotificationsArrHideField = async (email, fieldName, updateDataNotUnseen) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...updateDataNotUnseen) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, updateDataNotUnseen);
                }
                console.log('findObjToHideNot', findObjToHideNot);
                const arrHideNots = dataUsersNots.arrHideNots ? true : false;
                if (arrHideNots) {
                    const fieldName = 'arrHideNots';

                    const addDataHideNot = [findObjToHideNot];

                    const updateNotificationsArrHideField = async (email, fieldName, addDataHideNot) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addDataHideNot) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, addDataHideNot);
                }
                else {
                    const field = 'arrHideNots';
                    const value = [];
                    value.push(findObjToHideNot);

                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const setDataField = { [field]: value };

                    try {
                        await setDoc(userNotificationRef, setDataField, { merge: true })
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                dispatch(setHideNotifications({ findObjToHideNot }));
            }

            const handleOperationBanningNot = async (idNot) => {
                const userNotsDocRef = doc(db, 'usersNotifications', email);
                const userNotsDocSnapshot = await getDoc(userNotsDocRef);
                const dataUsersNots = userNotsDocSnapshot.data();

                const filteredArrUnseen = updateArrDataUnseenNotHookData.filter(item => item.id !== idNot)
                const findObjIdToBanned = updateArrDataUnseenNotHookData.find(item => item.id === idNot);

                let removeSenderSsNots;

                if (findObjIdToBanned && findObjIdToBanned.senderNotification === 'SS Coorchik') {
                    removeSenderSsNots = filteredArrUnseen.filter(item => item.senderNotification !== 'SS Coorchik');
                }
                setSaveHideDataNotObjHook(findObjIdToBanned);

                dispatch(setOperationUserNotifications({
                    type: 'REMOVE_UNSEEN_NOTIFICATIONS',
                    payload: {}
                }));

                const field = 'arrayUserNotifcationsUnseen';
                const value = [];
                const userNotificationRef = doc(db, 'usersNotifications', email);
                const setDataField = { [field]: value };
                try {
                    await setDoc(userNotificationRef, setDataField, { merge: true })
                }
                catch (error) {
                    console.log(error);
                }

                // adding new data viewed nots in action and db
                if (removeSenderSsNots.length > 0) {
                    for (let i = 0; i < removeSenderSsNots.length; i++) {
                        const textNotDataObjectArr = removeSenderSsNots[i]?.textNotification;
                        const dateNotDataObjectArr = removeSenderSsNots[i]?.dateNotification;
                        const categNotDataObjecetArr = removeSenderSsNots[i]?.categoryNotification;
                        const senderNotDataOgjectArr = removeSenderSsNots[i]?.senderNotification;
                        const isBannedNot = removeSenderSsNots[i]?.isBannedNot;
                    dispatch(setOperationUserNotifications({
                        type: 'ADD_NOTIFICATIONS_UNSEEN',
                        payload: [
                            {
                                textNotification: textNotDataObjectArr,
                                dateNotification: dateNotDataObjectArr,
                                categoryNotification: categNotDataObjecetArr,
                                senderNotification: senderNotDataOgjectArr,
                                isBannedNot: isBannedNot
                            }
                        ]
                    }))
                    const objViewedAction = {
                        textNotification: textNotDataObjectArr,
                        dateNofification: dateNotDataObjectArr,
                        categoryNotification: categNotDataObjecetArr,
                        senderNotification: senderNotDataOgjectArr,
                        isBannedNot: isBannedNot
                    };
                    const fieldName = 'arrayUserNotifcationsUnseen';

                    const updateDataNotUnseen = [objViewedAction];


                    const updateNotificationsArrHideField = async (email, fieldName, updateDataNotUnseen) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...updateDataNotUnseen) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, updateDataNotUnseen);
                    }
                }
                else {
                    setUpdateArrDataUnseenNotHookData([]);
                }
                const arrBannedNots = dataUsersNots.arrBannedNots ? true : false;
                if (arrBannedNots) {
                    const fieldName = 'arrBannedNots';

                    const addDataBannedNot = [notification.senderNotification];

                    const updateNotificationsArrHideField = async (email, fieldName, addDataBannedNot) => {
                        const notificationsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addDataBannedNot) });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    };
                    await updateNotificationsArrHideField(email, fieldName, addDataBannedNot);
                }
                else {
                    const field = 'arrBannedNots';
                    const value = [];
                    value.push(notification.senderNotification);

                    const userNotificationRef = doc(db, 'usersNotifications', email);
                    const setDataField = { [field]: value };

                    try {
                        await setDoc(userNotificationRef, setDataField, { merge: true })
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                const fieldSettinsNot = 'notificationsSs';
                const valueSettingsNot = false;
                
                const updateNotificationsSettingsField = async (email, fieldSettinsNot, valueSettingsNot) => {
                    const notificationsRef = doc(db, 'usersNotifications', email);
                    try {
                        await updateDoc(notificationsRef, { [fieldSettinsNot]: valueSettingsNot });
                    }
                    catch (error) {
                        console.log(error);
                    }
                };
                await updateNotificationsSettingsField(email, fieldSettinsNot, valueSettingsNot);
                dispatch(setUpdNotificationsSsSettings(false));
                dispatch(setBannedNotfications(notification.senderNotification));
            }

            return (
                <div>
                    <div className='user-notification-unseen_sender-supp-serv' key={index}>
                        {senderIsSs ?
                            (
                                <>
                                    <div className='user-notification_sender-supp-serv' key={index}>
                                        <img src={imgSsCoorchik} className='img-notification_sender-supp-serv' />
                                        <div className='sender-not-departm'>
                                            <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                        </div>
                                        <div className='text-nofication-cont'>
                                            <span className='text-notification_sender-supp-serv'>
                                                The support service has successfully solved the technical
                                                problem, you have been awarded bonuses!
                                            </span>
                                            <br></br>
                                            <span className='date-notification'>{formattedDate}</span>
                                        </div>
                                        <div className='actions-not'>
                                            <img src={iconActionNot} className='img-action-not' />
                                        </div>
                                        <div className='nots-action'>
                                            <div className='element-list-actions'></div>
                                            <div className='list-actions'>
                                                <div className='action_hide-not' onClick={() => handleOperationHideNot(notification.id)}>
                                                    <img src={imgHideNotAction} className='icon-hide-not-action' alt='hide notification' />
                                                    <span className='action-text'>
                                                        Hide
                                                    </span>
                                                </div>
                                                <div className='action_do-not-notify' onClick={() => handleOperationBanningNot(notification.id)}>
                                                    <img src={imgBlockedNotAction} className='icon-blocked-not-action' alt='banned notification' />
                                                    <span className='action-text'>
                                                        Do not notify
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            : null}
                    </div>
                </div>
            );
        }).reverse());

        setOperationDataUpdNotViewed(displayDataNotViewed);
        setOperationDataUpdNotUnseen(displayDataNotUnseen);
    }, [updateArrDataViewedNotHookData, updateArrDataUnseenNotHookData])

    const [isNotsEqualsNull, setIsNotsEqualsNull] = useState(false);
    const [isOneViewed, setIsOneViewed] = useState(false);
    const [isTwoViewed, setIsTwoViewed] = useState(false);
    const [isOneUnseen, setIsOneUnseen] = useState(false);
    const [isTwoUnseen, setIsTwoUnseen] = useState(false);
    const [isThreeViewed, setIsThreeViewed] = useState(false);
    const [isThreeUnseen, setIsThreeUnseen] = useState(false);
    const [isOneOrTwoNots, setIsOneOrTwoNots] = useState(false);
    const [isOneOrThreeNots, setIsOneOrThreeNots] = useState(false);
    const [isTwoOrThreeNots, setIsTwoOrThreeNots] = useState(false);
    const [isNotTypeBanned, setisNotTypeBanned] = useState(false);

    const [isNotsEqualsLessThree, setIsNotsEqualsLessThree] = useState(false);

    const [showHideNots, setShowHideNots] = useState(false);
    const [showBannedNots, setShowBannedNots] = useState(false);
    const [showAllTypesblockedots, setShowAllTypesblockedots] = useState(false);

    //display adaptive nots
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
        hideNotificationIcon,
        !hideNotificationIcon
    ]);

    useEffect(() => {
        adaptiveSizeUnScrollNots();
    }, [adaptiveSizeUnScrollNots])

    //data creating scrollbar
    const hasScrollCountViewed = calculateCountViewedNotifications > 3;
    const hasScrollCountUnseen = calculateCountUnseenNotifications > 3;
    const hasScrollOperation = (hasScrollCountViewed || hasScrollCountUnseen) || (calculateCountViewedNotifications >= 3 && calculateCountUnseenNotifications >= 3);

    const hasScroll = (hasScrollOperation && isNotsEqualsLessThree) || (isOneOrThreeNots || isTwoOrThreeNots);

    const scrollBarNot = useRef(null);
    useScrollBar(scrollBarNot, hasScroll)

    useEffect(() => {
        const loadingNewDataActionNot = async () => {
            if (showBannedNots || showAllTypesblockedots || showHideNots) {
                setLoadingDataNots(true);
                if (showHideNots) {
                    // transferring restoring data from hide arr to viewed
                    for (let i = 0; i < notificationsHide.length; i++) {
                        const idObj = notificationsHide[i];
                        dispatch(setOperationUserNotifications({
                            type: 'ADD_NOTIFICATIONS_VIEWED',
                            payload: idObj
                        }));

                        const fieldViwedArr = 'arrayUserNotifcationsViewed';
                        const newValueViewedArr = [idObj];

                        const updNotArrViewedfield = async (email, fieldViwedArr, newValueViewedArr) => {
                            const userDocNotsRef = doc(db, 'usersNotifications', email);
                            try {
                                await updateDoc(userDocNotsRef, { [fieldViwedArr]: arrayUnion(...newValueViewedArr) })
                            }
                            catch (error) {
                                console.log(error);
                            };
                        }
                        await updNotArrViewedfield(email, fieldViwedArr, newValueViewedArr);
                    }
                    const fieldHideArr = 'arrHideNots';
                    const newValueHideArr = [];
        
                    const updNotArrHidefield = async (email, fieldHideArr, newValueHideArr) => {
                        const userDocNotsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(userDocNotsRef, { [fieldHideArr]: newValueHideArr })
                        }
                        catch (error) {
                            console.log(error);
                        };
                    }
                    await updNotArrHidefield(email, fieldHideArr, newValueHideArr);
                    dispatch(setRemoveHideNotificaitons());
                    setShowHideNots(false);
                }
                if (showBannedNots) {
                    // operation banned arr
                    const fieldBannedArr = 'arrBannedNots';
                    const newValueBannedArr = [];
        
                    const updNotArrBannedfield = async (email, fieldBannedArr, newValueBannedArr) => {
                        const userDocNotsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(userDocNotsRef, { [fieldBannedArr]: newValueBannedArr })
                        }
                        catch (error) {
                            console.log(error);
                        };
                    }
                    await updNotArrBannedfield(email, fieldBannedArr, newValueBannedArr);
                    dispatch(setRemoveBannedNotifications());
                    const fieldSettinпsSsNot = 'notificationsSs';
const fieldSettinsCouriersNot = 'notificationsSs';
const fieldSettinsAdminNot = 'notificationsSs';
const valueSettingsNot = true;

const updateNotificationsSettingsField = async (email, fieldSettinпsSsNot, valueSettingsNot) => {
    const notificationsRef = doc(db, 'usersNotifications', email);
    try {
        await updateDoc(notificationsRef, { [fieldSettinпsSsNot]: valueSettingsNot });
        await updateDoc(notificationsRef, { [fieldSettinsCouriersNot]: valueSettingsNot });
        await updateDoc(notificationsRef, { [fieldSettinsAdminNot]: valueSettingsNot });
    } catch (error) {
        console.log(error);
    }
};

await updateNotificationsSettingsField(email, fieldSettinпsSsNot, valueSettingsNot);
                    dispatch(setUpdNotificationsSsSettings(true));
                    dispatch(setUpdNotificationsAdminSettings(true));
                    dispatch(setUpdNotificationsCouriersSettings(true));
                    setShowBannedNots(false);
                }
                if (showAllTypesblockedots) {
                    // operation banned arr

                    const fieldBannedArr = 'arrBannedNots';
                    const newValueBannedArr = [];
        
                    const updNotArrBannedfield = async (email, fieldBannedArr, newValueBannedArr) => {
                        const userDocNotsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(userDocNotsRef, { [fieldBannedArr]: newValueBannedArr })
                        }
                        catch (error) {
                            console.log(error);
                        };
                    }
                    await updNotArrBannedfield(email, fieldBannedArr, newValueBannedArr);
                    setShowAllTypesblockedots(false);
                    dispatch(setRemoveBannedNotifications());
                    dispatch(setUpdNotificationsSsSettings(true));
                    dispatch(setUpdNotificationsAdminSettings(true));
                    dispatch(setUpdNotificationsCouriersSettings(true));

                    // transferring restoring data from hide arr to viewed
                    for (let i = 0; i < notificationsHide.length; i++) {
                        const idObj = notificationsHide[i];
                        dispatch(setOperationUserNotifications({
                            type: 'ADD_NOTIFICATIONS_VIEWED',
                            payload: idObj
                        }));

                        const fieldViwedArr = 'arrayUserNotifcationsViewed';
                        const newValueViewedArr = [idObj];

                        const updNotArrViewedfield = async (email, fieldViwedArr, newValueViewedArr) => {
                            const userDocNotsRef = doc(db, 'usersNotifications', email);
                            try {
                                await updateDoc(userDocNotsRef, { [fieldViwedArr]: arrayUnion(...newValueViewedArr) })
                            }
                            catch (error) {
                                console.log(error);
                            };
                        }
                        await updNotArrViewedfield(email, fieldViwedArr, newValueViewedArr);
                    }
                    const fieldHideArr = 'arrHideNots';
                    const newValueHideArr = [];
        
                    const updNotArrHidefield = async (email, fieldHideArr, newValueHideArr) => {
                        const userDocNotsRef = doc(db, 'usersNotifications', email);
                        try {
                            await updateDoc(userDocNotsRef, { [fieldHideArr]: newValueHideArr })
                        }
                        catch (error) {
                            console.log(error);
                        };
                    }
                    await updNotArrHidefield(email, fieldHideArr, newValueHideArr);
                    dispatch(setRemoveHideNotificaitons());
                    setShowAllTypesblockedots(false);
                }   
                setLoadingDataNots(false);
            }
        }
        loadingNewDataActionNot();
        handleShowContNotifications();
    }, [showBannedNots, showAllTypesblockedots, showHideNots])

    useEffect(() => {
        if (!hideIconAddCourier || !hideContIconUserAcc || isSelectedElement) {
            setHideNotificationIcon(true);
        }
    }, [hideIconAddCourier, hideContIconUserAcc, isSelectedElement]);


    return isAuth ? (
        <div>
            <div className='icon-notification' onClick={handleShowContNotifications}>
                <img src={iconNotification} className='img-icon-notifcation' />
                <CheckOperationNotificationsUser />
            </div>
            {!hideNotificationIcon ?
                <div>
                    <div className='nav-cont-notifications-user'>
                        <div className='cont-notifications'>
                            <div className={lengthArrUnseen < 0 ? 'header-cont-nofications_uns-equal-null' : 'header-cont-nofications'}>
                                <div className={lengthArrUnseen === 0 ? 'header-text-cont_uns-equal-null' : 'header-text-cont'}>
                                    <span className='text-cont-notification_left'>
                                        {lengthArrUnseen > 0 ? 'New' : 'Your'} {lengthArrUnseen > 1 || lengthArrViewed > 1 ? 'notifications' : 'notification'}
                                    </span>
                                    <span className={lengthArrUnseen > 1 || lengthArrViewed > 1 ? 'text-cont-notification_left_new-nots-center' : 'text-cont-notification_left_center'}>
                                        {checkNots ? '.' : null}
                                    </span>
                                    <span className='text-cont-notification-2_left'>
                                        {lengthArrUnseen > 0 && lengthArrViewed === 0 ? 'Unseen' : null}
                                        {lengthArrViewed > 0 && lengthArrUnseen === 0 ? 'Viewed' : null}
                                        {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Unseen' : null}
                                    </span>
                                    <span className={checkNots ? 'text-cont-notification_right' : 'text-cont-notification_right-nots-undefined'}>
                                        Settings
                                    </span>
                                    {isNotTypeBanned && isNotsEqualsNull ?
                                        <div className='header-cont-line_blocked-true'>
                                        </div>
                                        : null}
                                    {isNotsEqualsNull ?
                                        <div className='header-cont-line_blocked-true'>
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {isLoadingDataNots ?
                                <div className='cont-loading-data-nots'>
                                    <div class="loader-nots"></div>
                                </div>
                                : null}
                            {hasScroll && !isLoadingDataNots ?
                                <div className={lengthArrUnseen > 0 ? 'notification_true-scroll_new-uns' : 'notification_true-scroll'} ref={scrollBarNot}>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                    <div className='footer-cont-hints-nots_true-scroll'>
                                        <div className='footer-cont-nots_left'>
                                            <span className='footer-nots-text-1'>
                                                <span>you can disable</span><br />
                                                <span>or hide the notification</span><br />
                                                <span>when you hover</span><br />
                                            </span>
                                        </div>
                                        <div className='footer-cont-nots_center'>
                                            <img src={logoSite} alt='logo coorchik' className='footer-img-nots_logo' />
                                        </div>
                                        <div className='footer-cont-nots_right'>
                                            <span className='footer-nots-text-2'>
                                                <span>you can view</span><br />
                                                <span>the list of notifications</span><br />
                                                <span>in the
                                                    <Link className='link-redirect-settings-nots-page'>
                                                        ﾠsettings
                                                    </Link>
                                                </span><br />
                                            </span>
                                        </div>
                                    </div>
                                </div> : null}
                            {isOneUnseen && !hasScroll && !isOneViewed && !isOneOrTwoNots && !isLoadingDataNots ?
                                <div className='notification_true_one-not'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isOneViewed && !hasScroll && !isOneUnseen && !isOneOrTwoNots && !isLoadingDataNots ?
                                <div className='notification_true_one-not'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isTwoUnseen && !hasScroll && !isOneOrTwoNots && !isTwoViewed && !isLoadingDataNots ?
                                <div className='notifcation_true_two-nots'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isTwoViewed && !hasScroll && !isOneOrTwoNots && !isTwoUnseen && !isLoadingDataNots ?
                                <div className='notifcation_true_two-nots'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isThreeViewed && !hasScroll && !isLoadingDataNots ?
                                <div className='notifcation_true_three-nots'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isThreeUnseen && !isThreeViewed && !hasScroll && !isLoadingDataNots ?
                                <div className='notifcation_true_three-nots'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isOneUnseen && isOneViewed && !isOneOrTwoNots && !hasScroll && !isLoadingDataNots ?
                                <div className='notifcation_true_couple-nots-equls-one'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isTwoUnseen && isTwoViewed && !hasScroll && !isLoadingDataNots ?
                                <div className='notifcation_true_couple-nots-equls-two'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isOneOrTwoNots && !isLoadingDataNots ?
                                <div className='notifcation_true_one-uns-or-two-view-nots'>
                                    <div className='main-cont-notifications_unviewed-notifications'>
                                        {operationDataUpdNotUnseen}
                                    </div>
                                    <div className='main-cont-notifications_viewed-notifications'>
                                        <div className={lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'header-cont-nofications_viewed-notifications' : 'header-cont-nofications_viewed-notifications_uns-equal-null'}>
                                            <div className='header-text-cont'>
                                                <span className='text-cont-notification_left'>
                                                    {lengthArrViewed > 0 && lengthArrUnseen > 0 ? 'Viewed' : null}
                                                </span>
                                            </div>
                                            {operationDataUpdNotViewed}
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {isNotsEqualsNull ?
                                <div className={notificationsHide.length === 0 && notificationsBanned.length === 0 ? 'notifcation_false_equals-null' : 'notifcation_false_equals-null_blocked-type-nots-true'}>
                                    {notificationsHide.length > 0 || notificationsBanned.length > 0 ?
                                        <div className='nots-cont_blocks-true'>
                                            <span className='text-nots-cont-2_blocks-true'>
                                                {notificationsHide.length > 0 && notificationsBanned.length === 0 ?
                                                    <div>
                                                        <span className='text-nots-cont-2_text-1'>
                                                            You have {notificationsHide.length} hidden notification{notificationsHide.length > 0 ? 's' : null}
                                                        </span>
                                                        <br />
                                                        <span className='notifications-hide-recovery' onClick={() => (setShowHideNots(true))}>
                                                            Restore all hidden ones
                                                        </span>
                                                    </div>
                                                    : null}
                                                {notificationsHide.length === 0 && notificationsBanned.length > 0 ?
                                                    <div>
                                                        <span className='text-nots-cont-2_text-2' >
                                                            You have {notificationsBanned.length} blocked notification{notificationsBanned.length > 0 ? 's' : null}
                                                        </span>
                                                        <span className='notifications-banned-recovery' onClick={() => (setShowBannedNots(true))}>
                                                            Restore all blocked ones
                                                        </span>
                                                    </div>
                                                    : null}
                                                {notificationsHide.length > 0 && notificationsBanned.length > 0 ?
                                                    <div>
                                                        <span className='text-nots-cont-2_text-3'>
                                                            You have {notificationsHide.length} hide, {notificationsBanned.length} blocked notifications
                                                        </span>
                                                        <span className='all-types-blocked-nots-recovery'>
                                                            Restore all <p className='click-action-not' onClick={() => (setShowHideNots(true))}>hidden</p>, <p className='click-action-not' onClick={() => (setShowBannedNots(true))}>blocked</p> ones or <p className='click-action-not' onClick={() => setShowAllTypesblockedots(true)}>all</p>
                                                        </span>
                                                    </div>
                                                    : null}
                                            </span>
                                        </div>
                                        :
                                        <div className='nots-cont_blocks-false'>
                                            <span className='text-nots-cont_blocks-false'>
                                                You don't have any notifications
                                            </span>
                                        </div>
                                    }
                                </div>
                                : null}
                            {hasScroll && !isLoadingDataNots ?
                                <div className='redirect-full-notifications-page'>
                                    <span className='text-redirect-cont'>
                                        <Link to='/Notifications-hisory' className='link-redirect'>
                                            Show all
                                        </Link>
                                    </span>
                                </div>
                                :
                                <div className={!isNotsEqualsNull ? 'redirect-full-notifications-page_unscroll' : 'redirect-full-notifications-page_unscroll_nots-null'}>
                                    <span className='text-redirect-cont'>
                                        <Link to='/Notifications-hisory' className='link-redirect'>
                                            Show all
                                        </Link>
                                    </span>
                                </div>}
                        </div>
                    </div>
                </div>
                : null}
        </div>
    ) : null;
};