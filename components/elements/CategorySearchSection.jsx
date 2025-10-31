import { Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

function useDebounce(value, delay = 500) {
    const [debounced, setDebounced] = useState(value);
    const { startTimeout, stopTimeout } = useTimeManager();

    useEffect(() => {
        const handler = startTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => stopTimeout(handler);
    }, [value, delay]);

    return debounced;
}

export default function CategorySearchSection() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const debouncedSearch = useDebounce(search, 1000);

    useEffect(() => {
        const currentQuery = router.query;

        const updatedQuery = { ...currentQuery };
        if (debouncedSearch) {
            updatedQuery.search = debouncedSearch;
            updatedQuery.page = 1;
        } else {
            delete updatedQuery.search;
        }

        router.replace({
            pathname: router.pathname,
            query: updatedQuery,
        });
    }, [debouncedSearch]);

    return (
        <div className="">
            <Input.Search
                placeholder="Mahsulot qidirish..."
                size="large"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ height: '50px', fontSize: '18px' }}
            />
        </div>
    );
}
