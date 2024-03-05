import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { setUser, setOperationInformErrors, setUserProfile, setOperationUserNotifications, setHideNotifications, setBannedNotfications } from '../store/slices/userSlice.js';
import { setUserNotificationsSettings } from '../store/slices/notificationsAgreementSlice.js';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './signInPage.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import LoadingDataForm from '../loadingData/loadingDataForm';
import logoSite from '../componentsHomePage/logoSite.png';
import FooterForm from '../componentsRegistrationPage/FooterForm.jsx'
import SignInUserOnlyPassPage from './signInUserOnlyPassPage.jsx';
import { useAuth } from '../globalHooks/useauth';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';
import { useHookSignInPagesContext } from './useHookSignInPages.js';
import { setActionFilteredNots, setFilterActionNots } from '../store/slices/filteredHistoryNotSlice.js';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function SignInPage() {
    const [isLoadingData, setLoadingData] = useState(false);
    const [isErrorUserData, setIsErrorUserData] = useState(false);
    const [isBackRegister, setIsBackRegister] = useState(false);

    const handleBackRegister = () => {
        setIsBackRegister(true);
    }

    const { isAuth } = useAuth();
    const { register, handleSubmit } = useForm({ mode: 'onChange' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setSelectedElement } = useHookMouseFunctionalityErrorsContext();
    const { isRedirectSignInOnlyPassPage, setIsRedirectSignInOnlyPassPage } = useHookSignInPagesContext();



    const handleSignIn = async (data) => {
        const auth = getAuth();
        const { inputEmailSignIn, inputPassSignIn } = data;
        setLoadingData(true);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, inputEmailSignIn, inputPassSignIn);
            const user = userCredential.user;
    
            if (user) {
                const userDocRef = doc(db, "users", user.email);
                const userDocSnapshot = await getDoc(userDocRef);
    
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const displayName = userData.displayName;
                    const photoAcc = userData.photoAcc;
                    const streetLocation = userData.streetLocation;
                    const townLocation = userData.townLocation;
                    const gender = userData.gender;
                    const phoneNumber = userData.phoneNumber;
                    const idInformErrors = userData.idInformErrors || [];
                    const token = await user.getIdToken();
    
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: token,
                        displayName: displayName
                    }));
                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: gender,
                        phoneNumber: phoneNumber,
                        townLocation: townLocation,
                        streetLocation: streetLocation
                    }));
                    const lengthInfErrArr = idInformErrors.length || [];
                    
                    if (idInformErrors !== undefined) {
                        for (let i = 0; i < lengthInfErrArr; i++) {
                            const id = idInformErrors[i];
                        
                            const idInformErrorDocRef = doc(db, 'informErrors', id);
                            const idInformErrorDocSnapshot = await getDoc(idInformErrorDocRef);
                        
                            if (idInformErrorDocSnapshot.exists()) {
                                const dataIdInformError = idInformErrorDocSnapshot.data();
                                const isFixed = dataIdInformError.isFixed;
                                const textFeedBackUser = dataIdInformError.textFeedBackUser;
                        
                                dispatch(setOperationInformErrors({
                                    type: 'ADD_INFORM_ERROR',
                                    payload: {
                                        idInformErrors: id,
                                        isFixed: isFixed,
                                        textFeedBackUser: textFeedBackUser
                                    }
                                }));
                            }
                        }
                    }
                }
                const userNotificationsDocRef = doc(db, 'usersNotifications', user.email);
                const userNotificationsDocSnapshot = await getDoc(userNotificationsDocRef);

                if (userNotificationsDocSnapshot.exists()) {
                    const notificationsData = userNotificationsDocSnapshot.data();
                    const notifications = notificationsData.notifications;
                    const multipleNotifications = notificationsData.multipleNotifications;
                    const notificationsSs = notificationsData.notificationsSs;
                    const notificationsAdmin = notificationsData.notificationsAdmin;
                    const notificationsCouriers = notificationsData.notificationsCouriers;
                    const hiddenNotifications = notificationsData.hiddenNotifications;
                    const arrayNotificationsHistory = notificationsData.arrayUserNotifcationsHistory || [];
                    const arrayNotificationsUnseen = notificationsData.arrayUserNotifcationsUnseen || [];
                    const arrayNotificationsViewed = notificationsData.arrayUserNotifcationsViewed || [];
                    const arrayNotificationsBanned = notificationsData.arrBannedNots || [];
                    const arrayNotificationsHide = notificationsData.arrHideNots || [];

                    if (arrayNotificationsHistory !== undefined) {
                        for (let i = 0; i < arrayNotificationsHistory.length; i++) {
                            const id = arrayNotificationsHistory[i];
                            const arrayDataDateTimeReceivingNotification = id?.dateNotification;
                            const arrayDataSenderNotification = id?.senderNotification;
                            const arrayDataTextNotification = id?.textNotification;
                            const arrrayDataCategoryNotification = id?.categoryNotification;

                            dispatch(setOperationUserNotifications({
                                type: 'ALL_NOTIFICATIONS_HISTORY',
                                payload: {
                                    dateNotification: arrayDataDateTimeReceivingNotification,
                                    textNotification: arrayDataTextNotification,
                                    senderNotification: arrayDataSenderNotification,
                                    categoryNotification: arrrayDataCategoryNotification
                                }
                            }))
                        }
                    }
                    if (arrayNotificationsUnseen !== undefined) {
                        for (let i = 0; i < arrayNotificationsUnseen.length; i++) {
                            const id = arrayNotificationsUnseen[i];
                            const arrayDataDateTimeReceivingNotification = id?.dateNotification;
                            const arrayDataSenderNotification = id?.senderNotification;
                            const arrayDataTextNotification = id?.textNotification;
                            const arrayDataIsViewedNot = id?.isViewedNotifcation;
                            const arrayDataIsBannedNot = id?.isBannedNot;
                            const arrrayDataCategoryNotification = id?.categoryNotification;

                            dispatch(setOperationUserNotifications({
                                type: 'ADD_NOTIFICATIONS_UNSEEN',
                                payload: [
                                    {
                                        dateNotification: arrayDataDateTimeReceivingNotification,
                                        textNotification: arrayDataTextNotification,
                                        senderNotification: arrayDataSenderNotification,
                                        isViewedNotification: arrayDataIsViewedNot,
                                        isBannedNot: arrayDataIsBannedNot,
                                        categoryNotification: arrrayDataCategoryNotification
                                    }
                                ]
                            }))
                        }
                    }
                    if (arrayNotificationsViewed !== undefined) {
                        for (let i = 0; i < arrayNotificationsViewed.length; i++) {
                            const id = arrayNotificationsViewed[i];
                            const arrayDataDateTimeReceivingNotification = id?.dateNotification;
                            const arrayDataSenderNotification = id?.senderNotification;
                            const arrayDataTextNotification = id?.textNotification;
                            const arrayDataIsBannedNot = id?.isBannedNot;
                            const arrayDataIsViewedNot = id?.isViewedNotifcation;
                            const arrrayDataCategoryNotification = id?.categoryNotification;

                            dispatch(setOperationUserNotifications({
                                type: 'ADD_NOTIFICATIONS_VIEWED',
                                payload: [
                                    {
                                        dateNotification: arrayDataDateTimeReceivingNotification,
                                        textNotification: arrayDataTextNotification,
                                        senderNotification: arrayDataSenderNotification,
                                        isBannedNot: arrayDataIsBannedNot,
                                        isViewedNotification: arrayDataIsViewedNot,
                                        categoryNotification: arrrayDataCategoryNotification
                                    }
                                ]
                            }))
                        }
                    }
                    dispatch(setUserNotificationsSettings({
                        notifications: notifications,
                        multipleNotifications: multipleNotifications,
                        notificationsAdmin: notificationsAdmin,
                        notificationsCouriers: notificationsCouriers,
                        notificationsSs: notificationsSs,
                        hiddenNotifications: hiddenNotifications
                    }));
                    if (arrayNotificationsBanned !== undefined) {
                        for (let i = 0; i < arrayNotificationsBanned.length; i++) {
                            const elemtnsArrBanned = arrayNotificationsBanned[i];
                            dispatch(setBannedNotfications(elemtnsArrBanned));
                        }
                    }
                    if (arrayNotificationsHide !== undefined) {
                        for (let i = 0; i < arrayNotificationsHide.length; i++) {
                            const objArrhide = arrayNotificationsHide[i];
                            dispatch(setHideNotifications(objArrhide));
                        }
                    }
                    const dataSenderTypesNotsOne ={
                        id: 1,
                        nameSenderNot: 'SS Coorchik'
                    };
                    const dataSenderTypesNotsTwo ={
                        id: 2,
                        nameSenderNot: 'Coorchik'
                    };
                    const dataSenderTypesNotsThree ={
                        id: 3,
                        nameSenderNot: 'Couriers'
                    };
                    dispatch(setActionFilteredNots(dataSenderTypesNotsOne));
                    dispatch(setActionFilteredNots(dataSenderTypesNotsTwo));
                    dispatch(setActionFilteredNots(dataSenderTypesNotsThree));
                }
            }
            setIsRedirectSignInOnlyPassPage(false);
            setSelectedElement(false);
            setLoadingData(false);
            navigate('/');
            } catch (error) {
                setLoadingData(false);
                setIsErrorUserData(true);
                console.log(error);
            }
        }


    return isRedirectSignInOnlyPassPage ?
        (
            <div>
                <SignInUserOnlyPassPage />
            </div>
        )
        : (
            <div className='page-sign-in'>
                <form onSubmit={handleSubmit(handleSignIn)} className='form-sign-in-page'>
                    <div>
                        {isLoadingData ? <LoadingDataForm /> : null}
                    </div>
                    <div className='form-line'>
                        <div className='header-form'>
                            <img src={logoSite} className='form-sign-in-logo-site' />
                        </div>
                        <div className='text-form-sign-in'>
                            <span className='span-large-text-sign-in'>
                                Sign In
                            </span>
                        </div>
                        <div>
                            <label className={isErrorUserData ? 'span-input-error-1' : 'span-input-1'}>
                                Email
                            </label>
                            <input
                                {...register('inputEmailSignIn', {
                                    required: "Filid must be filled in",
                                })}
                                type="email"
                                className={isErrorUserData ? 'signIn-input-error-1' : 'signIn-input-1'}
                                placeholder="example@example.com"
                            />
                        </div>
                        <div>
                            <label className={isErrorUserData ? 'span-sign-in-input-error-2' : 'span-sign-in-input-2'}>
                                Password
                            </label>
                            <input
                                {...register('inputPassSignIn', {
                                    required: "Filid must be filled in",
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                                type="password"
                                className={isErrorUserData ? 'signIn-input-error-2' : 'signIn-input-2'}
                            />
                            <span className='forgot-pass_helper-text-input'>
                                <Link to='/sign-In-password-recovery'>
                                    I don't remember the password
                                </Link>
                            </span>
                            <div className='text-form-error-sign-in-user-data'>
                                {isErrorUserData ? <p>Incorrect email or password.</p> : null}
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='button-sign-in'>
                            Sign In
                        </button>
                        <div>
                            <button
                                className='button-register-sign-in-only-pass-page'
                                onClick={handleBackRegister}
                            >
                                <Link to="/Registration-SignIn" className='link-register-back'>
                                    Register
                                </Link>
                            </button>
                        </div>
                    </div>
                </form>
                <FooterForm />
            </div>
        );
    
}



