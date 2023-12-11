import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { setUser } from '../store/slices/userSlice.js';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './signInPage.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import LoadingDataForm from '../loadingData/loadingDataForm';
import logoSite from '../componentsHomePage/logoSite.png';
import FooterForm from '../componentsRegistrationPage/FooterForm.jsx'
import SignInUserOnlyPassPage from './signInUserOnlyPassPage.jsx';
import { useAuth } from '../hook/useauth.js';



const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);


export default function SignInPage() {
    const [ isLoadingData, setLoadingData] = useState(false);
    const [ isErrorUserData, setIsErrorUserData ] = useState(false);
    const [isBackRegister, setIsBackRegister] = useState(false);

    const handleBackRegister = () => {
        setIsBackRegister(true);
    }

    const { isAuth, email } = useAuth();
    const { register, handleSubmit} = useForm({mode:'onChange'});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSignIn = async (data) => {
        const auth = getAuth();
        const { inputEmailSignIn, inputPassSignIn } = data;
        setLoadingData(true);
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, inputEmailSignIn, inputPassSignIn);
            const user = userCredential.user;
    
            if (user) {
                const userDocRef = doc(db, "users", user.email);
                const userDocSnapshot = await getDoc(userDocRef);
    
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const displayName = userData.displayName;
                    const token = await user.getIdToken();
                        dispatch(setUser({
                            email: user.email,
                            id: user.uid,
                            token: token,
                            displayName: displayName,
                        }));
                        setLoadingData(false);
                        navigate('/');
                    }
            }
        } catch (error) {
            setLoadingData(false);
            setIsErrorUserData(true);
        }
    };


    return isAuth ? (
        <div>
            <SignInUserOnlyPassPage />
        </div>
    )
    : (
        <div className='page-sign-in'>
            <form onSubmit={handleSubmit(handleSignIn)} className='form-sign-in-page'>
                <div>
                    {isLoadingData ? <LoadingDataForm/> : null}
                </div>
                <div className='form-line'>
                    <div className='header-form'>
                        <img src = {logoSite} className='form-sign-in-logo-site'/>
                    </div>
                    <div className='text-form-sign-in'>
                        <span className='span-large-text-sign-in'>
                            Sign In
                        </span>       
                    </div>
                    <div>
                        <label className={isErrorUserData ? 'span-input-error-1' : 'span-input-1'}>
                            Email
                        </label>
                        <input
                            {...register('inputEmailSignIn',{
                                required: "Filid must be filled in",
                            })} 
                            type="email"
                            className={isErrorUserData ? 'signIn-input-error-1' : 'signIn-input-1'}
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label className={isErrorUserData ? 'span-sign-in-input-error-2' : 'span-sign-in-input-2'}>
                            Password
                        </label>
                        <input 
                            {...register('inputPassSignIn',{
                                required: "Filid must be filled in",
                                minLength : {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                            type="password"
                            className={isErrorUserData ? 'signIn-input-error-2' : 'signIn-input-2'}
                        />
                        <span className='forgot-pass_helper-text-input'>
                            <Link to = '/sign-In-password-recovery'>
                                I don't remember the password
                            </Link>
                        </span>
                        <div className='text-form-error-sign-in-user-data'>
                            {isErrorUserData ? <p>Incorrect email or password.</p> : null}                     
                        </div>
                    </div>
                    <button 
                        type='submit'
                        className='button-sign-in'>
                        Sign In
                    </button>
                    <div>
                        <button 
                            className='button-register-sign-in-only-pass-page'
                            onClick={handleBackRegister}
                        >
                            <Link to="/Registration-SignIn" className='link-register-back'>
                                Register
                            </Link>
                        </button>
                    </div> 
                </div>
            </form>
            <FooterForm />
        </div>
    );
}



