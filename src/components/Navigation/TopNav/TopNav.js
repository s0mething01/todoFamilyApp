import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { membersTypes } from 'redux/members';
import { tasksTypes } from 'redux/tasks';
import { awardsTypes } from 'redux/awards';
import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';
import useAlert from 'hooks/useAlert';
import filterNotifications from 'utils/filterNotifications';

import Alert from 'components/Alert/Alert';

import { ReactComponent as UserIcon } from 'assets/icons/User.svg';
import { ReactComponent as CoinsIcon } from 'assets/icons/Coins.svg';
import { ReactComponent as BellIcon } from 'assets/icons/Bell.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/Logout.svg';

const TopNav = ({ notifications, resetTasks, resetAwards, resetMembers, members }) => {
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const { resetCurrentAccount, currentAccount } = useAccount();
    const { signout } = useAuth();

    const notificationCount = filterNotifications(notifications, currentAccount.role, currentAccount.ID).length;
    const { name, points } = members.filter((member) => member.id === currentAccount.ID)[0] || { name: '', points: '' };

    const logout = async () => {
        try {
            resetCurrentAccount();
            await signout();
            resetTasks();
            resetAwards();
            resetMembers();
            localStorage.clear();
        } catch {
            showAlert('Uups, coś poszło nie tam podczas wylogowywania!');
        }
    };

    return (
        <TopNavWrapper>
            <Link to="/account" className="withtext">
                {name && <span>{name}</span>}
                <UserIcon />
            </Link>
            {currentAccount.role === 'dziecko' && (
                <div className="withtext">
                    {points && (
                        <span>
                            {points} <span className="points">Points</span>
                        </span>
                    )}
                    <CoinsIcon />
                </div>
            )}
            <Link to="/notifications" className={notificationCount !== 0 ? 'notofications active' : 'notofications'}>
                <BellIcon />
                {notificationCount ? <div className="notoficationscount">{notificationCount}</div> : ''}
            </Link>
            <button className="logout" onClick={logout}>
                <LogoutIcon />
            </button>
            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
        </TopNavWrapper>
    );
};

const mapStateToProps = (state) => ({
    members: state.members,
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    resetTasks: () => dispatch({ type: tasksTypes.RESET_TASKS }),
    resetAwards: () => dispatch({ type: awardsTypes.RESET_AWARDS }),
    resetMembers: () => dispatch({ type: membersTypes.RESET_MEMBERS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);

const TopNavWrapper = styled.aside`
    position: fixed;
    top: 0;
    right: 0;
    margin: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999999999;
    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
        margin: 0;
        padding: 1rem;
    }
    & > div,
    & > button,
    & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({ theme }) => theme.colors.sideBackgroundGradient};
        color: ${({ theme }) => theme.colors.navColor};
        height: 5rem;
        min-width: 5rem;
        border-radius: ${({ theme }) => theme.borderRadius};
        font-size: ${({ theme }) => theme.font.S};
        font-weight: ${({ theme }) => theme.font.bold};
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
        svg {
            fill: ${({ theme }) => theme.colors.navColor};
        }
    }
    .withtext {
        padding: 0 2rem;
        @media (max-width: 768px) {
            flex-grow: 1;
            padding: 0 1rem;
        }
        & > span {
            padding-right: 1rem;
            display: flex;
            align-items: center;
            height: 2.5rem;
            line-height: 2.5rem;
            transform: translateY(1px);
            span.points {
                margin-left: 0.5rem;
                @media (max-width: 400px) {
                    display: none;
                }
            }
            span.pointsShort {
                display: none;
                margin-left: 0.5rem;
                @media (max-width: 400px) {
                    display: inline;
                }
            }
        }
    }
    & > div,
    & > a,
    .notofications {
        margin-right: 2rem;
        svg {
            height: 2.4rem;
        }
        @media (max-width: 768px) {
            margin-right: 1rem;
        }
    }
    button.logout svg {
        height: 1.9rem;
    }
    .notofications {
        position: relative;
        svg {
            fill: ${({ theme }) => theme.colors.navColor};
        }
        &.active {
            background: ${({ theme }) => theme.colors.topNavActive};
            svg {
                fill: ${({ theme }) => theme.colors.navActiveColor};
            }
        }
        .notoficationscount {
            position: absolute;
            bottom: 0;
            right: 0;
            transform: translate(40%, 40%);
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 0.55rem;
            padding-left: 0.2rem;
            font-weight: ${({ theme }) => theme.font.black};
            font-size: ${({ theme }) => theme.font.XS};
            background: ${({ theme }) => theme.colors.gradientLight};
            color: ${({ theme }) => theme.colors.white};
        }
    }
`;
