import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Modal, Pagination, Select, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Axios from 'axios';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
var parse = require('html-react-parser');
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
const { TabPane } = Tabs;
import { Tabs } from 'antd';
import CalculateTimeDifference from './DateFormatter';
import Router, { useRouter } from 'next/router';
import NextImageCard from '~/components/nextImagecard';
import useDebounce from '~/hooks/useDebounce';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import DefaultAudioLive from '~/components/elements/detail/thumbnail/DefaultAudioLive';
import ModuleAudioDetailTopInformationLive from '~/components/elements/detail/modules/ModuleAudioDetailTopInformationLive';
import ModuleAudioDetailShoppingActionsLive from '~/components/elements/detail/modules/ModuleAudioDetailShoppingActionsLive';
import DefaultVideoAdmin from '~/components/elements/detail/thumbnail/DefaultVideoAdmin';



export function addPeriodToThousands(number) {
    const numStr = String(number);

    const [integerPart, decimalPart] = numStr.split('.');

    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' ',
    );

    const formattedNumber =
        decimalPart !== undefined
            ? `${formattedIntegerPart}.${decimalPart}`
            : formattedIntegerPart;

    return formattedNumber;
}


function ProductsLists() {
    const { RangePicker } = DatePicker;
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteIdView, setDeleteIdView] = useState({});
    const [dataPlayLists, setDataPlayLists] = useState([]);
    const [dataPlayListsID, setDataPlayListsID] = useState('');
    const [dataVal, setDataVal] = useState([]);
    const [dataValStatus, setDataCatStatus] = useState('');
    const [filterType, setFiltertype] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [category_id, setCategoryID] = useState(null);
    const [viewsAll, setViewsAll] = useState('');
    const Option = Select.Option;
    const searchDebounce = useDebounce(search, 800);
    const [allProducts, setAllProducts] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    const router = useRouter();
    const pid = router.asPath;
    const [imageID, setImageID] = useState(null)
    const [lifeTime, setLifetime] = useState('');
    const [lifeTime1, setLifetime2] = useState('');
    const [short, setShort] = useState(true)


 
    const handleChange = (date) => {
        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime('');
            setLifetime2('');
        }
    };

    const dataFormat = `${lifeTime}&end_date=${lifeTime1}`;


    async function GetItemsProductsLists(
        page,
        category,
        status,
        dataFormat,
        id,
        search,
        filterType,
        dataPlayListsID,
        viewsAll

    ) {
        setLoadingData(true)
        const ItemsData = await GetRepository.getShopsProducts(
            null,
            null,
            page,
            category,
            status,
            dataFormat,
            id,
            search,
            filterType,
            dataPlayListsID,
            viewsAll,
            user?.access
        );
        setPageCount(ItemsData?.count);
        setData([...ItemsData?.results]);
        setLoadingData(false)
    }


    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryListsGlobal();
        if (ItemsData) {
            setDataVal(ItemsData);
        }
    }

    async function GetItemsPlayLists() {
        const ItemsData = await GetRepository.getItemsPlayLists(user?.access)
        if (ItemsData?.results) {
            setDataPlayLists(ItemsData?.results);
        }
    }


    const onChange = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataVal.length; j++) {
                if (dataVal[j].name === name) {
                    setCategoryID(dataVal[j].id);
                }
            }
        } else {
            setCategoryID('');
        }
    };

    const onChangePlay = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataPlayLists.length; j++) {
                if (dataPlayLists[j].title === name) {
                    setDataPlayListsID(dataPlayLists[j].id);
                }
            }
        } else {
            setDataPlayListsID('');
        }
    };



    const onSearchCategory = async (value) => {

        const ItemsData = await GetRepository.getAllCategoryListsGlobal(value);
        setDataVal(ItemsData);
    }

    const options = [];

    for (let i = 0; i < dataVal?.length; i++) {
        options.push(<Option key={dataVal[i].name}>{dataVal[i].name}</Option>);
    }

    const optionsPlayLists = [];

    for (let i = 0; i < dataPlayLists?.length; i++) {
        optionsPlayLists.push(
            <Option key={dataPlayLists[i].title}>{dataPlayLists[i].title}</Option>
        );
    }


    async function handleClickView(item) {
        if (item) {
            setOpenDetails(true)
            setLoading(true);
            const ItemsData = await GetRepository.getShopsProductsAdminDetails(
                item,
                user?.access
            );
            if (ItemsData?.title) {
                setDeleteIdView(ItemsData);
                setLoading(false);
            }
        }
    }

    async function handleClickIdEditProducts(productsItems) {
        if (productsItems?.content_type === 'video') {
            Router.push(`/account/myproducts/edit-video/${productsItems?.id}`);
        } else {
            Router.push(`/account/products/${productsItems?.id}`);
        }
    }

    const handleButtonClickViewProducts = async () => {
        try {
            setLoading2(true);
            const fileContent = deleteIdView?.document;
            const filee = fileContent?.file_url.includes('?AWSAccessKeyId')
                ? fileContent?.file_url.split('?')[0]
                : fileContent?.file_url;
            const response = await Axios.get(filee, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                deleteIdView.title +
                '.' +
                filee.split('.')[filee?.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setLoading2(false);
        } catch (error) {
            console.error('Error downloading file: ', error);
            setLoading2(false);
        }
    };

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        Router.push(
            `/account/products?page=${pageNum}&status=${dataValStatus}`
        );
    };

    const handleFilterStatus = (status) => {
        Router.push(`/account/products?page=${currPage}&status=${status}`);
    };


    function handleClickProductsAll() {
        setAllProducts(!allProducts);
        setFiltertype('');
        setCategoryID(null);
        setLifetime('');
        setLifetime2('');
        setViewsAll('');
        Router.push(`/account/products?page=${router.query.page}`);
        setOpenFilter(false);
    }

    async function getImageGeneration(id) {
        const token = user?.access
        if (token) {
            setImageID(id)
            const ItemsData = await GetRepository.getImageGenaration(id, token);
            setImageID(null);
            GetItemsProductsLists(
                router.query.page,
                category_id,
                router.query.status,
                dataFormat,
                null,
                search,
                filterType,
                dataPlayListsID,
                viewsAll
            );
        } else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "Xatolik qaytdi Token yo'qligi uchun ",
            });
        }

    }


    useEffect(() => {
        GetItemsCategory();
    }, []);

    useEffect(() => {
        if (user?.access) {
            GetItemsPlayLists()
        }
    }, [user?.access]);

    useEffect(() => {
        setCurrPage(router.query.page);
        if (router.query.status === undefined) {
            setDataCatStatus('');
        } else {
            setDataCatStatus(router.query.status);
        }

    }, [router.query.page, router.query.status]);

    useEffect(() => {
        if (router.query.page || router.query.status) {
            GetItemsProductsLists(
                router.query.page,
                category_id,
                router.query.status,
                dataFormat,
                null,
                search,
                filterType,
                dataPlayListsID,
                viewsAll
            );
        }
    }, [
        category_id,
        router.query.status,
        dataFormat,
        searchDebounce,
        router.query.page,
        filterType,
        dataPlayListsID,
        viewsAll
    ]);

    useEffect(() => {
        if (pid !== '/account/myproducts') {
            setLoading(false);
        }
    }, []);



    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_data',
            key: 'name',
            render: (poster_data) => (
                <div>
                    {poster_data?.poster_url ? (
                        <NextImageCard
                            url={poster_data?.poster_url}
                            clasS="rounded-3 mb-2"
                            width="54px"
                            height="54px"
                        />
                    ) : (

                        <span style={{ cursor: "pointer" }} onClick={() => getImageGeneration(poster_data?.id)}>
                            {
                                poster_data?.id == imageID ?
                                    <i class="fa-solid fa-arrows-rotate fa-spin-pulse fs-1"></i>
                                    :
                                    <i class="fa-solid fa-arrows-rotate fs-1"></i>
                            }


                        </span>

                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 350,
            render: (title) => (
                <span className="truncate whitespace-nowrap "> {title}</span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 350,
            render: (category) => (
                <span>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {category?.name}
                </span>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'address',
            width: 350,
            render: (seller) => (
                <div className="d-flex flex-column">
                    <span>
                        {' '}
                        {seller?.first_name} {seller?.last_name}
                    </span>
                    <span> {seller?.phone}</span>
                </div>
            ),
        },
        {
            title: 'Ko\'rilganlar soni',
            dataIndex: 'view_count',
            key: 'address',

            render: (view_count) => (
                <span key={view_count} className='text-center'>
                    <i className="fa-solid fa-eye"></i>{' '}
                    {view_count} ta
                </span>
            ),
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />{' '}
                </span>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
            key: 'address',
            render: (price) => (
                <span>
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {+price == 0 ? 'Bepul' : addPeriodToThousands(price)}
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'data_status',
            key: 'address',
            render: (datastatus) =>
                datastatus?.status === 'moderation' ? (
                    <span>
                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                        Moderatsiya
                    </span>
                ) : datastatus?.status === 'approved' ? (
                    <span>
                        <i className="fa-solid text-success fa-circle-check"></i>{' '}
                        Tasdiqlangan
                    </span>
                ) : datastatus?.status === 'cancelled' ? (
                    <Tooltip title={datastatus?.reason}>
                        <span style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                            Bekor qilingan{' '}
                        </span>
                    </Tooltip>
                ) : datastatus?.status === 'deleted' ? (
                    <span>
                        <i className="fa-solid fa-inbox text-danger"></i>{' '}
                        Arxivlangan
                    </span>
                ) : (
                    <></>
                ),
        },

        {
            title: 'Harakatlar',
            dataIndex: 'content_type_id',
            key: 'address',
            render: (content_type_id) => (
                <div>
                    <a>
                        <i
                            className="fa-solid fa-eye text-success-emphasis mx-2"
                            onClick={() =>
                                handleClickView(content_type_id?.id)
                            }></i>
                    </a>

                    <span style={{ cursor: 'pointer' }}>
                        <i
                            className="fa-solid fa-pen-to-square mx-4  text-success-emphasis"
                            onClick={() =>
                                handleClickIdEditProducts(content_type_id)
                            }></i>
                    </span>
                </div>
            ),
        },
    ];

    const items = [
        {
            key: '1',
            label: (
                <span
                    style={{
                        margin: ' 0 20px',
                        fontSize: '16px',
                        fontWeight: '600',

                    }}>
                    Qisqa video ko'rish
                </span>
            ),
            children: (
                <div>
                    <DefaultVideoAdmin product={deleteIdView} short={short} />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span
                    style={{
                        margin: '0 30px',
                        fontSize: '16px',
                        fontWeight: '600',

                    }}>
                    To'liq video
                </span>
            ),
            children: (
                <div>
                    <DefaultVideoAdmin product={deleteIdView} short={short} />
                </div>
            ),
        },
    ];



    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="bg-white p-3">
                                    <span className="m-0 py-3 border d-flex justify-content-center h4">
                                        Mahsulotlar soni: {pageCount} ta
                                    </span>
                                    <div className="row border mt-3 gap-4 mx-auto w-100  p-4">
                                        <label
                                            className="form-label border col-md-9 m-0 p-0 d-flex justify-content-between align-items-center"
                                            style={{
                                                backgroundColor: '#F1F1F1',
                                            }}>
                                            <input
                                                type="search"
                                                className="form-control"
                                                style={{ border: 'none' }}
                                                placeholder="Qidiruv"
                                                onInput={(e) =>
                                                    setSerach(e.target.value)
                                                }
                                            />
                                            <span className="px-4">
                                                <i className="fa-solid fa-search "></i>
                                            </span>
                                        </label>
                                        <button className='btn btn-outline-success fs-4 col-md-2 py-3'
                                            onClick={() => (setOpenFilter(true))}>
                                            <i className="fa-solid fa-sliders"></i> Filter
                                        </button>



                                    </div>
                                    <div className="d-flex flex-column gap-2 bg-white px-3 py-4 rounded">
                                        <span className="fs-4">
                                            <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                            <strong>Moderatsiya</strong>{' '}
                                            <em>
                                                malumotlar ko'rib chiqilmoqda...
                                            </em>
                                        </span>
                                        <span className="fs-4">
                                            <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                            <strong>Tasdiqlangan </strong>{' '}
                                            <em>
                                                malumotlaringiz muvaffaqqiyatli
                                                tasdiqlandi!
                                            </em>
                                        </span>
                                        <span className="fs-4">
                                            <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                                            <strong>Bekor qilingan</strong>{' '}
                                            <em>
                                                malumotlaringiz bekor qilindi
                                            </em>
                                        </span>
                                    </div>

                                    <Table
                                        scroll={{ x: 1850 }}
                                        dataSource={data}
                                        columns={columns}
                                        pagination={false}
                                        loading={loadingData}
                                    />
                                    <Pagination
                                        className="mt-3"
                                        defaultCurrent={1}
                                        total={pageCount}
                                        onChange={handlePagination}
                                        showSizeChanger={false}
                                        current={+router.query.page}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title={
                    deleteIdView?.document?.content_type === 'video' ? "Video haqida to’liq ma'lumot" :
                        deleteIdView?.document?.content_type === 'audio' ? "Audio haqida to’liq ma'lumot" :
                            deleteIdView?.document?.content_type === 'template' ? "Shablon haqida to’liq ma'lumot" :
                                "Fayl haqida to’liq ma'lumot"
                }
                open={openDetails}
                onOk={() => setOpenDetails(true)}
                onCancel={() => setOpenDetails(false)}
                width={1200}
                footer={null}

            >
                <div className="ps-container p-0">
                    {!loading ? (
                        <div className="ps-container p-0">
                            {deleteIdView?.document
                                ?.content_type === 'audio' ? (
                                <div className="row">
                                    <div className="col-12">
                                        <DefaultAudioLive
                                            product={
                                                deleteIdView
                                                    ? deleteIdView
                                                    : ''
                                            }
                                            liveFile={
                                                deleteIdView?.poster_url
                                            }
                                            title={
                                                deleteIdView?.title
                                            }
                                            categoryName={
                                                deleteIdView
                                                    ?.category?.name
                                            }
                                        />
                                        <ModuleAudioDetailTopInformationLive
                                            product={
                                                deleteIdView
                                                    ? deleteIdView
                                                    : ''
                                            }
                                            views={
                                                deleteIdView?.view_count
                                            }
                                            admin={true}
                                            taxminiyNarx={
                                                deleteIdView?.price
                                            }
                                        />
                                        <div className="price_and_tag">
                                            <ModuleAudioDetailShoppingActionsLive
                                                admin={true}
                                            // free={free}
                                            />

                                            <>
                                                {
                                                    <div className="">
                                                        <p>
                                                            Tezkor
                                                            teglar
                                                        </p>
                                                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                            {deleteIdView
                                                                ?.tag
                                                                ?.length >
                                                                0 &&
                                                                deleteIdView?.tag?.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="m-2 tag-product">
                                                                            <Link
                                                                                href="#"
                                                                                as="#">
                                                                                <a>
                                                                                    {
                                                                                        item?.name
                                                                                    }{' '}
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        </div>
                                    </div>

                                    <div className="ps-product__content ps-tab-root mb-5">
                                        <Tabs defaultActiveKey="1">
                                            <TabPane
                                                tab="Mahsulot to’liq tavsifi"
                                                key="1">
                                                <div className="ps-document">
                                                    {deleteIdView?.description
                                                        ? parse(
                                                            deleteIdView?.description
                                                        )
                                                        : "To'ldirilmadi"}
                                                </div>
                                            </TabPane>
                                        </Tabs>
                                    </div>

                                    <div className="d-flex justify-content-end p-5 ">
                                        {loading2 ? (
                                            <button
                                                className="btn btn-success  p-2 px-5 fs-4 "
                                                style={{
                                                    width: '179px',
                                                    cursor: 'not-allowed',
                                                }}>
                                                <div
                                                    className="spinner-border "
                                                    role="status">
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={
                                                    handleButtonClickViewProducts
                                                }
                                                className="btn btn-success p-2 px-5 fs-4 ">
                                                <i className="fa-solid fa-download mx-1"></i>{' '}
                                                <span className="fs-3">
                                                    File ochish
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : deleteIdView?.document?.content_type === 'video' ? (
                                <div className="row">
                                    <div className="col-md-12">

                                        <Tabs

                                            defaultActiveKey="1"
                                            items={items}
                                            className="bg-white"
                                            onChange={(e) => setShort(e == 1 ? true : false)}
                                        />
                                        <ModuleAudioDetailTopInformationLive
                                            product={
                                                deleteIdView
                                                    ? deleteIdView
                                                    : ''
                                            }
                                            views={
                                                deleteIdView?.view_count
                                            }
                                            admin={true}
                                            taxminiyNarx={
                                                deleteIdView?.price
                                            }
                                        />
                                        <div className="price_and_tag">
                                            <ModuleAudioDetailShoppingActionsLive
                                                admin={true}
                                            />

                                            <>
                                                {
                                                    <div className="">
                                                        <p>
                                                            Tezkor
                                                            teglar
                                                        </p>
                                                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                            {deleteIdView
                                                                ?.tag
                                                                ?.length >
                                                                0 &&
                                                                deleteIdView?.tag?.map(
                                                                    (
                                                                        item,
                                                                        i
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="m-2 tag-product">
                                                                            <Link
                                                                                href="#"
                                                                                as="#">
                                                                                <a>
                                                                                    {' '}
                                                                                    #
                                                                                    {
                                                                                        item?.name
                                                                                    }{' '}
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        </div>
                                    </div>

                                    <div className="ps-product__content ps-tab-root mb-5">
                                        <Tabs defaultActiveKey="1">
                                            <TabPane
                                                tab="Mahsulot to’liq tavsifi"
                                                key="1">
                                                <div className="ps-document">
                                                    {deleteIdView?.description
                                                        ? parse(
                                                            deleteIdView?.description
                                                        )
                                                        : "To'ldirilmadi"}
                                                </div>
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                            ) : (
                                <div className="ps-product--detail ps-product--fullwidth m-0">
                                    <div className="ps-product__header ">

                                        {(user.role === "admin" && deleteIdView?.document?.images?.length > 0) ?

                                            <ThumbnailDefault
                                                product={
                                                    deleteIdView
                                                        ? deleteIdView
                                                        : ''
                                                }
                                                views={
                                                    deleteIdView?.view_count
                                                }
                                            /> :
                                            <div className='d-flex w-100 h-full justify-content-center align-items-center bg-body-secondary rounded-3'>

                                                <span style={{ cursor: "pointer" }} onClick={() => getImageGeneration(deleteIdView?.id)}>
                                                    {
                                                        deleteIdView?.id == imageID ?
                                                            <i class="fa-solid fa-arrows-rotate fa-spin-pulse fa-4x text-secondary"></i>
                                                            :
                                                            <i class="fa-solid fa-arrows-rotate fa-4x text-secondary"></i>
                                                    }


                                                </span>
                                            </div>
                                        }

                                        <div className="ps-product__info">
                                            <div className="mb-4">
                                                <strong className="text-danger pb-5">
                                                    {
                                                        deleteIdView?.reason
                                                    }
                                                </strong>
                                            </div>
                                            <ModuleDetailTopInformation

                                                product={
                                                    deleteIdView
                                                        ? deleteIdView
                                                        : ''
                                                }
                                            />
                                            <ModuleProductDetailDescription
                                                product={
                                                    deleteIdView
                                                        ? deleteIdView
                                                        : ''
                                                }
                                            />
                                            <div className="ps-product__shoppin row-gap-3 d-xl-flex d-lg-flex gap-3 align-items-center ">
                                                <button
                                                    className="ps-btn text-white w-100"
                                                    style={{
                                                        cursor: 'not-allowed',
                                                    }}>
                                                    Savatga qo'shish
                                                </button>
                                                <button
                                                    className="ps-btn w-100 text-white mt-3 mt-xl-0 mt-lg-0"
                                                    style={{
                                                        cursor: 'not-allowed',
                                                    }}>
                                                    Sotib olish
                                                </button>
                                                <div className="ps-product__actions">
                                                    <a
                                                        style={{
                                                            cursor: 'not-allowed',
                                                        }}>
                                                        <i
                                                            className={`icon-heart fs-2`}></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className=" mt-5 d-flex justify-content-start align-content-center flex-wrap">
                                                {deleteIdView
                                                    ?.active_tag
                                                    ?.length > 0 ? (
                                                    <p>
                                                        {' '}
                                                        <strong>
                                                            Aktiv
                                                            teglar:{' '}
                                                        </strong>{' '}
                                                        {deleteIdView?.active_tag?.map(
                                                            (
                                                                item
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        item.id
                                                                    }>
                                                                    #
                                                                    {
                                                                        item.name
                                                                    }{' '}
                                                                </span>
                                                            )
                                                        )}{' '}
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                            <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                {deleteIdView
                                                    ?.deactive_tag
                                                    ?.length > 0 ? (
                                                    <p>
                                                        {' '}
                                                        <strong>
                                                            Aktiv
                                                            emas
                                                            teglar:{' '}
                                                        </strong>{' '}
                                                        {deleteIdView?.deactive_tag?.map(
                                                            (
                                                                item
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        item.id
                                                                    }>
                                                                    #
                                                                    {
                                                                        item.name
                                                                    }{' '}
                                                                </span>
                                                            )
                                                        )}{' '}
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ps-product__content ps-tab-root">
                                        <Tabs defaultActiveKey="1">
                                            <TabPane
                                                tab={
                                                    deleteIdView?.document?.content_type === 'audio' ? "Audio to’liq tavsifi" :
                                                        deleteIdView?.document?.content_type === 'video' ? "Video to’liq tavsifi" :
                                                            deleteIdView?.document?.content_type === 'template' ? "Shablon to’liq tavsifi" : "Fayl to’liq tavsifi"


                                                }
                                                key="1">
                                                <PartialDescription
                                                    product={
                                                        deleteIdView
                                                    }
                                                />
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                    <div className="d-flex justify-content-end ">
                                        {loading2 ? (
                                            <button
                                                className="btn btn-success  p-2 px-5 fs-4 "
                                                style={{
                                                    width: '179px',
                                                    cursor: 'not-allowed',
                                                }}>
                                                <div
                                                    className="spinner-border "
                                                    role="status">
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={
                                                    handleButtonClickViewProducts
                                                }
                                                className="btn btn-success p-2 px-5 fs-4 ">
                                                <i className="fa-solid fa-download mx-1"></i>{' '}
                                                <span className="fs-3">
                                                    File ochish
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="ps-container p-0">
                            <div
                                className="ps-product--detail ps-product--fullwidth"
                                style={{
                                    height: '690px',
                                    display: 'grid',
                                    placeContent: 'center',
                                }}>
                                <div
                                    className="spinner-border "
                                    role="status"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                    }}>
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


            </Modal>

            <Modal
                title={"Mahsulotlarni filterlash"}
                open={openFilter}
                onOk={() => setOpenFilter(true)}
                onCancel={() => setOpenFilter(false)}
                footer={null}
                width={500}
            >

                <div className="p-0 mt-5 mb-3 w-100 d-flex gap-4 flex-column">

                    <div className='d-flex justify-content-between gap-3'>
                        <button onClick={handleClickProductsAll}

                            className='btn btn-outline-secondary rounded-3 fs-4 py-3 w-100'>
                            Barcha mahsulotlar
                        </button>
                        <button onClick={() => setViewsAll("view_count")}

                            className='btn btn-outline-success rounded-3 fs-4 py-3 w-100'>
                            <i className="fa-solid fa-eye mx-2"></i>
                            Eng ko'p ko'rilganlar
                        </button>
                    </div>


                    <Select
                        className=" p-0"
                        mode="select"
                        showSearch
                        style={{
                            width: '100%',
                            height: '47px',
                        }}
                        onChange={onChange}
                        onSearch={onSearchCategory}
                        placeholder="Barcha kategoriyalar">
                        <Option
                            value="all"
                            selected>
                            Barcha
                            kategoriyalar
                        </Option>

                        {options}
                    </Select>

                    <select
                        className="form-select  fs-3 py-3 rounded-3"
                        onChange={(e) =>
                            handleFilterStatus(
                                e.target
                                    .value
                            )
                        }>
                        <option
                            className="fs-3"
                            selected
                            value="">
                            Barcha holatlar
                        </option>
                        <option
                            className="fs-3"
                            value="moderation">
                            Moderatsiya
                        </option>
                        <option
                            className="fs-3"
                            value="approved">
                            Tasdiqlangan
                        </option>
                        <option
                            className="fs-3"
                            value="cancelled">
                            Bekor qilingan
                        </option>
                        <option
                            className="fs-3"
                            value="deleted">
                            Arxivlangan
                        </option>
                    </select>

                    <RangePicker
                        className="w-100 py-3  rounded-3"
                        onChange={handleChange}
                    />

                    <select
                        className="form-select  fs-3 py-3 rounded-3"
                        onChange={(e) =>
                            setFiltertype(
                                e.target
                                    .value
                            )
                        }>
                        <option
                            className="fs-3"
                            selected
                            value="">
                            Barcha turlar
                        </option>
                        <option
                            className="fs-3"
                            value="file">
                            File
                        </option>
                        <option
                            className="fs-3"
                            value="audio">
                            Audio
                        </option>
                        <option
                            className="fs-3"
                            value="template">
                            Shablon
                        </option>
                        <option
                            className="fs-3"
                            value="video">
                            Video
                        </option>
                    </select>
                    <Select
                        className=" p-0"
                        mode="select"
                        showSearch
                        allowClear
                        style={{
                            width: '100%',
                            height: '47px',
                        }}
                        onChange={onChangePlay}
                        placeholder="Barcha playlistlar">
                        <Option value="all">
                            Barcha
                            PlayListslar
                        </Option>

                        {optionsPlayLists}
                    </Select>


                </div>


            </Modal>
        </section>
    );
}

export default ProductsLists;
