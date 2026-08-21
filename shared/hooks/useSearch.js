import { useState, useMemo } from 'react';
import useDebounce from './useDebounce';
import axiosInstance from '../api/freeleanceApi';
import { useQuery } from '@tanstack/react-query';
import { baseUrlUseApi } from '@/repositories/useApi';
import { useRouter } from 'next/router';
import useHistorySearch from './useHistorySearch';

const staticOptions = {
    mahsulotlar: [
        { key: 1, value: 'Ilmiy ishlar' },
        { key: 2, value: 'Dizayn shablonlari' },
        { key: 3, value: 'Veb sayt shablonlari' },
        { key: 4, value: '3D modellar' },
        { key: 5, value: 'Shablonlar' },
        { key: 6, value: 'Video darsliklar' },
    ],
    xizmatlar: [
        { value: 'Web Dasturlash' },
        { value: 'Mobile App Dasturlash' },
        { value: 'UI/UX Dizayn' },
        { value: 'SEO Optimization' },
        { value: 'Logo Dizayn' },
    ],
    mutaxassislar: [
        { value: 'Frontend Dasturchi' },
        { value: 'Backend Dasturchi' },
        { value: 'Fullstack Dasturchi' },
        { value: 'UI/UX Designer' },
        { value: 'Project Manager' },
    ],
};

