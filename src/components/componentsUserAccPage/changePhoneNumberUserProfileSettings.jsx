import { useAuth } from '../hook/useauth.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../store/slices/userSlice.js';
import { useForm } from 'react-hook-form';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import './changePhoneNumberUserProfileSettings.css';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ChangePhoneNumberUserProfileSettings() {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors, isSubmitted } } = useForm({ mode: 'onClick' });
    const {
        email,
        gender,
        townLocation,
        streetLocation,
        dateBirth,
        phoneNumber
    } = useAuth();

    const [addPhoneNumberUser, setAddPhoneNumberUser] = useState(false);
    const [changePhoneNumberUser, setChangePhoneNumberUser] = useState(false);

    const handleAddPhoneNumberUser = () => {
        setAddPhoneNumberUser(true);
    }
    const handleChangePhoneNumberUser = () => {
        setChangePhoneNumberUser(true);
    }
    const handlehideContChanging = () => {
        setChangePhoneNumberUser(false);
        setAddPhoneNumberUser(false);
    }

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const handleFormSettingDateBirthUser = async (data) => {
        setIsLoadingDataForm(true);
        const { inputChangePhoneNumberUser } = data;
        const fieldPhoneNumber = 'phoneNumber';
        try {
            const updateUserField = async (email, fieldPhoneNumber, inputChangePhoneNumberUser) => {
                const userRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const photoAcc = userData.photoAcc;
                    await updateDoc(userRef, { [fieldPhoneNumber]: inputChangePhoneNumberUser });
                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: gender,
                        townLocation: townLocation,
                        streetLocation: streetLocation,
                        dateBirth: dateBirth,
                        phoneNumber: inputChangePhoneNumberUser
                    }));
                }
                else {
                }
            };
            await updateUserField(email, fieldPhoneNumber, inputChangePhoneNumberUser);
            setIsLoadingDataForm(false);
            setChangePhoneNumberUser(false);
            setAddPhoneNumberUser(false);
        }
        catch (err) {
            setIsLoadingDataForm(false);
            console.error(err);
        }
    };

    const [isErrorInputOne, setErrorInputOne] = useState(false);

    useEffect(() => {
        if (!isSubmitted) {
            return;
        }

        if (errors.inputChangePhoneNumberUser) {
            setErrorInputOne(true);
        } else if (!errors.inputChangePhoneNumberUser) {
            setErrorInputOne(false);
        }
    }, [errors, isSubmitted]);

    return (
        <div>
            {phoneNumber ?
                <div>
                    <span className='span-gender-user'>
                        {phoneNumber}
                        <div className='change-button' onClick={handleChangePhoneNumberUser}>Change</div>
                        {changePhoneNumberUser ?
                            <div className='fp-show-container-change-or-add-attribute'>
                                <div className='fp-cont-change-phone-number'>
                                    {isLoadingDataForm ?
                                        <LoadingDataFormUserAcc />
                                        :
                                        <div>
                                            <div className='hide-adding-cont-changing'>
                                                <img src={hideContAdding} onClick={handlehideContChanging} className='img-hide-cont-changing' />
                                            </div>
                                            <form onSubmit={handleSubmit(handleFormSettingDateBirthUser)} className='form-change-phone-number-user'>
                                                <label htmlFor='input-phone-number' className='text-change-phone-number'>
                                                    Set your phone number
                                                    <input
                                                        {...register('inputChangePhoneNumberUser', {
                                                            required: 'Please, set the phone number',
                                                            pattern: {
                                                                value: /^(\+7|8)([-]?\d){10}$/,
                                                                message: 'Enter the number in the format: "+XXXXXXXXXXX"'
                                                            }
                                                        })}
                                                        id='input-change-phone-number'
                                                        className={isErrorInputOne ? 'input-change-phone-number-user_error' : 'input-change-phone-number-user'}
                                                        placeholder='*Number'
                                                    >
                                                    </input>
                                                </label>
                                                <div className='input-change-phone-number-user_errors'>
                                                    {errors?.inputChangePhoneNumberUser && <p>{errors.inputChangePhoneNumberUser.message}</p>}
                                                </div>
                                                <button type='submit' className='button-change-result-phone-number-user'>Change</button>
                                            </form>
                                        </div>}
                                </div>
                            </div>
                            :
                            null}
                    </span>
                </div>
                :
                <div>
                    <div className='add-button' onClick={handleAddPhoneNumberUser}>Add</div>
                    {addPhoneNumberUser ?
                        <div className='fp-show-container-change-or-add-attribute'>
                            <div className='fp-cont-add-phone-number'>
                                {isLoadingDataForm ?
                                    <LoadingDataFormUserAcc />
                                    :
                                    <div>
                                        <div className='hide-adding-cont-changing'>
                                            <img src={hideContAdding} onClick={handlehideContChanging} className='img-hide-cont-changing' />
                                        </div>
                                        <form onSubmit={handleSubmit(handleFormSettingDateBirthUser)} className='form-change-phone-number-user'>
                                            <label htmlFor='input-phone-number' className='text-add-phone-number'>
                                                Set your phone number
                                                <input
                                                    {...register('inputChangePhoneNumberUser', {
                                                        required: 'Please, set the phone number',
                                                        pattern: {
                                                            value: /^(\+7|8)?([-]?\d){10}$/,
                                                            message: 'Enter the number in the format: "+XXXXXXXXXXX"'
                                                        }
                                                    })}
                                                    id='input-add-phone-number'
                                                    className={isErrorInputOne ? 'input-add-phone-number-user_error' : 'input-add-phone-number-user'}
                                                    placeholder='*Number'
                                                >
                                                </input>
                                            </label>
                                            <div className='input-add-phone-number-user_errors'>
                                                {errors?.inputChangePhoneNumberUser && <p>{errors.inputChangePhoneNumberUser.message}</p>}
                                            </div>
                                            <button type='submit' className='button-add-result-phone-number-user'>Save</button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                        : null}
                </div>
            }
        </div>
    );
}