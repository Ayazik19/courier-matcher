import { useAuth } from '../hook/useauth.js';
import { useEffect, useState } from 'react';
import { setUserProfile } from '../store/slices/userSlice.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import './changeGenderUserProfileSettings.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function ChangeGenderUserProfileSettings() {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onSubmit' });
    const {
        email,
        gender
    } = useAuth();

    const [addGenderUser, setAddGenderUser] = useState(false);
    const [changeGenderUser, setChangeGenderUser] = useState(false);

    const handleAddGenderUser = () => {
        setAddGenderUser(true);
    }
    const handleChangeGenderUser = () => {
        setChangeGenderUser(true);
    }

    const handlehideContChanging = () => {
        setChangeGenderUser(false);
        setAddGenderUser(false);
    }

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const handleFormSettingGenderUser = async (data) => {
        setIsLoadingDataForm(true);
        const { selectInputChangeGenderUser } = data;
        const field = 'gender';
        try {
            const updateUserField = async (email, field, selectInputChangeGenderUser) => {
                const userRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const photoAcc = userData.photoAcc;
                    await updateDoc(userRef, { [field]: selectInputChangeGenderUser });
                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: selectInputChangeGenderUser
                    }));
                }
                else {
                }
            };
            await updateUserField(email, field, selectInputChangeGenderUser);
            setIsLoadingDataForm(false);
            setChangeGenderUser(false);
            setAddGenderUser(false);
        }
        catch (err) {
            setIsLoadingDataForm(false);
            console.error(err);
        }
    };

    const [isErrorInputOne, setIsErrorInputOne] = useState(false);
    const [isErrorInputTwo, setIsErrorInputTwo] = useState(false);

    useEffect(() => {
        if (errors.selectInputChangeGenderUser) {
            setIsErrorInputOne(true);
            setIsErrorInputTwo(true);
        }
        else {
            setIsErrorInputOne(false);
            setIsErrorInputTwo(false);
        }
    }, [errors]);

    return (
        <div>
            {!gender ?
                <div>
                    <div className='add-button' onClick={handleAddGenderUser}>Add</div>
                    {addGenderUser ?
                        <div className='fp-show-container-change-or-add-attribute'>
                            <div className='fp-cont-add-gender'>
                                {isLoadingDataForm ?
                                    <LoadingDataFormUserAcc />
                                    :
                                    <div>
                                        <div className='hide-adding-cont-changing' onClick={handlehideContChanging}>
                                            <img src={hideContAdding} className='img-hide-cont-changing' alt="Hide" />
                                        </div>
                                        <form onSubmit={handleSubmit(handleFormSettingGenderUser)} className='form-add-gender-user'>
                                            <label htmlFor='select-gender' className='text-add-gender'>
                                                Choose gender
                                                <select
                                                    {...register('selectInputChangeGenderUser', {
                                                        required: 'Please, select the gender'
                                                    })}
                                                    id='select-add-gender'
                                                    className={isErrorInputTwo ? 'select-input-add-gender-user_error-input' : 'select-input-add-gender-user'}
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </label>
                                            <div className='select-input-add-gender-user_errors'>
                                                {errors?.selectInputChangeGenderUser && <p>{errors.selectInputChangeGenderUser.message}</p>}
                                            </div>
                                            <button type='submit' className='button-save-result-gender-user'>Save</button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                        : null
                    }
                </div>
                :
                <div>
                    <span className='span-gender-user'>{gender}</span>
                    <div className='change-button' onClick={handleChangeGenderUser}>Change</div>
                    {changeGenderUser ?
                        <div className='fp-show-container-change-or-add-attribute'>
                            <div className='fp-cont-change-gender'>
                                {isLoadingDataForm ?
                                    <LoadingDataFormUserAcc />
                                    :
                                    <div>
                                        <div className='hide-adding-cont-changing' onClick={handlehideContChanging}>
                                            <img src={hideContAdding} className='img-hide-cont-changing' alt="Hide" />
                                        </div>
                                        <form onSubmit={handleSubmit(handleFormSettingGenderUser)} className='form-change-gender-user'>
                                            <label htmlFor='select-gender' className='text-change-gender'>
                                                Choose gender
                                                <select
                                                    {...register('selectInputChangeGenderUser', {
                                                        required: 'Please, select the gender'
                                                    })}
                                                    id='select-change-gender'
                                                    className={isErrorInputOne ? 'select-input-change-gender-user_error-input' : 'select-input-change-gender-user'}
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </label>
                                            <div className='select-input-change-gender-user_errors'>
                                                {errors?.selectInputChangeGenderUser && <p>{errors.selectInputChangeGenderUser.message}</p>}
                                            </div>
                                            <button type='submit' className='button-change-result-gender-user'>Change</button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                        : null
                    }
                </div>
            }
        </div>
    );
}