import React, { useMemo } from 'react';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useRouter } from 'next/router';
import { useFGet } from '~/shared/hooks/useFApi';

function useFreelancers() {
    const { data: directions } = useGetDirectionsQuery();
    const { data: positions } = useFGet('positions', 'users/positions');
    const router = useRouter();
    const selectedDirection = useMemo(
        () => router.query.direction || undefined,
        [router.query.direction]
    );

    const selectedPositions = useMemo(
        () =>
            Array.isArray(router.query.position)
                ? router.query.position.map(v => v)
                : router.query.position
                ? [router.query.position]
                : [],
        [router.query.position]
    );

    // query yangilovchi funksiya
    const updateQuery = updates => {
        const newQuery = { ...router.query };

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value.length === 0) {
                delete newQuery[key];
            } else {
                newQuery[key] = value;
            }
        });

        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
            undefined,
            { scroll: false }
        );
    };

    // Tozalash
    const handleClear = () => {
        router.push({
            pathname: router.pathname,
            query: {},
        });
    };

    // Position (checkbox)
    const handlePositionsChange = vals => {
        updateQuery({ position: vals });
    };

    // Direction (radio)
    const handleDirectionChange = value => {
        updateQuery({ direction: value });
    };

    return {
        directions,
        positions,
        handleClear,
        updateQuery,
        handlePositionsChange,
        handleDirectionChange,
        selectedPositions,
        selectedDirection,
    };
}

export default useFreelancers;
