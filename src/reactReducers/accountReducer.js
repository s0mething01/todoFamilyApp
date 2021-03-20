import avatar from 'assets/images/child.png';
import { types as AccountTypes } from 'components/Account/AccountTypes';

const initialState = [
    {
        id: 5,
        name: 'Nikola',
        activeTasks: '4',
        avatar,
        description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore verita',
        pointsGiven: '1245',
        tasksGiven: '432',
        color: 4,
        accountType: AccountTypes.PARENT,
    },
];

const accountActionTypes = {
    update_account: 'UPDATE_ACCOUNT',
};

function accountReducer(state = initialState, action) {
    switch (action) {
        case accountActionTypes.update_maccount:
            return state;
        default:
            return state;
    }
}

export default accountReducer;

export { accountActionTypes, initialState };
