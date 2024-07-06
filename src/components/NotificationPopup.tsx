import React from 'react';

interface NotificationPopupProps {
    trend: string;
    onClick: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ trend, onClick }) => {
    return (
        <div 
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded shadow-lg cursor-pointer w-11/12 max-w-md" 
            onClick={onClick}
        >
            <p>오늘의 🔥 트렌드: {trend}</p>
            <p>{trend} 키워드를 사용해서 컨텐츠를 만들어 봤어요!</p>
            <p>지금 포스팅 해 볼까요?</p>
        </div>
    );
};

export default NotificationPopup;
