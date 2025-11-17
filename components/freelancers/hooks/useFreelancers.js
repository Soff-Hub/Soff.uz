import React, { useMemo } from 'react';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useRouter } from 'next/router';
import { useFGet } from '~/shared/hooks/useFApi';
import { Checkbox, Skeleton, Radio } from 'antd';

function useFreelancers() {
    const router = useRouter();
    const {
        data: directions,
        isFetching: isDirectionsFetching,
    } = useGetDirectionsQuery();
    const selectedDirection = useMemo(
        () => router.query.direction || undefined,
        [router.query.direction]
    );
    const { data: positions, isFetching: isPositionsFetching } = useFGet(
        ['positions', selectedDirection],
        `users/positions${
            selectedDirection ? `?direction=${selectedDirection}` : ''
        }`
    );

    const positionsGroup = useMemo(() => {
        if (isPositionsFetching)
            return Array(10)
                .fill(0)
                .map((_, idx) => (
                    <Checkbox key={idx} disabled>
                        <Skeleton.Input
                            style={{
                                width: 100,
                                height: '20px',
                                marginTop: '2px',
                            }}
                            active
                        />
                    </Checkbox>
                ));
        if (!positions || !positions.length)
            return <p>Hech qanday kasblar topilmadi</p>;

        return positions.map(pos => (
            <Checkbox key={pos.title} value={pos.title}>
                {pos.title}
            </Checkbox>
        ));
    }, [positions, isPositionsFetching]);

    const directionsGroup = useMemo(() => {
        if (isDirectionsFetching)
            return Array(10)
                .fill(0)
                .map((_, idx) => (
                    <Checkbox key={idx} disabled>
                        <Skeleton.Input
                            style={{
                                width: 100,
                                height: '20px',
                                marginTop: '2px',
                            }}
                            active
                        />
                    </Checkbox>
                ));

        if (!directions || !directions.length)
            return <p>Hech qanday yo'nalishlar topilmadi</p>;

        return directions.map(dir => (
            <Radio key={dir.value} value={dir.value}>
                {dir.label}
            </Radio>
        ));
    }, [directions, isDirectionsFetching]);

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
        directionsGroup,
        positions,
        positionsGroup,
        handleClear,
        updateQuery,
        handlePositionsChange,
        handleDirectionChange,
        selectedPositions,
        selectedDirection,
        isPositionsFetching,
        isDirectionsFetching,
    };
}

export default useFreelancers;
