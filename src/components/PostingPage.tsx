'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../components/ProfileHeader';
import PostGrid from '../components/PostGrid';
import Popup from '../components/Popup';
import CountDownOverlay from '../components/CountDownOverlay';
import PopupStartGPT from '../components/PopupStartGPT';
import SadEmojiPopup from '../components/SadEmojiPopup';
import NotificationPopup from '../components/NotificationPopup';
import LastPopup from '../components/LastPopup';
import { useFollowers } from '@/context/FollowerContext';
import SearchParamsWrapper from '@/components/SearchParamsWrapper';

const HomePage = () => {
    const [activePopup, setActivePopup] = useState<string>('initial');
    const [username, setUsername] = useState('100만 인플루언서');
    const { followers, setFollowers } = useFollowers();
    const [displayFollowers, setDisplayFollowers] = useState(followers);
    const [timer, setTimer] = useState(180);
    const [posts, setPosts] = useState<{ image: string; text: string }[]>([]);
    const [selectedTrend, setSelectedTrend] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
        setPosts(savedPosts);

        const gptPopupShownFromLocalStorage = localStorage.getItem('gptPopupShown');
        const lastPopupShownFromLocalStorage = localStorage.getItem('lastPopupShown');
        
        if (gptPopupShownFromLocalStorage) {
            setActivePopup(lastPopupShownFromLocalStorage ? '' : 'last');
        } else {
            setActivePopup('initial');
        }
    }, []);

    const handleSearchParams = (searchParams: URLSearchParams) => {
        if (searchParams.get('PopupStartGPT') === 'true') {
            setActivePopup('afterPost');
        }
    };

    const handleClosePopup = () => {
        setActivePopup('countdown');
    };

    const handleSetUsername = (username: string) => {
        setUsername(username);
    };

    const handleCountdownComplete = () => {
        setActivePopup('sad');
        startTimer();
    };

    const startTimer = () => {
        setTimer(180);
    };

    const handleCloseSadPopup = () => {
        setActivePopup('');
        router.push('/posting');
    };

    const handleNotificationClick = async () => {
        setActivePopup('');
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

            router.push(`/posting?image=${encodeURIComponent(postImage)}&text=${encodeURIComponent(text)}`);
        } catch (error) {
            console.error('포스트 생성 중 오류 발생:', error);
        }
    };

    const handlePopupStartGPTClose = () => {
        localStorage.setItem('gptPopupShown', 'true');
        fetch('/api/trends')
            .then((res) => res.json())
            .then((data) => {
                if (data.trends.length > 0) {
                    setSelectedTrend(data.trends[0]);
                }
                setActivePopup('notification');
            })
            .catch((error) => console.error('트렌드 가져오기 중 오류 발생:', error));
    };

    const handleLastPopupClose = () => {
        localStorage.setItem('lastPopupShown', 'true');
        setActivePopup('');
    };

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (timer > 0 && activePopup === '') {
            timerInterval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timer, activePopup]);

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
            {activePopup === 'notification' && selectedTrend && (
                <NotificationPopup trend={selectedTrend} onClick={handleNotificationClick} />
            )}
            {activePopup === 'initial' && <Popup onClose={handleClosePopup} onSetUsername={handleSetUsername} />}
            {activePopup === 'countdown' && <CountDownOverlay onComplete={handleCountdownComplete} />}
            {activePopup === 'sad' && <SadEmojiPopup onClose={handleCloseSadPopup} />}
            {activePopup === 'afterPost' && !localStorage.getItem('gptPopupShown') && (
                <PopupStartGPT onClose={handlePopupStartGPTClose} />
            )}
            {activePopup === 'last' && <LastPopup onClose={handleLastPopupClose} />}
            <ProfileHeader username={username} timer={timer} followers={displayFollowers} />
            <PostGrid posts={posts} />
        </div>
    );
};

export default HomePage;
