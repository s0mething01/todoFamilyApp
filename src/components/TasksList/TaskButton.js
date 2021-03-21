import { useReducer, useState } from 'react';
import { connect } from 'react-redux';

import useModalWithState from 'hooks/useModalWithState';
import useAlert from 'hooks/useAlert';
import useConfirm from 'hooks/useConfirm';
import { useAuth } from 'contexts/AuthContext';
import { useAccount } from 'contexts/AccountContext';
import { addTaskActionTypes, addTaskReducer } from 'reactReducers/addTaskReducer';
import { tasksTypes } from 'redux/tasks';
import { notificationsTypes } from 'redux/notifications';
import { update as firebaseTaskUpdate, remove as firebaseTaskRemove } from 'firebaseFunctions/tasks';
import { add as firebaseNotificationAdd, remove as firebaseNotificationRemove } from 'firebaseFunctions/notifications';
import setStateFromInput from 'utils/setStateFromInput';
import getID from 'utils/getID';
import getDate from 'utils/getDate';

import { Heading } from 'components/TextElements';
import { Modal, Input, DateInput, Select, Textarea, ErrorBox } from 'components/FormElements';
import Button from 'components/Button/Button';
import Alert from 'components/Alert/Alert';
import Confirm from 'components/Confirm/Confirm';
import { types as notificationTypes } from 'components/Notification/notificationTypes';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const buttonTypes = {
    PARENT_EDIT: 'PARENT_EDIT',
    CHILD_DONE: 'CHILD_DONE',
    CHILD_IN_CONFIRMATION: 'CHILD_IN_CONFIRMATION',
    CHILD_TAKE: 'CHILD_TAKE',
    CHILD_TAKEN: 'CHILD_TAKEN',
};

