import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import withRouter from 'hocs/withRouter';
import withProviders from 'hocs/withProviders';

import { membersTypes } from 'redux/members';
import { tasksTypes } from 'redux/tasks';
import { awardsTypes } from 'redux/awards';
import { notificationsTypes } from 'redux/notifications';

import GlobalStyle from 'theme/GlobalStyle';
import { useAuth } from 'contexts/AuthContext';
import getUsers from 'utils/getUserData';

import Account from 'pages/Account';
import Awards from 'pages/Awards';
import Members from 'pages/Members';
import History from 'pages/History';
import NoFound from 'pages/NoFound';
import Scoreboard from 'pages/Scoreboard';
import Tasks from 'pages/Tasks';
import Register from 'pages/Register';
import Login from 'pages/Login';
import NotificationsPage from 'pages/Notifications';

import TopNav from 'components/Navigation/TopNav/TopNav';
import SideNav from 'components/Navigation/SideNav/SideNav';
import HelmetComponent from 'components/HelmetComponent';

import 'assets/css/font.css';

function App({ addAllMembers, addAllTasks, addAllAwards, addAllNotifications }) {
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser?.uid) return;
        getUsers(currentUser.uid).then((data) => {
            if (data) {
                localStorage.setItem('familyName', data.familyName);
                if ('users' in data) addAllMembers(data.users);
                if ('tasks' in data) addAllTasks(data.tasks);
                if ('awards' in data) addAllAwards(data.awards);
                if ('notifications' in data) addAllNotifications(data.notifications);
            }
        });
    });

    return (
        <>
            <GlobalStyle />
            <HelmetComponent />
            <SideNav />
            <TopNav />
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
                <Route path="/notifications">
                    <NotificationsPage />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/tasks">
                    <Tasks />
                </Route>
                <Route path="/account">
                    <Account />
                </Route>
                <Route path="/members">
                    <Members />
                </Route>
                <Route path="/scoreboard">
                    <Scoreboard />
                </Route>
                <Route path="/awards">
                    <Awards />
                </Route>
                <Route path="/history">
                    <History />
                </Route>
                <Route>
                    <NoFound />
                </Route>
            </Switch>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addAllMembers: (members) => dispatch({ type: membersTypes.ADD_ALL_MEMBERS, payload: members }),
    addAllTasks: (tasks) => dispatch({ type: tasksTypes.ADD_ALL_TASKS, payload: tasks }),
    addAllAwards: (awards) => dispatch({ type: awardsTypes.ADD_ALL_AWARDS, payload: awards }),
    addAllNotifications: (notifications) => dispatch({ type: notificationsTypes.ADD_ALL_NOTIFICATIONS, payload: notifications }),
});

export default withRouter(withProviders(connect(null, mapDispatchToProps)(App)));
