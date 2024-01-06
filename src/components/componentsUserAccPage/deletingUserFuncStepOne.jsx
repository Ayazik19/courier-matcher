import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hook/useauth.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import './deletingUserFunc.css';
import DeletingUserFuncStepTwo from './deletingUserFuncStepTwo.jsx';
import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import { removeUser } from '../store/slices/userSlice.js';
import {useHookStepsRedirectContext}  from './hookStepsDeleteAcc/hookStepsDeleteAcc.jsx';

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);


export default function DeleteUserFuncStepOne() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });

    const [isClickButtonDelete, setIsClickButtonDelete] = useState(false);

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);
    const {valueStepTwo, setStepValueTwo} = useHookStepsRedirectContext();
    const [isShowButtonHideCont, setIsShowButtonHideCont] = useState(true);  
    
    const [isPassTwoDontMatch, setIsPassTwoDontMatch] = useState(false);
    const [isIncorrectPassUserAcc, setIncorrectPassUserAcc] = useState(false);

    const hadnleDeleteAccCheckDataUser = async (data) => {
        const auth = getAuth();
        const { inputPassCheckDeleteUserAccOne, inputPassCheckDeleteUserAccTwo } = data;
        setIsLoadingDataForm(true);
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, inputPassCheckDeleteUserAccOne);
            const user = userCredential.user;

            if(user && inputPassCheckDeleteUserAccOne == inputPassCheckDeleteUserAccTwo){
                const userDocRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userDocRef);

                if(userDocSnapshot.exists()){
                    setIsLoadingDataForm(false);
                    setIsErrorInputOne(false);
                    setIsErrorInputTwo(false);
                    setIsPassTwoDontMatch(false);
                    setIncorrectPassUserAcc(false);
                    setStepValueTwo(true);
                }
            }
            else if(inputPassCheckDeleteUserAccOne !== inputPassCheckDeleteUserAccTwo){
                setIsLoadingDataForm(false);
                setIsPassTwoDontMatch(true);
                setIncorrectPassUserAcc(false);
            }
        }
        catch(err){
            console.log(err);
            setIsLoadingDataForm(false);
            setIncorrectPassUserAcc(true); 
            setIsPassTwoDontMatch(false);   
        }
    }


    const handleRedirectSignInPage = () => {
        dispatch(removeUser());
        navigate('/SignIn-Registration');
    }

    const [isErrorInputOne,setIsErrorInputOne] = useState(false);
    const [isErrorInputTwo,setIsErrorInputTwo] = useState(false);

    useEffect(() => {
        if(errors.inputPassCheckDeleteUserAccOne){
            setIsErrorInputOne(true);
        }
        else if(!errors.inputPassCheckDeleteUserAccOne){
            setIsErrorInputOne(false);
        }

        if(errors.inputPassCheckDeleteUserAccTwo){
            setIsErrorInputTwo(true);
        }
        else if(!errors.inputPassCheckDeleteUserAccTwo){
            setIsErrorInputTwo(false);
        }
    },[errors]);

    useEffect(() => {
        if(isLoadingDataForm){
            setIsShowButtonHideCont(false);
        }
        else{
            setIsShowButtonHideCont(true);
        }
    },[isLoadingDataForm]);

    return !valueStepTwo ? (
        <div>
            {email ?
                <div>
                    <span className='span-name-discription-large-text'>
                        Deleting an account,
                        <br></br>
                        service coorchik
                    </span>
                    <p className='text-warning-deleting-acc-1'>
                        If you wish to delete your account, we provide you with the opportunity to perform this operation. Deleting an account means the complete and final loss of all data associated with your account.
                    </p>
                    <button className='button-delete-acc' onClick={() => (setIsClickButtonDelete(true))}>Delete account</button>
                    {isClickButtonDelete ?
                        <div>
                            <div className='fp-show-container-change-or-add-attribute'>
                                <div className='fp-cont-delete-user-step-1'>
                                    {isShowButtonHideCont ? 
                                        <div className='hide-cont-delete-acc-step-1'>
                                            <img src={hideContAdding} onClick={() => (setIsClickButtonDelete(false))} className='img-hide-cont-delete-acc' />
                                        </div>
                                    :
                                    null}
                                    {isLoadingDataForm ?
                                        <div className='loading-data-form-delete-acc_margin-top'>
                                            <LoadingDataFormUserAcc />
                                        </div>
                                        :
                                        <div>
                                    <form onSubmit={handleSubmit(hadnleDeleteAccCheckDataUser)} className='form-delete-user-acc'>
                                        <label htmlFor='delete-user-acc-1' className='text-check-acc'>
                                            First, confirm that you want to delete the account
                                            <input
                                                {...register('inputPassCheckDeleteUserAccOne', {
                                                    required: 'Filid must be filled in',
                                                    minLength:{
                                                        value: 6
                                                    }
                                                })}
                                                className={isErrorInputOne || isIncorrectPassUserAcc || isPassTwoDontMatch ? 'input-check-pass-delete-user-acc-1_input-validate' : 'input-check-pass-delete-user-acc-1'}
                                                type='password'
                                                id='delete-user-acc'
                                                placeholder='*Password'
                                            />
                                        </label>
                                        <div className='text-input-pass-check_validate-errors-1'>
                                            {errors?.inputPassCheckDeleteUserAccOne && <p>{errors?.inputPassCheckDeleteUserAccOne?.message}</p>}
                                        </div>
                                        <input
                                            {...register('inputPassCheckDeleteUserAccTwo', {
                                                required: 'Filid must be filled in',
                                                minLength:{
                                                    value: 6
                                                }
                                            })}
                                            className={(isErrorInputTwo || isIncorrectPassUserAcc || isPassTwoDontMatch) ? 'input-check-pass-delete-user-acc-2_input-validate' : 'input-check-pass-delete-user-acc-2'}
                                            type='password'
                                            id='delete-user-acc'
                                            placeholder='*Repeat password'
                                        />
                                        <div className={isPassTwoDontMatch || isIncorrectPassUserAcc ? 'text-input-pass-check_validate-errors-2_margin-top' : 'text-input-pass-check_validate-errors-2'}>
                                            {errors?.inputPassCheckDeleteUserAccTwo && <p>{errors?.inputPassCheckDeleteUserAccTwo?.message}</p>}
                                        </div>
                                        {isPassTwoDontMatch ? 
                                        <div>
                                            <span className='text-input-pass-dont-match'>Password don't match</span>
                                        </div>
                                        : null}
                                        {isIncorrectPassUserAcc ? 
                                        <div>
                                            <span className='text-incorrect-pass-user-acc'>Incorrect password account</span>
                                        </div>
                                        : null}
                                        <button type='submit' className='form-button-delete-acc'>Delete account</button>
                                    </form>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                    <span className='text-warning-deleting-acc-2'>Please note that account deletion cannot be undone.</span>
                </div>
                :
                <div>
                    <span className='span-name-discription-large-text'>
                        Deleting an account,
                        <br></br>
                        service coorchik
                    </span>
                    <p className='text-warning-deleting-acc-1'>
                        Before deleting your profile, log in to your account.
                    </p>
                    <button className='button-sign-in-acc_desc-4' onClick={handleRedirectSignInPage}>Sign In</button>
                </div>}
        </div>
    ) 
    :
    <div>
        {email ?
                <div>
                    <span className='span-name-discription-large-text'>
                        Deleting an account,
                        <br></br>
                        service coorchik
                    </span>
                    <p className='text-warning-deleting-acc-1'>
                        If you wish to delete your account, we provide you with the opportunity to perform this operation. Deleting an account means the complete and final loss of all data associated with your account.
                    </p>
                    <button className='button-delete-acc' onClick={() => (setIsClickButtonDelete(true))}>Delete account</button>
                        <DeletingUserFuncStepTwo />
                    <span className='text-warning-deleting-acc-2'>Please note that account deletion cannot be undone.</span>
                </div>
                :
                <div>
                    <span className='span-name-discription-large-text'>
                        Deleting an account,
                        <br></br>
                        service coorchik
                    </span>
                    <p className='text-warning-deleting-acc-1'>
                        Before deleting your profile, log in to your account.
                    </p>
                    <button className='button-sign-in-acc_desc-4' onClick={handleRedirectSignInPage}>Sign In</button>
                </div>}
    </div>
}