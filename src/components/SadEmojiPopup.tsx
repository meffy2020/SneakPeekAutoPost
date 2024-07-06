const SadEmojiPopup = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
                <span role="img" aria-label="Sad Face" className="text-4xl">😢</span>
                <p className="mt-4">포스팅을 안하면 팔로워수가 줄어든다니..</p>
                <p className="mt-2">후.. 인풀루언서의 삶 힘들다..</p>
                <p className="mt-2">빨리 포스팅 하러 가자</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow-md"
                >
                    포스팅하러 가기
                </button>
            </div>
        </div>
    );
};

export default SadEmojiPopup;
