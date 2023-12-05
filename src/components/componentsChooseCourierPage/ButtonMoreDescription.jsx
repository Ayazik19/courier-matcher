import { useState } from "react";
import {courierYandex} from '../../ArrayWithNameCourier/dateCouriers';


export default function ButtonDescription(){
    const[showMore, setShowMore] = useState(false);

    const handleShowMoreClick = () => {
        setShowMore(!showMore);
    };
    console.log(showMore);

    return(
    <div>
        <button onClick={handleShowMoreClick} className='card-back-1-button1-more-description'>{showMore ? 'Hide discription':'Show more discription'}</button>
        {showMore && (
            <>
                <p key={courierYandex[0].id}>{courierYandex[0].singularity}</p>
            </>
        )} 
    </div>

    );
};