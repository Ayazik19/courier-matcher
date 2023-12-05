import React, {useEffect, useState} from 'react';
import './LoadingAnimation.css';

export default function SetTimeoutLoadingOperation(){
    const[showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowLoading(true);
    }, 10000);
    return () => clearTimeout(timer);
    },[]);

    return(
        (showLoading && <span className='loader'></span>)
    );
}