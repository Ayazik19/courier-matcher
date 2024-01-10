import { useAuth } from '../globalHooks/useauth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './choosenCouriersIcon.css';
import choosenCouriersIcon from './choosenCouriersIcon.png';
import { useHookHeaderIconsEmergenceContext } from '../globalHooks/hookHeaderNavIconsEmergence';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors';

export default function ChoosenCouriersIcon(){
    const navigate = useNavigate();
    const { 
        isAuth,
        nameCourier, 
        isSelectedCourier
    } = useAuth();

    const {
        hideIconAddCourier, 
        hideContIconUserAcc, 
        hideNotificationIcon, 
        setHideIconAddCourier
    } = useHookHeaderIconsEmergenceContext();
    const {isSelectedElement} = useHookMouseFunctionalityErrorsContext();

    const [eventClickTracking, setEventClickTracking] = useState(1);

    const hadnleShowChoosenCourier = () => {
        setHideIconAddCourier(false);
        setEventClickTracking(eventClickTracking + 1);
        if(!hideIconAddCourier){
            if(eventClickTracking %2 == 0){
                setHideIconAddCourier(true);
            }
            else{
                setHideIconAddCourier(false);
            }
        }
    }

    const hadnleRedirectChooseCourierPage = () => {
        navigate('/ChooseCourier');
    }

    useEffect(() => {
        if(!hideContIconUserAcc || !hideNotificationIcon || isSelectedElement) {
            setHideIconAddCourier(true);
        }
    },[hideContIconUserAcc, hideNotificationIcon, isSelectedElement]);

    return isAuth ? (
        <div className='choosen-couriers-icon'>
            <img 
                src = {choosenCouriersIcon} 
                className='choosen-couriers-icon-img'
                onClick={hadnleShowChoosenCourier}
            />
            {!hideIconAddCourier ? 
            <div className='show-choosen-couriers'>
                {isSelectedCourier ? 
                <div className='selected-couriers_true'>

                </div>
                :
                <div  className='selected-couriers_false'>
                    <div className='text-choose-courier'>
                        <span className='attribute-name-selected-home-page-couriers_false'>
                            You haven't chosen a courier yet
                        </span>
                        <button 
                            className='button-redirect-choose-courier-home-page'
                            onClick={hadnleRedirectChooseCourierPage}
                        >
                            Add courier
                        </button>
                    </div>
                </div>}
            </div> : null}
        </div>
    ) : null;
}