function useSearch(categoryId = null) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const [type, setType] = useState('mahsulotlar');
    const debouncedSearch = useDebounce(search, 500);
    const { addSearchHistoryItem } = useHistorySearch();
    const axios = axiosInstance();

    // The 500ms gap after a keystroke, before the query is even enabled.
    // Without this the UI treats "not asked yet" as "asked and got nothing".
    const isDebouncing = search.trim() !== debouncedSearch.trim();

    const searchOptions = (options) => {
        return options?.filter((option) => {
            if (typeof option !== 'string' || !option) return false;
            return option
                .toLowerCase()
                .trim()
                .includes(debouncedSearch.toLowerCase().trim());
        });
    };

    const {
        data,
        isSuccess,
        isFetching: productsLoading,
    } = useQuery({
        queryKey: ['searchResults', debouncedSearch, type, categoryId],
        queryFn: async () => {
            // encodeURIComponent is required: titles routinely contain `|`,
            // `&` and `#`, and an unencoded `&` silently truncates the query.
            const searchParam = debouncedSearch
                ? `&search=${encodeURIComponent(debouncedSearch)}`
                : ``;
            const categoryParam = categoryId
                ? `&category=${encodeURIComponent(categoryId)}`
                : '';
            const res = await fetch(
                `${baseUrlUseApi}customer/same-google-search/?type=file&limit=10${searchParam}${categoryParam}`
            );
            if (!res.ok) {
                throw new Error(`Search request failed: ${res.status}`);
            }
            const json = await res.json();
            return json;
        },
        enabled: debouncedSearch.length > 0 && type === 'mahsulotlar',
        retry: 1,
    });

    const {
        data: servicesData,
        isSuccess: servicesSuccess,
        isFetching: servicesLoading,
    } = useQuery({
        queryKey: ['servicesData', debouncedSearch, type],
        queryFn: async () => {
            const { data: freelanceData } = await axios.get(
                `customer/search-page?search=${debouncedSearch}`
            );
            const { data: servicesData } = await axios.get(
                `/customer?limit=10&search=${debouncedSearch}`
            );

            let data = [];

            let freelanceOptions = searchOptions(freelanceData?.services) || [];

            data = freelanceOptions.map((item, index) => ({
                key: index,
                value: item,
            }));

            const seen = new Set();
            const unique = [];

            servicesData.items.forEach((item) => {
                const title = item.title?.trim();
                if (title && !seen.has(title)) {
                    seen.add(title);
                    unique.push({
                        key: item.id,
                        value: title,
                    });
                }
            });

            data = [...data, ...unique];

            return data;
        },
        enabled: type === 'xizmatlar',
        retry: 1,
    });

    const {
        data: specialistsData,
        isSuccess: specialistsSuccess,
        isFetching: specialistsLoading,
    } = useQuery({
        queryKey: ['specialistsData', debouncedSearch, type],
        queryFn: async () => {
            const { data: freelanceData } = await axios.get(
                `customer/search-page?search=${debouncedSearch}`
            );
            const { data: sellersRes } = await axios.get(
                `/users/sellers?limit=10&search=${debouncedSearch}`
            );

            let data = [];

            let freelanceOptions = searchOptions(freelanceData?.position) || [];

            data = freelanceOptions.map((item, index) => ({
                key: `freelance-${index}`,
                value: item,
                sourceType: 'specialist',
                subtitle: 'Soha boʻyicha qidiruv'
            }));

            data = [
                ...data,
                ...sellersRes.results.map((item) => ({
                    key: item.id || item.soff_seller_id,
                    value: item.full_name || `${item.first_name || ''} ${item.last_name || ''}`.trim(),
                    avatar: item.photo_url,
                    subtitle: item.position?.title || 'Mutaxassis',
                    sourceType: 'specialist',
                    id: item.soff_seller_id
                })),
            ];

            return data;
        },
        enabled: type === 'mutaxassislar',
        retry: 1,
    });

    const handleClickOption = async (optionValue) => {
        if (!optionValue?.trim()) return;

        try {
            // Navigation is the slow part users click on; without this the
            // search button gave no feedback at all until the page changed.
            setIsNavigating(true);
            setSearch(optionValue);
            await router.push(
                `/search-page/?keyword=${encodeURIComponent(optionValue)}&tab=${type === 'mahsulotlar' ? 1 : type === 'xizmatlar' ? 2 : 3
                }&type=${type === 'mahsulotlar' ? 'file' : 'all'}`
            );
            addSearchHistoryItem({ value: optionValue, type });
        } catch (error) {
            console.error('Error navigating to search page:', error);
        } finally {
            setIsNavigating(false);
        }
    };

    const handleNavigateOption = async (optionValue, optionData) => {
        try {
            setIsNavigating(true);
            setSearch(optionValue);

            if (type === 'mahsulotlar') {
                await router.push(
                    `/search-page/?keyword=${optionValue}&tab=1&type=file`
                );
            } else if (type === 'xizmatlar') {
                await router.push(
                    `/search-page/?keyword=${optionValue}&tab=2&type=all`
                );
            } else if (type === 'mutaxassislar') {
                if (optionData?.id) {
                    await router.push(`/seller/${optionData.id}`);
                } else {
                    await router.push(
                        `/search-page/?keyword=${optionValue}&tab=3&type=all`
                    );
                }
            }
            addSearchHistoryItem({ value: optionValue, type });
        } catch (error) {
            console.error('Error navigating to search page:', error);
        } finally {
            setIsNavigating(false);
        }
    };

    const handleSearch = async () => await handleClickOption(search);

    const options = useMemo(() => {
        if (type === 'mahsulotlar') {
            // isDebouncing too, otherwise the static list flashes for 500ms
            // after every keystroke while the query is still disabled.
            if (productsLoading || isDebouncing) return [];
            if (isSuccess && data?.results) {
                // Deduplicate by title, keeping first occurrence.
                // An empty array is returned as-is so the dropdown can show
                // "Hech narsa topilmadi". Substituting the static category
                // list here made a failed search look like a successful one.
                const seen = new Set();
                const unique = [];
                data.results.forEach((item) => {
                    const title = item.title?.trim();
                    if (title && !seen.has(title)) {
                        seen.add(title);
                        unique.push({
                            key: item.id,
                            value: title,
                        });
                    }
                });
                return unique;
            }
            // Only before anything has been searched for.
            return staticOptions[type] || [];
        } else if (type === 'xizmatlar') {
            if (servicesLoading) return [];
            if (servicesSuccess && servicesData.length) return servicesData;
            return staticOptions[type] || [];
        } else if (type === 'mutaxassislar') {
            if (specialistsLoading) return [];
            if (specialistsSuccess && specialistsData.length)
                return specialistsData;
            return [];
        }
        return [];
    }, [
        type,
        productsLoading,
        isSuccess,
        data,
        servicesLoading,
        servicesSuccess,
        servicesData,
        specialistsLoading,
        specialistsSuccess,
        specialistsData,
    ]);

    return {
        search,
        setSearch,
        type,
        setType,
        debouncedSearch,
        isNavigating,
        setIsNavigating,
        isLoading:
            isDebouncing ||
            productsLoading ||
            servicesLoading ||
            specialistsLoading,
        handleSearch,
        handleClickOption,
        handleNavigateOption,
        options,
    };
}

export default useSearch;
