import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { Select, Spin } from 'antd';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import PostRepository from '~/repositories/PostRepository';
import useDebounce from '~/hooks/useDebounce';
const Option = Select.Option;


const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    const [selectFile, setSelectFile] = useState('all')


    function handleSubmit(e) {
        e.preventDefault();
        if (keyword && keyword.trim()) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }


    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword || selectFile) {
                const products = PostRepository.postSearchFilterNews(keyword, selectFile);

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
    }, [debouncedSearchTerm, selectFile]);

    // Views
    let clearTextView,
        loadingView;
    if (!loading) {
        clearTextView = <span className="ps-form__action" >
            <i className='fa-solid fa-search button_search_icon text-success' ></i>
        </span>;
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
                onChange={(e) => setSelectFile(e)}
                defaultValue={selectFile}
                style={{
                    height: "42px",
                    flex: 1,
                }}
                className='searchFilterSelect'
            >
                <Option key={'all'}><i className="fa-solid fa-list mr-2"></i> Barchasi</Option>
                <Option key={"file"}><i className='text-success fa-solid fa-file mr-2 '></i> Fayl</Option>
                <Option key={"audio"}> <i className='mr-2 fa-solid fa-music text-success'></i>
                    Audio</Option>
                <Option key={"template"}><i className='fa-solid text-success fa-file-lines mr-2'></i> Shablon</Option>
                <Option key={"video"}><i className='fa-solid text-success fa-video mr-2'></i> Video</Option>
                <Option key={"playlist"}><i className='fa-solid text-success fa-video mr-2'></i> Playlist</Option>
            </Select>



            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className={keyword === '' ? "form-control input2" : "input1 form-control "}
                    type="text"
                    value={keyword}
                    placeholder="Qidiruv..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button className={keyword === '' ? 'button_search ' : "d-block button_serach_color"}>Qidiruv</button>
            <div
                className={`ps-panel--search-result${isSearch ? ' active ' : ''
                    }`}>
                <div className="ps-panel__content">
                    {
                        !loading ? (
                            resultItems?.length > 0 ? (
                                <>
                                    <p style={{ fontWeight: "600", color: "#00a44f" }}>
                                        Qidiruv natijasida topilgan ma'lumotlar soni {resultItems.count} ta
                                    </p>
                                    {resultItems?.map((product) => (
                                        <ProductSearchResult product={product} key={product.id} />
                                    ))}
                                </>
                            ) : (
                                <div className='d-flex align-items-center justify-content-center pt-5'>
                                    <p>Ma'lumot topilmadi</p>
                                </div>
                            )
                        ) : (
                            <div className='d-flex align-items-center justify-content-center pt-5'>
                                <span className="ps-form__action">
                                    <Spin size="large" />
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>

        </form>

    );
};

export default SearchHeader;
