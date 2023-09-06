import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import { useRouter } from 'next/router';
import useGetProducts from '~/hooks/useGetProducts';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';

const ShopItems = ({ columns = 4, pageSize, data }) => {
    const Router = useRouter();

    const { query } = Router;
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const [classes, setClasses] = useState(
        'col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6 '
    );
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(true);

    const { productItems, loading, getProducts } = useGetProducts();
    const [pagenationData, setPagenationData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [page, setPage] = useState(1);

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    async function handlePagination(pageVal) {
        setPage(pageVal);
        setNewData(data);
        const arr = [];

        for (
            let i = (pageVal - 1) * pageSize;
            i < (pageVal - 1) * pageSize + 8;
            i++
        ) {
            data?.[i] ? arr.push(data[i]) : '';
        }

        setNewData(arr);



        for (let i = (pageVal - 1) * pageSize ; i < (pageVal - 1) * pageSize + 2; i++) {
            data?.[i] ? arr.push(data[i]) : ''

            console.log(data[i]);
        }

        console.log(pageVal);
        console.log('arr', arr);
        setNewData(arr);
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6');
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 2000);
        
     
        data?.length > 0 ? setSuccess(true) : 
            setSuccess(false)
        
       


        handleSetColumns();
        if (data) {
            setPagenationData(data);
            handlePagination(1);
        }
    }, [query, data]);


    useEffect(() => {
        console.log('data', pagenationData);
    }, [pagenationData]);

    // const count = [Math.ceil(data?.length / 3)];
    //     function createArray(length, value) {
    //         return Array.from({ length }, () => value);
    //     }




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


    let arr = newData ? [...newData] : [];







    function handleSelect(e) {
        if (e.target.value === 'boshi') {
            arr.sort(compareByCreatedAt);
            setNewData(arr);
        } else if (e.target.value === 'oxiri') {
            arr.sort(compareByCreatedAtLast);
            setNewData(arr);

        }
    }

    // Views
    let productItemsView;

    if (load) {
        if (success) {
            const items = newData?.map((item) => (
                <div
                    className={classes}
                    key={item.id}>
                    <Product product={item} />
                </div>
            ));
            productItemsView = (
                <div className="ps-shop-items">
                    <div className="row">{items}</div>
                </div>
            );
        } else {
            productItemsView = (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <div className={classes} style={{ marginTop: '30px' }}>
                        <img
                            src="/static/img/no-document.jpg"
                            alt="no documnt"
                        />
                        <p className="text-center">Hujjat yo'q</p>
                    </div>
                </div>
            );
        }
    } else {
        const skeletonItems = generateTempArray(4).map((item) => (
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
                        <ul className="ps-tab-list">
                            <li className={!listView === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            {/* <li className={listView !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}>
                                    <i className="icon-list4"></i>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content pagination-product-box">
                {productItemsView}
            </div>
            <div className="ps-shopping__footer text-center">
                <div className="ps-pagination">

                    {data.length > 0 && (

                        <Pagination
                            total={data?.length}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page || 1}
                            onChange={(e) => handlePagination(e)}
                        />
                    )}

                    {data.length > 0 && (
                        <Pagination
                            total={data?.length - 1}

                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page || 1}
                            onChange={(e) => handlePagination(e)}
                        />
                    )}

                    {data.length > 0 && (

                        <Pagination
                            total={data?.length - 1}
                            // pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page !== undefined ? parseInt(page) : 1}
                            onChange={(e) => handlePagination(e)}
                        />
                    )}



                    {data?.length > 0 && (
                        <Pagination
                            total={data?.length}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page || 1}
                            onChange={(e) => handlePagination(e)}
                        />
                    )}



                </div>
            </div>
        </div>
    );
};

export default ShopItems;
