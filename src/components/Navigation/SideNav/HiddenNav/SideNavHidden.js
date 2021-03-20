import styled from 'styled-components';
import { connect } from 'react-redux';

import useAlert from 'hooks/useAlert';

import { membersTypes } from 'redux/members';
import { tasksTypes } from 'redux/tasks';
import { awardsTypes } from 'redux/awards';

import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';

import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as Show } from 'assets/icons/Show.svg';

import Alert from 'components/Alert/Alert';
import navItems from '../navItems';
import SideNavHiddenItem from './SideNavHiddenItem';

const SideNavHidden = ({ toggleNavVisibility, resetTasks, resetAwards, resetMembers }) => {
    const { resetCurrentAccount } = useAccount();
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const { signout } = useAuth();
    const logout = () => {
        resetCurrentAccount();
        signout()
            .then(() => {
                resetTasks();
                resetAwards();
                resetMembers();
                localStorage.clear();
            })
            .catch(() => showAlert('Uups, coś poszło nie tam podczas wylogowywania!'));
    };

    return (
        <SideNavHiddenWrapper>
            <nav>
                <ul>
                    {navItems.map(({ slug, Icon }) => (
                        <SideNavHiddenItem slug={slug} key={slug}>
                            <Icon />
                        </SideNavHiddenItem>
                    ))}
                </ul>
            </nav>
            <div className="buttonsWrapper">
                <button className="logout" onClick={logout}>
                    <LogoutIcon />
                </button>
                <button className="showNav" onClick={() => toggleNavVisibility(true)}>
                    <Show />
                </button>
            </div>
            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
        </SideNavHiddenWrapper>
    );
};
const mapDispatchToProps = (dispatch) => ({
    resetTasks: () => dispatch({ type: tasksTypes.RESET_TASKS }),
    resetAwards: () => dispatch({ type: awardsTypes.RESET_AWARDS }),
    resetMembers: () => dispatch({ type: membersTypes.RESET_MEMBERS }),
});

export default connect(null, mapDispatchToProps)(SideNavHidden);

const SideNavHiddenWrapper = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.sideBackground};
    color: ${({ theme }) => theme.colors.sideNavText};
    background: ${({ theme }) => theme.colors.sideBackgroundGradient};
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    @media (max-width: 768px) {
        display: none;
    }
    button.logout {
        height: 5.7rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({ theme }) => theme.colors.sideNavActive};
        border-radius: ${({ theme }) => theme.borderRadius};
        margin-bottom: 1rem;
        background: ${({ theme }) => theme.colors.sideNavActiveGradient};
        svg {
            fill: ${({ theme }) => theme.colors.sideNavTextActive};
            height: 2.3rem;
        }
    }
    button.showNav {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5.7rem;
        width: 100%;
        background: ${({ theme }) => theme.colors.sideNavActive};
        border-radius: ${({ theme }) => theme.borderRadius};
        background: ${({ theme }) => theme.colors.sideNavActiveGradient};
        z-index: 999999;
        svg {
            fill: ${({ theme }) => theme.colors.sideNavTextActive};
            height: 3.8rem;
        }
    }
    div.buttonsWrapper {
        position: absolute;
        bottom: 1rem;
        width: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
    }
`;
