'use client';

import AutoPostingPage from '../../components/AutoPostingPage';

const Posting = () => {
    const profileImage = '/profile-pic.png'; // ProfileHeader에서 사용된 이미지와 동일한 URL

    return <AutoPostingPage profileImage={profileImage} />;
};

export default Posting;
