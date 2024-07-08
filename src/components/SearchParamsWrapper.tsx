// components/SearchParamsWrapper.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchParamsWrapper = ({ onParams }: { onParams: (params: URLSearchParams) => void }) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        onParams(searchParams);
    }, [searchParams, onParams]);

    return null;
};

export default SearchParamsWrapper;
