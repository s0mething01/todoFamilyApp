import { connect } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';
import useConfirm from 'hooks/useConfirm';

import { membersTypes } from 'redux/members';
import { notificationsTypes } from 'redux/notifications';
import { tasksTypes } from 'redux/tasks';
import { remove as removeMemberFromFirebase } from 'firebaseFunctions/members';
import { remove as removeNoficationFromFirebase } from 'firebaseFunctions/notifications';
import { update as updateTaskOnFirebase } from 'firebaseFunctions/tasks';

import WithParentAccount from 'hocs/WithParentAccount';
import Confirm from 'components/Confirm/Confirm';

import { ReactComponent as UserDelete } from 'assets/icons/UserDelete.svg';
import avatar from 'assets/images/child.png';

import MemberWrapper from './MemberWrapper';

const ChildrenCarouselItem = ({ member, tasks, notifications, deleteMember, removeNotification, updateTask }) => {
    const { currentUser } = useAuth();
    const { hideConfirm, showConfirm, isConfirmVisible, confirmMessage } = useConfirm();
    const { name, tasksDone, image, description, points, color = 1, id } = member;
    const tasksActive = tasks.filter((task) => task.ownerID === member.id);
    const deleteUser = async () => {
        await removeMemberFromFirebase(currentUser.uid, member);
        deleteMember(id);

        const relatedToMembers = notifications.filter((n) => n.memberID === member.id);
        if (relatedToMembers.length > 0) relatedToMembers.forEach((n) => removeNoficationFromFirebase(currentUser.uid, n).then(() => removeNotification(n.id)));

        const relatedToTask = tasks.filter((t) => t.ownerID === member.id);
        if (relatedToTask.length > 0)
            relatedToTask.forEach((t) => updateTaskOnFirebase(currentUser.uid, t, { ...t, ownerID: '' }).then(() => updateTask({ ...t, ownerID: '' })));
    };

    return (
        <MemberWrapper color={color}>
            <div>
                <div className="infoTop">
                    <h5>{name}</h5>
                    <p>
                        Tasks in charge: <span>{tasksActive.length}</span>
                    </p>
                </div>
                <img src={image || avatar} alt="avatar" />
                <p className="description">{description}</p>
                <div className="boxInfo">
                    <div className="last">
                        <p>Points</p>
                        <p>{points}</p>
                    </div>
                    <div className="last">
                        <p>tasks done</p>
                        <p>{tasksDone}</p>
                    </div>
                </div>
                <WithParentAccount>
                    <button onClick={() => showConfirm(`Napewno chcesz usunąć użytkownika ${name}`)}>
                        <UserDelete />
                        <span>Usuń</span>
                    </button>
                </WithParentAccount>
                <Confirm onConfirm={deleteUser} onCancel={hideConfirm} isVisible={isConfirmVisible}>
                    <h1>{confirmMessage}</h1>
                </Confirm>
            </div>
        </MemberWrapper>
    );
};
const mapStateToProps = (state) => ({
    tasks: state.tasks,
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    deleteMember: (id) => dispatch({ type: membersTypes.DELETE_MEMBER, payload: id }),
    removeNotification: (notificationID) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: notificationID }),
    updateTask: (task) => dispatch({ type: tasksTypes.UPDATE_TASK, payload: task }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenCarouselItem);
