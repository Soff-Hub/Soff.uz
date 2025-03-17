import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Pagination, Spin } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import ProductSearchGoogle from '~/components/elements/products/ProductSearchGoogle';
import useDebounce from '~/hooks/useDebounce';
import Head from 'next/head';

const Products_Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState([]);
    const [loading, setLoading] = useState(true); // Initially true
    const [typeSelect, setTypeSelect] = useState('all');
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    const [pageCountPlay, setPageCountPlay] = useState(0);
    const [currPagePlay, setCurrPagePlay] = useState(1);
    const { query } = useRouter();

    function handleSubmit (e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true); // Set loading true when making a new request
            if (keyword || typeSelect) {
                const products = PostRepository.postSearchFilterNews(
                    currPagePlay,
                    debouncedSearchTerm,
                    typeSelect
                );
                products
                    .then(result => {
                        setResultItems(result);
                        setPageCountPlay(result?.count);
                        setLoading(false); // Set loading false after data is fetched
                    })
                    .catch(() => {
                        setLoading(false); // In case of error, stop loading
                    });
            } else {
                setKeyword('');
                setLoading(false); // Stop loading if no keyword
            }
        }
    }, [currPagePlay, debouncedSearchTerm, keyword, typeSelect]);

    useEffect(() => {
        if (query.keyword) {
            setKeyword(query.keyword);
            setLoading(true); // Set loading true when keyword is set from query
        }
        if (query.type) {
            setTypeSelect(query.type);
            setLoading(true); // Set loading true when keyword is set from query
        }
    }, [query]);

    useEffect(() => {
        if (inputEl?.current && keyword !== '') {
            inputEl.current.setSelectionRange(keyword?.length, keyword?.length);
            inputEl.current.focus();
        }
    }, [keyword, inputEl]);

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

    const itemsType = [
        { id: 1, name: 'Barchasi', value: 'all' },
        {
            id: 2,
            name: 'Mutaxasislar',
            value: 'specialists',
        },
        { id: 3, name: 'Xizmatlar', value: 'services' },
        {
            id: 4,
            name: 'Mahsulotlar',
            value: 'file',
        },
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
                            onSubmit={handleSubmit}>
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

            <nav className='global_navbar_bottom'>
                <div className='container '>
                    <div className='navbar-container p-0'>
                        <ul className='d-flex align-items-end gap-5'>
                            {itemsType.map(item => (
                                <li
                                    onClick={() => setTypeSelect(item?.value)}
                                    key={item.id}
                                    className={`d-flex align-items-center ${
                                        typeSelect === item.value &&
                                        'active_type'
                                    }`}>
                                    <i
                                        style={{ fontSize: '18px' }}
                                        className={item.icon}></i>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='results mt-3'>
                <div className='container'>
                    {!loading ? (
                        resultItems?.results?.length > 0 ? (
                            <>
                                <p
                                    style={{
                                        fontWeight: '600',
                                        color: '#00a44f',
                                    }}>
                                    Qidiruv natijasida topilgan ma'lumotlar soni{' '}
                                    {resultItems.count} ta
                                </p>
                                {resultItems?.results?.map(product => (
                                    <ProductSearchGoogle
                                        product={product}
                                        key={product.id}
                                    />
                                ))}
                                <Pagination
                                    className='mt-3'
                                    defaultCurrent={currPagePlay}
                                    total={pageCountPlay}
                                    onChange={e => setCurrPagePlay(e)}
                                />
                            </>
                        ) : (
                            <div className='d-flex align-items-center justify-content-center pt-5'>
                                <p>Ma'lumot topilmadi</p>
                            </div>
                        )
                    ) : (
                        <div className='d-flex align-items-center justify-content-center pt-5'>
                            <span className='ps-form__action'>
                                <Spin size='large' />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products_Search_Results;
