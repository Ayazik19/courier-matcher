import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import  hideUserAccInfo from '../componentsHomePage/hideUserAccInfo.png';
import { removeUser, setUserInformErrors } from "../store/slices/userSlice.js";
import { useAuth } from '../globalHooks/useauth.js';
import CheckAccountPhotoProfile from '../componentsHomePage/checkAccountPhotoProfileHomePage.jsx';
import addCourierHomePage from '../componentsHomePage/addCourierHomePage.png'
import logOutAccUserHomePage from '../componentsHomePage/logOutAccUserHomePage.png';
import CheckAccountPhotoProfileInfoAcc from '../componentsHomePage/CheckAccountPhotoProfileInfoAcc.jsx';
import './ProfileAccountIconUserAccSetingsPage.css';
import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors';

export default function ProfileAccountIconUserAccSetingsPage() {
    const { 
        isAuth, 
        displayName, 
        email 
    } = useAuth();

    const {
        hideIconAddCourier, 
        hideContIconUserAcc, 
        hideNotificationIcon, 
        setHideContUserAcc,
        setHideIconAddCourier
    } = useHookHeaderIconsEmergenceContext();
    const {isSelectedElement} = useHookMouseFunctionalityErrorsContext();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [eventClickTracking, setEventClickTracking] = useState(1);

    const handleShowInfoAccount = () => {
        setHideContUserAcc(false);
        setEventClickTracking(eventClickTracking + 1);
        if(!hideContIconUserAcc){
            if(eventClickTracking % 2 == 0){
                setHideContUserAcc(true);
            }
            else{
                setHideContUserAcc(false);
            }
        }
    }

    const handleHideInfoAccount = () => {
        setHideContUserAcc(true);
    }
    const handleRediractionToSettingsAcc = () => {
        navigate('/User-account');
    }
    const hadbleRediractionSignInPage = () => {
        dispatch(removeUser());
        dispatch(setUserInformErrors({
            type: 'REMOVE_ALL_INFORM_ERRORS',
            payload: {}
        }))
    }
    const hadbleRediractionChooseCourierPage = () => {
        navigate('/ChooseCourier');
    }

    useEffect(() => {
        if(!hideIconAddCourier || !hideNotificationIcon || isSelectedElement) {
            setHideContUserAcc(true);
        }
    },[hideIconAddCourier, hideNotificationIcon, isSelectedElement]);

return isAuth ? (
    <>
        <div className="home-page-acc-header-right-icon-acc" onClick={handleShowInfoAccount}>
                <div className= 'account-icon-user-acc-setings-page'>
                    <CheckAccountPhotoProfile />
                </div>
        </div>
        {!hideContIconUserAcc ? 
            <div className='nav-info-acc-user'>
                <div className='nav-acc-user-acc-setings-page'>
                    <div className='header-nav-acc-user'>
                        <span className='text-email-user'>
                            {email}
                        </span>
                        <img
                            src={hideUserAccInfo}
                            className='button-hide-nav-info-acc-user'
                            onClick={handleHideInfoAccount}
                        />
                    </div>
                    <div className='main-nav-acc-user'>
                        <div className= 'nav-account-icon'>
                            <CheckAccountPhotoProfileInfoAcc />
                        </div>
                        <span className='text-user-name'>
                            Hello, {displayName}!
                        </span>
                        <button
                            className='button-account-management'
                            onClick={handleRediractionToSettingsAcc}
                        >
                            Account management
                        </button>
                    </div>
                    <div className='footer-button-acc-user'>
                        <button
                            className='button-account-add-courier'
                            onClick={hadbleRediractionChooseCourierPage}
                        >
                            <img src={addCourierHomePage} className='img-add-courier'/>
                            <Link 
                                to = '/ChooseCourier'
                                className='nav-text-add-courier'
                            >
                                Add
                                <br></br> 
                                courier                          
                            </Link>
                        </button>
                        <button
                            onClick={hadbleRediractionSignInPage}
                            className='button-account-log-out'
                        >
                            <img src={logOutAccUserHomePage} className='img-log-out-acc-user' />
                            <Link 
                                to = '/SignIn-Registration'
                                className='nav-text-log-out-acc-user'
                            >
                                Log out                          
                            </Link>
                        </button>
                    </div>
                    <div className='footer-nav-links'>
                        <Link 
                            to = '/ChooseCourier'
                            className='nav-text-choose-courier'
                        >
                            Choose courier                          
                        </Link>
                        <span className='footer-links-seperation'>
                            .
                        </span>
                        <Link 
                            to = '/Terms-Cooperation'
                            className='nav-text-terms-cooperation'
                        >
                            Terms cooperation                           
                        </Link>
                    </div>
                </div>
            </div> 
        : null}
    </>
) : (
        <div className="home-page-acc-header-right">
            <button className="button-home-page-header-button-registration-acc">
                <Link to='/Registration-SignIn' className="link-register-header-home-page">
                    Register
                </Link>
            </button>
            <button className="button-home-page-header-button-sign-in-acc">
                <Link to='/SignIn-Registration' className="link-sign-in-header-home-page">
                    Sign In
                </Link>
            </button>
        </div>
    );
}