import styled from 'styled-components';
import { connect } from 'react-redux';

import { membersTypes } from 'redux/members';
import { tasksTypes } from 'redux/tasks';
import { awardsTypes } from 'redux/awards';

import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';

import useAlert from 'hooks/useAlert';

import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';
import { ReactComponent as Hide } from 'assets/icons/Hide.svg';

import Alert from 'components/Alert/Alert';
import SideNavShownItem from './SideNavShownItem';
import navItems from '../navItems';

const SideNavShown = ({ toggleNavVisibility, resetTasks, resetAwards, resetMembers }) => {
    const familyName = localStorage.getItem('familyName');
    const { resetCurrentAccount } = useAccount();
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const { signout } = useAuth();

    const logout = async () => {
        try {
            resetCurrentAccount();
            await signout();
            resetTasks();
            resetAwards();
            resetMembers();
            localStorage.clear();
        } catch {
            showAlert('Coś poszło nie tak podczas wylogowywania!');
        }
    };

    return (
        <SideNavWrapper>
            <h2>{familyName}</h2>
            <nav>
                <ul>
                    {navItems.map(({ slug, Icon, content }) => (
                        <SideNavShownItem slug={slug} key={slug}>
                            <Icon />
                            <span>{content}</span>
                        </SideNavShownItem>
                    ))}
                </ul>
            </nav>
            <div className="buttonsWrapper">
                <button className="hideNav" onClick={() => toggleNavVisibility(false)}>
                    <Hide />
                </button>
                <button className="logout" onClick={logout}>
                    <span>Logout</span>
                    <LogoutIcon />
                </button>
            </div>

            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
        </SideNavWrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    resetTasks: () => dispatch({ type: tasksTypes.RESET_TASKS }),
    resetAwards: () => dispatch({ type: awardsTypes.RESET_AWARDS }),
    resetMembers: () => dispatch({ type: membersTypes.RESET_MEMBERS }),
});

export default connect(null, mapDispatchToProps)(SideNavShown);

const SideNavWrapper = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 1.5rem;
    background: ${({ theme }) => theme.colors.sideBackgroundGradient};
    z-index: 999999;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    @media (max-width: 768px) {
        display: none;
    }
    color: ${({ theme }) => theme.colors.sideNavText};
    h2 {
        font-size: ${({ theme }) => theme.font.L};
        text-align: center;
        margin: 4rem 0;
        letter-spacing: -0.2rem;
    }
    button.logout {
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.colors.sideNavTextActive};
        font-size: ${({ theme }) => theme.font.S};
        font-weight: ${({ theme }) => theme.font.bold};
        background: rgba(0, 0, 0, 0.3);
        letter-spacing: -1px;
        background: transparent;
        border: none;
        outline: none;
        text-decoration: underline;
        cursor: pointer;
        background: ${({ theme }) => theme.colors.sideNavActiveGradient};
        padding: 0 2.5rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        svg {
            fill: ${({ theme }) => theme.colors.sideNavTextActive};
            height: 1.8rem;
        }
        span {
            padding-right: 1rem;
            transform: translateY(0.2rem);
        }
    }
    button.hideNav {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.8rem;
        width: 4.8rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        background: ${({ theme }) => theme.colors.sideNavActiveGradient};
        svg {
            fill: ${({ theme }) => theme.colors.sideNavTextActive};
            width: 2.7rem;
        }
    }
    div.buttonsWrapper {
        position: absolute;
        bottom: 1.5rem;
        width: calc(100% - 3rem);
        display: flex;
        justify-content: space-between;
    }
`;
