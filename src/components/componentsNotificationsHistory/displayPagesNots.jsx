import { useHookPagesNots } from "../globalHooks/usePagesNots";
import imgSsCoorchik from '../componentsHomePage/imagelogoSSCoorchik.png';
import suppServiceIcon from '../componentsHomePage/suppServiceIcon.png';
import moment from 'moment';
import { useFilteredOperations } from "../globalHooks/filteredOperations";


export default function DisplayPagesNots() {
    const {
        arrActionFilteredNots
    } = useFilteredOperations();
    //check show filter notifications or not
    const filterShowNotsSs = arrActionFilteredNots.find(items => items.nameSenderNot === 'SS Coorchik') ? true : false;

    const {
        updDataArrHistoryNot,
        showPageOneNot,
        showPageTwoNot,
        showPageThreeNot,
        showPageFourNot,
        showPageFiveNot,
        showPageSixNot,
        showPageSevenNot,
        showPageEightNot,
    } = useHookPagesNots();
    const dataPageOneHistory = showPageOneNot ? updDataArrHistoryNot[0] : false;
    const dataPageTwoHistory = showPageTwoNot ? updDataArrHistoryNot[1] : false;
    const dataPageThreeHistory = showPageThreeNot ? updDataArrHistoryNot[2] : false;
    const dataPageFourHistory = showPageFourNot ? updDataArrHistoryNot[3] : false;
    const dataPageFiveHistory = showPageFiveNot ? updDataArrHistoryNot[4] : false;
    const dataPageSixHistory = showPageSixNot ? updDataArrHistoryNot[5] : false;
    const dataPageSevenHistory = showPageSevenNot ? updDataArrHistoryNot[6] : false;
    const dataPageEightHistory = showPageEightNot ? updDataArrHistoryNot[7] : false;



    const displayPageOneHistory = (dataPageOneHistory && dataPageOneHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }

        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>
                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageTwoHistory = (dataPageTwoHistory && dataPageTwoHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>
                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageThreeHistory = (dataPageThreeHistory && dataPageThreeHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>
                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageFourHistory = (dataPageFourHistory && dataPageFourHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>

                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageFiveHistory = (dataPageFiveHistory && dataPageFiveHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>
                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageSixHistory = (dataPageSixHistory && dataPageSixHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>
                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageSevenHistory = (dataPageSevenHistory && dataPageSevenHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>

                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    const displayPageEightHistory = (dataPageEightHistory && dataPageEightHistory.map((history, index) => {
        const senderIsSs = history.senderNotification === 'SS Coorchik';

        const createdAtMoment = moment(history.dateNotification);
        let formattedDate = '';
        if (createdAtMoment.isSame(moment(), 'day')) {
            formattedDate = `today in ${createdAtMoment.format('HH:mm')}`;
        } else if (createdAtMoment.isSame(moment().subtract(1, 'day'), 'day')) {
            formattedDate = `yesterday in ${createdAtMoment.format('HH:mm')}`;
        } else {
            formattedDate = `${createdAtMoment.format('DD')} ${createdAtMoment.format('MMMM')} in ${createdAtMoment.format('HH:mm')}`;
        }



        return (
            <div className='display-history-notifications'>
                {filterShowNotsSs ? <><div className='user-notification_history-cont' key={index}>
                    {senderIsSs ?
                        (
                            <div className='user-notification-history_sender' key={index}>
                                <img src={imgSsCoorchik} alt='logo coorchik' className='img-notification_sender-supp-serv' />
                                <div className='sender-not-departm'>
                                    <img src={suppServiceIcon} alt='service support coorchik' className='icon-supp-serv-sender-not' />
                                </div>
                                <div className='text-nofication-cont'>
                                    <span className='text-notification_sender-supp-serv_history'>
                                        The support service has successfully solved the technical
                                        problem, you have been awarded bonuses!
                                    </span>
                                    <br></br>
                                    <span className='date-notification_history'>{formattedDate}</span>
                                </div>

                            </div>
                        )
                        : null}
                </div> </> : null}
            </div>
        );
    }).reverse());
    return (
        <>
            {displayPageOneHistory}
            {displayPageTwoHistory}
            {displayPageThreeHistory}
            {displayPageFourHistory}
            {displayPageFiveHistory}
            {displayPageSixHistory}
            {showPageSevenNot ? displayPageSevenHistory : null}
            {showPageEightNot ? displayPageEightHistory : null}
        </>
    );
}