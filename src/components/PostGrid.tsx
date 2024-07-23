import { useEffect, useState } from 'react';

const defaultPosts = [
    { image: "/post1.png", text: "" },
    { image: "/post2.png", text: "" },
    { image: "/post3.png", text: "" },
    { image: "/post4.png", text: "" },
    { image: "/post5.png", text: "" },
    { image: "/post6.png", text: "" },
    { image: "/post7.png", text: "" },
    { image: "/post8.png", text: "" },
    { image: "/post9.png", text: "" },
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
