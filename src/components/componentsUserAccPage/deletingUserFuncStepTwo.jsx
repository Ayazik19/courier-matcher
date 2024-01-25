import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser, setOperationInformErrors } from '../store/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, deleteUser } from "firebase/auth";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import './deletingUserFuncStepTwo.css';
import { useAuth } from '../hook/useauth.js'
import DeletingUserFuncStepOne from './deletingUserFuncStepOne.jsx';
import { useHookStepsRedirectContext } from './hookStepsDeleteAcc/hookStepsDeleteAcc.jsx';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function DeletingUserFuncStepTwo() {
    const dispatch = useDispatch();
    const {
        email
    } = useAuth();

    const { handleSubmit } = useForm({ mode: 'onSubmit' });

    const [isClickButtonDelete, setIsClickButtonDelete] = useState(false);

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const { valueStepTwo, setStepValueTwo } = useHookStepsRedirectContext();

    useEffect(() => {
        console.log('valueStepTwo in StepTwo - ', valueStepTwo);
    }, [valueStepTwo]);

    const [isChekedCheckBoxHandleSubmit, setIsChekedCheckBoxHandleSubmit] = useState(false);

    const handleDeleteUserAcc = async () => {
        const auth = getAuth();
        setIsLoadingDataForm(true);
        try {
            const userDocRef = doc(db, "users", email);

            if (isCheckedCheckBox) {
                const user = auth.currentUser;
                const storageRef = ref(storage, 'accPhotoProfile/' + email);

                deleteUser(user).then(() => {
                    deleteDoc(userDocRef)
                        .then(() => {
                            dispatch(removeUser());
                            dispatch(setOperationInformErrors({ type: 'REMOVE_INFORM_ERRORS'}));
                            dispatch(setOperationUserNotifications({ type: 'REMOVE_ALL_NOTIFICATIONS'}));
                            setIsLoadingDataForm(false);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }).catch((error) => {
                    console.log(error);
                });
                if(storageRef){
                    deleteObject(storageRef)
                    .then(() => {                   
                    })
                    .catch((error) => {
                        console.log(error) 
                    });
                }
            } else {
                setIsLoadingDataForm(false);
                setIsChekedCheckBoxHandleSubmit(true);
                setIsErrorUserAgreement(true);
            }
        } catch (err) {
            setIsLoadingDataForm(false);
            console.log(err);
        }
    }

    const [isErrorInputAgreement, setIsErrorUserAgreement] = useState(false);

    const [isCheckedCheckBox, setIsCheckedCheckBox] = useState(false);
    const hadnleChangeCheckBox = (event) => {
        setIsCheckedCheckBox(event.target.checked);
    }
    useEffect(() => {
        if (isChekedCheckBoxHandleSubmit) {
            if (!isCheckedCheckBox) {
                setIsErrorUserAgreement(true);
            }
            else {
                setIsErrorUserAgreement(false);
            }
        }
    });

    const [showContDeleteAcc, setShowContDeleteAcc] = useState(false);
    useEffect(() => {
        if (isLoadingDataForm) {
            setShowContDeleteAcc(false);
        }
        else {
            setShowContDeleteAcc(true);
        }
    });

    const handleHideAccStepOne = () => {
        setStepValueTwo(false);
    }

    return valueStepTwo ? (
        <div>
            <div className='fp-show-container-change-or-add-attribute'>
                <div className='fp-cont-delete-user-step-2'>
                    {showContDeleteAcc ?
                        <div className='header-form-delete-acc-step-2'>
                            <span className='form-back-button-delete-acc-arrow_left' onClick={handleHideAccStepOne}>
                                {'\u2190'}
                            </span>
                            {/* <div className='hide-cont-delete-acc-step-2'>
                            <img src={hideContAdding} onClick={() => (setIsClickButtonDelete(false))} className='img-hide-cont-delete-acc' />
                        </div> */}
                        </div>
                        : null}
                    {isLoadingDataForm ?
                        <LoadingDataFormUserAcc />
                        :
                        <div>
                            <form onSubmit={handleSubmit(handleDeleteUserAcc)} className="form-confirmation-account-deletion">
                                <span className="text-check-acc-step-2">
                                    Read this important before deleting your account
                                </span>
                                <p className="form-text-warning-delete-account">
                                    Deleting your account will result in a complete loss of access to all your data, including your profile, personal information, purchases and activity history. It will not be possible to restore this data.
                                </p>
                                <label for='chekbox-delete-acc' className='input-checkbox-text-warning'>
                                    Yes, I want to permanently delete this
                                    <br></br>
                                    Coorchik account and all data stored in it
                                </label>
                                <input
                                    onChange={hadnleChangeCheckBox}
                                    id='chekbox-delete-acc'
                                    type="checkbox"
                                    className={isErrorInputAgreement ? 'input-checkbox-acc-user-deletion-agreement_error-chekbox' : 'input-checkbox-acc-user-deletion-agreement'} />
                                <div className='input-user-agreement-delete-acc_error-chekbox-text'>
                                    {isErrorInputAgreement ?
                                        <div>
                                            <span>
                                                Filid must be filled in
                                            </span>
                                        </div>
                                        :
                                        null}
                                </div>
                                <button type='submit' className='form-button-delete-acc-step-2'>Delete account</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    ) :
        <DeletingUserFuncStepOne />
}