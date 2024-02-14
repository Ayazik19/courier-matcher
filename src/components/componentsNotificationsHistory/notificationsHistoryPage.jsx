import UserAccSetingsHeaderPage from "../componentsUserAccPage/userAccSetingsHeaderPage";
import './notificationsHistoryPage.css';


export default function NotificationsHistoryPage(){
    return(
        <div>
            <div>
                <UserAccSetingsHeaderPage />
            </div>
            <div className="main-content-notifications">
                <div className="notifications-display-history">
                    
                </div>
                <div className="notifications-filters-history">
                    
                </div>
            </div>
        </div>
    );
}