import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice.js';
import { setCookieAcceptUser } from '../store/slices/userSlice.js';
import { selectCookieAcceptance } from '../store/slices/userSlice.js';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './signInPage.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import LoadingDataForm from '../loadingData/loadingDataForm';
import logoSite from '../componentsHomePage/logoSite.png';
import FooterForm from '../componentsRegistrationPage/FooterForm.jsx'
import { inputEmailPasswordReset } from '../componentsSignInPasswordRecoveryPage/signInPasswordRecoveryPage.jsx';
import './signInUserOnlyPassPage.css';
import CheckAccountPhotoProfileSignIn from './checkAccountPhotoProfileSignIn.jsx';
import { useAuth } from '../hook/useauth.js';

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);


export default function SignInUserOnlyPassPage(){
    const navigate = useNavigate();

    const { cookie } = useAuth();

    const [isBackRegister, setIsBackRegister] = useState(false);
    const [isChooseAccPage, setIsChooseAccPage] = useState(false);

    const handleChooseAccPage = () =>{
        setIsChooseAccPage(true);
        navigate('/SignIn-registration-choose-acc-user');
    }

    const handleBackRegister = () => {
        setIsBackRegister(true);
    }

    const [cookies, setCookie] = useCookies(['userEmail']);
    const [isSetCookieInFirebaseTrue, setIsCookieInFirebaseTrue] = useState(false);
    const [isShowCheckBoxCookies, setShowCheckBoxCookies] = useState(false);
    const [isCheckedCheckBoxCookies, setIsCheckedCheckBoxCookies] = useState(false);
    
    
    const handleCheckboxChange = async (event) => {
        setIsCheckedCheckBoxCookies(event.target.checked);
    };


    
    const [ isLoadingData, setLoadingData] = useState(false);

    const { register, handleSubmit} = useForm({mode:'onChange'});

    const [ isErrorUserData, setIsErrorUserData ] = useState(false);

    const { email, displayName } = useAuth();

    const [ isShiftDisplayName, setIsShiftDisplayName] = useState(false);

    useEffect(() => {
        const countEmail = email;
        const length = countEmail.length;

        if(length >= 23) {
            setIsShiftDisplayName(true);
        }
        else{
            setIsShiftDisplayName(false);
        }

        if (cookie === false) {
            setShowCheckBoxCookies(true);
        } else if (cookie === true) {
            setShowCheckBoxCookies(false);
        }
    },[]);


    const dispatch = useDispatch();

    const handleSignIn = async (data) => {
        const auth = getAuth();
        const { inputPassSignIn } = data;

        setLoadingData(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, inputEmailPasswordReset, inputPassSignIn);
            const user = userCredential.user;

    
            if (user && user.email) {
                const userDocRef = doc(db, "users", user.email);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const cookieValueInFirebase = userData.cookie;
                    const displayName = userData.displayName;
                    const token = await user.getIdToken(); // Получаем токен доступа
                    
                    if (cookie === false) {
                        // setShowCheckBoxCookies(true);
                        try {
                            await updateDoc(doc(db, "users", user.email), {
                                cookie: isCheckedCheckBoxCookies,
                            });
                            auth.onAuthStateChanged((user) => {
                                if (user) {
                                    const expirationDateCookies = new Date("2023-12-31T23:59:59");
                                    let userEmails = cookies.emailUser ? cookies.emailUser : [];
                                    userEmails.push(user.email);
                                    setCookie('emailUser', userEmails, { path: '/', expires: expirationDateCookies });
                                    console.log(userEmails);
                                }
                            });
                            dispatch(setUser({
                                email: user.email,
                                id: user.uid,
                                token: token,
                                displayName: displayName,
                                cookie: isCheckedCheckBoxCookies,
                            }));
                            setLoadingData(false);
                            navigate('/');
                            console.log("Cookie field updated successfully");
                        } catch (error) {
                            console.log("Error updating cookie field:", error);
                        }
                    }
                    else if (cookieValueInFirebase === true) {
                        setIsCookieInFirebaseTrue(true);
                        dispatch(setUser({
                            email: user.email,
                            id: user.uid,
                            token: token,
                            displayName: displayName,
                            cookie: cookieValueInFirebase,
                        }));
                        setLoadingData(false);
                        navigate('/');
                    }
                }
            } 
        } catch (err) {
            setLoadingData(false);
            setIsErrorUserData(true);
        }
    }

    return(
        <div className='page-sign-in'>
        <form onSubmit={handleSubmit(handleSignIn)} className='form-sign-in-only-pass-page'>
            <div>
                {isLoadingData ? <LoadingDataForm/> : null}
            </div>
            <div className='form-line'>
                <div className='header-form'>
                    <img src = {logoSite} className='form-sign-in-logo-site'/>
                </div>
                <div className={isSetCookieInFirebaseTrue ? 'form-user-name-acc-sign-in_cookie-value-false' : 'form-user-name-acc-sign-in_cookie-value-true'}>
                    <span className='span-large-text-name-acc-sign-in'>
                        {displayName}
                    </span>       
                </div>
                <div className='form-user-nav-sign-in'>
                    <button 
                        className='button-user-select-acc'
                        onClick={handleChooseAccPage}
                    >
                        <div className = {isShiftDisplayName ? 'acc-icon-sign-in_long-count-email' : 'acc-icon-sign-in_small-count-email'}>
                            <CheckAccountPhotoProfileSignIn />
                        </div>
                        <span className={isShiftDisplayName ? 'text-acc-user-sign-in_long-count-email' : 'text-acc-user-sign-in_small-count-email'}>
                            {email}
                        </span>
                        <div className="krLnGe">
                            <svg aria-hidden="true" className="stUf5b MSBt4d" fill="currentColor" focusable="false" width="24px" height="30px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                                <polygon points="12,16.41 5.29,9.71 6.71,8.29 12,13.59 17.29,8.29 18.71,9.71"></polygon>
                            </svg>
                        </div>
                    </button>
                </div>
                <div>
                    <label className={isErrorUserData ? 'span-input-error-2' : 'span-input-2'}>
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
                    {isShowCheckBoxCookies ? 
                        <label className='input-remeber-user'>
                            <input 
                                className='password-reset-input-remember-user-acc_checkbox'
                                type="checkbox"
                                onChange={handleCheckboxChange}
                            />
                            Remeber me
                        </label>
                    : null } 
                
                    
                    <span className='forgot-pass_helper-text-input'>
                        <Link to = '/sign-In-password-recovery'>
                            I don't remember the password
                        </Link>
                    </span>
                    <div className={isSetCookieInFirebaseTrue ? 'text-form-error-pass-resest-user-data_cookie-value-false' : 'text-form-error-pass-resest-user-data_cookie-value-'}>
                        {isErrorUserData ? <p>Incorrect password. Try again.</p> : null}                     
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