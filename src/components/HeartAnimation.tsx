// src/components/HeartAnimation.tsx

import { useEffect, useState } from 'react';

const HeartAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [hearts, setHearts] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((hearts) => [...hearts, hearts.length]);
        }, 200);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            onComplete();
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none z-50">
            <div className="relative w-[375px] h-[667px] overflow-hidden">
                {hearts.map((heart) => (
                    <div
                        key={heart}
                        className="heart absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-50px',
                            animationDuration: `${Math.random() * 2 + 3}s`,
                            fontSize: `${Math.random() * 2 + 1}rem`,
                        }}
                    >
                        🖤
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeartAnimation;
