import { useAuth } from '../hook/useauth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './choosenCouriersIcon.css';
import choosenCouriersIcon from './choosenCouriersIcon.png';

export default function ChoosenCouriersIcon(){
    const navigate = useNavigate();
    const { 
        nameCourier, 
        isSelectedCourier
        } = useAuth();

    const [isShowChoosenCouriers, setShowChoosenCouriers] = useState(false);
    const [eventClickTracking, setEventClickTracking] = useState(1);

    const hadnleShowChoosenCourier = () => {
        setShowChoosenCouriers(true);
        setEventClickTracking(eventClickTracking + 1);
        if(eventClickTracking %2 == 0){
            setShowChoosenCouriers(false);
        }
        else{
            setShowChoosenCouriers(true);
        }
    }




    const hadnleRedirectChooseCourierPage = () => {
        navigate('/ChooseCourier');
    }

    return(
        <div className='choosen-couriers-icon'>
            <img 
                src = {choosenCouriersIcon} 
                className='choosen-couriers-icon-img'
                onClick={hadnleShowChoosenCourier}
            />
            {isShowChoosenCouriers ? 
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
    );
}