import React, { useEffect, useState } from 'react';

function Timer({ timeLeft }) {
    const [seconds, setSeconds] = useState(timeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return <div>Time left: {seconds}s</div>;
}

export default Timer;
