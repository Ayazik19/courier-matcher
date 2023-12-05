import React from 'react';
import {Link} from 'react-router-dom';
import "./homePage.css";
import img from './homePagePhotoContent.jpeg';
import HomePageHeader from './homePageHeader.jsx';
import imgContentCardOne from './homePagePhotoContentCardsOne.png';
import imgContentCardTwo from './homePagePhotoContentCardsTwo.png';
import imgContentCardThree from './homePagePhotoContentCardsThree.png';
import imgContentCardFour from './homePagePhotoContentCardsFour.png';
import imgUserReviewsOne from './homePagePhotoContentUsersReviewsOne.png';
import imgUserReviewsTwo from './homePagePhotoContentUsersReviewsTwo.png';
import imgUserReviewsThree from './homePagePhotoContentUsersReviewsThree.png';


export default function HomePage(){
    return(
        <div>
            <div>
                <HomePageHeader />
            </div>
            <main>
                <div className="main-img-container">
                    <div className="page-line-content">
                        <div className="main-content-text">
                            <span className='span-main-text-1'>
                                <a href='#footer' className='main-text'>
                                We will help you,<br></br> 
                                easily pick up a courier&sup1;
                                </a>
                            </span>
                            <span className='span-text-2'>Our system will help, <br></br>
                                make delivery quickly and reliably
                            </span>
                        </div>
                        <div className="main-content-button">
                        <button type='button' className='button-main-content link-choose-courier'>
                            <Link className = 'link-to-choose-courier-main-content' to = '/ChooseCourier'>Pick up</Link>
                        </button>
                        </div>
                    </div>
                </div>
            </main>
            <content>
                <div className='page-line-content'>
                    <div className='content-1-advantages-couriers' id='advanteges'>
                        <div className='description-text'>
                            <h1 id = 'title-1' className='content-name-advantages-couriers'>
                                Advantages of using <br></br>
                                our courier selection service
                            </h1>
                        </div>
                        <div className='advantages-couriers'>
                            <div className='cards-1'>
                                <div className='text-container-1'>
                                    <span className='span-large-text-content-castom'>
                                        Saving time
                                    </span>
                                    <br></br>
                                    <span>
                                        You don't have to wait <br></br>
                                        for a courier search
                                    </span>
                                </div>
                                <div className='text-container-2'>
                                    <span className='span-large-text-content-castom'> 
                                        Low cost of delivery
                                    </span>
                                    <br></br>
                                    <span>
                                        Our system is designed, so that you will
                                        pay less compared to other services
                                    </span>
                                </div>
                                <div className='text-container-3'>
                                    <span className='span-large-text-content-castom'>
                                        Selection
                                    </span>
                                    <br></br>
                                    <span>
                                        We will select experienced couriers for you
                                    </span>
                                </div>
                            </div>
                            <img className='photo' src={img} alt='coorchik-courier'/>
                            <div className='cards-2'>
                                <div className='text-container-1'>
                                    <span className='span-large-text-content-castom'>
                                        Delivery speed
                                    </span>
                                    <br></br>
                                    <span>                                            
                                        Couriers deliver the order 
                                        in less than 15 minutes
                                    </span>
                                </div>
                                <div className='text-container-2'>   
                                    <span className='span-large-text-content-castom'>                          
                                        The point system
                                    </span>
                                    <br></br>
                                    <span>
                                        Couriers have their own rating of points
                                        for successfully completed orders
                                    </span>
                                </div>
                                <div className='text-container-3'>
                                    <span className='span-large-text-content-castom'>
                                        Confidence delivery
                                    </span>
                                    <br></br>
                                    <span>
                                        <a href='#footer' className='link-span_style-black'>                             
                                            You will be sure, the courier
                                            deliver your order to you.&sup2;
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className='button-content link-choose-courier'>
                            <Link className = 'link-to-choose-courier-content-1' to = '/ChooseCourier'>Pick up</Link>
                        </button>
                    </div>
                    <div className='content-2-user-reviews'>
                        <div className='description-text'>
                            <h1 id = 'title-2' className='content-name-user-reviews'>
                                Users reviews
                            </h1>
                        </div>
                        <div className='users-reviews-cards'>
                            <div className='users-reviews-cards-1'>
                                <div className='text-container'>
                                    <img src = {imgUserReviewsOne} className='photo-user-reviews-1' alt='Alexander Ivanov'/>
                                    <span className='span-large-text-content-castom_left'>
                                        Alexander Ivanov
                                    </span>
                                    <br></br>
                                    <span className='span-weight'>
                                        «You attach great importance to the process of choosing couriers.
                                        They are professionals in their field and are always polite and courteous.The process of selecting couriers in this service, in my opinion, is very thorough»
                                    </span>
                                </div>
                            </div>
                            <div className='users-reviews-cards-3'>
                                <div className='text-container'>
                                    <img src = {imgUserReviewsThree} className='photo-user-reviews-3' alt='Emilia Williams'/>
                                    <span className='span-large-text-content-castom_left'>
                                        Emilia Williams
                                    </span>
                                    <br></br>
                                    <span className='span-weight'>
                                        «Delivery of orders in this service is performed at the highest level.  
                                        The quality of delivery in this service is simply excellent. 
                                        I want to thank you with a huge number of orders delivered to me, which was picked up by your excellent courier selection system, courier - Ayaz Namazov, an excellent courier who is my deliverer for a long time.»
                                    </span>
                                </div>
                            </div>
                            <div className='users-reviews-cards-2'>
                                <div className='text-container'>
                                    <img src = {imgUserReviewsTwo} className='photo-user-reviews-2' alt='Maxim Smirnov'/>
                                    <span className='span-large-text-content-castom_left'>
                                        Maxim Smirnov
                                    </span>
                                    <br></br>
                                    <span className='span-style_weight'>
                                        «The quality of delivery in this service is simply excellent. 
                                        This service is distinguished by professionalism, as well as constant courtesy and attentiveness on the part of its employees. 
                                        The process of selecting couriers within this service, in my opinion, very detailed.»
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-3-service-choose-instructions-couriers'>
                        <div className='description-text'>
                            <h1 id='title-3' className='content-name-service-choose-instructions-couriers'>
                                How to choose a courier
                            </h1>
                        </div>
                        <div className='instruction-choose-courier-cards'>
                            <div className='cards-instruction-1'>
                                <span className='span-large-text-content-cards-castom_bald-400'>
                                    Fill out the form 
                                    <br></br>
                                    to select a courier
                                </span>
                                <span className='span-large-text-content-cards-style_opacity'>
                                    1-2 min
                                </span>
                                <img src = {imgContentCardOne} className='photo-instruction-cards-1'/>
                            </div>
                            <div className='cards-instruction-2'>
                                <span className='span-large-text-content-cards-castom_bald-400'>
                                    Read the terms 
                                    <br></br> 
                                    of the user agreement
                                </span>
                                <span className='span-large-text-content-cards-style_opacity'>
                                    2-3 min
                                </span>
                                <img src = {imgContentCardTwo} className='photo-instruction-cards-2'/>
                            </div>
                            <div className='cards-instruction-3'>
                                <span className='span-large-text-content-cards-castom_bald-400'>
                                    Check the blog
                                    <br></br> 
                                    about our couriers
                                </span>
                                <img src = {imgContentCardThree} className='photo-instruction-cards-3'/>
                                <span className='span-large-text-content-cards-style_opacity'>
                                    ∞ min
                                </span>
                            </div>
                            <div className='cards-instruction-4'>
                                <span className='span-large-text-content-cards-castom_bald-400'>
                                    <a href = '#footer' className='link-span_style-black'>
                                        Add a courier
                                        <br></br> 
                                        to your personal acc&sup3;
                                    </a>
                                </span>
                                <br></br>
                                <img src = {imgContentCardFour} className='photo-instruction-cards-4'/>
                            </div>
                        </div>
                        <div>
                            <button type='button' className='button-instruction-couriers'>
                                <Link className = 'link-to-choose-courier_style-white' to = '/ChooseCourier'>Pick up</Link> 
                            </button>
                        </div>
                    </div>
                </div>
            </content>
            

            <footer id='footer'>
                <div className='expalanations-copyrights-text'>
                    <div className='explanation-user-usage'>
                        <div className='expalanation-text'>
                            <span className='span-explanation-1'>
                                &sup1;On our website, there is a form in which you need to answer questions about delivery. 
                                The system will select a courier for you based on your delivery preferences. 
                                Results, which will be offered by us the option of choosing a courier(s), which you filled in with the data in the form.
                            </span>
                            <br></br>
                            <span className='span-explanation-2'>
                                <a>
                                    &sup2;User Agreement clause 2.1.
                                </a>
                                 The delivery courier is obliged to deliver the order after he has read the status in the application that he picked up the order from the restaurant. 
                                If the courier has a good reason, he will have to return to the restaurant and give the order. Otherwise, courier will be fired.
                            </span>
                            <br></br>
                            <span className='span-explanation-3'>
                                &sup3;After the system has selected a courier(s) for you, you can add a courier by clicking on the "Add courier" button to your personal account
                                for further orders.
                            </span>
                        </div>
                    </div>
                    <div className='copyright'>
                        <span className='span-copyright-1'>
                            © 2023 Coorchik
                        </span>
                        <br></br>
                        <span className='span-copyright-2'>
                            Coorchik Company Project
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}