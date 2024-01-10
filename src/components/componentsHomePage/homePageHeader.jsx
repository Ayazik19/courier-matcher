import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ProfileAccountIconHomePage from "./profileAccountIconHomePage";
import logoSite from './logoSite.png';
import ChoosenCouriersIcon from './choosenCouriersIcon.jsx';
import './homePageHeader.css';
import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import NotificationFunctionality from './notificationFunctionality.jsx';

export default function HomePageHeader() {
    const {setHideContUserAcc} = useHookHeaderIconsEmergenceContext();

    const [isFixStateOne, setIsFixStateOne] = useState(false);
    const [isFixStateTwo, setIsFixStateTwo] = useState(false);

    const [isContentAdvantages, setContentAdvantages] = useState(false);
    const [isContentReviews, setContentReviews] = useState(false);
    const [isContentInstruction, setContentInstruction] = useState(false);
    const [isContentExplanation, setContentExplanation] = useState(false);

    useEffect(() => {

        const handleScrollContent = () => {
            const scrollContentOffsetY = window.scrollY;

            if (scrollContentOffsetY >= 532 && 1116 >= scrollContentOffsetY) {
                setContentAdvantages(true);
            } else {
                setContentAdvantages(false);
            }

            if (scrollContentOffsetY >= 1215 && 1865 >= scrollContentOffsetY) {
                setContentReviews(true);
            } else {
                setContentReviews(false);
            }

            if (scrollContentOffsetY >= 1900 && 2350 >= scrollContentOffsetY) {
                setContentInstruction(true);
            } else {
                setContentInstruction(false);
            }

            if (scrollContentOffsetY >= 2375) {
                setContentExplanation(true);
            } else {
                setContentExplanation(false);
            }
        };

        window.addEventListener('scroll', handleScrollContent);

        return () => {
            window.removeEventListener('scroll', handleScrollContent);
        };

    }, []);

    useEffect(() => {
        const handleScrollStateOne = () => {
            const scrollStateOneLimitOffsetY = window.scrollY;

            if (scrollStateOneLimitOffsetY >= 94 && 448 >= scrollStateOneLimitOffsetY) {
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

    useEffect(() => {
        const handleScrollStateTwo = () => {
            const scrollStateTwoLimitOffsetY = window.scrollY;

            if (scrollStateTwoLimitOffsetY >= 449) {
                setIsFixStateTwo(true);
            } else {
                setIsFixStateTwo(false);
            }
        };

        window.addEventListener('scroll', handleScrollStateTwo);

        return () => {
            window.removeEventListener('scroll', handleScrollStateTwo);
        };
    }, []);




    

    return isFixStateTwo? (
        <header className='sticky-header-underline'>
            <div className='page-line-header'>
                <div className="name-site">
                    <span className='span-home-page-header'>
                        <img src = {logoSite} className='home-page-logo-site'/>
                    </span>
                </div>
            </div>
            <div className="navbar">
                <div className='nav-links'>
                    <a className={`${isContentAdvantages ?  'navbar-link-1_color-gray': 'navbar-link-1-desc-show_true'}`} href='#title-1'>Advantages</a>
                    <a className={`${isContentReviews ? 'navbar-link-2_color-gray' : 'navbar-link-2-desc-show_true'}`} href='#title-2'>Reviews</a>
                    <a className={`${isContentInstruction ? 'navbar-link-3_color-gray' : 'navbar-link-3-desc-show_true'}`} href='#title-3'>Instruction</a>                   
                    <a className={`${isContentExplanation ? 'navbar-link-4_color-gray' : 'navbar-link-4-desc-show_true'}`} href='#footer'>Explenation</a>
                </div>
            </div>
            <ProfileAccountIconHomePage />
            <NotificationFunctionality />
            <ChoosenCouriersIcon />
        </header>
    ) : (
        <header className={`${isFixStateOne ? 'sticky' : ''}`}>
            <div className='page-line-header'>
                <div className="name-site">
                    <span className='span-home-page-header'>
                    <img src = {logoSite} className='home-page-logo-site'/>
                    </span>
                </div>
            </div>
            <div className="navbar">
                <div className='nav-links'>
                    <Link className="navbar-link-1-desc-show_false" to='/#'>About</Link>
                    <Link className="navbar-link-2-desc-show_false" to='/ChooseCourier' onClick={() => {setHideContUserAcc(true)}}>Choose</Link>
                    <Link className="navbar-link-3-desc-show_false" to='/Terms-Cooperation' onClick={() => {setHideContUserAcc(true)}}>Terms cooperation</Link>
                </div>
            </div>
            <ProfileAccountIconHomePage />
            <NotificationFunctionality />
            <ChoosenCouriersIcon />
        </header>
    ); 
}