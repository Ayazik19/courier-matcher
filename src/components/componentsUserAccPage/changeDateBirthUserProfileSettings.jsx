import { useAuth } from '../hook/useauth.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../store/slices/userSlice.js';
import { useForm } from 'react-hook-form';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.js';
import hideContAdding from '../componentsHomePage/hideUserAccInfo.png';
import LoadingDataFormUserAcc from '../loadingData/loadingDataFormUserAcc.jsx';
import './changeDateBirthUserProfileSettings.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ChangeDateBirthUserProfileSettings() {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onSubmit' });
    const {
        email,
        gender,
        townLocation,
        streetLocation,
        dateBirth
    } = useAuth();

    const [addDateBirthrUser, setAddDateBirthrUser] = useState(false);
    const [changeDateBirthUser, setChangeDateBirthUser] = useState(false);

    const handleAddDateBirthUser = () => {
        setAddDateBirthrUser(true);
    }
    const handleChangeDateBirthUser = () => {
        setChangeDateBirthUser(true);
    }
    const handleHideContChanging = () => {
        setChangeDateBirthUser(false);
        setAddDateBirthrUser(false);
    }

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const handleFormSettingDateBirthUser = async (data) => {
        setIsLoadingDataForm(true);
        const { selectInputChangeDateBirthUser } = data;
        const fieldDateBirth = 'dateBirth';
        try {
            const updateUserField = async (email, fieldDateBirth, selectInputChangeDateBirthUser) => {
                const userRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const photoAcc = userData.photoAcc;
                    await updateDoc(userRef, { [fieldDateBirth]: selectInputChangeDateBirthUser });
                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: gender,
                        townLocation: townLocation,
                        streetLocation: streetLocation,
                        dateBirth: selectInputChangeDateBirthUser
                    }));
                }
                else {
                }
            };
            await updateUserField(email, fieldDateBirth, selectInputChangeDateBirthUser);
            setIsLoadingDataForm(false);
            setChangeDateBirthUser(false);
            setAddDateBirthrUser(false);
        }
        catch (err) {
            setIsLoadingDataForm(false);
            console.error(err);
        }
    };

    const [isErrorInput, setIsErrorInput] = useState(false);

    useEffect(() => {
        if (errors.selectInputChangeDateBirthUser) {
            setIsErrorInput(true);
        }
        else {
            setIsErrorInput(false);
        }
    }, [errors]);

    return (
        <div>
            {dateBirth ? (
                <span className="span-date-birth-user">
                    {dateBirth}
                    <div className="change-button" onClick={handleChangeDateBirthUser}>
                        Change
                    </div>
                    {changeDateBirthUser ? (
                        <div className="fp-show-container-change-or-add-attribute">
                            <div className="fp-cont-change-date-birth">
                                {isLoadingDataForm ?
                                    <LoadingDataFormUserAcc />
                                    :
                                    <div>
                                        <div className="hide-adding-cont-changing">
                                            <img
                                                src={hideContAdding}
                                                onClick={handleHideContChanging}
                                                className="img-hide-cont-changing"
                                            />
                                        </div>
                                        <form
                                            onSubmit={handleSubmit(handleFormSettingDateBirthUser)}
                                            className="form-change-date-birth-user"
                                        >
                                            <label htmlFor="input-date-birth" className="text-change-date-birth">
                                                Set your date birth
                                                <input
                                                    {...register("selectInputChangeDateBirthUser", {
                                                        required: "Please, set the date birth",
                                                    })}
                                                    id="input-change-date-birth"
                                                    className={
                                                        isErrorInput
                                                            ? "input-change-date-birth-user_error-input"
                                                            : "input-change-date-birth-user"
                                                    }
                                                    type="date"
                                                ></input>
                                            </label>
                                            <div className="input-change-date-birth-user_errors">
                                                {errors?.selectInputChangeDateBirthUser && (
                                                    <p>{errors.selectInputChangeDateBirthUser.message}</p>
                                                )}
                                            </div>
                                            <button type="submit" className="button-change-result-date-birth-user">
                                                Change
                                            </button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                    ) : null}
                </span>
            ) : (
                <div className="add-button" onClick={handleAddDateBirthUser}>
                    Add
                </div>
            )}
            {addDateBirthrUser ? (
                <div className="fp-show-container-change-or-add-attribute">
                    <div className="fp-cont-add-date-birth">
                        {isLoadingDataForm ?
                            <LoadingDataFormUserAcc />
                            :
                            <div>
                                <div className="hide-adding-cont-changing">
                                    <img
                                        src={hideContAdding}
                                        onClick={handleHideContChanging}
                                        className="img-hide-cont-changing"
                                    />
                                </div>
                                <form
                                    onSubmit={handleSubmit(handleFormSettingDateBirthUser)}
                                    className="form-add-date-birth-user"
                                >
                                    <label htmlFor="input-date-birth" className="text-add-date-birth">
                                        Set your date birth
                                        <input
                                            {...register("selectInputChangeDateBirthUser", {
                                                required: "Please, set the date birth",
                                            })}
                                            id="input-add-date-birth"
                                            className={
                                                isErrorInput
                                                    ? "input-add-date-birth-user_error-input"
                                                    : "input-add-date-birth-user"
                                            }
                                            type="date"
                                        ></input>
                                    </label>
                                    <div className="input-add-date-birth-user_errors">
                                        {errors?.selectInputChangeDateBirthUser && (
                                            <p>{errors.selectInputChangeDateBirthUser.message}</p>
                                        )}
                                    </div>
                                    <button type="submit" className="button-add-result-date-birth-user">
                                        Save
                                    </button>
                                </form>
                            </div>}
                    </div>
                </div>
            ) : null}
        </div>
    );
}