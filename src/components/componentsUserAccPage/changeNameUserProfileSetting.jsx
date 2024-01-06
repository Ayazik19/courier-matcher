import { useAuth } from '../hook/useauth.js';
import { useEffect, useState } from 'react';
import { setUser } from '../store/slices/userSlice.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import './changeNameUserProfileSetting.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function ChangenameUserProfileSettings() {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onSubmit' });
    const {
        email,
        token,
        id,
        displayName
    } = useAuth();

    const [changeNameUser, setChangeNameUser] = useState(false);

    const handleChangeNameUser = () => {
        setChangeNameUser(true);
    }
    const handlehideContChanging = () => {
        setChangeNameUser(false);
    }

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const handleFormChangeSettingNameUser = async (data) => {
        setIsLoadingDataForm(true);
        const { inputChangeNameUser } = data;
        const field = 'displayName';
        try {
            const updateUserField = async (email, field, inputChangeNameUser) => {
                const userRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userRef);

                if (userDocSnapshot.exists()) {
                    await updateDoc(userRef, { [field]: inputChangeNameUser });
                    dispatch(setUser({
                        email: email,
                        id: id,
                        token: token,
                        displayName: inputChangeNameUser,
                    }));
                }
                else {
                }
            };
            await updateUserField(email, field, inputChangeNameUser);
            setIsLoadingDataForm(false);
            setChangeNameUser(false);
        }
        catch (err) {
            setIsLoadingDataForm(false);
            console.error(err);
        }
    };

    const [isErrorInput, setIsErrorInput] = useState(false);

    useEffect(() => {
        if (errors.inputChangeNameUser) {
            setIsErrorInput(true);
        }
        else {
            setIsErrorInput(false);
        }
    }, [errors])

    return (
        <div>
            {displayName ? <span className='span-name-user'>
                {displayName}
                <span className='change-button' onClick={handleChangeNameUser}>Change</span>
                {changeNameUser ?
                    <div className='fp-show-container-change-or-add-attribute'>
                        <div className='fp-cont-change-name'>
                            {isLoadingDataForm ?
                                <LoadingDataFormUserAcc />
                                :
                                <div>
                                    <div className='hide-adding-cont-changing'>
                                        <img src={hideContAdding} onClick={handlehideContChanging} className='img-hide-cont-changing' />
                                    </div>
                                    <form onSubmit={handleSubmit(handleFormChangeSettingNameUser)} className='form-change-name-user'>
                                        <label htmlFor='input-name' className='text-change-name'>
                                            Set name
                                            <input
                                                {...register('inputChangeNameUser', {
                                                    required: 'Please, set the name'
                                                })}
                                                id='input-change-name'
                                                placeholder='*Name'
                                                className={isErrorInput ? 'input-change-name-user_error-input' : 'input-change-name-user'}
                                            />
                                        </label>
                                        <div className='input-change-name-user_errors'>
                                            {errors?.inputChangeNameUser && <p>{errors.inputChangeNameUser.message}</p>}
                                        </div>
                                        <button type='submit' className='button-change-result-name-user'>Change</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    null}
            </span>
                :
                <Link to='/SignIn-Registration' className='add-button'>
                    Add
                </Link>}
        </div>
    );
}