'use client';

import PostingPage from '../../components/PostingPage';

const Posting = () => {
    const profileImage = '/profile-pic.png'; // ProfileHeader에서 사용된 이미지와 동일한 URL

    return <PostingPage profileImage={profileImage} />;
};

export default Posting;
