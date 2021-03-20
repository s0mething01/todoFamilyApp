import TaskConfirmationNotification from './TaskConfirmationNotification';
import AwardConfirmationNotification from './AwardConfirmationNotification';
import TaskConfirmedNotification from './TaskConfirmedNotificaiton';
import AwardConfirmedNotification from './AwardConfirmedNotification';
import AwardNewNotification from './AwardNewNotification';
import TaskNewNotification from './TaskNewNotification';

import { types as notificationTypes } from './notificationTypes';

const Notification = ({ notification, members, tasks, awards, showAlert }) => {
    const member = members.filter((el) => el.id === notification.memberID)[0];

    switch (notification.type) {
        case notificationTypes.TASK_CONFIRMATION:
            return (
                <TaskConfirmationNotification
                    notification={notification}
                    member={member}
                    task={tasks.filter((el) => el.id === notification.taskID)[0]}
                    showAlert={showAlert}
                />
            );
        case notificationTypes.AWARD_CONFIRMATION:
            return (
                <AwardConfirmationNotification
                    notification={notification}
                    member={member}
                    award={awards.filter((el) => el.id === notification.awardID)[0]}
                    showAlert={showAlert}
                />
            );
        case notificationTypes.TASK_CONFIRMED:
            return (
                <TaskConfirmedNotification
                    notification={notification}
                    member={member}
                    task={tasks.filter((el) => el.id === notification.taskID)[0]}
                    showAlert={showAlert}
                />
            );
        case notificationTypes.AWARD_CONFIRMED:
            return <AwardConfirmedNotification notification={notification} member={member} showAlert={showAlert} />;
        case notificationTypes.TASK_NEW:
            return <TaskNewNotification notification={notification} member={member} showAlert={showAlert} />;
        case notificationTypes.AWARD_NEW:
            return <AwardNewNotification notification={notification} member={member} showAlert={showAlert} />;
        default:
            return null;
    }
};

export default Notification;
