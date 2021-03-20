import Button from 'components/Button/Button';
import { connect, useSelector } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';

import { remove as removeNoficationFromFirebase, add as addNotificationToFirebase } from 'firebaseFunctions/notifications';
import { remove as removeAwardFromFirebase } from 'firebaseFunctions/awards';
import { update as updateMemberOnFirebase } from 'firebaseFunctions/members';

import { membersTypes } from 'redux/members';
import { awardsTypes } from 'redux/awards';
import { notificationsTypes } from 'redux/notifications';

import getDate from 'utils/getDate';
import getID from 'utils/getID';

import { types as notificationTypes } from './notificationTypes';

const AwardConfirmationNotification = ({ notification, member, award, showAlert, removeNotification, removeAward, updateUser, addNotification }) => {
    const notifications = useSelector((state) => state.notifications);
    const { cost = 0, subtitle = '', title = '' } = award;
    const { points = 0 } = member;
    const date = getDate(notification.date).toLocaleString().slice(0, -3);
    const updatedUserPoints = parseInt(points, 10) - parseInt(cost, 10);
    const { currentUser } = useAuth();

    const confirmAward = async () => {
        const notificationData = {
            id: getID(),
            points: award.cost,
            memberName: member.name,
            memberID: member.id,
            type: notificationTypes.AWARD_CONFIRMED,
            date: new Date(),
            awardName: award.title,
        };
        try {
            await removeNoficationFromFirebase(currentUser.uid, notification);
            removeNotification(notification.id);

            await removeAwardFromFirebase(currentUser.uid, award);
            removeAward(award.id);

            await updateMemberOnFirebase(currentUser.uid, { ...member, points: updatedUserPoints }, member);
            updateUser({ ...member, points: updatedUserPoints });

            await addNotificationToFirebase(currentUser.uid, notificationData);
            addNotification(notificationData);

            const relatedToAward = notifications.filter((n) => n.awardID === award.id);
            if (relatedToAward.length > 0) relatedToAward.forEach((n) => removeNoficationFromFirebase(currentUser.uid, n).then(() => removeNotification(n.id)));
        } catch {
            showAlert('Uups, coś poszło nie tak!');
        }
    };

    const denyAward = () => {
        removeNoficationFromFirebase(currentUser.uid, notification)
            .then(() => removeNotification(notification.id))
            .catch(() => showAlert('Uups, coś poszło nie tak!'));
    };

    return (
        <li>
            <div>
                <div className="dateWrapper">
                    <p className="date">{date}</p>
                </div>
                <p className="heading">
                    <span>{member.name} </span>
                    prosi o przyznanie zagrody
                    <span> &quot;{title}&quot;</span>.
                </p>
                <div className="textWrapper">
                    <p className="text">
                        Za zadanie zostanie zabrane <span>{cost}</span> punktów.
                    </p>
                    <p className="text">Opis tej nagrody: {subtitle}</p>
                </div>
                <div className="buttonsWrapper">
                    <Button className="left" onClick={() => denyAward(notification)}>
                        Odrzuć
                    </Button>
                    <Button onClick={() => confirmAward(award, member, notification)}>Przyznaj</Button>
                </div>
            </div>
        </li>
    );
};

const mapDispatchToProps = (dispatch) => ({
    updateUser: (member) => dispatch({ type: membersTypes.UPDATE_MEMBER, payload: member }),
    removeNotification: (id) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: id }),
    removeAward: (id) => dispatch({ type: awardsTypes.REMOVE_AWARD, payload: id }),
    addNotification: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
});

export default connect(null, mapDispatchToProps)(AwardConfirmationNotification);
