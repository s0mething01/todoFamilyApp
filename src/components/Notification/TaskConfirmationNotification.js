import Button from 'components/Button/Button';
import { connect, useSelector } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';

import { remove as removeNoficationFromFirebase, add as addNotificationToFirebase } from 'firebaseFunctions/notifications';
import { remove as removeTaskFromFirebase } from 'firebaseFunctions/tasks';
import { update as updateMemberOnFirebase } from 'firebaseFunctions/members';

import { membersTypes } from 'redux/members';
import { tasksTypes } from 'redux/tasks';
import { notificationsTypes } from 'redux/notifications';

import getDate from 'utils/getDate';
import getID from 'utils/getID';

import { types as notificationTypes } from './notificationTypes';

const TaskConfirmationNotification = ({ notification, member, task, showAlert, removeNotification, removeTask, updateUser, addNotification }) => {
    const notifications = useSelector((state) => state.notifications);
    const { currentUser } = useAuth();
    const { title, content, expirationDate, points } = task;

    const notificaitiondate = getDate(notification.date).toLocaleString().slice(0, -3);
    const taskDate = getDate(expirationDate).toLocaleString().slice(0, -3);
    const updatedPoints = parseInt(member.points, 10) + parseInt(task.points, 10);
    const updatedTasksDone = parseInt(member.tasksDone, 10) + 1;

    const confirmTask = async () => {
        const notificationData = {
            id: getID(),
            points: task.points,
            memberID: task.ownerID,
            memberName: member.name,
            type: notificationTypes.TASK_CONFIRMED,
            date: new Date(),
            taskName: task.title,
        };
        try {
            await removeNoficationFromFirebase(currentUser.uid, notification);
            removeNotification(notification.id);

            await removeTaskFromFirebase(currentUser.uid, task);
            removeTask(task.id);

            await updateMemberOnFirebase(currentUser.uid, { ...member, points: updatedPoints, tasksDone: updatedTasksDone }, member);
            updateUser({ ...member, points: updatedPoints, tasksDone: updatedTasksDone });

            await addNotificationToFirebase(currentUser.uid, notificationData);
            addNotification(notificationData);

            const relatedToTask = notifications.filter((n) => n.taskID === task.id);
            if (relatedToTask.length > 0) relatedToTask.forEach((n) => removeNoficationFromFirebase(currentUser.uid, n).then(() => removeNotification(n.id)));
        } catch (error) {
            showAlert('Uups, coś poszło nie tak!');
        }
    };

    const denyTask = async () => {
        try {
            await removeNoficationFromFirebase(currentUser.uid, notification);
            removeNotification(notification.id);

            await removeTaskFromFirebase(currentUser.uid, task);
            removeTask(task.id);
        } catch {
            showAlert('Uups, coś poszło nie tak!');
        }
    };

    return (
        <li>
            <div>
                <div className="dateWrapper">
                    <p className="date">{notificaitiondate}</p>
                </div>
                <p className="heading">
                    <span>{member.name} </span>
                    prosi o zatwierdzenie zadania
                    <span> &quot;{title}&quot;</span>
                </p>
                <div className="textWrapper">
                    <p className="text">
                        Za zadanie zostanie przyznane <span>{points}</span> punktów
                    </p>
                    <p className="text">
                        Task powinien zostać wykonany do <span>{taskDate}</span>
                    </p>
                    <p className="text">Opis tego zadania: {content}</p>
                </div>
                <div className="buttonsWrapper">
                    <Button className="left" onClick={() => denyTask(task, notification)}>
                        Odrzuć
                    </Button>
                    <Button onClick={() => confirmTask(task, member, notification)}>Zatwierdź</Button>
                </div>
            </div>
        </li>
    );
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (member) => dispatch({ type: membersTypes.UPDATE_MEMBER, payload: member }),
    removeNotification: (id) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: id }),
    removeTask: (id) => dispatch({ type: tasksTypes.REMOVE_TASK, payload: id }),
    addNotification: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
});

export default connect(null, mapDispatchToProps)(TaskConfirmationNotification);
