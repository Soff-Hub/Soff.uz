import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Spin } from 'antd';

import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import PostRepository from '~/repositories/PostRepository';


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search?keyword=${keyword}`);
        }
    }
    useEffect(() => {
        // getSearchData();
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    _limit: 5,
                    title_contains: keyword,
                };

                const products = PostRepository.postSearchFilter(keyword);

                products.then((result) => {
                    setLoading(false);
                    setIsSearch(true);
                    setResultItems(result?.results);
                });
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm, keyword]);

    // Views
    let productItemsView,
        clearTextView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href={`/search?keyword=${keyword}`}>
                            <a>Hamma natijalarni ko'rish</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>Mahsulot topilmadi</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
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
        <form
            className="ps-form--quick-search"
            method="get"
            action="/main"
            onSubmit={handleSubmit}>
  
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="Izlash"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>

            <button onClick={handleSubmit}>Qidiruv</button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
