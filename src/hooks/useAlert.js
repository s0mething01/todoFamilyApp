import { useState } from 'react';

const useAlert = (visibilityDefault = false, messageDefault = '') => {
    const [visibility, setVisibility] = useState(visibilityDefault);
    const [message, setMessage] = useState(messageDefault);

    return {
        hideAlert: () => {
            setVisibility(false);
            setMessage('');
        },
        showAlert: (messageValue) => {
            setVisibility(true);
            setMessage(messageValue);
        },
        isAlertVisible: visibility,
        alertMessage: message,
    };
};

export default useAlert;
