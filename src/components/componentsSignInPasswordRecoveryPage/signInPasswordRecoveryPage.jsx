import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { setUser, setUserProfile } from '../store/slices/userSlice.js';
import { useDispatch } from "react-redux";
import {useHookSignInPagesContext} from '../componentsSignInPage/useHookSignInPages.js';
import { useForm } from 'react-hook-form';
import './signInPasswordRecoveryPage.css';
import logoSite from '../componentsHomePage/logoSite.png';
import RegistrationPageButtonBack from '../componentsRegistrationPage/registrationPageButtonBack';
import LoadingData from '../loadingData/loadingDataForm';
import { useNavigate } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export let inputEmailPasswordReset;

export default function SignInPasswordRecoveryPage() {
    const [isLoadingData, setLoadingData] = useState(false);
    const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
    const { setIsRedirectSignInOnlyPassPage } = useHookSignInPagesContext();

    const [isEmailLinkHaveBeenSending, setisEmailLinkHaveBeenSending] = useState(false);
    const [isErrorUserData, setIsErrorUserData] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleResetPasswordAcc = async (data) => {
        const auth = getAuth();
        inputEmailPasswordReset = data.inputEmailPasswordReset;
        setLoadingData(true);
        try {
            const userDocRef = doc(db, "users", inputEmailPasswordReset);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                await sendPasswordResetEmail(auth, inputEmailPasswordReset);
                const userData = userDocSnapshot.data();
                const photoAcc = userData.photoAcc;
                const displayName = userData.displayName;
                const token = await auth.currentUser.getIdToken();

                dispatch(setUser({
                    token: token,
                    email: inputEmailPasswordReset,
                    displayName: displayName,
                }));
                dispatch(setUserProfile({ photoAcc: photoAcc }));

                setIsRedirectSignInOnlyPassPage(true);
                setLoadingData(false);
                setIsErrorUserData(false);
                setisEmailLinkHaveBeenSending(true);

            } else {
                setLoadingData(false);
                setIsErrorUserData(true);
            }
        } catch (error) {
            setLoadingData(false);
            setisEmailLinkHaveBeenSending(false);
        }
    };

    useEffect(() => {
        if (setIsRedirectSignInOnlyPassPage) {
          setIsRedirectSignInOnlyPassPage(true); 
        }
      }, [setIsRedirectSignInOnlyPassPage]);

    const handleBack = () => {
        navigate('/SignIn-Registration');
    }


    return (
        <div className='page-sign-in-recovery'>
            <form onSubmit={handleSubmit(handleResetPasswordAcc)} className='form-reset-pass'>
                <div>
                    {isLoadingData ? <LoadingData /> : null}
                </div>
                <div className='form-line'>
                    <div className='header-form-sing-in-recovery'>
                        <div className='button-back_sign-in'>
                            <button onClick={handleBack} className='button-back_sign-in'>
                                <div className='arrow_sign-in-left'>
                                    {'\u2190'}
                                </div>
                            </button>
                        </div>
                        <img src={logoSite} className='form-logo-site' />
                    </div>
                    <div>
                        <span className='span-text-form-email-password-reset_text-line-1'>
                            Enter your email, we will send you
                        </span>
                        <span className='span-text-form-email-password-reset_text-line-2'>
                            a link to reset your password
                        </span>
                    </div>
                    <div>
                        <label className={isErrorUserData ? 'span-input-email-password-reset-error-data' : 'span-input-email-password-reset'}>
                            Email
                        </label>
                        <input
                            {...register('inputEmailPasswordReset', {
                            })}
                            type="email"
                            placeholder="example@example.com"
                            className={isErrorUserData ? 'input-email-password-reset-error-data' : 'input-email-password-reset'}
                        />
                    </div>
                    <div className='text-form-link-sending-succesfully'>
                        {isEmailLinkHaveBeenSending ? <p>The link was successfully sent to the email!</p> : null}
                    </div>
                    <div className='text-form-error-password-reset-user-data'>
                        {isErrorUserData ? <p>Incorrect email. Try again.</p> : null}
                    </div>
                    <button
                        className='button-reset-password'
                        type='submit'
                        aria-required
                    >
                        Reset password
                    </button>
                </div>
            </form>
        </div>
    );
}
