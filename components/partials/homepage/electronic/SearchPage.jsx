import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { Spin } from 'antd';
import useDebounce from '~/hooks/useDebounce';

const SearchPage = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    
    function handleClearKeyword() {
        setKeyword('');
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword && keyword.trim()) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }



    useEffect(() => {
        if (keyword && keyword.trim()) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }, [debouncedSearchTerm]);




    let clearTextView, loadingView;
    if (!loading) {
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
        if (keyword === '' || keyword === undefined) {
            clearTextView = (
                <span className="ps-form__action">
                    <i className="fa-solid fa-search button_search_icon text-success"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }


    return (
        <div className='image_background'>
            <div className="search_home_pages">
                <div className="container">
                    <div className="search_home_box">
                        <h1>
                            {' '}
                            <span
                                className="span_saecrh "
                                style={{ color: '#333' }}>
                                Soff.uz -{' '}
                            </span>
                            <span className="span_saecrh ">qidiruv tizimi</span>
                        </h1>
                        <h1>
                            {' '}
                            O‘zbek tilida saralanib borilayotgan sifatli ma’lumotlar jamlanmasini, fayllar, tasvirlar, videolar, audiolar ko‘rinishida qidirib topish imkonini beradi.
                        </h1>
                        <form
                            className="ps-form--quick-search mobile-none"
                            method="get"
                            action="/"
                            onSubmit={handleSubmit}>
                            <div className={'ps-form__input'}>
                                <input
                                    ref={inputEl}
                                    className={'form-control input2'}
                                    type="text"
                                    value={keyword}
                                    placeholder="Qidiruv..."
                                    onInput={(e) => setKeyword(e.target.value)}
                                />
                                {clearTextView}
                                {loadingView}
                            </div>
                            <button className={'button_search shadow'}>
                                Qidiruv
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
