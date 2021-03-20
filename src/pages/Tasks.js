import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import withAuth from 'hocs/withAuth';
import WithParentAccount from 'hocs/WithParentAccount';
import useModalWithState from 'hooks/useModalWithState';
import useAlert from 'hooks/useAlert';
import { useAuth } from 'contexts/AuthContext';
import { initialState, addTaskActionTypes, addTaskReducer } from 'reactReducers/addTaskReducer';
import { add as addTaskToFirebase } from 'firebaseFunctions/tasks';
import { add as addNotificationToFirebase } from 'firebaseFunctions/notifications';
import { tasksTypes } from 'redux/tasks';
import { notificationsTypes } from 'redux/notifications';
import getID from 'utils/getID';
import setStateFromInput from 'utils/setStateFromInput';
import getDate from 'utils/getDate';

import { Modal, Input, DateInput, Select, Textarea, ErrorBox } from 'components/FormElements';
import Alert from 'components/Alert/Alert';
import { Heading } from 'components/TextElements';
import Button from 'components/Button/Button';
import TasksList from 'components/TasksList/TasksList';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import { types as notificationTypes } from 'components/Notification/notificationTypes';
import { types as AccountTypes } from 'components/Account/AccountTypes';

import { ReactComponent as PlusCircle } from 'assets/icons/Plus.svg';

const Tasks = ({ tasks, childs, addTaskToRedux, addNotificationToRedux }) => {
    const { currentUser } = useAuth();
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const [{ points = '', expirationDate = '', owner = '', title = '', content = '' }, dispatch] = useReducer(addTaskReducer, initialState);
    const [errors, setErrors] = useState([]);

    const addTask = async () => {
        if (!title.length > 0) return setErrors([{ message: 'Uzupełnij nazwę zadania!' }]);
        if (!content.length > 0) return setErrors([{ message: 'Uzupełnij opis zadania' }]);
        if (!points.match(/^[0-9]+$/) || !parseInt(points, 10) > 0) return setErrors([{ message: 'Punkty muszą być liczbą większą od zera!' }]);
        if (!getDate(expirationDate) - new Date() >= 0) return setErrors([{ message: 'Poprawnie uzupełnij datę' }]);
        const task = {
            points,
            expirationDate,
            ownerID: childs.filter((child) => child.name === owner)[0]?.id || '',
            title,
            content,
            id: getID(),
        };
        const notification = {
            type: notificationTypes.TASK_NEW,
            date: new Date(),
            taskID: task.id,
            taskTitle: task.title,
            taskPoints: task.points,
        };
        const notificationID = getID();
        try {
            await addTaskToFirebase(currentUser.uid, task);
            hideModal();
            addTaskToRedux(task);
            dispatch({ type: addTaskActionTypes.reset });
            childs.forEach((child) => {
                addNotificationToFirebase(currentUser.uid, { id: notificationID, memberID: child.id, ...notification })
                    .then(() => addNotificationToRedux({ id: notificationID, memberID: child.id, ...notification }))
                    .catch(() => showAlert('Upss, coś poszło nie tak przy dodawaniu powiadomień dla innych użytkowników!'));
            });
        } catch {
            showAlert('Upss, coś poszło nie tak');
        }
        return setErrors([]);
    };

    return (
        <ContentWrapper>
            <TasksWarpper>
                <Heading>Lista zadań!</Heading>
                <WithParentAccount>
                    <Button onClick={showModal}>
                        <span>Dodaj nowe zadanie</span>
                        <PlusCircle />
                    </Button>
                </WithParentAccount>
                <TasksList tasks={tasks} />
            </TasksWarpper>

            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>

            <Modal hideModal={hideModal} isVisible={isModalVisible}>
                <Heading>Dodaj nowe zadanie</Heading>
                <p>and dive into the world of done house chores.</p>
                <form action="">
                    <ErrorBox errors={errors} />
                    <Input
                        name="taskname"
                        value={title}
                        onChange={setStateFromInput(dispatch, addTaskActionTypes.setName)}
                        placeholder="Jak nazwiesz to zadnie?"
                        label="Nazwa zadania"
                    />
                    <Textarea
                        name="taskdescription"
                        value={content}
                        onChange={setStateFromInput(dispatch, addTaskActionTypes.setDescription)}
                        placeholder="Co dokładnie trzeba zrobić?"
                        label="Opis"
                    />
                    <Input
                        type="number"
                        name="taskpoints"
                        value={points}
                        onChange={setStateFromInput(dispatch, addTaskActionTypes.setCost)}
                        placeholder="Ile pkt ma dostać wykonawca?"
                        label="Punkty"
                    />
                    <Select
                        label="Wykonawca (jeśli potrzebny)"
                        items={childs.map((child) => child.name)}
                        selectedItem={owner}
                        handleSelectedItemChange={({ selectedItem }) => setStateFromInput(dispatch, addTaskActionTypes.setOwner)(selectedItem)}
                        placeholder="Kto ma być wykonawcą?"
                    />
                    <DateInput
                        name="date"
                        placeholder="Do kiedy zadanie ma być wykonane?"
                        label="Data wykonania"
                        min={new Date()}
                        step={60 * 30}
                        date={expirationDate}
                        setDate={setStateFromInput(dispatch, addTaskActionTypes.setDate)}
                    />
                    <Button onClick={addTask}>Dodaj nowe zadanie</Button>
                </form>
            </Modal>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => ({
    tasks: [...state.tasks],
    childs: state.members.filter((member) => member.role === AccountTypes.CHILD),
});

const mapDispatchToProps = (dispatch) => ({
    addTaskToRedux: (task) => dispatch({ type: tasksTypes.ADD_TASK, payload: task }),
    addNotificationToRedux: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Tasks));

const TasksWarpper = styled.section`
    & > button {
        margin-bottom: 5rem;
        @media (max-width: 768px) {
            margin: 0 auto 5rem;
        }
    }
`;
