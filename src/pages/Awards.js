import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import withAuth from 'hocs/withAuth';
import useAlert from 'hooks/useAlert';
import useModalWithState from 'hooks/useModalWithState';
import { awardsTypes } from 'redux/awards';
import { colors } from 'theme/index';
import { useAuth } from 'contexts/AuthContext';
import { initialState, addRewardActionTypes, addRewardReducer } from 'reactReducers/addRewardReducer';
import { notificationsTypes } from 'redux/notifications';
import setStateFromInput from 'utils/setStateFromInput';
import getID from 'utils/getID';
import { add as addAwardToFirebase } from 'firebaseFunctions/awards';
import { add as addNotificationToFirebase } from 'firebaseFunctions/notifications';

import { ColorSelect, Modal, Input, ImageInput, ErrorBox } from 'components/FormElements';
import Alert from 'components/Alert/Alert';
import { Heading } from 'components/TextElements';
import Button from 'components/Button/Button';
import Award from 'components/Award/Award';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import WithParentAccount from 'hocs/WithParentAccount';
import { types as notificationTypes } from 'components/Notification/notificationTypes';
import { types as AccountTypes } from 'components/Account/AccountTypes';

import avatar from 'assets/images/lego.png';
import { ReactComponent as PlusCircle } from 'assets/icons/Plus.svg';

const Awards = ({ awards, childs, addAwardToRedux, addNotificationToRedux }) => {
    const { currentUser } = useAuth();
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const [{ name, subname, points, image, color }, dispatchAddAwardModal] = useReducer(addRewardReducer, initialState);
    const [errors, setErrors] = useState([]);

    const addAward = async () => {
        if (!name.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij nazwę nagrody!' }]);
        if (!subname.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij opis nagrody!' }]);
        if (!points.match(/^[0-9]+$/) || !parseInt(points, 10) > 0) return setErrors([{ message: 'Punkty muszą być liczbą większą od zera!' }]);
        const award = {
            bgcolor: color,
            title: name,
            subtitle: subname,
            cost: points,
            img: image || avatar,
            id: getID(),
        };
        const notification = {
            type: notificationTypes.AWARD_NEW,
            date: new Date(),
            awardID: award.id,
            awardCost: award.cost,
            awardTitle: award.title,
        };
        const awardID = getID();
        try {
            await addAwardToFirebase(currentUser.uid, award);
            hideModal();
            addAwardToRedux(award);
            dispatchAddAwardModal({ type: addRewardActionTypes.reset });
            childs.forEach((child) => {
                addNotificationToFirebase(currentUser.uid, { id: awardID, memberID: child.id, ...notification })
                    .then(() => addNotificationToRedux({ id: awardID, memberID: child.id, ...notification }))
                    .catch(() => showAlert('Upss, coś poszło nie tak przy dodawaniu powiadomień dla innych użytkowników!'));
            });
        } catch {
            showAlert('Upss, coś poszło nie tak');
        }
        return setErrors([]);
    };

    return (
        <ContentWrapper>
            <AwardsWrapper>
                <Heading>Lista nagród!</Heading>
                <WithParentAccount>
                    <Button onClick={showModal}>
                        <span>Dodaj nową nagrodę</span>
                        <PlusCircle />
                    </Button>
                </WithParentAccount>
                <AwardWrapper>
                    {awards.map((award) => (
                        <Award key={award.id} award={award} />
                    ))}
                </AwardWrapper>
            </AwardsWrapper>
            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
            <Modal hideModal={hideModal} isVisible={isModalVisible}>
                <Heading>Dodaj nagrodę</Heading>
                <p>I ciesz się światem wykonanych obowiązków domowych!</p>
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
                        handleSelectedItemChange={({ selectedItem }) => setStateFromInput(dispatchAddAwardModal, addRewardActionTypes.setColor)(selectedItem)}
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
                    <Button onClick={addAward}>Dodaj nową nagrodę</Button>
                </form>
            </Modal>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => ({
    awards: state.awards,
    childs: state.members.filter((member) => member.role === AccountTypes.CHILD),
});

const mapDispatchToProps = (dispatch) => ({
    addAwardToRedux: (award) => dispatch({ type: awardsTypes.ADD_AWARD, payload: award }),
    addNotificationToRedux: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Awards));

const AwardWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.gridGap};
    grid-template-rows: auto;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const AwardsWrapper = styled.section`
    & > button {
        margin-bottom: 5rem;
        @media (max-width: 768px) {
            margin: 0 auto 5rem;
        }
    }
`;
