import { useHookMouseFunctionalityErrorsContext } from './hookMouseFunctionalityErrors';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { serviceId } from '../components/emailJsConfig';
import { templateId } from '../components/emailJsConfig';
import { publicKey } from '../components/emailJsConfig';
import OpenContHookMouseFunctionalityErrorsStepTwo from './openContHookMouseFunctionalityErrorsStepTwo.jsx'
import hideContAdding from '../components/componentsHomePage/hideUserAccInfo.png';
import './openContHookMouseFunctionalityErrorsStepOne.css';
import { useAuth } from '../components/globalHooks/useauth';
import { useDispatch } from 'react-redux';
import { setUserInformErrors } from '../components/store/slices/userSlice.js';
import { firebaseConfig } from '../components/firebase.js';
import { collection, getFirestore, doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function OpenContHookMouseFunctionalityErrorsStepOne() {
    const dispatch = useDispatch();
    const {
        isAuth,
        email,
        displayName
    } = useAuth();
    const { 
        selectedText, 
        isSelectedElement, 
        isSelectedElementStepTwo, 
        setIsSelectedElementStepTwo, 
        setSelectedElement } 
    = useHookMouseFunctionalityErrorsContext();

    const { handleSubmit, register } = useForm({ mode: 'onSubmit' });

    const [isInputInfromErrors, setInputInfromErrors] = useState('');

    const limitSelectedTextCount = selectedText.length <= 249;
    const [isTextInformErrorSizeAdaptiveXs, setIsTextInformErrorSizeAdaptiveXs] = useState(false);
    const [isTextInformErrorSizeAdaptiveS, setIsTextInformErrorSizeAdaptiveS] = useState(false);
    const [isTextInformErrorSizeAdaptiveM, setIsTextInformErrorSizeAdaptiveM] = useState(false);
    const [isTextInformErrorSizeAdaptiveL, setIsTextInformErrorSizeAdaptiveL] = useState(false);
    const [isTextInformErrorSizeAdaptiveXl, setIsTextInformErrorSizeAdaptiveXl] = useState(false);
    const [isTextInformErrorSizeAdaptiveXxl, setIsTextInformErrorSizeAdaptiveXxl] = useState(false);
    const [isTextInformErrorSizeAdaptiveXxxl, setIsTextInformErrorSizeAdaptiveXxxl] = useState(false);

    const updateTextInformError = useCallback((length) => {
        setIsTextInformErrorSizeAdaptiveXs(length > 0 && length < 37);
        setIsTextInformErrorSizeAdaptiveS(length > 37 && length < 74);
        setIsTextInformErrorSizeAdaptiveM(length > 74 && 101 > length);
        setIsTextInformErrorSizeAdaptiveL(length > 101 && 138 > length);
        setIsTextInformErrorSizeAdaptiveXl(length > 138 && 175 > length);
        setIsTextInformErrorSizeAdaptiveXxl(length > 175 && 212 > length);
        setIsTextInformErrorSizeAdaptiveXxxl(length > 212 && 249 > length);
    }, [
        setIsTextInformErrorSizeAdaptiveXs, 
        setIsTextInformErrorSizeAdaptiveS,
        setIsTextInformErrorSizeAdaptiveM,
        setIsTextInformErrorSizeAdaptiveL,
        setIsTextInformErrorSizeAdaptiveXl,
        setIsTextInformErrorSizeAdaptiveXxl,
        setIsTextInformErrorSizeAdaptiveXxxl,
    ]);

    useEffect(() => {
        updateTextInformError(selectedText.length);
    }, [updateTextInformError]);


    const [isLoadingDataForm, setLoadingDataForm] = useState(false);

    const handleUserInformErrors = async () => {
        setLoadingDataForm(true);
        try {
            // creating a document in the infrom errors collection
            const informErrorsCollection = collection(db, "informErrors");

            const createDocInformError = {
                dateTimeInformErrors: new Date(),
                nameUser: displayName,
                emailUser: email,
                isFixed: false,
                textFeedBackUser: '',
            };

            const informErrorsCollectionDocRef = await addDoc(informErrorsCollection, createDocInformError);

            const updatedCreateDocInformError = {
                ...createDocInformError,
                idInformErrors: informErrorsCollectionDocRef.id,
            };

            await setDoc(informErrorsCollectionDocRef, updatedCreateDocInformError);

            //creating and adding an array of information error identifiers in the user collection field, limiting IDs in the array to no more than 2
            const userDocRef = doc(db, "users", email);
            const userDocSnapshots = await getDoc(userDocRef);

            if (userDocSnapshots.exists()) {
                const userData = userDocSnapshots.data();
                const idInformErrors = userData.idInformErrors || [];
                const fieldName = 'idInformErrors';
                const lengthArrErrors = idInformErrors.length;

                if (lengthArrErrors >= 0 && lengthArrErrors <= 2) {
                    if (lengthArrErrors === 0) {
                        const field = 'idInformErrors';
                        const value = [];
                        value.push(informErrorsCollectionDocRef.id);

                        const userRef = doc(db, "users", email);
                        const setDataField = { [field]: value };

                        try {
                            await setDoc(userRef, setDataField, { merge: true });
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    else if (lengthArrErrors === 1) {
                        const idInformErrorOne = idInformErrors[0];
                        const idInformErrorTwo = informErrorsCollectionDocRef.id;

                        const updatedArraySecondValue = [idInformErrorOne, idInformErrorTwo];

                        const updateUserField = async (email, fieldName, updatedArraySecondValue) => {
                            const userRef = doc(db, "users", email);
                            try {
                                await updateDoc(userRef, { [fieldName]: updatedArraySecondValue });
                            } catch (error) {
                                console.log(error);
                            }
                        };

                        await updateUserField(email, fieldName, updatedArraySecondValue);
                    }
                    else if (lengthArrErrors === 2) {
                        const idInformErrorsArray = userDocSnapshots.get(fieldName);

                        const idInformErrorOne = idInformErrorsArray[0];
                        const idInformErrorTwo = idInformErrorsArray[1];
                        const idInformErrorThree = informErrorsCollectionDocRef.id;

                        const updatedArrayThirdValue = [idInformErrorOne, idInformErrorTwo, idInformErrorThree];

                        const updateUserField = async (email, fieldName, updatedArrayThirdValue) => {
                            const userRef = doc(db, "users", email);
                            try {
                                await updateDoc(userRef, { [fieldName]: updatedArrayThirdValue });
                            } catch (error) {
                                console.log(error);
                            }
                        };

                        await updateUserField(email, fieldName, updatedArrayThirdValue);
                    }
                    dispatch(setUserInformErrors({
                        type: 'ADD_INFORM_ERROR',
                        payload: [
                            {
                                idInformErrors: informErrorsCollectionDocRef.id,
                                isFixed: false,
                                textFeedBackUser: '',
                            }
                        ]
                    }));
                    setIsSelectedElementStepTwo(true);
                }
                else {
                    setIsSelectedElementStepTwo(true);
                }
            }


            //creating an error data message and sending it to the mail of the error resolution service on the site
            const dataMessageUserAboutError =
                isAuth ?
                    `Inform Error Id = ${informErrorsCollectionDocRef.id}\n
                ~User Account Data\n
                Email: ${email}\n
                Name: ${displayName}\n
                ~Error specified by the user in site\n
                Selected text user in site with error: ${selectedText}\n
                Text user inform about error: ${isInputInfromErrors}\n`
                    :
                    `~id Inform Error = ${informErrorsCollectionDocRef.id}\n
                ~Unregistered user\n
                ~Error specified by the user in site\n
                Selected text user in site with error: ${selectedText}\n
                Text user inform about error: ${isInputInfromErrors}\n`
                ;

            const response = await emailjs.send(serviceId, templateId, {
                to_email: 'errorscoorchik@gmail.com',
                message: dataMessageUserAboutError,
            }, publicKey);
            console.log(response.status, response.text);
            setLoadingDataForm(false);
        } catch (err) {
            setLoadingDataForm(false);
            console.log(err);
        }
    };

    const [isChangeNameButtonLoading, setIsChangeNameButtonLoading] = useState(false);
    useEffect(() => {
        if (isLoadingDataForm) {
            setIsChangeNameButtonLoading(true);
        }
        else {
            setIsChangeNameButtonLoading(false);
        }
    }, [isLoadingDataForm]);

    return isSelectedElement && limitSelectedTextCount ? (
        !isSelectedElementStepTwo ? (
            <div className='fp-show-container-inform-errors-in-site'>
                {isTextInformErrorSizeAdaptiveXs ?
                    <div className='fp-cont-show-inform-errors_size-cont-XS'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form id='form-sending-errors-message' onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveS ?
                    <div className='fp-cont-show-inform-errors_size-cont-S'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveM ?
                    <div className='fp-cont-show-inform-errors_size-cont-M'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveL ?
                    <div className='fp-cont-show-inform-errors_size-cont-L'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveXl ?
                    <div className='fp-cont-show-inform-errors_size-cont-XL'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveXxl ?
                    <div className='fp-cont-show-inform-errors_size-cont-XXL'>
                        <div>
                            <div className='hide-cont-hide-inform-errors'>
                                <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                            </div>
                            <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                <span className='main-text-cont'>
                                    Detected error
                                </span>
                                <span className='main-text-selected'>
                                    Selected text:
                                </span>
                                <span className='text-error'>
                                    {selectedText}
                                </span>
                                <textarea
                                    {...register('inputInfromErrors', {
                                    })}
                                    name='message'
                                    maxLength='300'
                                    id='textarea-input-error-user'
                                    className='textarea-inform-errors'
                                    placeholder='*Describe the error'
                                    onChange={(e) => setInputInfromErrors(e.target.value)}
                                />
                                <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                            </form>
                        </div>
                    </div>
                    : null}
                {isTextInformErrorSizeAdaptiveXxxl ?
                    <div className='fp-cont-show-inform-errors_size-cont-XXXL'>
                        {isLoadingDataForm ?
                            <div>
                                <span class="loader_cont-size-XXXL"></span>
                            </div>
                            :
                            <div>
                                <div className='hide-cont-hide-inform-errors'>
                                    <img src={hideContAdding} onClick={() => (setSelectedElement(false))} className='img-hide-cont-inform-errors' />
                                </div>
                                <form onSubmit={handleSubmit(handleUserInformErrors)} className='form-inform-errors'>
                                    <span className='main-text-cont'>
                                        Detected error
                                    </span>
                                    <span className='main-text-selected'>
                                        Selected text:
                                    </span>
                                    <span className='text-error'>
                                        {selectedText}
                                    </span>
                                    <textarea
                                        {...register('inputInfromErrors', {
                                        })}
                                        name='message'
                                        maxLength='300'
                                        id='textarea-input-error-user'
                                        className='textarea-inform-errors'
                                        placeholder='*Describe the error'
                                        onChange={(e) => setInputInfromErrors(e.target.value)}
                                    />
                                    <button type='submit' className='button-submit-inform-error'>{isChangeNameButtonLoading ? 'Sending...' : 'Report an error'}</button>
                                </form>
                            </div>}
                    </div> : null}
            </div>) : <OpenContHookMouseFunctionalityErrorsStepTwo />
    ) : null
}