'use client';

import { Suspense } from 'react';
import AutoPostingPageWrapper from '../../components/AutoPostingPagewrapper';

const Posting = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AutoPostingPageWrapper />
        </Suspense>
    );
};

export default Posting;
