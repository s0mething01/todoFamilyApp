import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from 'theme/index';
import { useAuth } from 'contexts/AuthContext';
import { add as addToFirebase } from 'firebaseFunctions/members';
import { membersTypes } from 'redux/members';
import { initialState, addMemberActionTypes, addMemberReducer } from 'reactReducers/addMemberReducer';

import withAuth from 'hocs/withAuth';

import useModalWithState from 'hooks/useModalWithState';
import useAlert from 'hooks/useAlert';

import setStateFromInput from 'utils/setStateFromInput';
import getID from 'utils/getID';

import { Textarea, Modal, Input, ImageInput, ColorSelect, Select, ErrorBox } from 'components/FormElements';
import { Heading, SubHeading } from 'components/TextElements';
import MembersCarousel from 'components/Members/Members';
import Button from 'components/Button/Button';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import WithParentAccount from 'hocs/WithParentAccount';
import Alert from 'components/Alert/Alert';
import { types as AccountTypes } from 'components/Account/AccountTypes';

import { ReactComponent as UserAddIcon } from 'assets/icons/UserAdd.svg';
import avatar from 'assets/images/child.png';

const Members = ({ members, add }) => {
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const { currentUser } = useAuth();
    const [errors, setErrors] = useState([]);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const [{ name = '', PIN = '', PINR = '', role, color, description = '', image }, dispatch] = useReducer(addMemberReducer, initialState);

    const addUser = async () => {
        if (name.length <= 0) return setErrors([{ message: 'Imię nie może być puste' }]);
        if (PIN.length < 4) return setErrors([{ message: 'PIN nie może być któtszy niż 4 znaki' }]);
        if (PIN !== PINR) return setErrors([{ message: "PIN'y musza być identyczne" }]);
        if (description.length <= 0) return setErrors([{ message: 'Opis nie może być pusty' }]);
        const user = {
            name,
            image: image || avatar,
            description,
            points: 0,
            tasksDone: 0,
            color,
            role,
            id: getID(),
            PIN,
            PINR,
        };
        try {
            await addToFirebase(currentUser.uid, user);
            hideModal();
            add(user);
            dispatch({ type: addMemberActionTypes.reset });
        } catch {
            hideModal();
            showAlert('Upss, coś poszło nie tak');
        }
        return setErrors([]);
    };

    return (
        <ContentWrapper>
            <MembersWrapper>
                <Heading>Członkowie rodziny!</Heading>
                <WithParentAccount>
                    <Button onClick={showModal}>
                        <span>Dodaj członka</span>
                        <UserAddIcon />
                    </Button>
                </WithParentAccount>
                <SubHeading>Dzieci</SubHeading>
                <MembersCarousel members={members.filter((member) => member.role === AccountTypes.CHILD)} />
                <SubHeading>Rodzice</SubHeading>
                <MembersCarousel members={members.filter((member) => member.role === AccountTypes.PARENT)} />
            </MembersWrapper>

            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>

            <Modal hideModal={hideModal} isVisible={isModalVisible}>
                <Heading>Dodaj członka rodziny</Heading>
                <p>I ciesz się światem wykonanych obowiązków domowych!</p>
                <form action="">
                    <ErrorBox errors={errors} />
                    <Input
                        value={name}
                        onChange={setStateFromInput(dispatch, addMemberActionTypes.setName)}
                        name="membername"
                        placeholder="Jak nazwya się użytkownik"
                        label="Imię"
                    />
                    <Input
                        value={PIN}
                        onChange={setStateFromInput(dispatch, addMemberActionTypes.setPIN)}
                        name="memberpin"
                        type="password"
                        placeholder="Podaj kod pin dla członka"
                        label="Kod pin"
                    />
                    <Input
                        value={PINR}
                        onChange={setStateFromInput(dispatch, addMemberActionTypes.setPINR)}
                        name="memberpinrepeat"
                        type="password"
                        placeholder="Powtórz kod pin dla członka"
                        label="Powtórz kod pin"
                    />
                    <Select
                        label="Rola"
                        items={[AccountTypes.CHILD, AccountTypes.PARENT]}
                        selectedItem={role}
                        handleSelectedItemChange={({ selectedItem }) => setStateFromInput(dispatch, addMemberActionTypes.setRole)(selectedItem)}
                        placeholder="Wybierz rolę członka rodziny"
                    />
                    <ColorSelect
                        label="Kolor"
                        items={colors.colorsList.map((_item, index) => index)}
                        selectedItem={color}
                        handleSelectedItemChange={({ selectedItem }) => setStateFromInput(dispatch, addMemberActionTypes.setColor)(selectedItem)}
                    />
                    <Textarea
                        value={description}
                        onChange={setStateFromInput(dispatch, addMemberActionTypes.setDescription)}
                        name="memberdescription"
                        placeholder="Jak opiszesz tego użytkownika?"
                        label="Opis"
                    />
                    <ImageInput
                        name="image"
                        placeholder="Dodaj zdjęcie użytkownika"
                        label="Dodaj zdjęcie"
                        onChange={setStateFromInput(dispatch, addMemberActionTypes.setImage)}
                    />
                    <Button onClick={addUser}>Dodaj członka</Button>
                </form>
            </Modal>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => ({
    members: state.members,
});

const mapDispatchToProps = (dispatch) => ({ add: (member) => dispatch({ type: membersTypes.ADD_MEMBER, payload: member }) });

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Members));

const MembersWrapper = styled.section`
    & > button {
        margin-bottom: 4rem;
        @media (max-width: 768px) {
            margin: 0 auto 5rem;
        }
    }
`;
