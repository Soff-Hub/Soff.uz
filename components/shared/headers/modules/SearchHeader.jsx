import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { Select, Spin } from 'antd';

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

const SearchHeader = ({ setSearch }) => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    const [selectFile, setSelectFile] = useState('')

    function handleClearKeyword() {
        setKeyword('');
        setSearch('')
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search?keyword=${keyword}&type=${selectFile}`);
        }
    }

console.log(keyword);

    useEffect(() => {
        // getSearchData();
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword || selectFile) {
                const products = PostRepository.postSearchFilter(keyword, selectFile);

                products.then((result) => {
                    setLoading(false);
                    setIsSearch(true);
                    setResultItems(result);
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
    }, [debouncedSearchTerm, selectFile]);

    // Views
    let productItemsView,
        clearTextView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (!resultItems || (resultItems?.file?.length === 0 && resultItems?.audio?.length === 0 && resultItems?.template?.length === 0)) {
            productItemsView = <p>Mahsulot topilmadi</p>;
        }
        else {
            resultItems?.file?.length > 0 || resultItems?.audio?.length > 0 || resultItems?.template?.length > 0 ? productItemsView = [...resultItems?.file || [], ...resultItems?.audio || [], ...resultItems?.template || []].map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            )) : productItemsView = <p>Mahsulot topilmadi</p>
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
            action="/"
            onSubmit={handleSubmit} 
        >

            <Select
                defaultValue={[selectFile]}
                placeholder="Barchasi"
                className='searchFilterSelect'
                onChange={(e) => setSelectFile(e)}

                style={{
                    flex: 1,
                    minWidth: "100px",
                    height: "42px",

                }}
                options={[
                    {
                        value: '',
                        label: 'Barchasi',
                    },
                    {
                        value: 'file',
                        label: 'File',
                    },
                    {
                        value: 'audio',
                        label: 'Audio',
                    },
                    {
                        value: 'template',
                        label: 'Shablon',
                    },
                ]}
            />


            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="Qidiruv..."
                    onChange={(e) => (setKeyword(e.target.value), setSearch(e.target.value))}
                />
                {clearTextView}
                {loadingView}
            </div>

            <button className='button_search' >Qidiruv</button>

            <div
                className={`ps-panel--search-result${isSearch ? ' active ' : ''
                    }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
