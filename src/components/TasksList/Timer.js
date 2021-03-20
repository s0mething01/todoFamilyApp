import { useState, useEffect } from 'react';

import getTimer from 'utils/getTimer';

const Timer = ({ expirationDate }) => {
    const [timer, setTimer] = useState(getTimer(expirationDate));

    useEffect(() => {
        const timeoutID = setTimeout(() => setTimer(getTimer(expirationDate)), 1000);
        return () => clearTimeout(timeoutID);
    }, [timer]);

    return (
        <p className="timerWrapper">
            Pozostało <span>{timer}</span>
        </p>
    );
};

export default Timer;
