import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserInformErrors, removeUser, setUserProfile } from '../store/slices/userSlice.js';
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
import { useAuth } from '../globalHooks/useauth.js';
import { useHookMouseFunctionalityErrorsContext } from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';
import { useHookSignInPagesContext } from './useHookSignInPages.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SignInUserOnlyPassPage() {
    const navigate = useNavigate();

    const { setIsRedirectSignInOnlyPassPage } = useHookSignInPagesContext();

    const { setSelectedElement } = useHookMouseFunctionalityErrorsContext();

    const [isBackRegister, setIsBackRegister] = useState(false);

    const handleChooseAccPage = () => {
        dispatch(removeUser());
        setIsRedirectSignInOnlyPassPage(false);
        navigate('/SignIn-Registration');
    }

    const handleBackRegister = () => {
        setIsBackRegister(true);
    }

    const [isLoadingData, setLoadingData] = useState(false);

    const { register, handleSubmit } = useForm({ mode: 'onChange' });

    const [isErrorUserData, setIsErrorUserData] = useState(false);

    const { email, displayName } = useAuth();

    const [isShiftDisplayName, setIsShiftDisplayName] = useState(false);

    useEffect(() => {
        const countEmail = email;
        const length = countEmail.length;

        if (length >= 20) {
            setIsShiftDisplayName(true);
        }
        else {
            setIsShiftDisplayName(false);
        }

    }, []);


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
                    const displayName = userData.displayName;
                    const photoAcc = userData.photoAcc;
                    const gender = userData.gender;
                    const streetLocation = userData.streetLocation;
                    const townLocation = userData.townLocation;
                    const phoneNumber = userData.phoneNumber;
                    const idInformErrors = userData.idInformErrors || [];
                    const token = await user.getIdToken();

                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: token,
                        displayName: displayName,
                    }));
                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: gender,
                        phoneNumber: phoneNumber,
                        townLocation: townLocation,
                        streetLocation: streetLocation
                    }))

                    if (idInformErrors !== undefined) {
                        for (let i = 0; i < idInformErrors.length; i++) {
                          const id = idInformErrors[i];
                      
                          const idInformErrorDocRef = doc(db, 'informErrors', id);
                          const idInformErrorDocSnapshot = await getDoc(idInformErrorDocRef);
                      
                          if (idInformErrorDocSnapshot.exists()) {
                            const dataIdInformError = idInformErrorDocSnapshot.data();
                            const isFixed = dataIdInformError.isFixed;
                            const textFeedBackUser = dataIdInformError.textFeedBackUser;
                      
                            dispatch(setUserInformErrors({
                              type: 'ADD_INFORM_ERROR',
                              payload: {
                                idInformErrors: id,
                                isFixed: isFixed,
                                textFeedBackUser: textFeedBackUser,
                              }
                            }));
                          }
                        }
                      }
                    setSelectedElement(false);
                    setLoadingData(false);
                    navigate('/');
                }
            }
        } catch (err) {
            setLoadingData(false);
            setIsErrorUserData(true);
            console.log(err);
        }
    }

    return (
        <div className='page-sign-in'>
            <form onSubmit={handleSubmit(handleSignIn)} className='form-sign-in-only-pass-page'>
                <div>
                    {isLoadingData ? <LoadingDataForm /> : null}
                </div>
                <div className='form-line'>
                    <div className='header-form'>
                        <img src={logoSite} className='form-sign-in-logo-site' />
                    </div>
                    <div className='form-user-name-acc-sign-in_cookie-value-false'>
                        <span className='span-large-text-name-acc-sign-in'>
                            {displayName}
                        </span>
                    </div>
                    <div className='form-user-nav-sign-in'>
                        <button
                            className='button-user-select-acc'
                            onClick={handleChooseAccPage}
                        >
                            <div className={isShiftDisplayName ? 'acc-icon-sign-in_long-count-email' : 'acc-icon-sign-in_small-count-email'}>
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
                            {...register('inputPassSignIn', {
                                required: "Filid must be filled in",
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                            type="password"
                            className={isErrorUserData ? 'signIn-input-error-2' : 'signIn-input-2'}
                        />


                        <span className='forgot-pass_helper-text-input'>
                            <Link to='/sign-In-password-recovery'>
                                I don't remember the password
                            </Link>
                        </span>
                        <div className='text-form-error-pass-resest-user-data_cookie-value-false'>
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