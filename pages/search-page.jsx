import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Spin } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import ProductSearchGoogle from '~/components/elements/products/ProductSearchGoogle';
import useDebounce from '~/hooks/useDebounce';
import Head from 'next/head';
import AISoffiaPresentation, { AISoffiaPresentationNotFoundProduct } from '~/components/elements/AISoffiaPresentation';

const Products_Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeSelect, setTypeSelect] = useState('all');
    const [pageCountPlay, setPageCountPlay] = useState(0);
    const [currPagePlay, setCurrPagePlay] = useState(1);
    const { query, push } = useRouter();

    // Debounce qilingan qidiruv so'zi
    const debouncedSearchTerm = useDebounce(keyword, 1500);

    // Qidiruv natijalarini olish
    const fetchResults = async () => {
        if (!keyword.trim()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const result = await PostRepository.postSearchFilterNews(currPagePlay, keyword, typeSelect);
            setResultItems(result?.results || []);
            setPageCountPlay(result?.count || 0);
        } catch (error) {
            console.error('Qidiruvda xatolik:', error);
        } finally {
            setLoading(false);
        }
    };

    // Faqat sahifa yoki type o‘zgarsa so‘rov yuborish
    useEffect(() => {
        if (query.keyword) setKeyword(query.keyword);
        if (query.type) setTypeSelect(query.type);
        setLoading(true);
    }, [query]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchResults();
        }
    }, [debouncedSearchTerm, currPagePlay, typeSelect]);

    const itemsType = [
        { id: 1, name: "Barchasi", icon: "fa-solid fa-search", value: "all" },
        { id: 2, name: "Hujjatlar", icon: "fa-solid fa-file", value: "file" },
        { id: 3, name: "Videolar", icon: "fa-solid fa-video", value: "video" },
        { id: 4, name: "Audiolar", icon: "fa-solid fa-music", value: "audio" },
        { id: 5, name: "Shablonlar", icon: "fa-solid fa-file-lines", value: "template" },
        { id: 6, name: "Playlistlar", icon: "fa-solid fa-play", value: "playlist" }
    ];

    return (
        <div className='global_search_results'>
            <Head>
                <title>Soff.uz - Qidiruv natijalar</title>
                <meta name="robots" content="index, follow" />
                <meta name="description" content="Soff.uz qidiruv tizimi orqali o'zingizga kerakli bo'lgan istalgan turdagi intellektual mulklaringizni toping" />
            </Head>
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 width_full_screen'>
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/logo-dark.png"
                                    className="logoo"
                                    width="120px"
                                    height="50px"
                                />
                            </a>
                        </Link>
                        <div className="ps-form--quick-search">
                            <div className="ps-form__input">
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className="form-control"
                                    type="text"
                                    value={keyword}
                                    placeholder="Qidiruv..."
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className='global_navbar_bottom'>
                <div className="container ">
                    <div className='navbar-container'>
                        <ul className='d-flex align-items-end p-0 gap-5'>
                             {itemsType.map(item => (
                                <li onClick={() => setTypeSelect(item.value)} key={item.id} className={`d-flex align-items-center gap-3 ${typeSelect === item.value && "active_type"}`}>
                                    <i style={{ fontSize: "18px" }} className={item.icon}></i>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="results mt-3">
                <div className="container">
                    {loading ? (
                        <div className='d-flex align-items-center justify-content-center pt-5'>
                            <Spin size="large" />
                        </div>
                    ) : resultItems.length > 0 ? (
                        <>
                            <p style={{ fontWeight: "600", color: "#00a44f" }}>
                                Qidiruv natijasida {pageCountPlay} ta ma'lumot topildi
                            </p>
                            {resultItems.map((product) => (
                                <ProductSearchGoogle product={product} key={product.id} />
                            ))}
                            <Pagination
                                className="mt-3"
                                defaultCurrent={currPagePlay}
                                total={pageCountPlay}
                                onChange={(page) => setCurrPagePlay(page)}
                            />
                        </>
                    ) : (
                        <AISoffiaPresentationNotFoundProduct/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products_Search_Results;
