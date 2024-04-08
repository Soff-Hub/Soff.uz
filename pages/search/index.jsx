import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import PageContainer from '~/components/layouts/PageContainer';
import useGetProducts from '~/hooks/useGetProducts';
import { useRouter } from 'next/router';
import PostRepository from '~/repositories/PostRepository';
import Meta from '~/components/shared/headers/Meta';

const SearchPage = () => {
    const [pageSize] = useState(100);
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
            text: 'Qidiruv natijalari',
        },
    ];
    let shopItemsView, statusView;
    if (true) {
        if (resultdata) {
            shopItemsView = (
                <ProductGroupGridItems
                    data={resultdata}
                    columns={6}
                    pageSize={pageSize}
                />
            );
            if (resultdata) {
                const items = resultdata?.map((item) => {
                    return (
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                        </div>
                    );
                });
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {resultdata?.length}
                        </strong> ta
                        mahsulot(lar) topildi.
                    </p>
                );
            } else {
                shopItemsView = <p>Mahsulot(lar) topilmadi.</p>;
            }
        } else {
            shopItemsView = <p>Mahsulot(lar) topilmadi.</p>;
        }
    } else {
        statusView = <p>Qidiruv...</p>;
    }

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <Meta
                    title={"Soff | Qidiruv natijalar"}
                />
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>
                                <i>{keyword}</i> {keyword === '' ? "Qidirish uchun qiymat kiring" : "Bo'yicha qidiruv natijalari"}
                            </h1>
                        </div>
                        <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SearchPage;
