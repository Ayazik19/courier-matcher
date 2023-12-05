import { Link } from 'react-router-dom';
import { useState } from 'react';
import './ButtonRegister.css';

export default function SignInPageButtonBack(){
    const [isBackRegister, setIsBackRegister] = useState(false);

    const handleBackRegister = () => {
        setIsBackRegister(true);
    }


    return(
        <div>
            <button 
                className='button-register-sign-in'
                onClick={handleBackRegister}
            >
                <Link to="/Registration-SignIn" className='link-register-back'>
                    Register
                </Link>
            </button>
        </div>
    );
}