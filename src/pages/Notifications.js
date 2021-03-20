import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import styled from 'styled-components';
import withAuth from 'hocs/withAuth';
import { connect } from 'react-redux';
import { Heading, SubHeading } from 'components/TextElements';
import Notification from 'components/Notification/Notification';
import useAlert from 'hooks/useAlert';

import filterNotifications from 'utils/filterNotifications';

import { useAccount } from 'contexts/AccountContext';
import Alert from 'components/Alert/Alert';

const Notifications = ({ notifications, tasks, members, awards }) => {
    const { currentAccount } = useAccount();
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const notificationsList = filterNotifications(notifications, currentAccount.role, currentAccount.ID);

    return (
        <ContentWrapper>
            <Heading>Powiadomienia!</Heading>
            {!notificationsList.length ? (
                <SubHeading>Nie masz żadnych powiadomień</SubHeading>
            ) : (
                <NotificationsWrapper>
                    {notificationsList.map((notification) => {
                        return (
                            <Notification
                                key={notification.id}
                                notification={notification}
                                awards={awards}
                                members={members}
                                tasks={tasks}
                                showAlert={showAlert}
                            />
                        );
                    })}
                </NotificationsWrapper>
            )}

            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => ({
    notifications: state.notifications,
    members: state.members,
    tasks: state.tasks,
    awards: state.awards,
});

export default withAuth(connect(mapStateToProps)(Notifications));

const NotificationsWrapper = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
    li {
        & > div {
            padding: 2rem;
            background: ${({ theme }) => theme.colors.navBackground};
            border-radius: ${({ theme }) => theme.borderRadius};
            width: 100%;
            p {
                color: ${({ theme }) => theme.colors.text};
            }
            p.text {
                padding: 1rem 0;
                font-size: ${({ theme }) => theme.font.S};
                span {
                    font-weight: ${({ theme }) => theme.font.bold};
                }
            }
            p.heading {
                font-size: 2.5rem;
                margin-top: 1rem;
                margin-bottom: 1.5rem;
                line-height: 3.5rem;
                color: ${({ theme }) => theme.colors.title};
                font-weight: ${({ theme }) => theme.font.bold};
            }
            button.close {
                font-weight: ${({ theme }) => theme.font.bold};
                font-size: ${({ theme }) => theme.font.M};
                padding: 0 0 0.5rem 3rem;
                color: ${({ theme }) => theme.colors.text};
            }
            div.buttonsWrapper {
                display: flex;
                justify-content: flex-end;
                margin-top: 2rem;
            }
            div.dateWrapper {
                display: flex;
                justify-content: flex-end;
                p.date {
                    font-weight: ${({ theme }) => theme.font.bold};
                    font-size: ${({ theme }) => theme.font.S};
                    margin-bottom: 2rem;
                }
            }
            div.textWrapper {
                flex-grow: 2;
            }
            button.left {
                margin-right: 1.5rem;
                background: ${({ theme }) => theme.colors.removeButton};
                color: ${({ theme }) => theme.colors.title};
            }
        }
    }
`;
