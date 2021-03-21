import { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';
import withWizard from 'hocs/withWizard';
import { initialState, loginActionTypes, loginReducer } from 'reactReducers/loginReducer';
import setStateFromInput from 'utils/setStateFromInput';

import { Input, ErrorBox } from 'components/FormElements';
import { Heading } from 'components/TextElements';
import LoginUserTiles from 'components/LoginForm/LoginUserTiles';

const LoginForm = ({ page, nextPage, members }) => {
    const [{ email, password, selectedUser, pin }, dispatch] = useReducer(loginReducer, initialState);
    const { signin, currentUser } = useAuth();
    const [shouldRedirect, setRedirect] = useState(currentUser && page === 1);
    const [userErrors, setUserErrors] = useState([]);
    const [membersErrors, setMembersErrors] = useState([]);
    const { setCurrentAccount } = useAccount();

    const addError = (error, setErrors, prevErrors) => {
        const hasOccured = prevErrors.filter((el) => el.message === error.message).length;
        if (!hasOccured) setErrors([error]);
    };

    const handleLogin = () => {
        signin(email, password)
            .then(() => nextPage())
            .catch(({ code, message }) => addError({ message, code }, setUserErrors, userErrors));
    };

    const handleLoginMember = () => {
        const selectedUserPin = members.filter((el) => el.id === selectedUser)[0]?.PIN;
        if (pin !== selectedUserPin) {
            let message;
            if (!selectedUser) message = "You haven't selected member";
            else message = 'This pin is invalid';
            addError({ message }, setMembersErrors, membersErrors);
        } else {
            const userData = {
                role: members.filter((el) => el.id === selectedUser)[0]?.role,
                ID: selectedUser,
            };
            setCurrentAccount(userData);
            setRedirect(true);
        }
    };

    return (
        <>
            {shouldRedirect && <Redirect to="/tasks" />}
            {page === 1 && (
                <div>
                    <Heading>Zaloguj się </Heading>
                    <p>I ciesz się światem wykonanych obowiązków domowych!</p>
                    <ErrorBox errors={userErrors} />
                    <Input
                        value={email}
                        onChange={setStateFromInput(dispatch, loginActionTypes.setEmail)}
                        isWhite
                        type="text"
                        name="email"
                        placeholder="Tu wpisz email waszej rodziny"
                        label="Email"
                    />
                    <Input
                        value={password}
                        onChange={setStateFromInput(dispatch, loginActionTypes.setPassword)}
                        isWhite
                        type="password"
                        name="password"
                        placeholder="Tu wpisz hasło"
                        label="Hasło"
                    />
                    <Button onClick={handleLogin}>Dalej</Button>
                </div>
            )}
            {page === 2 && (
                <div>
                    <div>
                        <Heading>Wybierz swoje konto!</Heading>
                        <p>Zanacz obpowienią osobę i wpisz odpowiedni pin.</p>
                        <ErrorBox errors={membersErrors} />
                        <LoginUserTiles
                            items={members}
                            activeIndex={selectedUser}
                            setActiveUser={setStateFromInput(dispatch, loginActionTypes.setSelectedUser)}
                        />
                        <Input
                            value={pin}
                            onChange={setStateFromInput(dispatch, loginActionTypes.setPin)}
                            isWhite
                            type="password"
                            name="pin"
                            placeholder="Tu wpisz PIN"
                            label="PIN"
                        />
                    </div>
                    <Button onClick={handleLoginMember}>Dalej</Button>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    members: state.members,
});

export default withWizard({ pages: 2 })(connect(mapStateToProps, {})(LoginForm));

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
    width: 30rem;
    max-width: 100%;
    /* width: 100%; */
    box-shadow: ${({ theme }) => theme.colors.boxShadowWhite};
    &.reverse {
        background: ${({ theme }) => theme.colors.gradientLight};
        /* margin-bottom: 2rem; */
    }
    svg {
        fill: ${({ theme }) => theme.colors.white};
        height: 2.6rem;
        width: auto;
        margin: 0 1rem;
    }
    span {
        transform: translateY(0.2rem);
        margin: 0 1rem;
    }
`;
