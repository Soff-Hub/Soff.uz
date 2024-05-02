import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import PageContainer from '~/components/layouts/PageContainer';
import { useRouter } from 'next/router';
import PostRepository from '~/repositories/PostRepository';
import Meta from '~/components/shared/headers/Meta';
import ProductVideo from '~/components/elements/products/ProductVideo';

const FilterPages = () => {

    const [keyword, setKeyword] = useState('');
    const Router = useRouter();
    const { query } = Router;
    const [resultdata, setresultData] = useState([]);

    async function getSearchData() {
        const responseData = await PostRepository.postSearchFilter(query.keyword, query?.type);
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
    }, [query.keyword, query?.type]);


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
                    title={"Qidiruv natijalar"}
                />
                <BreadCrumb breacrumb={breadcrumb} />
            </div>

            <div className="ps-product-list">
                <div className="container">


                    <div className="ps-section__content">
                        <div className="d-flex align-content-center row">
                            {resultdata?.file?.length > 0 &&
                                resultdata?.file?.map((item, index) => (
                                    <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                        <Product product={item} />{' '}
                                    </div>
                                ))}

                            {resultdata?.audio?.length > 0 &&
                                resultdata?.audio?.map((item, index) => (
                                    <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                        <Product product={item} />{' '}
                                    </div>
                                ))}
                            {resultdata?.template?.length > 0 &&
                                resultdata?.template?.map((item, index) => (
                                    <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                        <Product product={item} />{' '}
                                    </div>
                                ))}
                            {resultdata?.vedio?.length > 0 &&
                                resultdata?.vedio?.map((item, index) => (
                                    <div key={index} className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6">
                                        <ProductVideo product={item} />{' '}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default FilterPages;
