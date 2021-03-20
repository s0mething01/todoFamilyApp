import { ReactComponent as AwardIcon } from 'assets/icons/AwardIcon.svg';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const buttonTypes = {
    PARENT_EDIT: 'PARENT_EDIT',
    CHILD_CLAIM: 'CHILD_CLAIM',
    CHILD_CLAIMED: 'CHILD_CLAIMED',
    CHILD_TOO_EXPENSIVE: 'CHILD_TOO_EXPENSIVE',
};

const AwardButton = ({ role, sendAwardToConfirmation, relatedNotificationsCount, awardCost, showModal, showConfirm, userPoints, showAlert }) => {
    let buttonType;

    if (role === AccountTypes.PARENT) buttonType = buttonTypes.PARENT_EDIT;
    else if (relatedNotificationsCount > 0) buttonType = buttonTypes.CHILD_CLAIMED;
    else if (userPoints - awardCost > 0) buttonType = buttonTypes.CHILD_CLAIM;
    else buttonType = buttonTypes.CHILD_TOO_EXPENSIVE;

    switch (buttonType) {
        case buttonTypes.PARENT_EDIT:
            return (
                <div className="buttonWrapper">
                    <button className="awardButton" onClick={showModal}>
                        <span>Edytuj</span>
                    </button>
                    <button className="awardButton" onClick={() => showConfirm('Czy na pewno chcesz usunąć tą nagrodę?')}>
                        <span>Usuń</span>
                    </button>
                </div>
            );
        case buttonTypes.CHILD_CLAIM:
            return (
                <button className="singleButton awardButton" onClick={sendAwardToConfirmation}>
                    <AwardIcon />
                    <span>Weź nagrodę</span>
                </button>
            );
        case buttonTypes.CHILD_TOO_EXPENSIVE:
            return (
                <button className="singleButton awardButton disabled" onClick={() => showAlert('Nie masz wystarczający punktów!')}>
                    <span>Nie masz wystarczająco punktów</span>
                </button>
            );
        case buttonTypes.CHILD_CLAIMED:
            return (
                <button
                    className="singleButton awardButton disabled"
                    onClick={() => showAlert('Ta nagroda czeka juz na potwierdzenie otrzymania, nie mozena tego zrobić drugi raz!')}
                >
                    <span>Czeka na potwierdzenie</span>
                </button>
            );
        default:
            return null;
    }
};

export default AwardButton;
