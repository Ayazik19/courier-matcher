import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './useauth';
import { useDispatch } from 'react-redux';
import { setOperationInformErrors, setOperationUserNotifications } from '../store/slices/userSlice';
import { collection, doc, getDoc, getFirestore, setDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import { firebaseConfig } from '../firebase.js';
import {
    OverlayScrollbars,
    ScrollbarsHidingPlugin,
    SizeObserverPlugin,
    ClickScrollPlugin
} from 'overlayscrollbars';
import { useNotificationSettings } from './useNotificationSettings.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const HooksProcessingDatabaseUserNotificationsContext = createContext();

export const useHooksProcessingDatabaseUserNotificationsContext = () => {
    return useContext(HooksProcessingDatabaseUserNotificationsContext);
}

let config = {};

export const useScrollBar = (root, hasScroll) => {
    const {
        hideNotificationIcon
    } = useHookHeaderIconsEmergenceContext();

    useEffect(() => {
        let scrollBars;

        if (root.current && hasScroll && !hideNotificationIcon) {
            scrollBars = OverlayScrollbars(root.current, config)
        }

        return () => {
            if (scrollBars) {
                scrollBars.destroy();
            }
        }
    }, [root, hasScroll, !hideNotificationIcon]);
}

export const HooksProcessingDatabaseUserNotificationsProvider = ({ children }) => {
    const dispatch = useDispatch();
    const {notifications, notificationsSs} = useNotificationSettings();
    const {
        email,
        errorsInformation,
        notificationsUnseen,
        notificationsViewed,
        notificationsBanned,
    } = useAuth();

    const [checkDataChanged, setCheckDataChanged] = useState(false);

    //text notification
    const suppServicTextNotification = 'The support service has successfully solved the technical problem, you have been awarded bonuses!';

    //sender notifications
    const adminSenderNotification = 'Admin';
    const suppServicSenderNotification = 'SS Coorchik'
    const courierSenderNotification = 'Courier';

    //category notifications
    const couriersCategory = 'Couriers';
    const othersCategory = 'Others'

    const [operationChangingUpdatesInformErrosArrayHook, setOperationChangingUpdatesInformErrosArrayHook] = useState(false);
    const [isChangingUpdDataOperationBannedNot, setIsChangingUpdDataOperationBannedNot] = useState(false);

    //adding and dispatching data fixed inform errors, next create a notification receipt functionality
    useEffect(() => {
        const addUpdatesDataDb = async () => {
            const lengthErrorsArr = errorsInformation.length;
            if (lengthErrorsArr > 0) {
                for (let i = 0; i < lengthErrorsArr; i++) {
                    const idInfErr = errorsInformation[i]?.payload[0]?.idInformErrors;
                    if (idInfErr) {
                        const informErrorsDocRefOne = doc(db, "informErrors", idInfErr);
                        const informDocSnapshotsOne = await getDoc(informErrorsDocRefOne);

                        const informErrorData = informDocSnapshotsOne.data();

                        if (informErrorData && informErrorData.isFixed) {
                            const dataDataBaseIsFixedError = informErrorData.isFixed;
                            // Adding fixed inform errors doc
                            const fixedInformErrorsCollection = collection(db, 'fixedInformErrors');

                            const createDocFixedInformError = {
                                idInformErrorFixed: idInfErr,
                                dateTimeFixedInformError: new Date(),
                                emailUser: email,
                                isFixed: dataDataBaseIsFixedError,
                                textFeedBackUser: suppServicTextNotification
                            };

                            const fixedInformErrorsRef = doc(fixedInformErrorsCollection, idInfErr);
                            await setDoc(fixedInformErrorsRef, createDocFixedInformError);

                            // Deleting el inform errors in user doc, whoose was fixed 

                            const userDocRef = doc(db, "users", email);
                            const userDocSnapshots = await getDoc(userDocRef);

                            const userData = userDocSnapshots.data();
                            const bannedTypeNotifications = userData.bannedTypeNotifications;
                            const idInformErrorsArray = userData.idInformErrors;

                            const updatedArrayIdInformErrorsUser = idInformErrorsArray.filter((element) => {
                                return element !== idInfErr;
                            })

                            const fieldName = 'idInformErrors';

                            const updateUserField = async (email, fieldName, updatedArrayIdInformErrorsUser) => {
                                const userRef = doc(db, 'users', email);
                                try {
                                    await updateDoc(userRef, { [fieldName]: updatedArrayIdInformErrorsUser })
                                } catch (error) {
                                    console.log(error);
                                }
                            };

                            await updateUserField(email, fieldName, updatedArrayIdInformErrorsUser)

                            // Deleting doc in inform errors collection, whoose was fixed 
                            await deleteDoc(doc(db, "informErrors", idInfErr));

                            // operation check banned arr this type notification
                            const isCheckBannedSuppServNots = notificationsBanned.find(elements => elements === suppServicSenderNotification) ? false : true;
                            if (notificationsSs && isCheckBannedSuppServNots && notifications !== false) {
                                //dispatching and adding data db in notifications hisotry
                                const timestamp = new Date();
                                const timestampString = timestamp.toISOString();
                                const isBannedNot = false;
                                dispatch(setOperationUserNotifications({
                                    type: 'ALL_NOTIFICATIONS_HISTORY',
                                    payload: 
                                        {
                                            dateNotification: timestampString,
                                            textNotification: suppServicTextNotification,
                                            senderNotification: suppServicSenderNotification,
                                            categoryNotification: othersCategory,
                                        }
                                }))
                                const userNotificationRef = doc(db, 'usersNotifications', email);
                                const userNotificationDocSnapshots = await getDoc(userNotificationRef);
                                const dataUserNotifications = userNotificationDocSnapshots.data();
                                const arrayUserNotifcationsUnseenDb = dataUserNotifications && dataUserNotifications.arrayUserNotifcationsUnseen ? true : false;

                                const objectNotification = {
                                    dateNotification: timestampString,
                                    textNotification: suppServicTextNotification,
                                    senderNotification: suppServicSenderNotification,
                                    categoryNotification: othersCategory,
                                }
                                if (userNotificationDocSnapshots.exists()) {
                                    //adding to an existing array with notification history in the db
                                    const fieldName = 'arrayUserNotifcationsHistory';


                                    const addArrayNotificationsData = [objectNotification];

                                    const updateNotificationsField = async (email, fieldName, addArrayNotificationsData) => {
                                        const notificationsRef = doc(db, 'usersNotifications', email);
                                        try {
                                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addArrayNotificationsData) });
                                        }
                                        catch (error) {
                                            console.log(error);
                                        }
                                    };
                                    await updateNotificationsField(email, fieldName, addArrayNotificationsData);
                                }
                                else {
                                    const userNotificationsCollection = collection(db, 'usersNotifications');

                                    const createDocNotificationsHistory = {
                                        emailUser: email
                                    };

                                    const historyNotificationsRef = doc(userNotificationsCollection, email);
                                    await setDoc(historyNotificationsRef, createDocNotificationsHistory);

                                    const field = 'arrayUserNotifcationsHistory';
                                    const value = [];
                                    value.push(objectNotification);

                                    const userNotificationRef = doc(db, 'usersNotifications', email);
                                    const setDataField = { [field]: value };

                                    try {
                                        await setDoc(userNotificationRef, setDataField, { merge: true })
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                }
                                //dispatching and adding data db unseen notification
                                dispatch(setOperationUserNotifications({
                                    type: 'ADD_NOTIFICATIONS_UNSEEN',
                                    payload: [
                                        {
                                            isViewedNotifcation: false,
                                            dateNotification: timestampString,
                                            textNotification: suppServicTextNotification,
                                            senderNotification: suppServicSenderNotification,
                                            categoryNotification: othersCategory,
                                            isBannedNot: isBannedNot
                                        }
                                    ]
                                }));

                                const objectNotificationUnseen = {
                                    isViewedNotifcation: false,
                                    dateNotification: timestampString,
                                    textNotification: suppServicTextNotification,
                                    senderNotification: suppServicSenderNotification,
                                    categoryNotification: othersCategory,
                                    isBannedNot: isBannedNot
                                }

                                if (!arrayUserNotifcationsUnseenDb) {
                                    const fieldName = 'arrayUserNotifcationsUnseen';

                                    const addArrayNotificationsUnseenData = [objectNotificationUnseen];

                                    const updateNotificationsField = async (email, fieldName, addArrayNotificationsUnseenData) => {
                                        const notificationsRef = doc(db, 'usersNotifications', email);
                                        try {
                                            await updateDoc(notificationsRef, { [fieldName]: arrayUnion(...addArrayNotificationsUnseenData) });
                                        }
                                        catch (error) {
                                            console.log(error);
                                        }
                                    };
                                    await updateNotificationsField(email, fieldName, addArrayNotificationsUnseenData);
                                }
                                else {
                                    const field = 'arrayUserNotifcationsUnseen';
                                    const value = [];
                                    value.push(objectNotificationUnseen);

                                    const userNotificationRef = doc(db, 'usersNotifications', email);
                                    const setDataField = { [field]: value };

                                    try {
                                        await setDoc(userNotificationRef, setDataField, { merge: true })
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                }
                                setCheckDataChanged(true);
                            }
                            //operation if notification banned,
                            //dispatch upd data inform error action
                            else{
                                setCheckDataChanged(true);
                            }
                        }
                    }
                }
            }
        }
        addUpdatesDataDb();
    }, [errorsInformation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (checkDataChanged) {
                setOperationChangingUpdatesInformErrosArrayHook(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [checkDataChanged, isChangingUpdDataOperationBannedNot]);

    //updating array inform errors
    useEffect(() => {
        const operationChangingUpdatesInformErrosArray = async () => {
            if (operationChangingUpdatesInformErrosArrayHook) {
                const userDocRef = doc(db, "users", email);
                const userDocSnapshots = await getDoc(userDocRef);
                const userData = userDocSnapshots.data();
                const idInformErrorsArray = userData.idInformErrors || [];
                const lengthArr = idInformErrorsArray.length;

                dispatch(setOperationInformErrors({ type: 'REMOVE_INFORM_ERRORS' }));

                for (let i = 0; i < lengthArr; i++) {
                    const id = idInformErrorsArray[i];

                    const informErrorsRef = doc(db, "informErrors", id);
                    const informErrorsDocSnapshot = await getDoc(informErrorsRef);

                    if (informErrorsDocSnapshot.exists()) {
                        const data = informErrorsDocSnapshot.data();
                        const informErrorsId = data.idInformErrors;
                        const isFixedError = data.isFixed;
                        const textFeedBackError = data.textFeedBackUser;

                        dispatch(setOperationInformErrors({
                            type: 'ADD_INFORM_ERROR',
                            payload: [{
                                idInformErrors: informErrorsId,
                                isFixed: isFixedError,
                                textFeedBackUser: textFeedBackError
                            }]
                        }))
                    }
                }
            }
        }

        operationChangingUpdatesInformErrosArray();
    }, [operationChangingUpdatesInformErrosArrayHook]);


    let lengthNotificationsUnseen = notificationsUnseen && notificationsUnseen.length ? notificationsUnseen.length : 0;
    let lengthNotificationsViewed = notificationsViewed && notificationsViewed.length ? notificationsViewed.length : 0;
    const [calculateCountUnseenNotifications, setCalculateCountUnseenNotifications] = useState(0);
    const [calculateCountViewedNotifications, setCalculateCountViewedNotifications] = useState(0);


    useEffect(() => {
        setCalculateCountUnseenNotifications(lengthNotificationsUnseen);
        setCalculateCountViewedNotifications(lengthNotificationsViewed);
    },[lengthNotificationsUnseen, lengthNotificationsViewed]);


    return (
        <HooksProcessingDatabaseUserNotificationsContext.Provider
            value={{
                calculateCountUnseenNotifications, calculateCountViewedNotifications,
                setCalculateCountUnseenNotifications, setCalculateCountViewedNotifications
            }}
        >
            {children}
        </HooksProcessingDatabaseUserNotificationsContext.Provider>
    )
}