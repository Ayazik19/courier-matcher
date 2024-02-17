import UserAccSetingsHeaderPage from "../componentsUserAccPage/userAccSetingsHeaderPage";
import OptNotificationsHistory from './optNotificationsHistory.jsx';
import './notificationsHistoryPage.css';


export default function NotificationsHistoryPage(){
    return(
        <div>
            <div>
                <UserAccSetingsHeaderPage />
            </div>
            <div className="main-content-notifications">
                <div className="notifications-display-history">
                    <OperationDisplayHistoryNotifications />
                </div>
                <div className="notifications-filters-history">
                    
                </div>
            </div>
        </div>
    );
}