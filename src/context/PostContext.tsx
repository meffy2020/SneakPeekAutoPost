'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Post {
    image: string;
    text: string;
}

interface PostContextProps {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const usePosts = (): PostContextProps => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (post: Post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};
