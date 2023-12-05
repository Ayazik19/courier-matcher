import { useAuth } from "../hook/useauth";
import { Link } from 'react-router-dom';
import photoUserDefault from '../componentsUserAccPage/photoUserDefaultAcc.jpg';
import './checkAccountPhotoProfile.css';

export default function CheckAccountPhotoProfile(){
    const { photoAcc } = useAuth();

    return photoAcc ? (
        <div>
            <Link to = '/User-account' className="link-user-acc">
                <img 
                    src={photoAcc}
                    className="photo-user-acc"
                />
            </Link>
        </div>  
    ) : (
        <div>
            <Link to = '/User-account' className="link-user-acc">
                <img 
                    src={photoUserDefault}
                    className="photo-user-acc"
                />
            </Link>  
        </div>
    );
}