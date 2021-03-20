import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from 'theme/index';
import withAuth from 'hocs/withAuth';
import useModalWithState from 'hooks/useModalWithState';
import useAlert from 'hooks/useAlert';
import ThemeColorContext from 'contexts/ThemeContext';
import { useAccount } from 'contexts/AccountContext';
import { useAuth } from 'contexts/AuthContext';
import { membersTypes } from 'redux/members';
import { update as updateAccountOnFirebase } from 'firebaseFunctions/members';

import { Input, Select, Modal, ColorSelect, ErrorBox } from 'components/FormElements';
import { Heading, SubHeading } from 'components/TextElements';
import Button from 'components/Button/Button';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import Alert from 'components/Alert/Alert';

import avatar from 'assets/images/child.png';

const Account = ({ members, update }) => {
    const { hideModal: hideAvatarModal, showModal: showAvatarModal, isModalVisible: isVisibleAvatarModalVisible } = useModalWithState(false);
    const { hideModal: hideChangePassModal, showModal: showChangePassModal, isModalVisible: isChangePassModalVisible } = useModalWithState(false);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();

    const [presentPIN, setPresentPIN] = useState('');
    const [PIN, setPIN] = useState('');
    const [PINR, setPINR] = useState('');
    const [errors, setErrors] = useState([]);

    const { themeColor, setThemeColor } = useContext(ThemeColorContext);
    const { currentAccount } = useAccount();
    const { currentUser } = useAuth();

    const [account, setAccount] = useState({ name: '', description: '', color: '' });

    useEffect(() => {
        if (members.length) setAccount(members.filter((item) => item.id === currentAccount.ID)[0]);
    }, [members]);

    const setThemeValue = ({ selectedItem }) => {
        if (selectedItem === 'Ciemny') setThemeColor('dark');
        else setThemeColor('white');
    };

    const saveSettings = () => {
        updateAccountOnFirebase(currentUser.uid, account, members.filter((item) => item.id === currentAccount.ID)[0])
            .then(() => {
                update(account);
                showAlert('Pomyślnie zaaktualizowano twoje konto');
            })
            .catch(() => {
                showAlert('Upss, coś poszło nie tak podczas aktalizoacji twojego konta');
            });
    };

    const changePIN = async () => {
        if (presentPIN === members.filter((item) => item.id === currentAccount.ID)[0].PIN && PIN === PINR) {
            try {
                setErrors([]);
                await updateAccountOnFirebase(currentUser.uid, { ...account, PIN, PINR }, account);
                update({ ...account, PIN, PINR });
                showAlert('Pomyślnie zmieniono twój PIN');
                setPresentPIN('');
                setPIN('');
                setPINR('');
                hideChangePassModal();
            } catch {
                showAlert("Coś poszło nie tak podczas zmiany twojego PIN'u");
            }
        } else if (PIN !== PINR) setErrors([{ message: "PIN'y nie są identyczne" }]);
        else setErrors([{ message: 'Twój obecny PIN nie jest poprawny' }]);
    };

    return account ? (
        <ContentWrapper>
            <AccountWrapper>
                <SubHeading>Ustawienia konta</SubHeading>
                <div className="accountWrapper">
                    <div>
                        <img src={account.avatar || avatar} alt="" />
                        <div className="role">
                            <p>Rola:</p>
                            <p>{account.role}</p>
                        </div>
                    </div>
                    <div className="inputWrapper">
                        <label htmlFor="name">
                            <span className="label">Imię</span>
                            <input type="text" id="name" name="name" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} />
                        </label>
                        <ColorSelect
                            label="Kolor"
                            items={colors.colorsList.map((_item, index) => index)}
                            selectedItem={account.color}
                            handleSelectedItemChange={({ selectedItem }) => setAccount({ ...account, color: selectedItem })}
                        />
                    </div>
                    <div className="description">
                        <label htmlFor="description">
                            <span className="label">Opis</span>
                            <textarea
                                name="description"
                                id="description"
                                value={account.description}
                                onChange={(e) => setAccount({ ...account, description: e.target.value })}
                            />
                        </label>
                    </div>
                </div>
                <div className="buttonsWrapper">
                    <Button onClick={showAvatarModal}>Zmień avatar</Button>
                    <Button onClick={showChangePassModal}>Zmień PIN</Button>
                    <Button onClick={saveSettings}>Zapisz ustawienia</Button>
                </div>
                <SubHeading>Ustawienia wyglądu</SubHeading>
                <div className="vueWrapper">
                    <Select
                        label="Motyw"
                        items={['Ciemny', 'Jasny']}
                        selectedItem={themeColor === 'dark' ? 'Ciemny' : 'Jasny'}
                        handleSelectedItemChange={setThemeValue}
                    />
                </div>
            </AccountWrapper>
            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
            <Modal hideModal={hideAvatarModal} isVisible={isVisibleAvatarModalVisible}>
                <Heading>Zmień avatar</Heading>
                <p>and dive into the world of done house chores.</p>
                <form action="">
                    <Input type="file" name="changeavatar" placeholder="Dodaj nowy avatar" label="Dodaj avatar" />
                    <Button>Zapisz</Button>
                </form>
            </Modal>
            <Modal hideModal={hideChangePassModal} isVisible={isChangePassModalVisible}>
                <Heading>Zmień hasło</Heading>
                <p>and dive into the world of done house chores.</p>
                <form action="">
                    <ErrorBox errors={errors} />
                    <Input
                        value={presentPIN}
                        onChange={setPresentPIN}
                        type="password"
                        name="presentpass"
                        placeholder="Wpisz swoje obecne hasło"
                        label="Obecne hasło"
                    />
                    <Input value={PIN} onChange={setPIN} type="password" name="newpass" placeholder="Wpisz nowe hasło" label="Nowe hasło" />
                    <Input
                        value={PINR}
                        onChange={setPINR}
                        type="password"
                        name="repnewpass"
                        placeholder="Wpisz nowe hasło jeszcze raz"
                        label="Powtórz nowe hasło"
                    />
                    <Button onClick={changePIN}>Zmien hasło</Button>
                </form>
            </Modal>
        </ContentWrapper>
    ) : (
        <p>Loading</p>
    );
};

