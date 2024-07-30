import React from 'react';

const PopupStartGPT = ({ onClose }: { onClose: () => void }) => {
    const handleAutoPostClick = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <span role="img" aria-label="sad emoji" className="text-6xl">
                        😢
                    </span>
                    <h2 className="mt-4 text-xl font-semibold">포스팅을 안하면 팔로워수가 안는다니..</h2>
                    <p className="mt-2 text-gray-600">후.. 인플루언서의 삶 힘들다..</p>
                    <p className="mt-2 text-gray-600">자동으로 포스팅해주는 뭐 그런거 없나..?!</p>
                    <button
                        onClick={handleAutoPostClick}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Auto Post 사용해서 자동으로 올리기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupStartGPT;
