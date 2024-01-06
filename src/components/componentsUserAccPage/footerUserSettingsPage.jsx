import './footerUserSettingsPage.css';
import footerIconVkontakte from './footerIconVkontakte.png';
import footerIconTelegram from './footerIconTelegram.png';
import logoSite from '../componentsHomePage/logoSite.png';
import { Link } from 'react-router-dom';


export default function FooterUserSettingsPage(){
    return(
        <footer className='footer-user-acc-setings'>
                <div className='footer-page-line'>
                    <div className='footer-nav_left'>
                        <ul className='list-pages'>
                            <li className='list-pages-1'>
                                <Link to='/' className='link-navs-1'>About</Link>
                            </li>
                            <li className='list-pages-2'>
                                <Link to='/User-account' className='link-navs-2'>Account</Link>
                            </li>
                            <li className='list-pages-4'>
                                <Link to='/Terms-Cooperation' className='link-navs-4'>Terms coop</Link>
                            </li>
                            <li className='list-pages-3'>
                                <Link to='/ChooseCourier' className='link-navs-3'>Choose courier</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-logo_center'>
                        <img src={logoSite} className='footer-logo' />
                        <span className='insturction-error-site'>
                            Did you find a problem on the site?
                            <br></br>
                            Select this element and hold down the alt key
                        </span>
                    </div>
                    <div className='footer-nav_right'>
                        <ul className='footer-copyright_right'>
                            <li className='footer-list-text-copyright_right-1'>
                                <a className='text-navs-1'>Support service:</a>
                            </li>
                            <li className='footer-list-text-copyright_right-2'>
                                <div className='soc-sup-icons'>
                                    <a className='soc-1' target="_blank" href = 'https://t.me/SSCourcjik'>
                                        <img src={footerIconTelegram} alt="telegram" className='img-icon-telegram'/>
                                        <span className='text-soc'>
                                            Telegram
                                        </span>
                                    </a>
                                    <div className='soc-2' target="_blank" href = 'https://vk.com/coorchik'>
                                        <img src={footerIconVkontakte} alt="vkontakte" className='img-icon-vkontakte' />
                                        <a className='text-soc'>
                                            Vkontakte
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className='footer-list-text-copyright_right-3'>
                                <a className='link-navs-2'>contacts, improve and report site <br></br>errors</a>
                            </li>
                            <li className='footer-list-text-copyright_right-4'>
                                <a href ='mailto:improveCoorchik@gmail.com'  className='link-navs-3'>improveCoorchik@gmail.com</a>
                            </li>
                            <li className='footer-list-text-copyright_right-5'>
                                <a href = 'mailto:errorcoorchik@mail.ru' className='link-navs-4'>errorscoorchik@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
    );
}