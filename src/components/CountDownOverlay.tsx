// src/components/CountDownOverlay.tsx

import { useEffect, useState } from 'react';

const CountDownOverlay = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [count, onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center text-white">
            {count > 0 ? <span style={{ fontSize: '10rem' }}>{count}</span> : null}
        </div>
    );
};

export default CountDownOverlay;
