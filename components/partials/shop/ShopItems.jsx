import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import { useRouter } from 'next/router';
import useGetProducts from '~/hooks/useGetProducts';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import ProductRepository from '~/repositories/ProductRepository';

const ShopItems = ({ columns = 4, pageSize, data, dataCount, setDataCount }) => {
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
    const [selectData, setSelectData] = useState([]);
    const [page, setPage] = useState(1);

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
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

        data?.length > 0 ? setSuccess(true) : setSuccess(false);

        handleSetColumns();
        if (data) {
            setNewData(data);
        }
    }, [query, data]);

    const handlePagination = async (e) => {
        setPage(e);
        const respons = await ProductRepository.getFilderProduct(
            e,
            null,
            null,
            null,
            null
        );
        if (respons) {
            setDataCount(respons.count);
            setNewData(respons.results);
        }
    };

    async function handleSelect(e) {
        // const respons = await ProductRepository.getFilterSelect(payload)
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
            const items =
                newData?.length > 0 &&
                newData?.map((item) => (
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
                    <strong className="mr-2">
                        {dataCount}
                    </strong>
                    ta hujjat bor
                </p>
                <div className="ps-shopping__actions">
                    <select
                        className="ps-select form-control"
                        data-placeholder="Sort Items"
                        onChange={(e) => handleSelect(e)}>
                        <option value="mashhur">
                            Mashhurligi bo'yicha saralash
                        </option>
                        <option value="arzondan">
                            Narx bo'yicha: arzondan qimmatga
                        </option>
                        <option value="qimmatdan">
                            Narx bo'yicha: qimmatdan arzonga
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
                    {data?.length > 0 && (
                        <Pagination
                            total={dataCount}
                            pageSize={10}
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
