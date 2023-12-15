import { useAuth } from "../hook/useauth";
import { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import photoUserDefault from '../componentsUserAccPage/photoUserDefaultAcc.jpg';
import './checkAccountPhotoProfile.css';
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function CheckAccountPhotoProfile(){
    const { photoAcc, email } = useAuth();

    const [profilePhotoURL, setProfilePhotoURL] = useState('');

    useEffect(() => {
      const fetchUserProfilePhoto = async () => {
        try {
            const fileRef = ref(storage, 'accPhotoProfile/' + email);
        
            const downloadURL = await getDownloadURL(fileRef);
  
            setProfilePhotoURL(downloadURL);
        } catch (error) {
        }
      };
  
      fetchUserProfilePhoto();
    }, []);

    return photoAcc ? (
        <div>
            {profilePhotoURL ? <img 
                src={profilePhotoURL}
                className="photo-user-acc"
            /> : null}
        </div>  
    ) : (
        <div>
            <img 
                src={photoUserDefault}
                className="photo-user-acc"
            />
        </div>
    );
}