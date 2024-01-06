import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProfileAccountIconUserAccSetingsPage from "./ProfileAccountIconUserAccSetingsPage";
import logoSite from '../componentsHomePage/logoSite.png';
import ChoosenCouriersIcon from '../componentsHomePage/choosenCouriersIcon';
import './userAccSetingsHeaderPage.css';

export default function UserAccSetingsHeaderPage(){
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
                    <Link className="navbar-link-user-acc-setings-page-1" to='/#'>About</Link>
                    <Link className="navbar-link-user-acc-setings-page-2" to='/ChooseCourier'>Choose</Link>
                    <Link className="navbar-link-user-acc-setings-page-3" to='/Terms-Cooperation'>Terms cooperation</Link>
                </div>
            </div>
            <ProfileAccountIconUserAccSetingsPage />
            <ChoosenCouriersIcon />
        </header>
    ); 
}