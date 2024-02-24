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
import { HooksProcessingDatabaseUserNotificationsProvider } from './components/globalHooks/hooksProcessingDatabaseUserNotifications.js';
import { HookHeaderIconsEmergenceProvider } from './components/globalHooks/hookHeaderNavIconsEmergence.js';
import { HookSignInPagesProvider } from './components/componentsSignInPage/useHookSignInPages.js';
import { HookStepsRedirectProvider } from './components/componentsUserAccPage/hookStepsDeleteAcc/hookStepsDeleteAcc';
import { HookMouseFunctionalityErrorsProvider } from './mouseFunctionalityErrors/hookMouseFunctionalityErrors.js';
import NotificationsHistoryPage from './components/componentsNotificationsHistory/notificationsHistoryPage.jsx';
import { HookPagesNotsProvider } from './components/globalHooks/usePagesNots.js';

function App() {
    return (
        <div className="App">
            <HooksProcessingDatabaseUserNotificationsProvider>
                <HookPagesNotsProvider>
                <HookMouseFunctionalityErrorsProvider>
                    <HookHeaderIconsEmergenceProvider>
                        <HookSignInPagesProvider>
                            <HookStepsRedirectProvider>
                                <Routes>
                                    <Route path="/" element={<HomePage />}>Home</Route>
                                    <Route path="/SignIn-Registration" element={<SignInPage />}></Route>
                                    <Route path="/Terms-Cooperation" element={<TermsCooperationPage />}></Route>
                                    <Route path="/Sign-In-password-recovery" element={<SignInPasswordRecoveryPage />}></Route>
                                    <Route path="/Registration-SignIn" element={<RegistrationPage />}></Route>
                                    <Route path="/ChooseCourier" element={<PageChooseCourier />}></Route>
                                    <Route path="/User-account" element={<UserAccSetingsPage />}></Route>
                                    <Route path="/Chooose-courier-result" element={<FormChooseCourierResult />}></Route>
                                    <Route path="/Notifications-hisory" element={<NotificationsHistoryPage />}></Route>
                                </Routes>
                            </HookStepsRedirectProvider>
                        </HookSignInPagesProvider>
                    </HookHeaderIconsEmergenceProvider>
                </HookMouseFunctionalityErrorsProvider>
                </HookPagesNotsProvider>
            </HooksProcessingDatabaseUserNotificationsProvider>
        </div>
    );
}

export default App;