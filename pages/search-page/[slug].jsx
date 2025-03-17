import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Spin } from 'antd';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import Head from 'next/head';
import Search_Results_Products from '~/components/elements/search-page-details/products';
import Search_Results_Specialists from '~/components/elements/search-page-details/specialists';
import Search_Results_Services from '~/components/elements/search-page-details/services';
import Search_Results_NotFound from '~/components/elements/search-page-details/notFound';

const Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true); // Initially true\

    // Views
    let clearTextView, loadingView;
    if (!loading) {
        clearTextView = (
            <span className='ps-form__action'>
                <p className='ps-form__action_search_btn'>izlash</p>
            </span>
        );
    } else {
        loadingView = (
            <span className='ps-form__action'>
                <Spin size='small' />
            </span>
        );
    }

    const { asPath } = useRouter();
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const sellerTabItems = {
        all: (
            <>
                <Search_Results_Specialists />
                <Search_Results_Services />
                <Search_Results_Products />
            </>
        ),
        specialists: <Search_Results_Specialists />,
        services: <Search_Results_Services />,
        products: <Search_Results_Products />,
        notFound: <Search_Results_NotFound />,
    };

    const menuItems = [
        {
            title: 'Barchasi',
            path: 'all',
        },
        {
            title: 'Mahsulotlar',
            path: 'products',
        },
        {
            title: 'Mutaxasislar',
            path: 'specialists',
        },
        {
            title: 'Xizmatlar',
            path: 'services',
        },
        // {
        //     title: "Don't found",
        //     path: 'notFound',
        // },
    ];

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
                        <form
                            className='ps-form--quick-search'
                            method='get'
                            action='/'
                            // onSubmit={handleSubmit}
                        >
                            <div
                                className={
                                    keyword === ''
                                        ? 'ps-form__input'
                                        : 'ps-form__input active_search_input'
                                }>
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
                                        setKeyword(value);
                                    }}
                                />
                                {clearTextView}
                                {loadingView}
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

            <div className=''>
                <div className='Search_Results'>
                    <div className='Search_Results_container container'>
                        <ul className='Search_ResultsMenu'>
                            {menuItems.map((item, index) => (
                                <Link href={`#${item.path}`} key={index}>
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
                </div>
                <div className='container'>{sellerTabItems[activeIndex]}</div>
            </div>
        </div>
    );
};

export default Search_Results;
