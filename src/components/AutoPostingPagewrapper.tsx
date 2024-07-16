'use client';

import { useSearchParams } from 'next/navigation';
import AutoPostingPage from './AutoPostingPage';

const AutoPostingPageWrapper = () => {
    const searchParams = useSearchParams();
    const profileImage = '/profile-pic.png'; // ProfileHeader에서 사용된 이미지와 동일한 URL
    const image = searchParams.get('image') || '';
    const text = searchParams.get('text') || '';

    return <AutoPostingPage profileImage={profileImage} initialImage={image} initialText={text} />;
};

export default AutoPostingPageWrapper;
