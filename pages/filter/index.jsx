import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import PostRepository from '~/repositories/PostRepository';
import Meta from '~/components/shared/headers/Meta';

const SearchPage = () => {

    const [keyword, setKeyword] = useState('');
    const Router = useRouter();
    const { query } = Router;
    const [resultdata, setresultData] = useState([]);

    async function getSearchData() {
        const responseData = await PostRepository.postSearchFilter(query.keyword);
        if (responseData) {
            setresultData(responseData?.results);
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
    }, [query.keyword, query]);


    const breadcrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Filter natijalari',
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
                    <div className="mt-5">
                        <h3 >
                            <i style={{borderBottom:"2px solid black"}} >{keyword}</i> {keyword === '' ? "Qidirish uchun qiymat kiring" : "Bo'yicha qidiruv natijalari"}
                        </h3>
                    </div>
                    <div className="ps-section__content">
                        <div className="d-flex align-content-center row">
                            {
                                resultdata?.map((item, index) => (
                                    <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                        <Product product={item} />{' '}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
