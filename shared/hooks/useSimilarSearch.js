import { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '~/repositories/useApi';
import { useRouter } from 'next/router';
import { formatFileSize } from '~/shared/utilities/utils';

export const transformSimilarDocument = (item) => {
    if (item.document) {
        return item;
    }

    return {
        ...item,
        poster_url: item.poster || item.poster_url,
        price: parseFloat(item.discount_price) || 0,
        discount_price: parseFloat(item.discount_price) || 0,
        views_count: item.views_count || 0,
        document: {
            file_type: item.file_type || '.zip',
            file_size: formatFileSize(item.file_size || 0),
            page_count: item.page_count || 0,
            content_type: item.content_type || 'file',
        },
    };
};

function useSimilarSearch({ defaultData, defaultType = 'file' }) {
    const router = useRouter();
    const {
        page = '1',
        type = defaultType,
        keyword,
        search,
        category,
        parentCategoryId,
        childCategoryId,
        order_by,
        price_from,
        price_to,
        page_from,
        page_to,
        file_type,
    } = router.query;

    const similarDocumentsEnabled =
        defaultData?.count < 50 &&
        Number(page) === 1 &&
        Boolean(search || keyword);

    const searchParams = new URLSearchParams({
        page,
        type,
        limit: '50',
    });

    if (keyword || search) searchParams.append('search', keyword || search);
    if (category || parentCategoryId)
        searchParams.append('category', parentCategoryId || category);
    if (order_by) searchParams.append('order_by', order_by);
    if (childCategoryId) searchParams.append('child_category', childCategoryId);
    if (file_type) {
        if (Array.isArray(file_type)) {
            file_type.forEach((ft) => searchParams.append('file_type', ft));
        } else {
            searchParams.append('file_type', file_type);
        }
    }
    if (page_from) searchParams.append('page_from', page_from);
    if (page_to) searchParams.append('page_to', page_to);
    if (price_from) searchParams.append('price_from', price_from);
    if (price_to) searchParams.append('price_to', price_to);

    const { data: similarDocuments, isFetching: isFetchingSimilarDocuments } =
        useQuery({
            queryKey: ['similar-documents', searchParams.toString()],
            queryFn: async () => {
                const res = await fetch(
                    `${baseUrlUseApi}customer/same-google-search/?${searchParams.toString()}&similar_documents=true`
                );
                return await res.json();
            },
            enabled: similarDocumentsEnabled,
        });

    const filteredSimilarDocuments = useMemo(() => {
        if (!similarDocuments || !similarDocuments.results)
            return { count: 0, results: [] };

        const defaultDataIds = defaultData?.results?.reduce((ids, doc) => {
            ids.add(doc.id);
            return ids;
        }, new Set());

        let count = similarDocuments.count;
        const results = similarDocuments.results.filter((doc) => {
            if (!defaultDataIds.has(doc.id)) {
                count--;
                return true;
            }
            return false;
        });

        return {
            count,
            results,
        };
    }, [similarDocuments, defaultData]);

    const mergedData = useMemo(() => {
        const initialResults = (defaultData && defaultData.results) || [];
        const similarResults = filteredSimilarDocuments.results;

        const transformedInitialResults = initialResults.map(
            transformSimilarDocument
        );

        const transformedSimilarResults = similarResults.map(
            transformSimilarDocument
        );

        return {
            results: [
                ...transformedInitialResults,
                ...transformedSimilarResults,
            ],
            count: (defaultData?.count || 0) + filteredSimilarDocuments.count,
        };
    }, [defaultData, filteredSimilarDocuments, isFetchingSimilarDocuments]);

    // console.log({
    //     similarDocuments,
    //     defaultData,
    //     mergedData,
    //     isFetchingSimilarDocuments,
    //     similarDocumentsEnabled,
    // });

    useEffect(() => {
        if (
            similarDocuments &&
            similarDocuments.results &&
            similarDocuments.results.length
        ) {
            router.push(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        similar_documents: 'true',
                    },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [similarDocuments]);

    return {
        mergedData,
        similarDocuments: filteredSimilarDocuments,
        isFetchingSimilarDocuments,
    };
}

export default useSimilarSearch;
