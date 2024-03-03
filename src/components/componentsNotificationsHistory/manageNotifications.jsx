import { useNotificationSettings } from '../globalHooks/useNotificationSettings';
import { useDispatch } from 'react-redux';
import './manageNotifications.css';
import notificationsIcon from './notificationsIcon.png';
import notificationsSsIcon from '../componentsHomePage/suppServiceIcon.png';
import notificationsCouriersIcon from './notificationsCouriersIcon.png';
import notificationsAdminIcon from './notificationsAdminIcon.png';
import multipleNotificationsIcon from './multipleNotificaitonsIcon.png';
import explenationIcon from './explenationIcon.png';
import { setUpdMultipleNotificationsSettings, setUpdNotificationsAdminSettings, setUpdNotificationsCouriersSettings, setUpdNotificationsSettings, setUpdNotificationsSsSettings } from '../store/slices/notificationsAgreementSlice';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import { useAuth } from '../globalHooks/useauth.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ManageNotifications() {
    const dispatch = useDispatch();
    const { email } = useAuth();
    const { notifications, notificationsSs,
        multipleNotifications, notificationsAdmin, notificationsCouriers
    } = useNotificationSettings();

    const handleSetValueNotSettingSs = async (notificationsSs) => {
        if (notificationsSs) {
            dispatch(setUpdNotificationsSsSettings(false));
            notificationsSs = false;
        }
        else {
            dispatch(setUpdNotificationsSsSettings(true));
            notificationsSs = true;
        }
        const fieldName = 'notificationsSs';
        const updateNotificationsSettignsField = async (email, fieldName, notificationsSs) => {
            const notificationsRef = doc(db, 'usersNotifications', email);
            try {
                await updateDoc(notificationsRef, { [fieldName]: notificationsSs });
            }
            catch (error) {
                console.log(error);
            }
        };
        await updateNotificationsSettignsField(email, fieldName, notificationsSs);
    }
    const handleSetValueNotSettingAdmin = async(notificationsAdmin) => {
        if (notificationsAdmin) {
            dispatch(setUpdNotificationsAdminSettings(false));
            notificationsAdmin = false;
        }
        else {
            dispatch(setUpdNotificationsAdminSettings(true));
            notificationsAdmin = true;
        }
        const fieldName = 'notificationsAdmin';
        const updateNotificationsSettignsField = async (email, fieldName, notificationsAdmin) => {
            const notificationsRef = doc(db, 'usersNotifications', email);
            try {
                await updateDoc(notificationsRef, { [fieldName]: notificationsAdmin });
            }
            catch (error) {
                console.log(error);
            }
        };
        await updateNotificationsSettignsField(email, fieldName, notificationsAdmin);
    }
    const handleSetValueNotCouriersSetting = async(notificationsCouriers) => {
        if (notificationsCouriers) {
            dispatch(setUpdNotificationsCouriersSettings(false));
            notificationsCouriers = false;
        }
        else {
            dispatch(setUpdNotificationsCouriersSettings(true));
            notificationsCouriers = true;
        }
        const fieldName = 'notificationsCouriers';
        const updateNotificationsSettignsField = async (email, fieldName, notificationsCouriers) => {
            const notificationsRef = doc(db, 'usersNotifications', email);
            try {
                await updateDoc(notificationsRef, { [fieldName]: notificationsCouriers });
            }
            catch (error) {
                console.log(error);
            }
        };
        await updateNotificationsSettignsField(email, fieldName, notificationsCouriers);
    }
    const handleSetValueNotSettingMultiple = async (multipleNotifications) => {
        if (multipleNotifications) {
            dispatch(setUpdMultipleNotificationsSettings(false));
            multipleNotifications = false;
        }
        else {
            dispatch(setUpdMultipleNotificationsSettings(true));
            multipleNotifications = true;
        }
        const fieldName = 'multipleNotifications';
        const updateNotificationsSettignsField = async (email, fieldName, multipleNotifications) => {
            const notificationsRef = doc(db, 'usersNotifications', email);
            try {
                await updateDoc(notificationsRef, { [fieldName]: multipleNotifications });
            }
            catch (error) {
                console.log(error);
            }
        };
        await updateNotificationsSettignsField(email, fieldName, multipleNotifications);
    }
    const handleSetValueNotSetting = async (notifications) => {
        if (notifications) {
            dispatch(setUpdNotificationsSettings(false));
            notifications = false;
        }
        else {
            dispatch(setUpdNotificationsSettings(true));
            notifications = true;
        }
        const fieldName = 'notifications';
        const updateNotificationsSettignsField = async (email, fieldName, notifications) => {
            const notificationsRef = doc(db, 'usersNotifications', email);
            try {
                await updateDoc(notificationsRef, { [fieldName]: notifications });
            }
            catch (error) {
                console.log(error);
            }
        };
        await updateNotificationsSettignsField(email, fieldName, notifications);
    }

    return (
        <div className='cont-manage-notifications'>
            <div className="header-cont-manage">
                <span className="text-manage-cont_left">
                    Manage notifications
                </span>
            </div>
            <div className="main-manage-nots">
                <div className="cont-types-manage-main-nots">
                    <span className='name-discription'>Main</span>
                    <div className="main-types-manage">
                        <div className="notifications-nots type-turn-nots">
                            <div className='icon-cont'>
                                <img className='icon-img' src={notificationsIcon} />
                            </div>
                                <span className="text-main-manage">
                                    Enable notifications
                                </span>
                            <label className='switch'>
                            <input
                                    className='inp-checkbox-manage-settings-nots'
                                    type='checkbox'
                                    checked={notifications}
                                    onChange={() => handleSetValueNotSetting(notifications)}
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div className="notifications-nots type-push-nots">
                            <div className='icon-cont'>
                                <img className='icon-img' src={multipleNotificationsIcon} />
                            </div>
                            <div className='info-main-manage'>
                                <span className="text-main-manage">
                                    Show multiple notifications
                                </span>
                                <div className='data-title-cont explenation-main-manage_multiple-cont' data-title='You can set up notifications, that will pop up multiple times'>
                                    <img src={explenationIcon} className='icon-explenation' />
                                </div>
                            </div>
                            <label className='switch'>
                            <input
                                    className='inp-checkbox-manage-settings-nots'
                                    type='checkbox'
                                    checked={multipleNotifications}
                                    onChange={() => handleSetValueNotSettingMultiple(multipleNotifications)}
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="cont-types-manage-others-nots">
                    <span className='name-discription'>Others</span>
                    <div className="others-type-manage">
                        <div className="notifications-nots  type-coorchik-ss-nots">
                            <div className='icon-cont'>
                                <img className='icon-img' src={notificationsSsIcon} />
                            </div>
                            <div className='info-main-manage'>
                                <span className="text-main-manage">
                                    Support Service notifications
                                </span>
                                <div className='data-title-cont explenation-main-manage_ss-cont' data-title='You can configure the notifications, that you will receive from the Support Service'>
                                    <img src={explenationIcon} className='icon-explenation' />
                                </div>
                            </div>
                            <label className='switch'>
                            <input
                                    className='inp-checkbox-manage-settings-nots'
                                    type='checkbox'
                                    checked={notificationsSs}
                                    onChange={() => handleSetValueNotSettingSs(notificationsSs)}
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div className="notifications-nots  type-coorchik-admin-nots">
                            <div className='icon-cont'>
                                <img className='icon-img' src={notificationsAdminIcon} />
                            </div>
                            <div className='info-main-manage'>
                                <span className="text-main-manage">
                                    Coorchik notifications
                                </span>
                                <div className='data-title-cont explenation-main-manage_coorchik-cont' data-title='You can configure the notifications, that you will receive from the site'>
                                    <img src={explenationIcon} className='icon-explenation' />
                                </div>
                            </div>
                            <label className='switch'>
                            <input
                                    className='inp-checkbox-manage-settings-nots'
                                    type='checkbox'
                                    checked={notificationsAdmin}
                                    onChange={() => handleSetValueNotSettingAdmin(notificationsAdmin)}
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div className="notifications-nots type-coorchik-couriers-nots">
                            <div className='icon-cont'>
                                <img className='icon-img' src={notificationsCouriersIcon} />
                            </div>
                            <div className='info-main-manage'>
                                <span className="text-main-manage">
                                    Couriers notifications
                                </span>
                                <div className='data-title-cont explenation-main-manage_couriers-cont' data-title='You can set up notifications, that you will receive from Couriers'>
                                    <img src={explenationIcon} className='icon-explenation' />
                                </div>
                                <div className='explenation-triangle'></div>
                            </div>
                            <label className='switch'>
                            <input
                                    className='inp-checkbox-manage-settings-nots'
                                    type='checkbox'
                                    checked={notificationsCouriers}
                                    onChange={() => handleSetValueNotCouriersSetting(notificationsCouriers)}
                                />
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}