'use client';

import { useRouter } from 'next/navigation';
import PostingPage from '../../components/PostingPage';

const Posting = () => {
    const profileImage = '/profile-pic.png'; // ProfileHeader에서 사용된 이미지와 동일한 URL
    const router = useRouter();

    return <PostingPage profileImage={profileImage} router={router} />;
};

export default Posting;
