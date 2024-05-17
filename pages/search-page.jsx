import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Spin } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import ProductSearchGoogle from '~/components/elements/products/ProductSearchGoogle';

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

const Products_Search_Results = () => {

    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeSelect, setTypeSelect] = useState('all');
    const debouncedSearchTerm = useDebounce(keyword, 1000);
    const { query } = useRouter()


    function handleSubmit(e) {
        e.preventDefault();
        if (keyword) {
            Router.push(`/search-page?keyword=${keyword}`);
        }
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword || typeSelect) {
                const products = PostRepository.postSearchFilterNews(keyword, typeSelect);
                products.then((result) => {
                    setLoading(false);
                    setResultItems(result);
                });
            } else {
                setKeyword('');
            }
        } else {
            setLoading(false);
        }
    }, [debouncedSearchTerm, keyword, typeSelect]);

    useEffect(() => (
        setKeyword(query.keyword)
    ), [query?.keyword])

    // useEffect(() => {
    //     if (inputEl?.current && keyword !== '') {
    //         inputEl?.current?.value = keyword;
    //         inputEl?.current?.selectionStart = inputEl?.current?.selectionEnd = keyword?.length;
    //     }
    // }, [keyword]);



    // Views
    let clearTextView,
        loadingView
    if (!loading) {

        clearTextView = <span className="ps-form__action">
            <i className='fa-solid fa-search button_search_icon text-success' ></i>
        </span>
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    const itemsType = [
        {
            id: 1,
            name: "Barchasi",
            icon: "fa-solid fa-search",
            value: "all"
        },
        {
            id: 2,
            name: "Hujjatlar",
            icon: "fa-solid fa-file",
            value: "file"
        },
        {
            id: 3,
            name: "Videolar",
            icon: "fa-solid fa-video",
            value: "video"
        },
        {
            id: 4,
            name: "Audiolar",
            icon: "fa-solid fa-music",
            value: "audio"
        },
        {
            id: 5,
            name: "Shablonlar",
            icon: "fa-solid fa-file-lines",
            value: "template"
        },
    ]


    return (
        <div className='global_search_results'>
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 width_full_screen'>
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/logo-dark.png"
                                    clasS="logoo"
                                    width="150px"
                                    height="50px"
                                />
                            </a>
                        </Link>
                        <form
                            className="ps-form--quick-search"
                            method="get"
                            action="/"
                            onSubmit={handleSubmit}
                        >
                            <div className={keyword === '' ? "ps-form__input" : "ps-form__input active_search_input"}>
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className={keyword === '' ? "form-control input2" : "input1 form-control active_search_input"}
                                    type="text"
                                    defaultValue={keyword}
                                    placeholder="Qidiruv..."
                                    onInput={(e) => {
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
                <div className="container ">
                    <div className='navbar-container'>
                        <ul className='d-flex align-items-end p-0 gap-5'>
                            {
                                itemsType?.map(item => (
                                    <li onClick={() => setTypeSelect(item?.value)} key={item.id} className={`d-flex align-items-center gap-3 ${typeSelect === item.value && "active_type"}`}>
                                        <i style={{ fontSize: "18px" }} className={item.icon}></i>
                                        {item.name}
                                    </li>

                                ))
                            }
                        </ul>

                    </div>
                </div>
            </nav>
            <div className="results mt-3">
                <div className="container">
                    {(resultItems?.results?.length > 1) ?

                       (loading ?
                            <div className='d-flex align-items-center justify-content-center pt-5'>
                                <span className="ps-form__action">
                                    <Spin size="large" />
                                </span>
                            </div>
                            :
                            <>
                                <p style={{ fontWeight: "600", color: "#00a44f" }} >Qidiruv natijasida topilgan ma'lumotlar soni  {resultItems?.count} ta</p>
                                {resultItems?.results?.map((product) => (
                                    <ProductSearchGoogle product={product} key={product.id} />
                                ))}
                            </>)

                        :
                        (<div className='d-flex align-items-center justify-content-center pt-5'>
                            <p> Mahsulot topilmadi </p>
                        </div>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Products_Search_Results
