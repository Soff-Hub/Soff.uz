import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import { useRouter } from 'next/router';
import useGetProducts from '~/hooks/useGetProducts';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import ProductRepository from '~/repositories/ProductRepository';

const ShopItems = ({
    columns = 4,
    pageSize,
    data,
    dataCount,
    setDataCount,
    chaildId,
    parentId,
    parentPagen, 
    chaildPagen
}) => {
    const Router = useRouter();
    const { query } = Router;
    const {slug} = Router.query
    const [listView, setListView] = useState(true);
    const [classes, setClasses] = useState(
        'col-lg-3 col-md-4 col-sm-4 col-xs-6 col-6 '
    );
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(true);

    const [newData, setNewData] = useState([]);
    const [page, setPage] = useState(1);
    const [chaildSlug, setchaildSlug] = useState('')
    const [parentSlug, setParentSlug] = useState('')
    // const [searchValue, setSearchValue] = useState('')

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

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            if (responseData?.every(cat => Number(cat.id) !== Number(slug))) {
                setchaildSlug(slug)
            }
            else {
                setParentSlug(slug)
            }
        }
    }

    useEffect(() => {
        getCategry()
    }, [slug])

    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 2000);

        data ? setSuccess(false) : setSuccess(true);

        handleSetColumns();
        if (true) {
            setNewData(data);
        } else {
            setLoad(true);
        }
    }, [query, data]);
    

    const handlePagination = async (e) => {
        setPage(e);
        if (chaildSlug) {
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
        } else if (parentSlug) {
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
    }
   

    async function handleSelect(e) {
        const ID = 'id';
        const PRICE = 'price';
        const DePRICE = '-price';
      if (chaildSlug) {
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
        } else if (e.target.value === 'qimmatdan') {
            const respons = await ProductRepository.getFilderProduct(
                1,
                slug,
                null,
                null,
                null,
                null,
                null,
                DePRICE,
                null
            );
            setNewData(respons?.results);
        }
      }else if(parentSlug){
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

    async function detailSearch(e){
        // setSearchValue(e)
        if (chaildSlug) {
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
                e)
                if (respons) {
                    setDataCount(respons.count);
                    setNewData(respons.results);
                } else {
                    setLoad(true);
                }
            
        }else if (parentSlug) {
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
                e)
                if (respons) {
                    setDataCount(respons.count);
                    setNewData(respons.results);
                } else {
                    setLoad(true);
                }
        }
    }


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
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{dataCount}</strong>
                    ta hujjat bor
                </p>
                <div className="ps-shopping__actions">
              
                   <label className='category-search-label'>
                   <i class="fa-solid fa-magnifying-glass search-label"></i>
                   <input type="text" placeholder='Hujjatingizni izlang...' onChange={(e) => detailSearch(e.target.value)} />
                   </label>
              
                    <select
                        className="ps-select form-control"
                        data-placeholder="Sort Items"
                        onChange={(e) => handleSelect(e)}>
                        <option value="mashhur">
                            Mashhurlari bo'yicha saralash
                        </option>
                        <option value="all">Yangilari</option>
                        <option value="arzondan">
                            Narx bo'yicha: arzondan qimmatga
                        </option>
                        <option value="qimmatdan">
                            Narx bo'yicha: qimmatdan arzonga
                        </option>
                        {/* <option value="arzondan">Oldingilari</option> */}
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
              {
                data?.length > 16 && 
                <div className="ps-pagination">
                  
                <Pagination
                    total={dataCount}
                    pageSize={pageSize}
                    responsive={true}
                    showSizeChanger={false}
                    current={page}
                    onChange={(e) => handlePagination(e)}
                />
            
        </div>
              }
            </div>
        </div>
    );
};

export default ShopItems;
