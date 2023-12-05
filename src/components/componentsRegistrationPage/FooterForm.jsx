import { Link } from 'react-router-dom';
import './FooterForm.css';

export default function FooterForm(){
    return(
      <div className='page-line-footer_sign-in-registration'>
        <div className='footer-nav_sign-in-registration'>
            <select className='form-select-language_sign-in-registration'>
                <option>English</option>
                <option>Russian</option>
                <option>Espanol</option>
            </select>
            <div className='footer-form-copyright_sign-in-registration'>
                <span className='text-terms-cooperation_sign-in-registration'>
                    <Link to = '/Terms-Cooperation' className = "text-link-terms-cooperation_sign-in-registration">Terms cooperation</Link>
                </span>
                <span className='text-coopyright_sign-in-registration'>
                    © 2023 Coorchik
                </span>
            </div>
        </div>
      </div>  
    );
}
