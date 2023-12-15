import UserAccSetingsHeaderPage from './userAccSetingsHeaderPage.jsx';
import { useAuth } from '../hook/useauth.js';
import { Link, useNavigate } from 'react-router-dom';
import './userAccSetingsPage.css';
import { useEffect, useState } from 'react';

export default function UserAccSetingsPage() {
    const navigate = useNavigate();
    const { 
        isAuth, 
        email, 
        dateBirth, 
        gender,
        locationUser, 
        displayName,
        phoneNumber,
        isSelectedCourier
        } = useAuth();
    
    const[isFixAssideMenu, setIsFixAssideMenu] = useState(false);

    const hadnleRedirectChooseCourierPage = () => {
        navigate('/ChooseCourier');
    }
    
    useEffect(() => {
        const handleScrollFixStateAssideMenu = () => {
            const scrollAssideMenuLimit = window.scrollY;
            
            
            if(scrollAssideMenuLimit >= 100 && 1000 >= scrollAssideMenuLimit){
                setIsFixAssideMenu(true);
            }
            else{
                setIsFixAssideMenu(false);
            }
        };
            
            window.addEventListener('scroll', handleScrollFixStateAssideMenu);

            return () => {
                window.removeEventListener('scroll', handleScrollFixStateAssideMenu)
            };
    },[]);

    const [isDescriptionOne, setIsDescriptionOne] = useState(false);
    const [isDescriptionTwo, setIsDescriptionTwo] = useState(false);
    const [isDescriptionThree, setIsDescriptionThree] = useState(false);
    const [isDescriptionFour, setIsDescriptionFour] = useState(false);

    useEffect(() => {
        const handleScrollMainContent = () => {
            const scrollMainContent = window.scrollY;

            if(scrollMainContent >= 100 && 440 >= scrollMainContent){
                setIsDescriptionOne(true);
            }
            else{
                setIsDescriptionOne(false);
            }

            if(scrollMainContent >= 442 && 600 >= scrollMainContent){
                setIsDescriptionTwo(true);
            }
            else{
                setIsDescriptionTwo(false);
            }

        };
        window.addEventListener('scroll', handleScrollMainContent);

        return() => {
            window.removeEventListener('scroll', handleScrollMainContent);
        };
        
    },[]);

    
    return(
        <div>
            <div>
                <UserAccSetingsHeaderPage />
            </div>
            <div className='redirect-pages'>
                <Link to = '/' className='span-redirect-page_home-1'>
                    Home 
                </Link>
                <Link to = '/User-account' className='span-redirect-page-2'>&gt; Account management</Link> 
            </div> 
            <div className='page-line-left-content-asside_asside-and-name-site'>
                <div className='text-settings-page'>
                    <span className='span-large-text'>
                        Settings
                    </span>
                </div>
                <div className={isFixAssideMenu ? 'asside-nav-description-in-main-page_fix-state' : 'asside-nav-description-in-main-page'}>
                    <div className='nav-discription'> 
                        <div className='spans-description-line'>
                            <div className='span-description-1'>
                                {isDescriptionOne ? <div className='ponter-descriptions'>
                                </div> : null}
                                <a href = '#discription-1' className={isDescriptionOne ? 'span-text-description-1_margin-left': 'span-text-description-1'}>
                                    My information
                                </a>
                            </div>
                            <div className='span-description-2'>
                                {isDescriptionTwo ? <div className='ponter-descriptions'>
                                </div> : null}
                                <a href = '#discription-2' className={isDescriptionTwo ? 'span-text-description-2_margin-left': 'span-text-description-2'}>
                                    Account
                                </a>
                            </div>
                            <div className='span-description-3'>
                                {isDescriptionThree ? <div className='ponter-descriptions'>
                                </div> : null}
                                <a href = '#discription-3' className={isDescriptionThree ? 'span-text-description-3_margin-left': 'span-text-description-3'}>
                                    Selected couriers
                                </a>
                            </div>
                            <div className='span-description-4'>
                                {isDescriptionFour ? <div className='ponter-descriptions'>
                                </div> : null}
                                <a href = '#discription-4' className={isDescriptionFour ? 'span-text-description-4_margin-left': 'span-text-description-4'}>
                                    Subscription
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-content-user-acc-setings-page'>
                <div className='my-information-content-1' id = 'discription-1'>
                    <span className='span-name-discription-large-text'>
                        My information
                    </span>
                    <div className='my-information-content-attributes-discription'>
                        <div className='attribute-discription-1'>
                            <span className='attribute-name-1'>
                                Name
                            </span>
                            {isAuth ? <span  className='span-name-user'>
                                {displayName}
                                <span className='change-button'>
                                Change
                                </span>
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                        <div className='attribute-discription-2'>
                            <span className='attribute-name-2'>
                                Gender
                            </span>
                            {isAuth ? <span  className='span-gender-user'>
                                {gender ? gender : <div className='add-button'>Add</div>}
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                        <div className='attribute-discription-3'>
                            <span className='attribute-name-3'>
                                Date birth
                            </span>
                            {isAuth ? <span className='span-date-birth-user'>
                                {dateBirth ? dateBirth : <div className='add-button'>Add</div>}
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                        <div className='attribute-discription-4'>
                            <span className='attribute-name-4'>
                                Location
                            </span>
                            {isAuth ? <span className='span-location-user'>
                                {locationUser ? locationUser : <div className='add-button'>Add</div>}
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                    </div>
                </div>
                <div className='accounnt-content-2' id = 'discription-2'> 
                    <span className='span-name-discription-large-text'>
                        Account
                    </span>
                    <div className='account-content-attributes-discription'>
                        <div className='attribute-discription-1'>
                            <span className='attribute-name-1'>
                                Email
                            </span>
                            {isAuth ? 
                            <span  className='span-email-user'>
                                {email}
                                <span className='change-button'>
                                Change
                                </span>
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                        <div className='attribute-discription-2'>
                            <span className='attribute-name-2'>
                                Phone number
                            </span>
                            {isAuth ? <span  className='span-phone-number-user'>
                                {phoneNumber ? phoneNumber : <div className='add-button'>Add</div>}
                            </span> : <div className='add-button'>Add</div>}
                        </div>
                        <div className='attribute-discription-3'>
                            <span className='attribute-name-3'>
                                Password
                            </span>
                            <span className='span-password-user'>
                                <span className='span-password-user'>
                                    *******
                                </span>
                                <div className='change-button'>Change</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div id = 'discription-3'>
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
                <div id = 'discription-4'>
                    <span className='span-name-discription-large-text'>Subscription</span>
                </div>
            </div>
        </div>
    );
}