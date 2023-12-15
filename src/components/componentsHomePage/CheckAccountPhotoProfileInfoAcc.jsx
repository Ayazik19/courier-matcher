import './CheckAccountPhotoProfileInfoAcc.css';
import { useAuth } from "../hook/useauth";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, getFirestore, doc } from 'firebase/firestore';
import { setUserPhotoProfile } from '../store/slices/userSlice';
import photoUserDefault from '../componentsUserAccPage/photoUserDefaultAcc.jpg';
import changePhotoUserAccHomePage from './changePhotoUserAccHomePage.png';
import './checkAccountPhotoProfile.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function CheckAccountPhotoProfile(){
    const { photoAcc, email } = useAuth();
    const dispatch = useDispatch();

    const [profilePhotoURL, setProfilePhotoURL] = useState('');
    const [ isUploadUserPhoto, setIsUploadUserPhoto] = useState(false);
    const [ uploadPhotoUserPhoto, setUploadUserPhoto] = useState('');

    const handleFileUpload = async (event) => {

        const file = event.target.files[0];
        
        try {
            const storageRef = ref(storage, 'accPhotoProfile/' + email);
            await uploadBytes(storageRef, file);
        
            const downloadURL = await getDownloadURL(storageRef);
            setUploadUserPhoto(downloadURL);
        } catch (error) {
        }
    }

    useEffect(() => {
        const fetchUserPhotoData = async () => {
            const fileRef = ref(storage, 'accPhotoProfile/' + email);

            try {
                const downloadURLSearchPhotoUserInStorage = await getDownloadURL(fileRef);
                
                if (downloadURLSearchPhotoUserInStorage) {
                    setProfilePhotoURL(downloadURLSearchPhotoUserInStorage);
                    setIsUploadUserPhoto(true);
                }
            } catch (error) {
            }
        }

        if (uploadPhotoUserPhoto) {
            const updateUserPhotoProfile = async (email, photoAccValue) => {
            const userRef = doc(db, 'users', email);
            try {
                await updateDoc(userRef, { photoAcc: photoAccValue });
                dispatch(setUserPhotoProfile({ photoAcc: photoAccValue }));
            } catch (error) {
            }
          };
          updateUserPhotoProfile(email, true);
        }

        fetchUserPhotoData();
      }, [uploadPhotoUserPhoto]);

    return photoAcc ? (
        <div className='acc-icon-info-user'>
            {uploadPhotoUserPhoto ? <img 
                src={uploadPhotoUserPhoto}
                className="photo-user-acc-info-acc"
            /> : 
            <img 
                src={profilePhotoURL || photoUserDefault}
                className="photo-user-acc-info-acc"
            />}
                <label for="upload-btn" className="upload-label">
                <img src={changePhotoUserAccHomePage} className='change-photo-info-user-acc'/>
                    <input type="file" id="upload-btn" className="upload-photo-user-acc" onChange={handleFileUpload} />
                </label>
        </div>  
    ) : (
        <div className='acc-icon-info-user'>
            {isUploadUserPhoto ? <img 
                src={uploadPhotoUserPhoto}
                className="photo-user-acc-info-acc"
            /> : 
            <img 
                src={photoUserDefault}
                className="photo-user-acc-info-acc"
            />}
            <label for="upload-btn" className="upload-label">
                <img src={changePhotoUserAccHomePage} className='change-photo-info-user-acc'/>
                <input type="file" id="upload-btn" className="upload-photo-user-acc" onChange={handleFileUpload} />
            </label>
        </div>
    );
}