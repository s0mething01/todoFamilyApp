import { types as notificationTypes } from 'components/Notification/notificationTypes';
import getDate from 'utils/getDate';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const { TASK_CONFIRMATION, AWARD_CONFIRMATION, TASK_CONFIRMED, AWARD_CONFIRMED, TASK_NEW, AWARD_NEW } = notificationTypes;

const filterNotifications = (notifications, role, userID) =>
    notifications
        .filter(({ type, memberID }) => {
            switch (role) {
                case AccountTypes.PARENT:
                    return type === TASK_CONFIRMATION || type === AWARD_CONFIRMATION;
                case AccountTypes.CHILD:
                    return (type === TASK_CONFIRMED || type === AWARD_CONFIRMED || type === TASK_NEW || type === AWARD_NEW) && memberID === userID;
                default:
                    return false;
            }
        })
        .sort((notification, prevNotification) => getDate(prevNotification.date) - getDate(notification.date));

export default filterNotifications;
