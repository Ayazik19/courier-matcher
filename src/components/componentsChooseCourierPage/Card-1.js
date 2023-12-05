import {MyImg} from '../../MyImg';
import AwardsItems from './AwardsList';
import {courierYandex} from '../../ArrayWithNameCourier/dateCouriers';
import './card-1.css';
import ButtonDescription from './ButtonMoreDescription';

export default function Card1(){
    return(
    <div className='card-1'>
        <div className='card-inner-1'>
            <div className='card-front-1'>
                <MyImg />
                <br></br> <h1>Yandex courier with a large experience</h1>
            </div>
            
            <div className='card-back-1'>
                    <MyImg />
                <br></br>
                <h3 key = {courierYandex[0].id}>{courierYandex[0].name} {courierYandex[0].lastname}</h3>
                <p className='card-back-1-awards-description'> Has been a Yandex employee for about 2 years, during this time, he received awards: </p>
                    <AwardsItems />
                    <ButtonDescription />
            </div>
        </div>
    </div>
    );
}

