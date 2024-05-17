import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import ProductRepository from '~/repositories/ProductRepository';
import { useDispatch, useSelector } from 'react-redux';
import { CategorySlug } from '~/store/auth/action';
import useDebounce from '~/hooks/useDebounce';
import { baseUrl } from '~/repositories/Repository';
import axios from 'axios';
import AudioWaveform from '~/components/elements/products/AudioProductCart';
import ProductVideo from '~/components/elements/products/ProductVideo';

const ShopItems = ({
    columns = 4,
    pageSize,
    data,
    dataCount,
    setDataCount,
    categoryData,
}) => {
    const Router = useRouter();
    const { query } = Router;
    const { slug } = Router.query;
    const [classes, setClasses] = useState(
        'col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6 '
    );
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(true);

    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState(null);

    const [newData, setNewData] = useState([]);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const searchDebounce = useDebounce(search, 1000);
    const [isPlay, setIsPlay] = useState(null)

    async function getFreeDocuments(page = 1, searchVal = '') {
        const responseData = await axios.get(
            `${baseUrl}customer/documents/?free_documents=0&page=${page}&search=${searchVal}`
        );
        if (responseData) {
            setNewData(responseData?.data?.results);
        }
    }

    async function getCategry() {
        const responseData = await ProductRepository.getCategoryParent().then(
            () => setLoad(true)
        );
        if (responseData?.length > 0) {
            dispatch(CategorySlug(responseData?.data?.results));
            // categorySlug
        }
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
        data !== null ? setSuccess(false) : setSuccess(true);
        handleSetColumns();
        setNewData(data);
        if (true) {
            setNewData(data);
        } else {
            setLoad(true);
        }
    }, [query, data]);

    useEffect(() => {
        if (categoryData?.length === 0) {
            getCategry();
        }

        if (slug !== 'bepul-mahsulotlar') {
            if (categoryData?.every((cat) => cat.slug !== slug)) {
                setchaildId(slug);
                setParentId(null);
            } else {
                setParentId(slug);
                setchaildId(null);
            }
        }
    }, [slug]);

    const handlePagination = async (e) => {
        setPage(e);
        if (chaildId) {
            const respons = await ProductRepository.getFilderProduct(
                e,
                slug,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
            if (respons) {
                setDataCount(respons.count);
                setNewData(respons.results);
            } else {
                setLoad(true);
            }
        } else if (parentId) {
            const respons = await ProductRepository.getFilderProduct(
                e,
                null,
                slug,
                null,
                null,
                null,
                null,
                null,
                null
            );
            if (respons) {
                setDataCount(respons.count);
                setNewData(respons.results);
            } else {
                setLoad(true);
            }
        }
        if (slug === 'bepul-mahsulotlar') {
            getFreeDocuments(e, search);
        }
    };

    async function handleSelect(e) {
        const ID = 'id';
        const PRICE = 'price';
        const DePRICE = '-price';
        if (e.target.value === '&free_documents=0') {
            const respons = await ProductRepository.getFilderProduct(
                1,
                chaildId,
                parentId,
                null,
                null,
                '&free_documents=0',
                null
            );
            setDataCount(respons.count);
            return setNewData(respons?.results);
        }
        if (chaildId) {
            if (e.target.value === 'all') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    ID,
                    null,
                    null
                );
                if (respons) {
                    setNewData(respons?.results);
                } else {
                    setNewData(respons?.results);
                }
            } else if (e.target.value === 'mashhur') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    null,
                    PRICE,
                    'approved_count'
                );
                setNewData(respons?.results);
            } else if (e.target.value === 'arzondan') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    null,
                    PRICE,
                    null
                );
                setNewData(respons?.results);
            }
        } else if (parentId) {
            if (e.target.value === 'all') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    null,
                    slug,
                    null,
                    null,
                    null,
                    ID,
                    null,
                    null
                );
                if (respons) {
                    setNewData(respons?.results);
                } else {
                    setNewData(respons?.results);
                }
            } else if (e.target.value === 'mashhur') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    null,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    PRICE,
                    'approved_count'
                );
                setNewData(respons?.results);
            } else if (e.target.value === 'arzondan') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    null,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    PRICE,
                    null
                );
                setNewData(respons?.results);
            } else if (e.target.value === 'qimmatdan') {
                const respons = await ProductRepository.getFilderProduct(
                    1,
                    null,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    DePRICE,
                    null
                );
                setNewData(respons?.results);
            }
        }
    }

    async function detailSearch(e) {
        if (slug === 'bepul-mahsulotlar') {
            getFreeDocuments(1, e);
        } else {
            if (chaildId) {
                const respons = await ProductRepository.getSearchProduct(
                    1,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    e
                );
                if (respons) {
                    setDataCount(respons.count);
                    setNewData(respons.results);
                } else {
                    setLoad(true);
                }
            } else if (parentId) {
                const respons = await ProductRepository.getSearchProduct(
                    1,
                    null,
                    slug,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    e
                );
                if (respons) {
                    setDataCount(respons.count);
                    setNewData(respons.results);
                } else {
                    setLoad(true);
                }
            }
        }
    }

    useEffect(() => {
        detailSearch(search);
    }, [searchDebounce]);
    console.log('data', data);
    // Views
    let productItemsView;
    if (success) {
        const skeletonItems = generateTempArray(4).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    } else {
        if (data?.length > 0) {
            const items =
                newData?.length > 0 &&
                newData?.map((item) => (
                    <>
                        {item?.document?.content_type === 'audio' ? (
                            <div className="col-12 my-3">
                                <AudioWaveform product={item} inCategory={true} />
                            </div>
                        ) :

                            item?.document?.content_type === 'video' ? (
                                <div  className="col-md-4 mobile_category_lists_cards  my-3 ">
                                    <ProductVideo isPlay={isPlay} setIsPlay={setIsPlay} product={item} />
                                </div>
                            ) : (

                                <div
                                    className={classes + ' home-card-category'}
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                    }}>
                                    <Product product={item} />
                                </div>
                            )}
                    </>
                ));
            productItemsView = (
                <div className="ps-shop-items">
                    <div className="row ">{items}</div>
                </div>
            );
        } else {
            const skeletonItems = generateTempArray(4).map((item) => (
                <div className={classes} key={item}>
                    <SkeletonProduct />
                </div>
            ));
            productItemsView = <div className="row">{skeletonItems}</div>;
        }

        if (data?.length <= 0) {
            productItemsView = (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <div className={classes} style={{ marginTop: '30px' }}>
                        <img
                            src="/static/img/no-document.png"
                            alt="no documnt"
                        />
                        <p className="text-center">Mahsulot yo'q</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{dataCount}</strong>
                    ta mahsulot bor
                </p>
                <div className="ps-shopping__actions">
                    <label className="category-search-label">
                        <i className="fa-solid fa-magnifying-glass search-label"></i>
                        <input
                            className="ps-input"
                            type="text"
                            placeholder="Mahsulotingizni izlang..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
              
                    {slug !== 'bepul-mahsulotlar' && (
                        <select
                            className="ps-select form-control"
                            data-placeholder="Sort Items"
                            onChange={(e) => handleSelect(e)}>
                            <option value="mashhur">
                                Mashhurlari bo'yicha
                            </option>
                            <option value="&free_documents=0">
                                Bepul mahsulotlar
                            </option>
                            <option value="all">Yangilari</option>
                            <option value="arzondan">
                                Narx bo'yicha: arzondan qimmatga
                            </option>
                            <option value="qimmatdan">
                                Narx bo'yicha: qimmatdan arzonga
                            </option>
                        </select>
                    )}
                </div>
            </div>
            <div className="ps-shopping__content pagination-product-box gap-3">
                {productItemsView}
            </div>
            <div className="ps-shopping__footer text-center">
                {data?.length >= pageSize ? (
                    <div className="ps-pagination">
                        <Pagination
                            className="mt-3"
                            total={dataCount}
                            pageSize={pageSize}
                            responsive={true}
                            showSizeChanger={false}
                            current={page}
                            onChange={(e) => handlePagination(e)}
                        />
                    </div>
                ) : (
                    <div className="ps-pagination">
                        <Pagination
                            className="mt-3"
                            total={1}
                            pageSize={1}
                            responsive={true}
                            showSizeChanger={false}
                            current={1}
                            onChange={(e) => handlePagination(e)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopItems;
