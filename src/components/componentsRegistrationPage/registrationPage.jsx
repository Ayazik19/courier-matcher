import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { setUser, setUserInformErrors, setUserProfile } from "../store/slices/userSlice";
import './registrationPage.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig } from '../firebase';
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import RegistrationPageButtonBack from './registrationPageButtonBack.jsx';
import logoSite from '../componentsHomePage/logoSite.png';
import LoadingDataForm from '../loadingData/loadingDataForm';
import FooterForm from '../componentsRegistrationPage/FooterForm.jsx'
import {useHookMouseFunctionalityErrorsContext} from '../../mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';


const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

export default function RegistrationPage() {
    const navigate = useNavigate();

    const [isLoadingData, setLoadingData] = useState(false);

    const { register, formState: { errors, isSubmitted }, handleSubmit } = useForm({ mode: 'onSubmit' });
    const { setSelectedElement } = useHookMouseFunctionalityErrorsContext();


    const [ isErrorInputOne, setErrorInputOne ] = useState (false);
    const [ isErrorInputTwo, setErrorInputTwo ] = useState (false);
    const [ isErrorInputThree, setErrorInputThree ] = useState (false);

    const [ isAccountAlreadyRegistered, setIsAccountAlreadyRegistered] = useState(false);

    const [isErrorAlreadyRegistredAndValidationInputThree, setIsErrorAlreadyRegistredAndValidationInputThree] = useState(false);




    useEffect(() => {
        if (!isSubmitted) {
            return;
        }


        if(errors.inputRegistrationLogin) {
            setErrorInputOne(true);
        } else if(!errors.inputRegistrationLogin){
            setErrorInputOne(false);
        }

        if(errors.inputRegistrationEmail) {
            setErrorInputTwo(true);
        } else if(!errors.inputRegistrationEmail){
            setErrorInputTwo(false);
        } 

        if(errors.inputRegistrationPass) {
            setErrorInputThree(true);
        } else if(!errors.inputRegistrationPass){
            setErrorInputThree(false);
        }
    },[errors, isSubmitted]);


    const dispatch = useDispatch();

    const handleRegister = async (data) => {
        const { inputRegistrationLogin, inputRegistrationEmail, inputRegistrationPass } = data;
        setLoadingData(true);
        try {
                const { user } = await createUserWithEmailAndPassword(auth, inputRegistrationEmail, inputRegistrationPass);
                await updateProfile(auth.currentUser, { displayName: inputRegistrationLogin });

                const token = await user.getIdToken(); 
                const usersCollection = collection(db, 'users');
                const newUser = {
                    email: user.email,
                    id: user.uid, 
                    displayName: inputRegistrationLogin,
                    token: token,
                };
                
                const userDocRef = doc(usersCollection, user.email); 
                await setDoc(userDocRef, newUser);

                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: token,
                    displayName: inputRegistrationLogin,
                }));
                dispatch(setUserProfile({}));
                dispatch(setUserInformErrors({}));
                setSelectedElement(false);
                setLoadingData(false);
                navigate("/");
        }
        catch (err) {
            setLoadingData(false);
            setIsAccountAlreadyRegistered(true);
            setIsErrorAlreadyRegistredAndValidationInputThree(true);
        }
    }

    return (
            <div className='page-registration'>
                <form onSubmit={handleSubmit(handleRegister)} className='form-registration-page'>
                    <div>
                        {isLoadingData ? <LoadingDataForm/> : null}
                    </div>
                    <div className='header-form'>
                        <RegistrationPageButtonBack />                    
                        <img src = {logoSite} className='form-registration-logo-site'/>
                    </div>
                    <div className='text-form'>
                        <span className='span-large-text-register-page'>
                            Enter your own data 
                        </span>
                        <br className='br-form-medium-span' />
                        <span className='span-medium-size-text'>
                            Protects your account record
                            <br></br>
                            with a strong password
                        </span>        
                    </div>
                    <div className='form-inputs'>
                        <div className='form-registration-input-1'>
                            <label className={isErrorInputOne ?  'span-input-error-1_borcolor-red': 'span-input-1'}>
                                Login
                            </label>
                            <input 
                                {...register('inputRegistrationLogin',{
                                    required: "Filid must be filled in",
                                    maxLength: {
                                        value: 10,
                                        message: "Login contains no more than 10"
                                    }
                                })}
                                className={isErrorInputOne ?  'registration-input-error-1_bcolor-red': 'registration-input-1'}
                                />
                            <div className='helper-text-inputs-registration-1'>
                                {errors?.inputRegistrationLogin && <p>{errors?.inputRegistrationLogin?.message}</p>}
                            </div>
                        </div>
                        <div className='form-registration-input-2'>
                            <label className={isErrorInputTwo ?  'span-registration-input-error-2_borcolor-red': 'span-registration-input-2'}>
                                Email
                            </label>
                            <input
                                {...register('inputRegistrationEmail',{
                                    required: "Filid must be filled in",
                                    pattern: {
                                        value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Incorrect email"
                                    }
                                })}
                                type = "email"
                                placeholder="example@example.com"
                                className={isErrorInputTwo ?  'registration-input-error-2_bcolor-red': 'registration-input-2'}
                            />
                            <div className='helper-text-inputs-registration-2'>
                                {errors?.inputRegistrationEmail && <p>{errors?.inputRegistrationEmail?.message}</p>}
                            </div>
                        </div>
                        <div className='form-registration-input-3'>
                            <label className={isErrorInputThree ?  'span-input-error-3_borcolor-red': 'span-input-3'}>
                                Password
                            </label>
                            <input 
                                {...register('inputRegistrationPass',{
                                    required: "Filid must be filled in",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long"
                                    }
                                })}
                                type='password'
                                className={isErrorInputThree ?  'registration-input-error-3_bcolor-red': 'registration-input-3'}
                            />
                            <div className = {isErrorAlreadyRegistredAndValidationInputThree ? 'helper-text-inputs-registration-3_error-user-data-and-validation' : 'helper-text-inputs-registration-3'}>
                                {errors?.inputRegistrationPass && <p>{errors?.inputRegistrationPass?.message}</p>}
                            </div>
                            <div className='text-form-error-user-data'>
                                {isAccountAlreadyRegistered ? <Link to = '/SignIn-Registration'>This data is already being used. Do you want <br></br>to sign in?</Link> : null}
                            </div>
                        </div>
                    </div>
                    <button 
                        className='button-continue'
                        type='submit'
                        style={{
                            marginTop: '60px',
                            height: '33.6px',
                            color: 'white',
                            backgroundColor: 'black',
                            width: '81%',
                            marginLeft: '10.5%',
                            borderRadius: '10px'
                        }}
                        >
                            Register
                    </button>
                </form>
                <FooterForm />
            </div>
    );
}