const TaskButton = ({ accountType, owner, childs, task, notifications, reduxTaskUpdate, reduxTaskRemove, reduxNotificationAdd, reduxNotificationRemove }) => {
    const { currentUser } = useAuth();
    const { currentAccount } = useAccount();
    const { hideAlert, showAlert, isAlertVisible, alertMessage } = useAlert();
    const { hideConfirm, showConfirm, isConfirmVisible, confirmMessage } = useConfirm();
    const { hideModal, showModal, isModalVisible } = useModalWithState(false);
    const [taskValue, dispatch] = useReducer(addTaskReducer, task);
    const [errors, setErrors] = useState([]);

    const { points, expirationDate, title, content } = taskValue;
    const date = getDate(expirationDate);

    const updateTask = async () => {
        if (!title.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij nazwę zadania!' }]);
        if (!content.length > 0) return setErrors([{ message: 'Poprawnie uzupełnij opis zadania' }]);
        if (!points.match(/^[0-9]+$/) || !parseInt(points, 10) > 0) return setErrors([{ message: 'Punkty muszą być liczbą większą od zera!' }]);
        if (!getDate(expirationDate) - new Date() >= 0) return setErrors([{ message: 'Poprawnie uzupełnij datę' }]);
        try {
            await firebaseTaskUpdate(currentUser.uid, task, taskValue);
            reduxTaskUpdate(taskValue);
            hideModal();
            showAlert('Pomyślnie zaaktualizowane zadanie!');
        } catch {
            showAlert('Uuups, coś poszło nie tak!');
        }
        return setErrors([]);
    };
    const removeTask = async () => {
        await firebaseTaskRemove(currentUser.uid, task);
        reduxTaskRemove(task.id);
        const notificationsRelatedToTask = notifications.filter((notification) => notification.taskID === task.id);
        if (notificationsRelatedToTask.length > 0) {
            notificationsRelatedToTask.forEach((notification) => {
                firebaseNotificationRemove(currentUser.uid, notification).then(() => {
                    reduxNotificationRemove(notification.id);
                });
            });
        }
    };

    const takeTask = async () => {
        try {
            await firebaseTaskUpdate(currentUser.uid, task, { ...task, ownerID: currentAccount.ID });
            reduxTaskUpdate({ ...task, ownerID: currentAccount.ID });
            showAlert('Brawo, te zadanie jest juz twoje!');
        } catch {
            showAlert('Uuups, coś poszło nie tak!');
        }
    };

    const sendTaskToConfirmation = async () => {
        const notification = {
            id: getID(),
            taskID: task.id,
            memberID: task.ownerID,
            type: notificationTypes.TASK_CONFIRMATION,
            date: new Date(),
        };
        try {
            await firebaseNotificationAdd(currentUser.uid, notification);
            reduxNotificationAdd(notification);
            showAlert('wysłano twoją prośbe o potwierdzenie wykonania zadania');
        } catch {
            showAlert('Uuups, coś poszło nie tak');
        }
    };

    const getButton = () => {
        let buttonType;
        const isTaskInConfirmation =
            notifications.filter((notification) => notification?.taskID === task.id && notification.type === notificationTypes.TASK_CONFIRMATION).length > 0;

        if (accountType === AccountTypes.PARENT) buttonType = buttonTypes.PARENT_EDIT;
        else if (!owner) buttonType = buttonTypes.CHILD_TAKE;
        else if (currentAccount.ID !== task.ownerID) buttonType = buttonTypes.CHILD_TAKEN;
        else if (!isTaskInConfirmation) buttonType = buttonTypes.CHILD_DONE;
        else buttonType = buttonTypes.CHILD_IN_CONFIRMATION;

        switch (buttonType) {
            case buttonTypes.PARENT_EDIT:
                return (
                    <div className="buttonWrapper doubleButton">
                        <button className="taskButton left" onClick={showModal}>
                            Edytuj
                        </button>
                        <button className="taskButton" onClick={() => showConfirm('Na pewno chcesz usunąć to zadanie?')}>
                            Usuń
                        </button>
                    </div>
                );
            case buttonTypes.CHILD_DONE:
                return (
                    <div className="buttonWrapper">
                        <button className="taskButton buttonWrapper " onClick={sendTaskToConfirmation}>
                            Zrobione!
                        </button>
                    </div>
                );
            case buttonTypes.CHILD_IN_CONFIRMATION:
                return (
                    <div className="buttonWrapper withAddnotation">
                        <p className="top">This task is in confirmation</p>
                        <button className="taskButton disabled" disabled>
                            Zrobione
                        </button>
                        <p className="bottom">You can&apos;t do it twice</p>
                    </div>
                );
            case buttonTypes.CHILD_TAKE:
                return (
                    <div className="buttonWrapper">
                        <button className="taskButton buttonWrapper " onClick={takeTask}>
                            Weź go!
                        </button>
                    </div>
                );
            case buttonTypes.CHILD_TAKEN:
                return (
                    <div className="buttonWrapper withAddnotation">
                        <p className="top">
                            This task belongs to <span>{owner}</span>
                        </p>
                        <button className="taskButton disabled" disabled>
                            Take it!
                        </button>
                        <p className="bottom">You can&apos;t take it</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {getButton()}
            <Confirm onConfirm={removeTask} onCancel={hideConfirm} isVisible={isConfirmVisible}>
                <h1>{confirmMessage}</h1>
            </Confirm>

            <Alert hideAlert={hideAlert} isVisible={isAlertVisible}>
                <h1>{alertMessage}</h1>
            </Alert>

            <Modal hideModal={hideModal} isVisible={isModalVisible}>
                <Heading>Edytuj zadanie</Heading>
                <p>I ciesz się światem wykonanych obowiązków domowych!</p>
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
                        handleSelectedItemChange={({ selectedItem }) => setStateFromInput(dispatch, addTaskActionTypes.setExecutor)(selectedItem)}
                        placeholder="Kto ma być wykonawcą?"
                    />
                    <DateInput
                        name="date"
                        placeholder="Do kiedy zadanie ma być wykonane?"
                        label="Data wykonania"
                        min={new Date()}
                        step={60 * 30}
                        date={date}
                        setDate={setStateFromInput(dispatch, addTaskActionTypes.setDate)}
                    />
                    <Button onClick={updateTask}>Zapisz zmiany</Button>
                </form>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    tasks: [...state.tasks],
    childs: state.members.filter((member) => member.role === AccountTypes.CHILD),
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) => ({
    reduxTaskUpdate: (task) => dispatch({ type: tasksTypes.UPDATE_TASK, payload: task }),
    reduxTaskRemove: (taskID) => dispatch({ type: tasksTypes.REMOVE_TASK, payload: taskID }),
    reduxNotificationAdd: (notification) => dispatch({ type: notificationsTypes.ADD_NOTIFICATION, payload: notification }),
    reduxNotificationRemove: (notificationID) => dispatch({ type: notificationsTypes.REMOVE_NOTIFICATION, payload: notificationID }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskButton);
