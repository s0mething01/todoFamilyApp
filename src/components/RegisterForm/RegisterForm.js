import { useReducer, useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { membersTypes } from 'redux/members';
import { colors } from 'theme/index';

import { initialState as registerInitialState, registerActionTypes, registerReducer } from 'reactReducers/registerReducer';
import { initialState as addMemberInitialState, addMemberActionTypes, addMemberReducer } from 'reactReducers/addMemberReducer';

import setStateFromInput from 'utils/setStateFromInput';

import createUserTemplate from 'firebaseFunctions/createUserTemplate';

import useModalWithState from 'hooks/useModalWithState';
import useAlert from 'hooks/useAlert';

import withWizard from 'hocs/withWizard';

import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';

import { Input, Select, ColorSelect, ModalWhite, Textarea, ErrorBox } from 'components/FormElements';
import { Heading } from 'components/TextElements';
import RegisterUserTile from 'components/RegisterForm/RegisterUserTile';
import Alert from 'components/Alert/Alert';
import { types as accountTypes } from 'components/Account/AccountTypes';

import { ReactComponent as PlusIcon } from 'assets/icons/Plus.svg';

const RegisterForm = ({ page, nextPage, addAllMembers }) => {
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const [{ password, passwordR, email, familyName, familyMembers }, registerDispatch] = useReducer(registerReducer, registerInitialState);
    const [
        { name, PIN, PINR, role, color, description, image, activeTasks, pointsGiven, tasksGiven, points, totalPoints, tasksDone, totalTasksDone },
        addMemberDispatch,
    ] = useReducer(addMemberReducer, addMemberInitialState);
    const { setCurrentAccount } = useAccount();
    const { signup, currentUser } = useAuth();
    const [errors, setErrors] = useState([]);
    const [membersErrors, setMembersErrors] = useState([]);
    const [shouldRedirect, setRedirect] = useState(currentUser && page === 1);

    const register = () => {
        if (password !== passwordR) {
            setErrors({ message: 'Passwords are not equal!' });
        } else {
            signup(email, password)
                .then(() => nextPage())
                .catch(({ message }) => setErrors([{ message }]));
        }
    };

    const addMember = async (e) => {
        e.preventDefault();
        hideModal();
        registerDispatch({
            type: registerActionTypes.setFamilyMembers,
            payload: {
                name,
                PIN,
                PINR,
                role,
                color,
                description,
                image,
                activeTasks,
                pointsGiven,
                tasksGiven,
                points,
                totalPoints,
                tasksDone,
                totalTasksDone,
            },
        });
        addMemberDispatch({ type: addMemberActionTypes.reset });
    };

    const addUserTeplate = () => {
        if (familyMembers.filter((member) => member.role === accountTypes.PARENT).length <= 0)
            return setMembersErrors([{ message: 'Musisz dodać przynajmniej jednego rodzica!' }]);

        createUserTemplate(currentUser.uid, {
            familyName,
            users: familyMembers,
            tasks: [],
            awards: [],
        })
            .then(() => {
                const { role: memberRole, id: memberID } = familyMembers.filter((el) => el.role === 'rodzic')[0];
                addAllMembers(familyMembers);
                setCurrentAccount({ role: memberRole, ID: memberID });
                setRedirect(true);
            })
            .catch(() => showAlert('Coś poszło nie tam przy rejestracji!'));
        return setMembersErrors([]);
    };

    return (
        <div>
            {shouldRedirect && <Redirect to="/tasks" />}
            {page === 1 && (
                <div>
                    <Heading>Zarejestruj swoją rodzinę</Heading>
                    <p>I ciesz się światem wykonanych obowiązków domowych!</p>
                    <ErrorBox errors={errors} />
                    <Input
                        value={email}
                        onChange={setStateFromInput(registerDispatch, registerActionTypes.setEmail)}
                        isWhite
                        type="email"
                        name="registeremail"
                        placeholder="Tu wpisz swój email"
                        label="Email"
                    />
                    <Input
                        value={password}
                        onChange={setStateFromInput(registerDispatch, registerActionTypes.setPassword)}
                        isWhite
                        type="password"
                        name="registerpass"
                        placeholder="Tu wpisz hasło do konta"
                        label="Hasło"
                    />
                    <Input
                        value={passwordR}
                        onChange={setStateFromInput(registerDispatch, registerActionTypes.setPasswordR)}
                        isWhite
                        type="password"
                        name="registerpassrepeat"
                        placeholder="Powtórz to hasło"
                        label="Powtórz hasło"
                    />
                    <Button onClick={register}>Dalej</Button>
                </div>
            )}
            {page === 2 && (
                <div>
                    <Heading>Podaj nam nazwe waszej rodziny</Heading>
                    <p>and dive into the world of done house chores.</p>
                    <Input
                        value={familyName}
                        onChange={setStateFromInput(registerDispatch, registerActionTypes.setFamilyName)}
                        isWhite
                        type="text"
                        name="familyname"
                        placeholder="Tu wpisz nazwe waszej rodziny"
                        label="Nazwa rodziny"
                    />
                    <Button onClick={nextPage}>Dalej</Button>
                </div>
            )}
            {page === 3 && (
                <div>
                    <Heading>Dodaj członków do waszej rodziny</Heading>
                    <p>and dive into the world of done house chores.</p>
                    <ErrorBox errors={membersErrors} />
                    {familyMembers.map((member) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <RegisterUserTile key={member.id} color={member.color}>
                            {member.name}
                        </RegisterUserTile>
                    ))}
                    <Button className="button addmember" onClick={showModal}>
                        <span>Dodaj członka</span>
                        <PlusIcon />
                    </Button>
                    <ModalWhite hideModal={hideModal} isVisible={isModalVisible}>
                        <Heading>Dodaj członka rodziny</Heading>
                        <p>and dive into the world of done house chores.</p>
                        <form>
                            <Input
                                value={name}
                                onChange={setStateFromInput(addMemberDispatch, addMemberActionTypes.setName)}
                                isWhite
                                name="membername"
                                placeholder="Jak nazwya się użytkownik"
                                label="Imię"
                            />
                            <Input
                                value={PIN}
                                onChange={setStateFromInput(addMemberDispatch, addMemberActionTypes.setPIN)}
                                isWhite
                                name="memberpin"
                                type="password"
                                placeholder="Podaj kod pin dla członka"
                                label="Kod pin"
                            />
                            <Input
                                value={PINR}
                                onChange={setStateFromInput(addMemberDispatch, addMemberActionTypes.setPINR)}
                                isWhite
                                name="memberpinrepeat"
                                type="password"
                                placeholder="Powtórz kod pin dla członka"
                                label="Powtórz kod pin"
                            />
                            <Select
                                label="Rola"
                                items={[accountTypes.CHILD, accountTypes.PARENT]}
                                selectedItem={role || accountTypes.CHILD}
                                handleSelectedItemChange={({ selectedItem }) =>
                                    setStateFromInput(addMemberDispatch, addMemberActionTypes.setRole)(selectedItem)
                                }
                                placeholder="Wybierz role członka rodziny"
                                isWhite
                            />
                            <ColorSelect
                                isWhite
                                label="Kolor"
                                items={colors.colorsList.map((_item, index) => index)}
                                selectedItem={color}
                                handleSelectedItemChange={({ selectedItem }) =>
                                    setStateFromInput(addMemberDispatch, addMemberActionTypes.setColor)(selectedItem)
                                }
                            />
                            <Textarea
                                value={description}
                                onChange={setStateFromInput(addMemberDispatch, addMemberActionTypes.setDescription)}
                                isWhite
                                name="memberdescription"
                                placeholder="Jak opiszesz tego użytkownika?"
                                label="Opis"
                            />
                            <Input
                                value={image}
                                onChange={setStateFromInput(addMemberDispatch, addMemberActionTypes.setImage)}
                                isWhite
                                type="file"
                                name="memberimage"
                                placeholder="Dodaj zdjęcie użytkownika"
                                label="Dodaj zdjęcie"
                            />
                            <Button onClick={(e) => addMember(e)}>Dodaj członka</Button>
                        </form>
                    </ModalWhite>

                    <Button className="confirm" onClick={addUserTeplate}>
                        Zaczynamy!
                    </Button>
                    <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                        <h1>{alertMessage}</h1>
                    </Alert>
                </div>
            )}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addAllMembers: (members) => dispatch({ type: membersTypes.ADD_ALL_MEMBERS, payload: members }),
});

export default withWizard(3)(connect(null, mapDispatchToProps)(RegisterForm));

const Button = styled.button`
    background: ${({ theme }) => theme.colors.gradientDark};
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    font-weight: ${({ theme }) => theme.font.bold};
    padding: 1.4rem 3rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
    width: 35rem;
    max-width: 100%;
    /* width: 100%; */
    box-shadow: ${({ theme }) => theme.colors.boxShadowWhite};
    &.reverse {
        background: ${({ theme }) => theme.colors.gradientLight};
        /* margin-bottom: 2rem; */
    }
    &.confirm {
        margin-top: 3rem;
    }
    svg {
        fill: ${({ theme }) => theme.colors.white};
        height: 2.6rem;
        width: auto !important;
        margin: 0 1rem;
    }
    span {
        transform: translateY(0.2rem);
        margin: 0 1rem;
        flex-grow: 1;
    }
`;
