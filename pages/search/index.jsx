import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import useGetProducts from '~/hooks/useGetProducts';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';

const SearchPage = () => {
    const [pageSize] = useState(100);
    const [keyword, setKeyword] = useState('');
    const { productItems, loading, getProducts } = useGetProducts();
    const Router = useRouter();
    const { query } = Router;

    const [data, setData] = useState([]);
    const [resultdata, setresultData] = useState([]);

    async function getSearchData() {
        const responseData = await ProductRepository.getRecordsSearch();
        if (responseData) {
            console.log(responseData);
            setData(responseData);
        }
    }


    // document.addEventListener("keydown", function(event) {
    //     if(event.key === "Enter" && query != ''){
    //         getSearchData()
    //     }
    //   })
      


    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);

            console.log(query.keyword);
        } else {
            setKeyword('');
        }
    }

    useEffect(() => {
        getSearchData();
        let result = data.filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
        });
        setresultData(result);
        // console.log('//??', result);
        if (query && query.keyword) {
            handleSetKeyword(query.keyword);
            const queries = {
                _limit: pageSize,
                title_contains: query.keyword,
            };
            getProducts(queries);
        }
    }, [query]);

    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {

            text: 'Qidiruv natijalari',
        },
    ];
    // console.log(resultdata);
    let shopItemsView, statusView;
    if (loading) {
        if (resultdata) {
            shopItemsView = (
                <ProductGroupGridItems
                    data={resultdata}
                    columns={6}
                    pageSize={pageSize}
                />
            );
            if (resultdata) {
                const items = resultdata.map((item) => {
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

                            {resultdata.length}
                        </strong>{' '}
                        yozuv(lar) topildi.
                    </p>
                );
            } else {
                shopItemsView = <p>Hujjat(lar) topilmadi.</p>;
            }
        } else {
            shopItemsView = <p>Hujjat(lar) topilmadi.</p>;
        }
    } else {
        statusView = <p>Qidiruv...</p>;
    }

    return (
        <PageContainer title={`Search results for: "${keyword}" `}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>

                                Qidiruv uchun: "<strong>{keyword}</strong>"
                            </h1>
                        </div>
                        <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Newsletters layout="container" /> */}
        </PageContainer>
    );
};

export default SearchPage;
