import Button from 'components/Button/Button';
import { connect } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';

import { remove as removeNoficationFromFirebase } from 'firebaseFunctions/notifications';
import { notificationsTypes } from 'redux/notifications';

import getDate from 'utils/getDate';

const TaskConfirmedNotification = ({ notification, removeNotification }) => {
    const { currentUser } = useAuth();
    const date = getDate(notification.date).toLocaleString().slice(0, -3);

    const confirmNotification = async () => {
        await removeNoficationFromFirebase(currentUser.uid, notification);
        removeNotification(notification.id);
    };

    return (
        <li>
            <div>
                <div className="dateWrapper">
                    <p className="date">{date}</p>
                </div>
                <p className="heading">
                    Potwierdzono wykonanie zadania -<span> &quot;{notification.taskName}&quot;</span>
                </p>
                <div className="textWrapper">
                    <p className="text">
                        na twoje konto przelano
                        <span> {notification.points} </span>
                        punktów.
                    </p>
                </div>
                <div className="buttonsWrapper">
                    <Button onClick={() => confirmNotification()}>Ok</Button>
                </div>
            </div>
        </li>
    );
};

const mapDispatchToProps = (dispatch) => ({
    removeNotification: (id) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: id }),
});

export default connect(null, mapDispatchToProps)(TaskConfirmedNotification);
