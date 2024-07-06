// src/components/Timer.tsx

import { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete }: { duration: number; onComplete: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [timeLeft, onComplete]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-6xl">
            <span>{formatTime(timeLeft)}</span>
        </div>
    );
};

export default Timer;
