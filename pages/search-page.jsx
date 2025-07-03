import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import Head from 'next/head';
import Search_Results_Products from '~/components/elements/search-page-details/products';
import { baseUrlUseApi } from '~/repositories/useApi';
import useDebounce from '~/hooks/useDebounce';

const Search_Results = ({ fourChildData, childCategoryData }) => {
    const inputEl = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const router = useRouter();
    const { page = 1, keyword = '', type = 'all', category = '' } = router.query;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data with fetch instead of useApi
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `${baseUrlUseApi}customer/same-google-search/?page=${page}&search=${keyword}&type=${type}&category=${category}`
                );
                if (!res.ok) throw new Error('Server error');
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [page, keyword, type, category]);

    // Debounced search
    useEffect(() => {
        if (
            debouncedSearchTerm &&
            debouncedSearchTerm.length >= 1 &&
            debouncedSearchTerm !== keyword
        ) {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    keyword: debouncedSearchTerm,
                    page: 1,
                    type: 'all',
                    tab: 'all',
                    category: '',
                    parentCategory: ''
                },
            });
        }
    }, [debouncedSearchTerm, router.query]);

    let clearTextView = !isLoading && (
        <span className='ps-form__action'>
            {searchTerm ? (
                <p
                    className='ps-form__action_search_btn m-auto cursor-pointer'
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                        setSearchTerm('');
                        inputEl.current.value = '';
                    }}
                >
                    <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'>
                        <path
                            fill='#7B7B7B'
                            d='M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 0 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z'
                        />
                    </svg>
                </p>
            ) : (
                <p className='ps-form__action_search_btn m-auto'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' viewBox='0 0 12 13' fill='none'>
                        <path d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z' fill='#7B7B7B' />
                    </svg>
                </p>
            )}
        </span>
    );

    let loadingView = isLoading && (
        <span className='ps-form__action'>
            <Spin size='small' />
        </span>
    );

    return (
        <div className='global_search_results'>
            <Head>
                <title>Soff.uz - Qidiruv natijalar</title>
                <meta name='robots' content='index, follow' />
                <meta
                    name='description'
                    content="Soff.uz qidiruv tizimi orqali o'zingizga kerakli bo'lgan istalgan turdagi intellektual mulklaringizni toping"
                />
            </Head>
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 width_full_screen'>
                        <Link href='/'>
                            <a className='ps-logo'>
                                <NextImageCard
                                    url='/static/img/soff/logo-dark.png'
                                    className='logoo'
                                    width='120px'
                                    height='50px'
                                />
                            </a>
                        </Link>
                        <div className='ps-form--quick-search'>
                            <div className={keyword === '' ? 'ps-form__input' : 'ps-form__input active_search_input'}>
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className={
                                        keyword === ''
                                            ? 'form-control input2'
                                            : 'input1 form-control active_search_input'
                                    }
                                    type='text'
                                    defaultValue={keyword}
                                    placeholder='Izlayotgan mahsulotingizni toping...'
                                    onInput={e => {
                                        const value = e.target.value.trim();
                                        setSearchTerm(value);
                                    }}
                                />
                                {clearTextView}
                                {loadingView}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className=''>
                <div className='container'>
                    <Search_Results_Products
                        childData={fourChildData}
                        parentData={childCategoryData}
                        data={data?.results}
                        page={page}
                        total={data?.count}
                        isLoading={isLoading}
                    />
                    {error && <p className='text-danger text-center mt-4'>Xatolik: {error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Search_Results;




export async function getServerSideProps(context) {
    const {
        parentCategory = '',
        type = 'all',
    } = context.query;

    const fetchJson = async url => {
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    };

    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [fourChildData, childCategoryData] = await Promise.all([
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    return {
        props: {
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
        },
    };
}



// new features


// tabs

    // const { asPath } = useRouter();

    // const activeIndex = router.query.tab
    // const notFound = () => {
    //     if(!data || data?.results.length == 0){
    //         return <Search_Results_NotFound />
    //     }
    //     return  <SearchAllProducts data={data?.results} isLoading={isLoading} />
    // }
    
    

    // const sellerTabItems = {
    //     all:   notFound(),
    //     specialists: (
    //         <Search_Results_Specialists
    //             data={data?.results}
    //             isLoading={isLoading}
    //         />
    //     ),

    //     products: (
    //         <Search_Results_Products
    //             childData={fourChildData}
    //             parentData={childCategoryData}
    //             data={data?.results}
    //             page={page}
    //             total={data?.count}
    //             isLoading={isLoading}
    //         />
    //     ),
    //     services: (
    //         <Search_Results_Services
    //             vices
    //             data={data?.results}
    //             isLoading={isLoading}
    //         />
    //     ),
    //     notFound: <Search_Results_NotFound />,
    // };



    // const menuItems = [
    //     {
    //         title: 'Barchasi',
    //         path: 'all',
    //     },
    //     {
    //         title: 'Mahsulotlar',
    //         path: 'products',
    //     },
    //     {
    //         title: 'Mutaxasislar',
    //         path: 'specialists',
    //     },
    //     {
    //         title: 'Xizmatlar',
    //         path: 'services',
    //     },
    //     {
    //         title: "Don't found",
    //         path: 'notFound',
    //     },
    // ];
                    {/* <div className='Search_Results'>
                    <div className='Search_Results_container container'>
                        <ul className='Search_ResultsMenu'>
                            {menuItems.map((item, index) => (
                                <Link
                                    href={  
                                            {
                                                pathname: router.pathname,
                                                query: {...router.query, tab: item.path}
                                            }
                                        }
                                        key={index}
                                >
                                    <li 
                                        className={`activeTab ${
                                            activeIndex === item.path
                                                ? 'active_type'
                                                : ''
                                        }`}>
                                        {item.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div> */}

// featured components
// import Search_Results_Specialists from '~/components/elements/search-page-details/specialists';
// import Search_Results_Services from '~/components/elements/search-page-details/services';
// import Search_Results_NotFound from '~/components/elements/search-page-details/notFound';
// import SearchAllProducts from '~/components/elements/search-page-details/searchAllProducts';