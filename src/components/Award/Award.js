import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import useConfirm from 'hooks/useConfirm';
import useAlert from 'hooks/useAlert';
import useModalWithState from 'hooks/useModalWithState';
import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';
import { addRewardActionTypes, addRewardReducer } from 'reactReducers/addRewardReducer';
import { colors } from 'theme/index';
import { add as firebaseNotificationAdd, remove as firebaseNotificationRemove } from 'firebaseFunctions/notifications';
import { update as updateAwardOnFirebase, remove as removeAwardFromFirebase } from 'firebaseFunctions/awards';
import { awardsTypes } from 'redux/awards';
import { notificationsTypes } from 'redux/notifications';
import getID from 'utils/getID';
import setStateFromInput from 'utils/setStateFromInput';

import { ColorSelect, Modal, Input, ImageInput, ErrorBox } from 'components/FormElements';
import { Heading } from 'components/TextElements';
import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import Confirm from 'components/Confirm/Confirm';
import { types as notificationTypes } from 'components/Notification/notificationTypes';
import AwardButton from './AwardButton';

const Award = ({ award, reduxAwardUpdate, reduxAwardRemove, reduxNotificationAdd, reduxNotificationRemove, notifications, members }) => {
    const { bgcolor, cost, title, subtitle, img } = award;
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const { hideConfirm, showConfirm, isConfirmVisible, confirmMessage } = useConfirm();
    const { currentAccount } = useAccount();
    const { currentUser } = useAuth();
    const [errors, setErrors] = useState([]);

    const [{ name, subname, points, image, color }, dispatchAddAwardModal] = useReducer(addRewardReducer, {
        name: title,
        subname: subtitle,
        points: cost,
        image: img,
        color: bgcolor,
    });

    const editAward = async () => {
        if (!name.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij nazwę nagrody!' }]);
        if (!subname.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij opis nagrody!' }]);
        if (!points.match(/^[0-9]+$/) || !parseInt(points, 10) > 0) return setErrors([{ message: 'Punkty muszą być liczbą większą od zera!' }]);
        const newData = { ...award, title: name, subtitle: subname, cost: points, img: image, bgcolor: color };
        try {
            await updateAwardOnFirebase(currentUser.uid, award, newData);
            reduxAwardUpdate(newData);
            hideModal();
            dispatchAddAwardModal({ type: addRewardActionTypes.reset });
            showAlert('Pomyślnie zaaktualizowano nagrodę');
        } catch {
            showAlert('Upss, coś poszło nie tak');
        }
        return setErrors([]);
    };

    const removeAward = () => {
        removeAwardFromFirebase(currentUser.uid, award).then(() => {
            const relatedToAward = notifications.filter((notification) => notification.awardID === award.id);
            if (relatedToAward.length > 0)
                relatedToAward.forEach((notification) =>
                    firebaseNotificationRemove(currentUser.uid, notification).then(() => reduxNotificationRemove(notification.id))
                );
            reduxAwardRemove(award.id);
        });
    };

    const sendAwardToConfirmation = async () => {
        const notification = {
            id: getID(),
            awardID: award.id,
            memberID: currentAccount.ID,
            type: notificationTypes.AWARD_CONFIRMATION,
            date: new Date(),
        };
        try {
            await firebaseNotificationAdd(currentUser.uid, notification);
            reduxNotificationAdd(notification);
            showAlert('Wysłano twoją prośbe o przyznanie nagrody');
        } catch {
            showAlert('Uuups, coś poszło nie tak');
        }
    };

    return (
        <AwardWrapper color={bgcolor}>
            <div>
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
                <div className="imageWrapper">
                    <img src={img} alt={title} />
                </div>
                <p>
                    Kosztuje <span>{cost}</span> punktów
                </p>
                <AwardButton
                    role={currentAccount.role}
                    showModal={showModal}
                    showConfirm={showConfirm}
                    showAlert={showAlert}
                    sendAwardToConfirmation={sendAwardToConfirmation}
                    relatedNotificationsCount={
                        notifications.filter(
                            (notification) => notification?.awardID === award.id && notification?.type === notificationTypes.AWARD_CONFIRMATION
                        ).length
                    }
                    awardCost={parseInt(award.cost, 10)}
                    userPoints={parseInt(members.filter((member) => member.id === currentAccount.ID)[0]?.points, 10)}
                />
                <Confirm onConfirm={removeAward} onCancel={hideConfirm} isVisible={isConfirmVisible}>
                    <h1>{confirmMessage}</h1>
                </Confirm>
                <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                    <h1>{alertMessage}</h1>
                </Alert>
                <Modal hideModal={hideModal} isVisible={isModalVisible}>
                    <Heading>Edytuj nagrodę</Heading>
                    <p>and dive into the world of done house chores.</p>
                    <form action="">
                        <ErrorBox errors={errors} />
                        <Input
                            value={name}
                            onChange={setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setName)}
                            name="rewardname"
                            placeholder="Jak nazwiesz tą nagrode?"
                            label="Nazwa nagrody"
                        />
                        <ColorSelect
                            label="Kolor"
                            items={colors.colorsList.map((_item, index) => index)}
                            selectedItem={color}
                            handleSelectedItemChange={({ selectedItem }) =>
                                setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setColor)(selectedItem)
                            }
                        />
                        <Input
                            value={subname}
                            onChange={setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setSubname)}
                            name="rewardsubname"
                            placeholder="Dodaj którki opis?"
                            label="Opis nagrody"
                        />
                        <Input
                            value={points}
                            onChange={setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setPoints)}
                            name="rewardpoints"
                            placeholder="Ile punktów będzie kosztować?"
                            label="Koszt nagrody"
                        />
                        <ImageInput
                            name="rewardimage"
                            placeholder="Dodaj zdjęcie nagrody"
                            label="Dodaj zdjęcie"
                            onChange={setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setImage)}
                        />
                        <Button onClick={editAward}>Zapisz zmiany</Button>
                    </form>
                </Modal>
            </div>
        </AwardWrapper>
    );
};