const mapStateToProps = (state) => ({
    members: state.members,
});

const mapDispatchToProps = (dispatch) => ({
    update: (updatedMember) => dispatch({ type: membersTypes.UPDATE_MEMBER, payload: updatedMember }),
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Account));

const AccountWrapper = styled.section`
    background: ${({ theme }) => theme.colors.sideNav};
    background: ${({ theme }) => theme.colors.sideBackgroundGradient};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    padding: 4rem 6rem;
    @media (max-width: 1100px) {
        padding: 3rem 3rem;
    }
    & > h1 {
        text-align: left;
    }
    .accountWrapper {
        display: flex;
        & > div:nth-child(1) {
            width: 11rem;
            img {
                width: 11rem;
                height: 11rem;
            }
        }
        & > div:nth-child(3) {
            flex-grow: 1;
            textarea {
                width: 100%;
            }
        }
        @media (max-width: 1100px) {
            flex-wrap: wrap;
            & > div:nth-child(2) {
                flex-grow: 1;
                margin: 0;
                margin-left: 4rem;
            }
            & > div:nth-child(3) {
                height: 15rem;
                margin-top: 2rem;
            }
        }
        @media (max-width: 768px) {
            & > div:nth-child(2) {
                margin-left: 3rem;
            }
            & > div:nth-child(3) {
                height: 18rem;
                margin-top: 3rem;
            }
        }
    }
    .buttonsWrapper {
        display: flex;
        justify-content: space-between;
        margin: 3rem 0 5rem;
        @media (max-width: 768px) {
            flex-direction: column;
            margin: 3rem 0 2rem;
        }
        button {
            width: 30%;
            @media (max-width: 1100px) {
                width: 30%;
                padding: 1.2rem 2rem 1rem;
            }
            @media (max-width: 768px) {
                width: 100%;
                margin-bottom: 2rem;
            }
        }
    }
    .vueWrapper {
        display: flex;
        justify-content: space-between;
        @media (max-width: 768px) {
            flex-direction: column;
        }
        label {
            width: 30%;
            span {
                display: block;
            }
            input,
            select {
                width: 100%;
            }
        }
        .select {
            width: 30%;
            margin-bottom: 5rem;
            @media (max-width: 768px) {
                width: 100%;
                margin-bottom: 2rem;
            }
        }
    }
    .role {
        background: ${({ theme }) => theme.colors.roleButton};
        border-radius: ${({ theme }) => theme.borderRadius};
        color: ${({ theme }) => theme.colors.text};
        width: 100%;
        padding: 1rem 0 0.6rem;
        margin-top: 1rem;
        p {
            text-align: center;
        }
        & > p:nth-child(1) {
            font-weight: ${({ theme }) => theme.font.light};
            font-size: 1.5rem;
        }
        & > p:nth-child(2) {
            font-weight: ${({ theme }) => theme.font.black};
            font-size: 2rem;
            padding-top: 0.3rem;
        }
    }
    .description {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        label {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        textarea {
            height: 100%;
            flex-grow: 1;
            overflow: hidden;
            display: block;
            resize: none;
        }
        @media (max-width: 1100px) {
            width: 100%;
        }
    }
    .label {
        color: ${({ theme }) => theme.colors.title};
        width: 100%;
        font-weight: ${({ theme }) => theme.font.bold};
        font-size: 2.5rem;
        letter-spacing: -0.1rem;
    }
    .inputWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30%;
        margin: 0 4rem;
        label {
            display: flex;
            flex-direction: column;
        }
    }
    & > button {
        width: 30%;
        margin-left: auto;
        @media (max-width: 1100px) {
            width: 65%;
        }
        @media (max-width: 768px) {
            width: 100%;
            margin-top: 2rem;
        }
    }
`;
