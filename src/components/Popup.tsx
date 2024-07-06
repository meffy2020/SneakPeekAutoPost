// src/components/Popup.tsx

import { useState } from 'react';

const Popup = ({ onClose, onSetUsername }: { onClose: () => void; onSetUsername: (username: string) => void }) => {
    const [instagramId, setInstagramId] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstagramId(e.target.value);
        if (e.target.value) {
            setError('');
        }
    };

    const handleButtonClick = () => {
        if (instagramId.trim() === '') {
            setError('인스타그램 아이디를 입력해주세요!');
            return;
        }
        onSetUsername(instagramId);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="text-center mb-4">
                    <img src="/instagram-logo.png" alt="Instagram Logo" className="mx-auto mb-4 w-20 h-20" />
                    <p className="mb-4">100만 인플루언서의 삶을 살아 볼 준비가 되었나요?</p>
                    <p className="mb-4">
                        준비가 되었다면, 본인의 인스타그램 아이디를 입력하고, <strong>심호흡 하고</strong>, 체험하기를 눌러주세요.
                    </p>
                </div>
                <input
                    type="text"
                    placeholder="내 인스타그램 아이디"
                    value={instagramId}
                    onChange={handleInputChange}
                    className="border p-2 mb-4 w-full"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    onClick={handleButtonClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    3분동안 인플루언서의 삶 체험하기
                </button>
            </div>
        </div>
    );
};

export default Popup;
