import UserAccSetingsHeaderPage from './userAccSetingsHeaderPage.jsx';
import { useAuth } from '../globalHooks/useauth.js';
import { Link, useNavigate } from 'react-router-dom';
import './userAccSetingsPage.css';
import { useEffect, useState } from 'react';
import { removeUser, setOperationInformErrors, setOperationUserNotifications, setRemoveHideNotificaitons } from '../store/slices/userSlice.js';
import { useDispatch } from 'react-redux';
import FooterUserSettingsPage from './footerUserSettingsPage.jsx';
import OpenContHookMouseFunctionalityErrors from '../../mouseFunctionalityErrors/openContHookMouseFunctionalityErrorsStepOne.jsx'
import DeleteUserFuncStepOne from './deletingUserFuncStepOne.jsx';
import ChangeLocationUserProfileSettings from './changeLocationUserProfileSettings.jsx';
import ChangePhoneNumberUserProfileSettings from './changePhoneNumberUserProfileSettings.jsx';
import ChangeGenderUserProfileSettings from './changeGenderUserProfileSettings.jsx';
import ChangeDateBirthUserProfileSettings from './changeDateBirthUserProfileSettings.jsx';
import ChangenameUserProfileSettings from './changeNameUserProfileSetting.jsx';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';
import './userAccSetingsPage.css';

