import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProfileAccountIconUserAccSetingsPage from "./ProfileAccountIconUserAccSetingsPage";
import logoSite from '../componentsHomePage/logoSite.png';
import ChoosenCouriersIcon from '../componentsHomePage/choosenCouriersIcon';
import './userAccSetingsHeaderPage.css';
import NotificationFunctionality from '../componentsHomePage/notificationFunctionality'; 
import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';

export default function UserAccSetingsHeaderPage(){
    const {setHideContUserAcc} = useHookHeaderIconsEmergenceContext();

    const [isFixStateOne, setIsFixStateOne] = useState(false);

    useEffect(() => {
        const handleScrollStateOne = () => {
            const scrollStateOneLimitOffsetY = window.scrollY;

            if (scrollStateOneLimitOffsetY >= 45 && 1500 >= scrollStateOneLimitOffsetY) {
                setIsFixStateOne(true);
            } else {
                setIsFixStateOne(false);
            }
        };

        window.addEventListener('scroll', handleScrollStateOne);

        return () => {
            window.removeEventListener('scroll', handleScrollStateOne);
        };
    }, []);

    return (
        <header className={`${isFixStateOne ? 'sticky' : ''}`}>
            <div className='page-line-header'>
                <div className="name-site-user-acc-page">
                    <span className='span-user-acc-setings-page-header'>
                        <img src = {logoSite} className='form-user-acc-setings-logo-site'/>
                    </span>
                </div>
            </div>
            <div className="navbar">
                <div className='nav-links'>
                    <Link className="navbar-link-user-acc-setings-page-1" to='/#' onClick={() => {setHideContUserAcc(true)}}>About</Link>
                    <Link className="navbar-link-user-acc-setings-page-2" to='/ChooseCourier' onClick={() => {setHideContUserAcc(true)}}>Choose</Link>
                    <Link className="navbar-link-user-acc-setings-page-3" to='/Terms-Cooperation' onClick={() => {setHideContUserAcc(true)}}>Terms cooperation</Link>
                </div>
            </div>
            <ProfileAccountIconUserAccSetingsPage />
            <NotificationFunctionality />
            <ChoosenCouriersIcon />
        </header>
    ); 
}