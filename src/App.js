import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignInPage from './components/componentsSignInPage/signInPage';
import SignInPasswordRecoveryPage from './components/componentsSignInPasswordRecoveryPage/signInPasswordRecoveryPage';
import PageChooseCourier from './components/componentsChooseCourierPage/pageChooseCourier';
import FormChooseCourierResult from './components/componentsChooseCourierPage/formChooseCourierResult';
import HomePage from './components/componentsHomePage/homePage.jsx';
import RegistrationPage from './components/componentsRegistrationPage/registrationPage.jsx';
import UserAccSetingsPage from './components/componentsUserAccPage/userAccSetingsPage.jsx';
import TermsCooperationPage from './components/componentsTermsCooperationPage/termsCooperationPage';
import { HookSignInPagesProvider } from './components/componentsSignInPage/useHookSignInPages.js';
import { HookStepsRedirectProvider } from './components/componentsUserAccPage/hookStepsDeleteAcc/hookStepsDeleteAcc'; 
import { HookMouseFunctionalityErrorsProvider } from './mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';

function App() {
  return (
    <div className="App">
      <HookMouseFunctionalityErrorsProvider>
        <HookSignInPagesProvider>
          <HookStepsRedirectProvider>
            <Routes>
              <Route path ="/" element = {<HomePage />}>Home</Route>
              <Route path = "/SignIn-Registration" element= {<SignInPage />}></Route>
              <Route path= "/Terms-Cooperation" element = {<TermsCooperationPage />}></Route>
              <Route path = "/Sign-In-password-recovery" element = {<SignInPasswordRecoveryPage />}></Route>
              <Route path ="/Registration-SignIn" element = {<RegistrationPage />}></Route>
              <Route path = "/ChooseCourier" element ={<PageChooseCourier />}></Route>
              <Route path = "/User-account" element ={<UserAccSetingsPage />}></Route>
              <Route path ="/Chooose-courier-result" element = {<FormChooseCourierResult />}></Route> 
            </Routes>
          </HookStepsRedirectProvider>
        </HookSignInPagesProvider>
      </HookMouseFunctionalityErrorsProvider>
    </div>
  );
}

export default App;