const mapStateToProps = (state) => ({
    notifications: state.notifications,
    members: state.members,
});

const mapDispatchToProps = (dispatch) => ({
    reduxAwardUpdate: (award) => dispatch({ type: awardsTypes.UPDATE_AWARD, payload: award }),
    reduxAwardRemove: (id) => dispatch({ type: awardsTypes.REMOVE_AWARD, payload: id }),
    reduxNotificationAdd: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
    reduxNotificationRemove: (notificationID) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: notificationID }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Award);

const AwardWrapper = styled.article`
    & > div {
        background: ${({ theme, color }) => theme.colors.colorsList[color]};
        color: ${({ theme }) => theme.colors.white};
        border-radius: ${({ theme }) => theme.borderRadius};
        width: 100%;
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
        padding: 2rem;
        @media (max-width: 1100px) {
            max-width: 320px;
        }
        @media (max-width: 768px) {
            padding: 2rem;
            margin: 0 auto;
        }
        .imageWrapper {
            background: white;
            border-radius: ${({ theme }) => theme.borderRadius};
        }
        img {
            background: rgb(238, 238, 238);
            border-radius: ${({ theme }) => theme.borderRadius};
            max-height: 22rem;
            display: block;
            width: auto;
            margin: 0 auto;
            @media (max-width: 768px) {
                max-height: 20rem;
                width: auto;
                display: block;
                margin: 0 auto;
            }
        }
        h3 {
            font-size: ${({ theme }) => theme.font.L};
            font-weight: ${({ theme }) => theme.font.bold};
        }
        h4 {
            font-size: ${({ theme }) => theme.font.S};
            font-weight: ${({ theme }) => theme.font.light};
            padding: 0 0 1.5rem;
        }
        & > p {
            background: ${({ theme }) => theme.colors.blackAlpha};
            padding: 1.5rem 1rem 1.1rem;
            text-align: center;
            font-size: ${({ theme }) => theme.font.S};
            font-weight: ${({ theme }) => theme.font.normal};
            margin: 2rem 0;
            border-radius: ${({ theme }) => theme.borderRadius};
            @media (max-width: 768px) {
                margin: 2.5rem 0;
            }
        }
        span {
            font-weight: ${({ theme }) => theme.font.black};
        }
        .buttonWrapper {
            display: flex;
            justify-content: space-between;
        }
        button.awardButton {
            background: ${({ theme }) => theme.colors.whiteAlpha};
            margin-top: 1rem;
            color: ${({ theme }) => theme.colors.white};
            font-size: 2rem;
            font-weight: ${({ theme }) => theme.font.bold};
            padding: 1.2rem 3.5rem 1rem;
            border-radius: ${({ theme }) => theme.borderRadius};
            display: flex;
            justify-content: center;
            align-items: center;
            width: 45%;
            @media (max-width: 768px) {
                font-size: 2.2rem;
            }
            &.disabled {
                background-color: rgba(0, 0, 0, 0.3);
                color: rgba(255, 255, 255, 0.5);
            }
            &.singleButton {
                margin-left: auto;
                width: auto;
            }
            svg {
                fill: ${({ theme }) => theme.colors.white};
                height: 2.2rem;
                padding-right: 1rem;
                @media (max-width: 768px) {
                    height: 2.6rem;
                }
            }
            span {
                transform: translateY(0.2rem);
            }
        }
    }
`;
