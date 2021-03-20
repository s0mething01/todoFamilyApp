import { connect, useSelector } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';
import useConfirm from 'hooks/useConfirm';

import { remove as removeFromFirebase } from 'firebaseFunctions/members';
import { remove as removeNoficationFromFirebase } from 'firebaseFunctions/notifications';
import { membersTypes } from 'redux/members';
import { notificationsTypes } from 'redux/notifications';

import WithParentAccount from 'hocs/WithParentAccount';
import Confirm from 'components/Confirm/Confirm';

import { ReactComponent as UserDelete } from 'assets/icons/UserDelete.svg';
import avatar from 'assets/images/child.png';
import { useAccount } from 'contexts/AccountContext';
import MemberWrapper from './MemberWrapper';

const ChildrenCarouselItem = ({ member, deleteMember, removeNotification }) => {
    const notifications = useSelector((state) => state.notifications);
    const { currentUser } = useAuth();
    const { currentAccount } = useAccount();
    const { hideConfirm, showConfirm, isConfirmVisible, confirmMessage } = useConfirm();
    const { name, image, description, color = 1, id } = member;

    const deleteUser = async () => {
        await removeFromFirebase(currentUser.uid, member);
        deleteMember(id);

        const relatedToTask = notifications.filter((n) => n.memberID === member.id);
        if (relatedToTask.length > 0) relatedToTask.forEach((n) => removeNoficationFromFirebase(currentUser.uid, n).then(() => removeNotification(n.id)));
    };

    return (
        <MemberWrapper color={color}>
            <div>
                <div className="infoTop">
                    <h5>{name}</h5>
                </div>
                <img src={image || avatar} alt="avatar" />
                <p className="description">{description}</p>
                {currentAccount.ID !== member.id && (
                    <WithParentAccount>
                        <button onClick={() => showConfirm(`Na pewno chcesz usunać użytkownika ${name}`)}>
                            <UserDelete />
                            <span>Usuń</span>
                        </button>
                    </WithParentAccount>
                )}

                <Confirm onConfirm={deleteUser} onCancel={hideConfirm} isVisible={isConfirmVisible}>
                    <h1>{confirmMessage}</h1>
                </Confirm>
            </div>
        </MemberWrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    deleteMember: (id) => dispatch({ type: membersTypes.DELETE_MEMBER, payload: id }),
    removeNotification: (notificationID) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: notificationID }),
});

export default connect(null, mapDispatchToProps)(ChildrenCarouselItem);
