import UserAccSetingsHeaderPage from "../componentsUserAccPage/userAccSetingsHeaderPage";
import OperationDisplayHistoryNotifications from './operationDisplayHistoryNotifications.jsx';
import ManageNotifications from './manageNotifications.jsx';
import ManageHiddenNotifications from './manageHiddenNotifications.jsx';
import './notificationsHistoryPage.css';


export default function NotificationsHistoryPage(){
    return(
        <div>
            <div>
                <UserAccSetingsHeaderPage />
            </div>
            <div className="main-content-notifications">
                <div className="main-content-display-operations">
                    <div className="conts-manage-history notifications-display-history-left-cont">
                    <OperationDisplayHistoryNotifications />
                </div>
                    <div className="notifications-manage-right-cont">
                        <div className="conts-manage-history manage-blocks-nots">
                            <ManageNotifications />
                        </div>
                        <div className="conts-manage-history manage-hidden-nots">
                            <ManageHiddenNotifications />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}