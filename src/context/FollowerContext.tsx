'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FollowerContextProps {
    followers: number;
    setFollowers: (followers: number) => void;
}

const FollowerContext = createContext<FollowerContextProps | undefined>(undefined);

export const FollowerProvider = ({ children }: { children: ReactNode }) => {
    const [followers, setFollowers] = useState(1000000);

    return (
        <FollowerContext.Provider value={{ followers, setFollowers }}>
            {children}
        </FollowerContext.Provider>
    );
};

export const useFollowers = (): FollowerContextProps => {
    const context = useContext(FollowerContext);
    if (!context) {
        throw new Error('useFollowers must be used within a FollowerProvider');
    }
    return context;
};
