import { useEffect, useState } from 'react';

const defaultPosts = [
    { image: "/post 1.png", text: "" },
    { image: "/post 2.png", text: "" },
    { image: "/post 3.png", text: "" },
    { image: "/post 4.png", text: "" },
    { image: "/post 5.png", text: "" },
    { image: "/post 6.png", text: "" },
    { image: "/post 7.png", text: "" },
    { image: "/post 8.png", text: "" },
    { image: "/post 9.png", text: "" },
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
        <div className="grid grid-cols-3 gap-1">
            {displayedPosts.map((post, index) => (
                <div key={index} className="relative">
                    <img src={post.image} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
