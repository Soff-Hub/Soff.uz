import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import { useQuery } from '@tanstack/react-query';

type UseFilteredProductsProps = {
    direction: string;
    defaultData: any;
    fourChildData: any;
};

export function useFilteredProducts({
    direction,
    defaultData,
}: UseFilteredProductsProps) {
    const { query, isReady, asPath } = useRouter();
    const { page, price_from, price_to } = query;

    const { parentCategory, childCategory } = useMemo(() => {
        if (!asPath) return {};
        const pathOnly = asPath.split('?')[0];
        const segments = pathOnly.split('/').filter(Boolean);
        const parentCategory = segments[1];
        const childCategory = segments[2];
        return { parentCategory, childCategory };
    }, [asPath]);

    const category = parentCategory || childCategory;

    const queryParamsString = useMemo(() => {
        const params = new URLSearchParams({
            direction,
            page: (page || 1).toString(),
            page_size: '50',
        });

        if (category) params.append('category', category);
        if (price_from) params.append('price_from', String(price_from));
        if (price_to) params.append('price_to', String(price_to));

        return params.toString();
    }, [direction, page, category, price_from, price_to]);
    console.log(queryParamsString);
    console.log(parentCategory, childCategory);

    const initialTimestamp = useMemo(() => Date.now(), []);

    const { data, isFetching, error } = useQuery({
        queryKey: [category, queryParamsString],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/products/?${queryParamsString}`
            );
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json();
        },
        enabled: isReady,
        initialData: defaultData,
        initialDataUpdatedAt: initialTimestamp,
        staleTime: 30000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        productsData: data,
        isLoading: isFetching,
        error,
    };
}
