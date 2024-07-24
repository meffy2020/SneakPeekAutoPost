// src/app/Last-Commercial-page/page.tsx
"use client";

import React, { useState } from 'react';

const NewPage: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        const res = await fetch('/api/submit-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (res.ok) {
            alert('Email submitted successfully');
            setEmail('');
        } else {
            console.error('Failed to submit email');
        }
    };

    return (
        <div className="p-6 bg-yellow-100 text-black min-h-screen flex flex-col items-center">
            <div className="mb-10 text-center">
                <div className="text-6xl">🎁</div>
                <p className="text-xl mt-4">당신을 위해 준비한 선물 1</p>
                <p className="mt-2">이메일 입력하고 Auto Post 90% 할인권 받자!</p>
                <div className="flex justify-center items-center mt-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="p-2 border rounded mr-2"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        Done
                    </button>
                </div>
            </div>
            <div className="mb-10 text-center">
                <div className="text-6xl">💝</div>
                <p className="text-xl mt-4">당신을 위해 준비한 선물 2</p>
                <p className="mt-2">Auto Post 팔로우 하고 Auto Post 얼리버드 할인권 받자!</p>
                <a href="https://www.instagram.com/extraedge_official" target="_blank" rel="noopener noreferrer">
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">팔로우 하러가기</button>
                </a>
            </div>
            <div className="text-center">
                <div className="text-6xl">🎉</div>
                <p className="text-xl mt-4">당신을 위해 준비한 선물 3</p>
                <p className="mt-2">Auto Post 단톡방 들어가고 Auto Post 무료 체험단 신청하자!</p>
                <a href="https://open.kakao.com/o/gZhMkrtg" target="_blank" rel="noopener noreferrer">
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">단톡방 들어가기</button>
                </a>
            </div>
        </div>
    );
};

export default NewPage;