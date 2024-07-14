'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFollowers } from '@/context/FollowerContext';

const PostingPage = ({ profileImage }: { profileImage: string }) => {
    const { followers } = useFollowers();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [timer, setTimer] = useState(180); // 3분 타이머 (초)
    const [postText, setPostText] = useState(''); // input 값을 관리할 상태
    const [error, setError] = useState<string | null>(null); // 오류 메시지 상태
    const [isValid, setIsValid] = useState(false); // 포스팅 가능 여부
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validatePost = () => {
        const hashtags = postText.match(/#\S+/g);
        if (!selectedImage) {
            setError("사진을 선택해주세요.");
            setIsValid(false);
            return;
        }
        if (postText.length < 100) {
            setError("글자가 100자 이상이어야 합니다.");
            setIsValid(false);
            return;
        }
        if (!hashtags || hashtags.length < 5) {
            setError("해시태그가 5개 이상이어야 합니다.");
            setIsValid(false);
            return;
        }
        setError(null);
        setIsValid(true);
    };

    const handlePost = () => {
        if (isValid) {
            const newPost = {
                image: selectedImage,
                text: postText,
            };
            // 로컬 스토리지에 포스트 저장
            const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            const updatedPosts = [...existingPosts, newPost];
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            // HomePage로 이동하면서 showHearts 상태를 전달
            router.push('/?showHearts=true');
        }
    };

    useEffect(() => {
        validatePost();
    }, [postText, selectedImage]);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    return (
        <div className="relative w-[375px] h-[667px] bg-yellow-100 shadow-lg mx-auto p-4 flex flex-col items-center">
            <div className="flex justify-between w-full mb-4">
                <div className="flex items-center">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <span className="font-bold">{followers.toLocaleString()}</span> Followers
                </div>
                <div className="text-right font-mono">{new Date(timer * 1000).toISOString().substr(14, 5)}</div>
            </div>
            <div
                className="w-full h-[300px] border border-black flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                ) : (
                    <div className="bg-gray-200 p-2 rounded shadow-md">사진 고르기</div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            <div className="flex justify-between w-full my-4 px-4">
                <div className="flex space-x-4">
                    <span className="text-2xl">❤️</span>
                    <span className="text-2xl">💬</span>
                    <span className="text-2xl">✈️</span>
                </div>
                <div>
                    <span className="text-2xl">🔖</span>
                </div>
            </div>
            <textarea
                className="w-full p-2 flex-grow border-none bg-transparent focus:outline-none"
                placeholder="123.abc 여기를 터치해서 포스팅을 작성해주세요."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                rows={8}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                className={`mt-2 bg-blue-500 text-white py-2 px-4 rounded shadow-md w-full ${isValid ? '' : 'opacity-50 cursor-not-allowed'}`}
                onClick={handlePost}
                disabled={!isValid}
            >
                포스팅 하기
            </button>
        </div>
    );
};

export default PostingPage;