export default function UserAccSetingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        isAuth,
        email,
        isSelectedCourier
    } = useAuth();
    const {isSelectedElement} = useHookMouseFunctionalityErrorsContext();

    const [isFixAssideMenu, setIsFixAssideMenu] = useState(false);
    const [isStopFixAssideMenu, setIsStopFixAssideMenu] = useState(false);
    const [isStopFixAssideMenuUserLogOut, setIsStopFixAssideMenuUserLogOut] = useState(false);

    const hadnleRedirectChooseCourierPage = () => {
        navigate('/ChooseCourier');
    }
    const handleResetPasswordRedirectPage = () => {
        dispatch(removeUser());
        dispatch(setOperationInformErrors({
            type: 'REMOVE_INFORM_ERRORS',
            payload: {}
        }))
        dispatch(setOperationUserNotifications({
            type: 'REMOVE_ALL_NOTIFICATIONS',
            payload: {}
        }))
        dispatch(setRemoveHideNotificaitons());
        navigate('/Sign-In-password-recovery');
    }
    const handleSignInRedirectPage = () => {
        dispatch(removeUser());
        dispatch(setOperationInformErrors({
            type: 'REMOVE_INFORM_ERRORS',
            payload: {}
        }))
        dispatch(setOperationUserNotifications({
            type: 'REMOVE_ALL_NOTIFICATIONS',
            payload: {}
        }))
        dispatch(setRemoveHideNotificaitons());
        navigate('/SignIn-Registration');
    }

    useEffect(() => {
        const handleScrollFixStateAssideMenu = () => {
            const scrollAssideMenuLimit = window.scrollY;


            if (scrollAssideMenuLimit >= 100 && 1004 >= scrollAssideMenuLimit) {
                setIsFixAssideMenu(true);
            }
            else {
                setIsFixAssideMenu(false);
            }

            if (!isAuth && scrollAssideMenuLimit >= 919) {
                setIsStopFixAssideMenuUserLogOut(true);
            }
            else {
                setIsStopFixAssideMenuUserLogOut(false);
            }

            if (isAuth && scrollAssideMenuLimit >= 1005) {
                setIsStopFixAssideMenu(true);
            }
            else {
                setIsStopFixAssideMenu(false);
            }
        };

        window.addEventListener('scroll', handleScrollFixStateAssideMenu);

        return () => {
            window.removeEventListener('scroll', handleScrollFixStateAssideMenu)
        };
    }, [isFixAssideMenu,
        isStopFixAssideMenu,
        isStopFixAssideMenuUserLogOut
    ]);

    const [isDescriptionOne, setIsDescriptionOne] = useState(false);
    const [isDescriptionTwo, setIsDescriptionTwo] = useState(false);
    const [isDescriptionThree, setIsDescriptionThree] = useState(false);
    const [isDescriptionFour, setIsDescriptionFour] = useState(false);

    useEffect(() => {
        const handleScrollMainContent = () => {
            const scrollMainContent = window.scrollY;

            if (scrollMainContent >= 52 && 440 >= scrollMainContent) {
                setIsDescriptionOne(true);
            }
            else {
                setIsDescriptionOne(false);
            }

            if (scrollMainContent >= 442 && 740 >= scrollMainContent) {
                setIsDescriptionTwo(true);
            }
            else {
                setIsDescriptionTwo(false);
            }

            if (scrollMainContent >= 741 && 925 >= scrollMainContent) {
                setIsDescriptionThree(true);
            }
            else {
                setIsDescriptionThree(false);
            }

            if (scrollMainContent >= 926 && 1150 >= scrollMainContent) {
                setIsDescriptionFour(true);
            }
            else {
                setIsDescriptionFour(false);
            }

        };
        window.addEventListener('scroll', handleScrollMainContent);

        return () => {
            window.removeEventListener('scroll', handleScrollMainContent);
        };

    }, [isDescriptionOne, 
        isDescriptionTwo, 
        isDescriptionThree, 
        isDescriptionFour]);


    return (
        <div>
            <div>
                <UserAccSetingsHeaderPage />
            </div>
            <div className='redirect-pages'>
                <Link to='/' className='span-redirect-page_home-1'>
                    Home
                </Link>
                <Link to='/User-account' className='span-redirect-page-2'>&gt; Account management</Link>
            </div>
            <div className='page-line-left-content-asside_asside-and-name-site'>
                <div className='text-settings-page'>
                    <span className='span-large-text'>
                        Settings
                    </span>
                </div>
                {isStopFixAssideMenu || isStopFixAssideMenuUserLogOut ?
                    <div>
                        <div className={isStopFixAssideMenuUserLogOut ? 'asside-nav-description-in-main-page_state-3' : 'asside-nav-description-in-main-page_state-2'}>
                        <div className='nav-discription'>
                            <div className='spans-description-line'>
                                <div className='span-description-1'>
                                    {isDescriptionOne ? <div className='ponter-descriptions'></div> : null}
                                    <a href='#discription-1' className={isDescriptionOne ? 'span-text-description-1_margin-left' : 'span-text-description-1'}>
                                        My information
                                    </a>
                                </div>
                                <div className='span-description-2'>
                                    {isDescriptionTwo ? <div className='ponter-descriptions'></div> : null}
                                    <a href='#discription-2' className={isDescriptionTwo ? 'span-text-description-2_margin-left' : 'span-text-description-2'}>
                                        Account
                                    </a>
                                </div>
                                <div className='span-description-3'>
                                    {isDescriptionThree ? <div className='ponter-descriptions'></div> : null}
                                    <a href='#discription-3' className={isDescriptionThree ? 'span-text-description-3_margin-left' : 'span-text-description-3'}>
                                        Selected couriers
                                    </a>
                                </div>
                                <div className='span-description-4'>
                                    {isDescriptionFour ? <div className='ponter-descriptions'></div> : null}
                                    <a href='#discription-4' className={isDescriptionFour ? 'span-text-description-4_margin-left' : 'span-text-description-4'}>
                                        Deleting an account
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={isFixAssideMenu ? 'asside-nav-description-in-main-page_fix-state' : 'asside-nav-description-in-main-page_state-1'}>
                            <div className='nav-discription'>
                                <div className='spans-description-line'>
                                    <div className='span-description-1'>
                                        {isDescriptionOne ? <div className='ponter-descriptions'>
                                        </div> : null}
                                        <a href='#discription-1' className={isDescriptionOne ? 'span-text-description-1_margin-left' : 'span-text-description-1'}>
                                            My information
                                        </a>
                                    </div>
                                    <div className='span-description-2'>
                                        {isDescriptionTwo ? <div className='ponter-descriptions'>
                                        </div> : null}
                                        <a href='#discription-2' className={isDescriptionTwo ? 'span-text-description-2_margin-left' : 'span-text-description-2'}>
                                            Account
                                        </a>
                                    </div>
                                    <div className='span-description-3'>
                                        {isDescriptionThree ? <div className='ponter-descriptions'>
                                        </div> : null}
                                        <a href='#discription-3' className={isDescriptionThree ? 'span-text-description-3_margin-left' : 'span-text-description-3'}>
                                            Selected couriers
                                        </a>
                                    </div>
                                    <div className='span-description-4'>
                                        {isDescriptionFour ? <div className='ponter-descriptions'>
                                        </div> : null}
                                        <a href='#discription-4' className={isDescriptionFour ? 'span-text-description-4_margin-left' : 'span-text-description-4'}>
                                            Deleting an account
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
            <div className='main-content-user-acc-setings-page'>
                <div className='my-information-content-1' id='discription-1'>
                    <span className='span-name-discription-large-text'>
                        My information
                    </span>
                    <div className='my-information-content-attributes-discription'>
                        <div className='attribute-discription-1'>
                            <span className='attribute-name-1'>
                                Name
                            </span>
                            <ChangenameUserProfileSettings />
                        </div>
                        <div className='attribute-discription-2'>
                            <span className='attribute-name-2'>
                                Gender
                            </span>
                            <ChangeGenderUserProfileSettings />
                        </div>
                        <div className='attribute-discription-3'>
                            <span className='attribute-name-3'>
                                Date birth
                            </span>
                            <ChangeDateBirthUserProfileSettings />
                        </div>
                        <div className='attribute-discription-4'>
                            <span className='attribute-name-4'>
                                Your location
                            </span>
                            <ChangeLocationUserProfileSettings />
                        </div>
                    </div>
                </div>
                <div className='accounnt-content-2' id='discription-2'>
                    <span className='span-name-discription-large-text'>
                        Account
                    </span>
                    <div className='account-content-attributes-discription'>
                        <div className='attribute-discription-1'>
                            <span className='attribute-name-1'>
                                Email
                            </span>
                            {email ?
                                <span className='span-email-user'>
                                    {email}
                                </span>
                                :
                                <div className='add-button'>
                                    Add
                                </div>}
                        </div>
                        <div className='attribute-discription-2'>
                            <span className='attribute-name-2'>
                                Phone number
                            </span>
                            <ChangePhoneNumberUserProfileSettings />
                        </div>
                        <div className='attribute-discription-3'>
                            <span className='attribute-name-3'>
                                Password
                            </span>
                            {isAuth ?
                                <span className='span-password-user'>
                                    <span className='span-password-user'>
                                        *******
                                    </span>
                                    <div className='change-button' onClick={handleResetPasswordRedirectPage}>Change</div>
                                </span>
                                :
                                <div>
                                    <div className='add-button' onClick={handleSignInRedirectPage}>
                                        Add
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
                <div id='discription-3'>
                    <span className='span-name-discription-large-text'>Selected couriers</span>
                    {isSelectedCourier ?
                        <div className='selected-couriers_true'>
                            <div className='selected-courier-1'>

                            </div>
                            <div className='selected-courier-2'>

                            </div>
                            <div className='selected-courier-3'>

                            </div>
                        </div>
                        :
                        <div className='selected-couriers_false'>
                            <span className='attribute-name-selected-couriers_false'>
                                You haven't chosen a single courier yet
                            </span>
                            <button
                                className='button-redirect-choose-courier'
                                onClick={hadnleRedirectChooseCourierPage}
                            >
                                Add courier
                            </button>
                        </div>
                    }
                </div>
                <div id='discription-4'>
                    <DeleteUserFuncStepOne />
                </div>
            </div>
            <FooterUserSettingsPage />
            {isSelectedElement ? <OpenContHookMouseFunctionalityErrors /> : null}
        </div>
    );
}