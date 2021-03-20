import { useState } from 'react';

const useConfirm = (visibilityDefault = false, messageDefault = '') => {
    const [visibility, setVisibility] = useState(visibilityDefault);
    const [message, setMessage] = useState(messageDefault);

    return {
        hideConfirm: () => {
            setVisibility(false);
            setMessage('');
        },
        showConfirm: (messageValue = 'Jesteś tego pewien?') => {
            setVisibility(true);
            setMessage(messageValue);
        },
        isConfirmVisible: visibility,
        confirmMessage: message,
    };
};

export default useConfirm;
