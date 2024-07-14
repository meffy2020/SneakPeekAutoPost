'use client';

import { Suspense } from 'react';
import AutoPostingPage from '../../components/AutoPostingPage';

const Posting = () => {
    const profileImage = '/profile-pic.png'; // ProfileHeader에서 사용된 이미지와 동일한 URL

    return (
    
    <Suspense>
    <AutoPostingPage profileImage={profileImage} />;

    </Suspense>
    


)
};

export default Posting;
