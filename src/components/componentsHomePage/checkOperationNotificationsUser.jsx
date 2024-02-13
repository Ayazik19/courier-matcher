import { useHooksProcessingDatabaseUserNotificationsContext } from '../globalHooks/hooksProcessingDatabaseUserNotifications.js';
import imgCountUnseenNotOne from '../componentsHomePage/number-1.png';
import imgCountUnseenNotTwo from '../componentsHomePage/number-2.png';
import imgCountUnseenNotThree from '../componentsHomePage/number-3.png';
import imgCountUnseenNotFour from '../componentsHomePage/number-4.png';
import imgCountUnseenNotFive from '../componentsHomePage/number-5.png';
import imgCountUnseenNotSix from '../componentsHomePage/number-6.png';
import imgCountUnseenNotSeven from '../componentsHomePage/number-7.png';
import imgCountUnseenNotEight from './number-8.png';
import imgCountUnseenNotNine from './number-9.png';
import './checkOperationNotificationsUser.css';
import { useState, useEffect, useCallback } from 'react';

export default function CheckOperationNotificationsUser() {
    const { calculateCountUnseenNotifications } = useHooksProcessingDatabaseUserNotificationsContext();

    const [countUnseenNotificationsOne, setCountUnseenNotificationsOne] = useState(false);
    const [countUnseenNotificationsTwo, setCountUnseenNotificationsTwo] = useState(false);
    const [countUnseenNotificationsThree, setCountUnseenNotificationsThree] = useState(false);
    const [countUnseenNotificationsFour, setCountUnseenNotificationsFour] = useState(false);
    const [countUnseenNotificationsFive, setCountUnseenNotificationsFive] = useState(false);
    const [countUnseenNotificationsSix, setCountUnseenNotificationsSix] = useState(false);
    const [countUnseenNotificationsSeven, setCountUnseenNotificationsSeven] = useState(false);
    const [countUnseenNotificationsEight, setCountUnseenNotificationsEight] = useState(false);
    const [countUnseenNotificationsNine, setCountUnseenNotificationsNine] = useState(false);
    const [countUnseenNotificationsMoreNine, setCountUnseenNotificationsMoreNine] = useState(false);


    const updateCountUnseenNotifications = useCallback(() => {
        setCountUnseenNotificationsOne(calculateCountUnseenNotifications === 1);
        setCountUnseenNotificationsTwo(calculateCountUnseenNotifications === 2);
        setCountUnseenNotificationsThree(calculateCountUnseenNotifications === 3);
        setCountUnseenNotificationsFour(calculateCountUnseenNotifications === 4);
        setCountUnseenNotificationsFive(calculateCountUnseenNotifications === 5);
        setCountUnseenNotificationsSix(calculateCountUnseenNotifications === 6);
        setCountUnseenNotificationsSeven(calculateCountUnseenNotifications === 7);
        setCountUnseenNotificationsEight(calculateCountUnseenNotifications === 8);
        setCountUnseenNotificationsNine(calculateCountUnseenNotifications === 9);
        setCountUnseenNotificationsMoreNine(calculateCountUnseenNotifications > 9);
    }, [calculateCountUnseenNotifications])

    useEffect(() => {
        updateCountUnseenNotifications();
    }, [updateCountUnseenNotifications])


    return (
        <div>
            {calculateCountUnseenNotifications > 0 ?
                (
                    <div>
                        {countUnseenNotificationsOne ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotOne} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsTwo ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotTwo} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsThree ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotThree} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsFour ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotFour} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsFive ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotFive} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsSix ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotSix} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsSeven ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotSeven} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsEight ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotEight} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsNine ?
                            (
                                <div className='count-unseen-not'>
                                    <img src={imgCountUnseenNotNine} className='img-count-unseen-not' />
                                </div>
                            )
                            : null}
                        {countUnseenNotificationsMoreNine ?
                            (
                                <div className='count-unseen-not'>
                                    <div className='back-display-count'>
                                        <span className='display-count-uns-more-nine'>
                                            9+
                                        </span>
                                    </div>
                                </div>
                            )
                            : null}
                    </div>
                )
                : null
            }
        </div>
    );
}