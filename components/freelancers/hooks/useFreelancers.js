import React, { useMemo } from 'react';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useRouter } from 'next/router';
import { useFGet } from '~/shared/hooks/useFApi';
import { Checkbox, Skeleton, Radio } from 'antd';

function useFreelancers(collapsed) {
    const router = useRouter();
    const limit = collapsed ? 21 : 20;
    const { data: directions, isFetching: isDirectionsFetching } =
        useGetDirectionsQuery();

    const directionsMap = useMemo(() => {
        if (!directions) return {};
        const map = {};
        directions.forEach((dir) => {
            map[dir.value] = dir;
        });
        return map;
    }, [directions]);

    const selectedDirection = useMemo(
        () =>
            Array.isArray(router.query.direction)
                ? router.query.direction.map((v) => v)
                : router.query.direction
                ? [router.query.direction]
                : [],
        [router.query.direction]
    );

    const { data: dataPositions, isFetching: isPositionsFetching } = useFGet(
        ['positions'],
        `users/positions`
    );

    const positions = useMemo(() => {
        if (dataPositions) {
            return dataPositions.filter((pos) => {
                if (router.query.direction) {
                    return router.query.direction.includes(pos.direction);
                }
                return true;
            });
        }
        return [];
    }, [dataPositions, router.query.direction]);

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

        return positions.map((pos) => (
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

        return directions.map((dir) => (
            <Checkbox key={dir.value} value={dir.value}>
                {dir.label}
            </Checkbox>
        ));
    }, [directions, isDirectionsFetching]);

    const selectedPositions = useMemo(
        () =>
            Array.isArray(router.query.position)
                ? router.query.position.map((v) => v)
                : router.query.position
                ? [router.query.position]
                : [],
        [router.query.position]
    );

    // query yangilovchi funksiya
    const updateQuery = (updates) => {
        console.log('updateQuery called with', updates);
        const newQuery = { ...router.query, limit, offset: 0 };

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
    const handlePositionsChange = (vals) => {
        updateQuery({ position: vals });
    };

    // Direction (radio)
    const handleDirectionChange = (vals) => {
        updateQuery({
            direction: vals,
            directionValue: Array.isArray(vals)
                ? vals.map((val) => directionsMap[val].label)
                : directionsMap[vals]
                ? directionsMap[vals].label
                : undefined,
            position: undefined,
        });
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
