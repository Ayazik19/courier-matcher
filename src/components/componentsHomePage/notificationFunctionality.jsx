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
import { setOperationUserNotifications, setHideNotifications, setBannedNotfications, setRemoveBannedNotifications, setRemoveHideNotificaitons } from '../store/slices/userSlice.js';
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
        if (showHideNots) {
            // operation hide arr
            for (let i = 0; i < notificationsHide.length; i++) {
                dispatch(setOperationUserNotifications({
                    type: 'ADD_NOTIFICATIONS_VIEWED',
                    payload: notificationsHide[i]
                }));
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
            //operation hide arr
            for (let i = 0; i < notificationsHide.length; i++) {

                dispatch(setOperationUserNotifications({
                    type: 'ADD_NOTIFICATIONS_VIEWED',
                    payload: notificationsHide[i]
                }));
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
        if (lengthArrViewed > 0) {
            for (let i = 0; i < lengthArrViewed; i++) {
                const idObj = i + 0;
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
        if(!hideIconAddCourier || !hideContIconUserAcc || isSelectedElement) {
            setHideNotificationIcon(true);
        }
    },[hideIconAddCourier, hideContIconUserAcc, isSelectedElement]);


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
                                            <span className='text-nots-cont-1_blocks-true'>
                                                You don't have any notifications
                                            </span>
                                            <br />
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
                                        <a className='link-redirect'>
                                            Show all
                                        </a>
                                    </span>
                                </div>
                                :
                                <div className={!isNotsEqualsNull ? 'redirect-full-notifications-page_unscroll' : 'redirect-full-notifications-page_unscroll_nots-null'}>
                                    <span className='text-redirect-cont'>
                                        <a className='link-redirect'>
                                            Show all
                                        </a>
                                    </span>
                                </div>}
                        </div>
                    </div>
                </div>
                : null}
        </div>
    ) : null;
};