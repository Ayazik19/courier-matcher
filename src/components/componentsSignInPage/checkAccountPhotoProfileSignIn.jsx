import './checkAccountPhotoProfileSignIn.css';
import { useAuth } from "../hook/useauth";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import photoUserDefault from '../componentsUserAccPage/photoUserDefaultAcc.jpg';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function CheckAccountPhotoProfileSignIn(){
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
            <Link to = '/User-account' className="link-user-acc">
                {profilePhotoURL ?<img 
                    src={profilePhotoURL}
                    className="photo-user-acc-sign-in"
                /> : null}
            </Link>
        </div>  
    ) : (
        <div>
            <Link to = '/User-account' className="link-user-acc">
                <img 
                    src={photoUserDefault}
                    className="photo-user-acc-sign-in"
                />
            </Link>  
        </div>
    );
}
