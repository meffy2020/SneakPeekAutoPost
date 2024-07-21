// src/components/PostGrid.tsx

import { useEffect, useState } from 'react';
import Image from 'next/image';

const defaultPosts = [
    { image: "/Post1.png", text: "" },
    { image: "/Post2.png", text: "" },
    { image: "/Post3.png", text: "" },
    { image: "/Post4.png", text: "" },
    { image: "/Post5.png", text: "" },
    { image: "/Post6.png", text: "" },
    { image: "/Post7.png", text: "" },
    { image: "/Post8.png", text: "" },
    { image: "/Post9.png", text: "" },
];

interface PostGridProps {
    posts: { image: string; text: string }[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
    const [displayedPosts, setDisplayedPosts] = useState<{ image: string, text: string }[]>(defaultPosts);

    useEffect(() => {
        if (posts.length > 0) {
            setDisplayedPosts([...posts, ...defaultPosts]);
        }
    }, [posts]);

    return (
        <div className="p-4 grid grid-cols-3 gap-1">
            {displayedPosts.map((post, index) => (
                <div key={index} className="relative w-full h-32">
                    <Image
                        src={post.image}
                        alt={`Post ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
