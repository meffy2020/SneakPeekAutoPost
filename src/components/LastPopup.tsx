// src/components/LastPopup.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LastPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleButtonClick = () => {
        setIsVisible(false);
        router.push('/Last-Commercial-page');
    };

    return (
        isVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-yellow-100 p-6 rounded shadow-md text-center text-black">
                    <div className="text-6xl">🥳</div>
                    <p className="mt-4 mb-4">당신의 최종 인별그램 팔로워 수는 198,030,303명! </p>
                    <p className='mt-4 mb-4'>인플루언서의 삶 성공!</p>
                    <p className="mb-4">핫스타 된 나 공유 해 볼까?</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleButtonClick}
                    >
                        공유하기
                    </button>
                </div>
            </div>
        )
    );
};

export default LastPopup;
