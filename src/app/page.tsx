'use client';
// HomePage.tsx
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import Popup from '../components/Popup';
import CountDownOverlay from '../components/CountDownOverlay';
import HeartAnimation from '../components/HeartAnimation';
import PopupStartGPT from '../components/PopupStartGPT';
import SadEmojiPopup from '../components/SadEmojiPopup';
import NotificationPopup from '../components/NotificationPopup';
import LastPopup from '../components/LastPopup';
import { useFollowers } from '@/context/FollowerContext';
import SearchParamsWrapper from '@/components/SearchParamsWrapper';

const HomePage = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const [showSadPopup, setShowSadPopup] = useState(false);
    const [showPopupAfterPost, setShowPopupAfterPost] = useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    const [showLastPopup, setShowLastPopup] = useState(false);
    const [username, setUsername] = useState('100만 인플루언서');
    const { followers, setFollowers } = useFollowers();
    const [displayFollowers, setDisplayFollowers] = useState(followers);
    const [timer, setTimer] = useState(180); // 3분 타이머 (초)
    const [posts, setPosts] = useState<{ image: string; text: string }[]>([]);
    const [selectedTrend, setSelectedTrend] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);

        const gptPopupShownFromLocalStorage = localStorage.getItem('gptPopupShown');
        if (gptPopupShownFromLocalStorage) {
            setShowPopupAfterPost(false);
        }
    }, []);

    const handleSearchParams = (searchParams: URLSearchParams) => {
        if (searchParams.get('showHearts') === 'true') {
            setShowPopup(false);
            setShowHearts(true);
            setTimeout(() => {
                setShowHearts(false);
                if (!localStorage.getItem('gptPopupShown')) {
                    setShowPopupAfterPost(true);
                } else {
                    setShowLastPopup(true);
                }
            }, 5000);
        }

        if (searchParams.get('LastPopup') === 'true') {
            setShowLastPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowCountdown(true);
    };

    const handleSetUsername = (username: string) => {
        setUsername(username);
    };

    const handleCountdownComplete = () => {
        setShowCountdown(false);
        setShowHearts(true);
        let increment = 7573;
        let targetFollowers = displayFollowers + 7573 * 5; // 팔로워 5회 증가
        let currentFollowers = displayFollowers;

        const interval = setInterval(() => {
            currentFollowers += increment;
            if (currentFollowers >= targetFollowers) {
                currentFollowers = targetFollowers;
                clearInterval(interval);
            }
            setDisplayFollowers(currentFollowers);
        }, 1000); // 1초마다 팔로워 증가

        setTimeout(() => {
            clearInterval(interval);
            setShowHearts(false);
            setShowSadPopup(true);
            setFollowers(targetFollowers); // 실제 팔로워 수를 업데이트
            startTimer();
        }, 5000); // 5초 후에 인터벌 클리어
    };

    const startTimer = () => {
        setTimer(180);
    };

    const handleCloseSadPopup = () => {
        setShowSadPopup(false);
        router.push('/posting');
    };

    const handleNotificationClick = async () => {
        setShowNotificationPopup(false);
        try {
            const trendsResponse = await fetch('/api/trends');
            const trendsData = await trendsResponse.json();
            const topic = trendsData.trends[0];

            const response = await fetch(`/api/generate-post?topic=${encodeURIComponent(topic)}`, {
                method: 'GET',
            });

            const data = await response.json();
            const { text } = data;

            const imageResponse = await fetch(`/api/fetch-image?keyword=${encodeURIComponent(topic)}`, {
                method: 'GET',
            });

            const imageData = await imageResponse.json();
            const postImage = imageData.hits[0].webformatURL;

            // 포스팅 페이지로 이동하면서 이미지와 텍스트를 쿼리 파라미터로 전달
            router.push(`/auto-posting?image=${encodeURIComponent(postImage)}&text=${encodeURIComponent(text)}`);
        } catch (error) {
            console.error('Error generating post:', error);
        }
    };

    const handlePopupStartGPTClose = () => {
        setShowPopupAfterPost(false);
        localStorage.setItem('gptPopupShown', 'true');
        fetch('/api/trends')
            .then((res) => res.json())
            .then((data) => {
                if (data.trends.length > 0) {
                    setSelectedTrend(data.trends[0]);
                }
                setShowNotificationPopup(true);
            })
            .catch((error) => console.error('Error fetching trends:', error));
    };

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (timer > 0 && !showPopup && !showCountdown && !showSadPopup && !showPopupAfterPost) {
            timerInterval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timer, showPopup, showCountdown, showSadPopup, showPopupAfterPost]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <div className="overflow-auto h-full">
            <Suspense fallback={<div>로딩 중...</div>}>
                <SearchParamsWrapper onParams={handleSearchParams} />
            </Suspense>
            {showNotificationPopup && selectedTrend && (
                <NotificationPopup trend={selectedTrend} onClick={handleNotificationClick} />
            )}
            {showPopup && <Popup onClose={handleClosePopup} onSetUsername={handleSetUsername} />}
            {showCountdown && <CountDownOverlay onComplete={handleCountdownComplete} />}
            {showHearts && <HeartAnimation onComplete={() => setShowHearts(false)} />}
            {showSadPopup && <SadEmojiPopup onClose={handleCloseSadPopup} />}
            {showPopupAfterPost && !localStorage.getItem('gptPopupShown') && (
                <PopupStartGPT onClose={handlePopupStartGPTClose} />
            )}

            {showLastPopup && <LastPopup />}
            
            <ProfileHeader username={username} timer={timer} followers={displayFollowers} />
            <PostGrid posts={posts} />
        </div>
    );
};

export default HomePage;