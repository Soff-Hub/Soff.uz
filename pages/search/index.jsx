import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import PostRepository from '~/repositories/PostRepository';
import Meta from '~/components/shared/headers/Meta';
import Link from "next/link";

const SearchPage = () => {

    const [keyword, setKeyword] = useState('');
    const Router = useRouter();
    const { query } = Router;
    const [resultdata, setresultData] = useState([]);

    async function getSearchData() {
        const responseData = await PostRepository.postSearchFilter(query?.keyword,query?.type);
        if (responseData) {
            setresultData(responseData);
        }
    }



    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);
        } else {
            setKeyword('');
        }
    }


    useEffect(() => {
        getSearchData();
        handleSetKeyword();
    }, [query?.keyword, query?.type]);


    const breadcrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Qidiruv natijalari',
        },
    ];


    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <Meta
                    title={"Soff | Qidiruv natijalar"}
                />
                <BreadCrumb breacrumb={breadcrumb} />
            </div>

            <div className="ps-product-list">
                <div className="container">

                    <div className="mt-5 mb-5">
                        <h3 >
                            <i style={{ borderBottom: "2px solid black" }} >{keyword}</i> {keyword === '' ? "Qidirish uchun qiymat kiring" : "Bo'yicha qidiruv natijalari"}
                        </h3>
                    </div>

                    <>
                        {
                            resultdata?.file?.length > 0 &&
                            <>
                                <div className="ps-section__header">
                                    <h3 className='titleeeeeeee'>File</h3>
                                    <ul className="ps-section__links">
                                        <li>{keyword &&
                                            <Link href={`/filter?keyword=${keyword}&type=file`}>
                                                <a className='d-flex align-items-center gap-2'>
                                                    <span>Barchasini ko'rish</span>
                                                    <i className='fa-solid fa-angles-right fa-beat-fade'></i>
                                                </a>
                                            </Link>
                                        }
                                        </li>
                                    </ul>
                                </div>

                                <div className="ps-section__content">
                                    <div className="d-flex align-content-center row">
                                        {
                                            resultdata?.file?.slice(0, 6)?.map((item, index) => (
                                                <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                                    <Product product={item} />{' '}
                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </>
                        }
                    </>
                    <>
                        {
                            resultdata?.audio?.length > 0 &&
                            <>
                                <div className="ps-section__header">
                                    <h3 className='titleeeeeeee'>Audio</h3>
                                    <ul className="ps-section__links">
                                        <li>{keyword &&
                                            <Link href={`/filter?keyword=${keyword}&type=audio`}>
                                                <a className='d-flex align-items-center gap-2'>
                                                    <span>Barchasini ko'rish</span>
                                                    <i className='fa-solid fa-angles-right fa-beat-fade'></i>
                                                </a>
                                            </Link>
                                        }
                                        </li>
                                    </ul>
                                </div>

                                <div className="ps-section__content">
                                    <div className="d-flex align-content-center row">
                                        {
                                            resultdata?.audio?.slice(0, 6)?.map((item, index) => (
                                                <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                                    <Product product={item} />{' '}
                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </>
                        }
                    </>
                    <>
                        {
                            resultdata?.template?.length > 0 &&
                            <>
                                <div className="ps-section__header">
                                    <h3 className='titleeeeeeee'>Shablon</h3>
                                    <ul className="ps-section__links">
                                        <li>{keyword &&
                                            <Link href={`/filter?keyword=${keyword}&type=template`}>
                                                <a className='d-flex align-items-center gap-2'>
                                                    <span>Barchasini ko'rish</span>
                                                    <i className='fa-solid fa-angles-right fa-beat-fade'></i>
                                                </a>
                                            </Link>
                                        }
                                        </li>
                                    </ul>
                                </div>

                                <div className="ps-section__content">
                                    <div className="d-flex align-content-center row">
                                        {
                                            resultdata?.template?.slice(0, 6)?.map((item, index) => (
                                                <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                                    <Product product={item} />{' '}
                                                </div>
                                            ))}
                                    </div>

                                </div>
                            </>
                        }
                    </>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
