import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { baseUrlUseApi } from '~/repositories/useApi';

export function useFilteredProducts({
    direction,
    category,
    defaultData,
    filterKeys = ['search', 'price_from', 'price_to'],
    customQueryBuilder = null,
}) {
    const router = useRouter();

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return filterKeys.some((key) => {
            const value = router.query[key];
            return value !== null && value !== undefined && value !== '';
        });
    }, [filterKeys, router.query]);

    // Also check for scientific-resources specific filters
    const hasScientificFilters = useMemo(() => {
        return !!(
            router.query.content_extensions ||
            (router.query.from_page && Number(router.query.from_page) > 0) ||
            (router.query.to_page && Number(router.query.to_page) < 100)
        );
    }, [router.query]);

    const hasPagination = Number(router.query.page) > 1;

    // Always fetch when category is provided (category changes should trigger fetch)
    // Also fetch if filters or pagination are active
    const shouldFetch =
        !!category || hasActiveFilters || hasScientificFilters || hasPagination;

    // Build query params
    const queryParams = useMemo(() => {
        const params = new URLSearchParams({
            direction,
            page: (router.query.page || 1).toString(),
            page_size: '50',
        });

        // Always include category (from SSG)
        if (category) {
            params.append('category', category);
        }

        // Use custom query builder if provided, otherwise use default
        if (customQueryBuilder) {
            customQueryBuilder(params, router.query);
        } else {
            // Default filter handling
            filterKeys.forEach((key) => {
                const value = router.query[key];
                if (value) {
                    // Handle arrays (like content_extensions)
                    if (Array.isArray(value)) {
                        value.forEach((v) => params.append(key, v));
                    } else {
                        params.append(key, value);
                    }
                }
            });

            // Handle scientific-resources filters
            if (router.query.content_extensions) {
                const exts = Array.isArray(router.query.content_extensions)
                    ? router.query.content_extensions
                    : [router.query.content_extensions];
                exts.forEach((ext) => params.append('content_extensions', ext));
            }

            if (router.query.from_page && Number(router.query.from_page)) {
                params.append('from_page', router.query.from_page);
            }

            if (router.query.to_page && Number(router.query.to_page) < 100) {
                params.append('to_page', router.query.to_page);
            }
        }

        return params;
    }, [direction, category, filterKeys, router.query, customQueryBuilder]);

    // Fetch filtered data
    const { data, isLoading, error } = useQuery({
        queryKey: ['filtered-products', direction, queryParams.toString()],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrlUseApi}customer/products/?${queryParams.toString()}`
            );
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            return res.json();
        },
        enabled: shouldFetch,
        staleTime: 30000, // Cache for 30 seconds
        keepPreviousData: true,
    });

    return {
        productsData: shouldFetch ? data : defaultData,
        isLoading: shouldFetch ? isLoading : false,
        error: shouldFetch ? error : null,
    };
}
