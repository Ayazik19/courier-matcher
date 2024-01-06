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
import './changeLocationUserProfileSettings.css'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ChangeLocationUserProfileSettings() {
    const dispatch = useDispatch();
    const {
        email,
        townLocation,
        streetLocation
    } = useAuth();

    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onSubmit' });

    const [addLocationUser, setAddLocationUser] = useState(false);
    const [changeLocationUser, setChangeLocationUser] = useState(false);

    const handleAddLocationUser = () => {
        setAddLocationUser(true);
    }
    const handleChangeLocationUser = () => {
        setChangeLocationUser(true);
    }
    const handlehideContChanging = () => {
        setChangeLocationUser(false);
        setAddLocationUser(false);
    }

    const [isLoadingDataForm, setIsLoadingDataForm] = useState(false);

    const handleFormSettingLocationUser = async (data) => {
        setIsLoadingDataForm(true);
        const { inputSettingLocationTownUser, inputSettingLocationStreetUser } = data;
        const fieldTown = 'townLocation';
        const fieldStreet = 'streetLocation';
        try {
            const updateUserFields = async (email, data) => {
                const userRef = doc(db, "users", email);
                const userDocSnapshot = await getDoc(userRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const photoAcc = userData.photoAcc;
                    const gender = userData.gender;

                    await updateDoc(userRef, {
                        [fieldTown]: data[fieldTown],
                        [fieldStreet]: data[fieldStreet]
                    });

                    dispatch(setUserProfile({
                        photoAcc: photoAcc,
                        gender: gender,
                        [fieldTown]: data[fieldTown],
                        [fieldStreet]: data[fieldStreet]
                    }));
                }
                else {
                }
            };

            await updateUserFields(email, {
                [fieldTown]: inputSettingLocationTownUser,
                [fieldStreet]: inputSettingLocationStreetUser
            });
            setIsLoadingDataForm(false);
            setChangeLocationUser(false);
            setAddLocationUser(false);
        }
        catch (err) {
            console.log(err);
            setIsLoadingDataForm(false);
        }
    };

    const [isErrorInputTown, setIsErrorInputTown] = useState(false);
    const [isErrorInputStreet, setIsErrorInputStreet] = useState(false);

    useEffect(() => {
        if (errors.inputSettingLocationTownUser) {
            setIsErrorInputTown(true);
        }
        else {
            setIsErrorInputTown(false);
        }

        if (errors.inputSettingLocationStreetUser) {
            setIsErrorInputStreet(true);
        }
        else {
            setIsErrorInputStreet(false);
        }
    }, [errors])

    return (
        <div>
            {townLocation && streetLocation ? (
                <span className="span-gender-user">
                    {townLocation}, {streetLocation}
                    <div className="change-button" onClick={handleChangeLocationUser}>
                        Change
                    </div>
                    {changeLocationUser ? (
                        <div className="fp-show-container-change-or-add-attribute">
                            <div className="fp-cont-change-location">
                                {!isLoadingDataForm ? (
                                    <div>
                                        <div className="hide-adding-cont-changing">
                                            <img
                                                src={hideContAdding}
                                                onClick={handlehideContChanging}
                                                className="img-hide-cont-changing"
                                            />
                                        </div>
                                        <form
                                            onSubmit={handleSubmit(handleFormSettingLocationUser)}
                                            className="form-change-location-user"
                                        >
                                            <label htmlFor="input-location" className="text-change-location">
                                                Set your location
                                                <input
                                                    {...register("inputSettingLocationTownUser", {
                                                        required: "Please, set the town",
                                                    })}
                                                    id="input-change-location"
                                                    className={
                                                        isErrorInputTown
                                                            ? "input-change-location-town-user_error-input"
                                                            : "input-change-location-town-user"
                                                    }
                                                    placeholder="*Town"
                                                />
                                            </label>
                                            <div className="select-input-change-locaiton-town-user_errors">
                                                {errors?.inputSettingLocationTownUser && (
                                                    <p>{errors.inputSettingLocationTownUser.message}</p>
                                                )}
                                            </div>
                                            <input
                                                {...register("inputSettingLocationStreetUser", {
                                                    required: "Please, set the street",
                                                })}
                                                id="input-change-location"
                                                className={
                                                    isErrorInputTown
                                                        ? "input-change-location-street-user_error-input"
                                                        : "input-change-location-street-user"
                                                }
                                                placeholder="*Street"
                                            />
                                            <div className="select-input-change-locaiton-street-user_errors">
                                                {errors?.inputSettingLocationStreetUser && (
                                                    <p>{errors.inputSettingLocationStreetUser.message}</p>
                                                )}
                                            </div>
                                            <button type="submit" className="button-change-result-location-user">
                                                Change
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <LoadingDataFormUserAcc />
                                )}
                            </div>
                        </div>
                    ) : null}
                </span>
            ) : (
                <div className="add-button" onClick={handleAddLocationUser}>
                    Add
                </div>
            )}
            {addLocationUser ? (
                <div className="fp-show-container-change-or-add-attribute">
                    <div className="fp-cont-add-location">
                        <div className="hide-adding-cont-changing">
                            <img
                                src={hideContAdding}
                                onClick={handlehideContChanging}
                                className="img-hide-cont-changing"
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit(handleFormSettingLocationUser)}
                            className="form-add-location-user"
                        >
                            <label htmlFor="input-location" className="text-add-location">
                                Set your location
                                <input
                                    {...register("inputSettingLocationTownUser", {
                                        required: "Please, set the town",
                                    })}
                                    id="input-add-location"
                                    className={
                                        isErrorInputTown
                                            ? "input-add-location-town-user_error-input"
                                            : "input-add-location-town-user"
                                    }
                                    placeholder="*Town"
                                />
                            </label>
                            <div className="select-input-add-locaiton-town-user_errors">
                                {errors?.inputSettingLocationTownUser && (
                                    <p>{errors.inputSettingLocationTownUser.message}</p>
                                )}
                            </div>
                            <input
                                {...register("inputSettingLocationStreetUser", {
                                    required: "Please, set the street",
                                })}
                                id="input-add-location"
                                className={
                                    isErrorInputTown
                                        ? "input-add-location-street-user_error-input"
                                        : "input-add-location-street-user"
                                }
                                placeholder="*Street"
                            />
                            <div className="select-input-add-locaiton-street-user_errors">
                                {errors?.inputSettingLocationStreetUser && (
                                    <p>{errors.inputSettingLocationStreetUser.message}</p>
                                )}
                            </div>
                            <button type="submit" className="button-add-result-location-user">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}