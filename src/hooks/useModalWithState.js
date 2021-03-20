import { useState } from 'react';

const useModalWithState = (isActive = false) => {
    const [value, setValue] = useState(isActive);

    return {
        hideModal: () => setValue(false),
        showModal: () => setValue(true),
        isModalVisible: value,
    };
};

export default useModalWithState;
