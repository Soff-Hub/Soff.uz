import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';

const ShopItems = ({ columns = 4, pageSize = 2, data }) => {
    const Router = useRouter();
    // const { page } = Router.query;
    const { query } = Router;
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const [pageSizee, setPageSizee] = useState(4);
    const { productItems, loading, getProducts } = useGetProducts();
    const [pagenationData, setPagenationData] = useState([]);

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    function handlePagination(page, pageSize) {
        // Router.push(`/shop?page=${page}`);
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }


    // let arr = []
    useEffect(() => {
        // getProducts(params);
        // setPagenationData(data?.slice(0, pageSizee));
        handleSetColumns();

        if (data) {
            setPagenationData(data);
        }
    }, [query, data]);

    useEffect(() => {

        console.log('data', pagenationData);
    }, [pagenationData]);

    // const count = [Math.ceil(data?.length / 3)];
    //     function createArray(length, value) {
    //         return Array.from({ length }, () => value);
    //     }

    // const neW = createArray(count, 0)
    // console.log(neW);
    // const handleNext = () => {
    //     setPageSizee((pageSizee) => pageSizee + 3);
    //     setPagenationData(data.slice(0, pageSizee));
    // };
    // const handlePrevious = () => {
    //     setPageSizee((pageSizee) => pageSizee - 3);
    //     setPagenationData(data.slice(0, pageSizee));
    //     console.log(pageSizee);
    // };

    function compareByCreatedAt(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    }
    function compareByCreatedAtLast(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
    }
    
    let arr = data ? [...data] : [];
    function handleSelect(e) {
        if (e.target.value === 'boshi') {
            arr.sort(compareByCreatedAt);
            setPagenationData(arr);
        } else if (e.target.value === 'oxiri') {
            arr.sort(compareByCreatedAtLast);
            setPagenationData(arr);
          
        }
    }

    // Views
    let productItemsView;
    if (data?.length > 0) {
        if (data && data.length > 0) {
            if (listView) {
                const items = pagenationData?.map((item) => (
                    <div className={classes} key={item.id}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = data?.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>Hujjat topilmadi</p>;
        }
    } else {
        const skeletonItems = generateTempArray(8).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{data?.length}</strong>
                    ta hujjat bor
                </p>
                <div className="ps-shopping__actions">
                    <select
                        className="ps-select form-control"
                        data-placeholder="Sort Items"
                        onChange={(e) => handleSelect(e)}>
                        <option value="boshi">
                            Boshidagilar bo'yicha saralash
                        </option>
                        <option value="oxiri">
                            Oxirgi qo'shilganlar bo'yicha saralash
                        </option>
                    </select>
                    <div className="ps-shopping__view">
                        {/* <p>View</p> */}
                        <ul className="ps-tab-list">
                            <li className={listView === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            <li className={listView !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-list4"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            <div className="ps-shopping__footer text-center">
                <div className="ps-pagination">
                    {/* <Pagination
                        total={data?.length - 1}
                        pageSize={pageSize1}
                        responsive={true}
                        showSizeChanger={false}
                        current={page !== undefined ? parseInt(page) : 1}
                        onChange={(e) => handlePagination(e)}
                    /> */}

                    {/* <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li
                                class="page-item"
                                onClick={() => handlePrevious()}>
                                <a
                                    class="page-link"
                                    href="#"
                                    aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                           { 
                            neW.map((t,i) => {
                                return(
                                    <li class="page-item" disabled={true} style={{cursor:'none'}} key={t} >
                                    <a class="page-link" href="#">
                                        {i+1}
                                    </a>
                                </li>
                                )
                            })
                           }
                            <li class="page-item" onClick={() => handleNext()}>
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </div>
    );
};

export default ShopItems;
