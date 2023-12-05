import {useState} from 'react';
import { Link } from 'react-router-dom';
import './registrationPageButtonBack.css';

export default function RegistrationPageButtonBack(){
    const [isBack, setIsBack] = useState(false);

    const handleBack = () => {
        setIsBack(true);
    }

    return(
        <div className='button-back'>
            <button onClick={handleBack} className='button-back'>
                <Link to='/SignIn-Registration' className='signIn-registration-link_style-empty'>
                    <div className='arrow_left'>
                        {'\u2190'}
                    </div>
                </Link>
            </button>
        </div>
    )
}