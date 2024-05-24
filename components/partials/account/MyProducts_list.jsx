import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Pagination, Select, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector} from 'react-redux';
import ModalDelete from './Modal';
import Link from 'next/link';
import CalculateTimeDifference from './DateFormatter';
import ModalDeletePostEdit from './ModalPostEdit';
import axios from 'axios';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import Router from 'next/router';
import NextImageCard from '~/components/nextImagecard';
import useDebounce from '~/hooks/useDebounce';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import DefaultAudioLive from '~/components/elements/detail/thumbnail/DefaultAudioLive';
import ModuleAudioDetailTopInformationLive from '~/components/elements/detail/modules/ModuleAudioDetailTopInformationLive';
import ModuleAudioDetailShoppingActionsLive from '~/components/elements/detail/modules/ModuleAudioDetailShoppingActionsLive';
import DefaultVideoAdmin from '~/components/elements/detail/thumbnail/DefaultVideoAdmin';
const { TabPane } = Tabs;
var parse = require('html-react-parser');




function MyProductsLists() {
    const [data, setData] = useState([]);
    const [products2, setProducts2] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [tagName, setTagName] = useState(null);
    const [tagItems, setTagItems] = useState([]);
    const [View, setView] = useState({});
    const [ViewPriceDiscount, setViewPriceDiscount] = useState({
        price: 0,
        discount: 0,
    });
    const [dataValCat, setDataCat] = useState(null);
    const [filterType, setFiltertype] = useState('');
    const [deleteId, setDeleteId] = useState(null);
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [selectValStatus, setSelectValStatus] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [count, setCount] = useState('');
    const [videosize, setVideoSize] = useState(null);


    const [copy, setCopy] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date
        ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1
            ? `0${date[0].$M + 1}`
            : date[0].$M + 1
        }-${date[0].$D}`
        : '';
    const dateFormat1 = date
        ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1
            ? `0${date[1].$M + 1}`
            : date[1].$M + 1
        }-${date[1].$D}`
        : '';
    const dataFormat = date
        ? `${dateFormat0}&date_range_before=${dateFormat1}`
        : '';
    const { accountLinks, user, products } = useSelector((state) => state.auth);
    const Option = Select.Option;
    const searchDebounce = useDebounce(search, 1000);
    const [short, setShort] = useState(true)

    async function GetItemsProducts(
        page,
        category,
        tagName,
        dataFormat,
        status,
        search,
        filterType
    ) {
        const ItemsData = await GetRepository.getMyProducts(
            page,
            category,
            tagName,
            dataFormat,
            status,
            search,
            filterType,
            user?.access
        );
        if (ItemsData?.results) {
            setData(ItemsData?.results);
            setCount(ItemsData?.count);
            setPageCount(ItemsData?.count);
            setCurrPage(page);
        }
    }
    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryListsGlobal();
        setDataCategory(ItemsData);
    }

    const onChange = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataCategory.length; j++) {
                if (dataCategory[j].name === name) {
                    setDataCat(dataCategory[j].id);
                }
            }
        } else {
            setDataCat('');
        }
    };

    const finalPrice =
        ViewPriceDiscount?.price -
        (ViewPriceDiscount?.discount * ViewPriceDiscount?.price) / 100;

    const options = [];

    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
    }

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmesAktive();
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }

    const childiren = [];

    for (let i = 0; i < tagItems?.length; i++) {
        childiren.push(
            <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
        );
    }

    const onSearchTegs = async (value) => {
     
        const ItemsData = await MediaRepository.getTagItmesAktive(value);
        if (ItemsData) {
            setTagItems(ItemsData);
        }
    }

    const onSearchCategory = async (value) => {

        const ItemsData = await GetRepository.getAllCategoryListsGlobal(value);
        setDataCategory(ItemsData);
    }



    const handleChange = async (name) => {
        if (name !== 'tags') {
            for (let j = 0; j < tagItems.length; j++) {
                if (tagItems[j].name === name) {
                    setTagName(tagItems[j].id);
                }
            }
        } else {
            setTagName('');
        }
    };

    async function handleClickView(item) {
        if (item?.id) {
            setLoading(true);
            const ItemsData = await GetRepository.getMyProductsView(
                item.id,
                user?.access
            );
            if (ItemsData?.title) {
                setView(ItemsData);
                setLoading(false);
            }
        }
    }

    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyProductsDelete(
            deleteId,
            user?.access
        );
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'chirdingiz`,
        });
        modal.update;
        GetItemsProducts(
            currPage,
            dataValCat,
            tagName,
            dataFormat,
            selectValStatus,
            search
        );
    }

    async function handleClickIdEdit(productsItems) {
        if (productsItems) {
            if (productsItems?.content_type === 'video') {
                Router.push(
                    `/account/myproducts/edit-video/${productsItems?.id}`
                );
            } else {
                Router.push(`/account/myproducts/${productsItems?.id}`);
            }
        }
    }

    async function handleClickIdEditModal(productsItems) {
        setLoading3(true);
        const ItemsData = await GetRepository.getMyProductsView(
            productsItems,
            user?.access
        );
        if (ItemsData) {
            setProducts2(ItemsData);
            setViewPriceDiscount({
                price: ItemsData.price,
                discount: ItemsData.discount,
            });
            setLoading3(false);
        }
    }

    async function getVideoFunk() {
        const ItemsData = await GetRepository.getVideoSize(user?.access);
        if (ItemsData) {
            setVideoSize(ItemsData);
        }
    }

    async function handleItemsEditProductsPosts() {
        if (ViewPriceDiscount) {
            const formData = new FormData();
            formData.append('price', ViewPriceDiscount?.price);
            formData.append('discount', ViewPriceDiscount?.discount);

            const patchItems = await PatchRepository.getMyProductsPatch(
                formData,
                products2?.id,
                user?.access
            );
            if (patchItems?.status === 202) {
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: 'Mahsulotingiz narxi yangilandi',
                });
            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: patchItems?.data?.msg,
                });
            }
            GetItemsProducts(
                currPage,
                dataValCat,
                tagName,
                dataFormat,
                status,
                search
            );
            setViewPriceDiscount(null);
        } else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }
    }

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const copyVideoUrl = (item) => {
        const videoUrl = `https://soff.uz/product/${item?.name?.slug}`;
        navigator.clipboard
            .writeText(videoUrl)
            .then(() => {
                setCopy(item?.id);
                setTimeout(() => {
                    setCopy(null);
                }, 2500);

                //   alert(`Video URL copied to clipboard! ${}`);
            })
            .catch((error) => {
                console.error('Error copying video URL: ', error);
            });
    };

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
        GetItemsProducts(
            pageNum,
            dataValCat,
            tagName,
            dataFormat,
            selectValStatus,
            search
        );
    };

    const handleButtonClickViewProducts = async () => {
        const file = View?.document?.file_url.includes('?AWSAccessKeyId')
            ? View?.document?.file_url.split('?')[0]
            : View?.document?.file_url;
        try {
            setLoading2(true);
            const response = await axios.get(file, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                'soff.uz -' +
                View?.title +
                '.' +
                file?.split('.')[file?.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file: ', error);
        } finally {
            setLoading2(false);
        }
    };

    useEffect(() => {
        GetItemsCategory();
        GetItemsTag();
        getVideoFunk();
    }, []);

    useEffect(() => {
        GetItemsProducts(
            currPage,
            dataValCat,
            tagName,
            dataFormat,
            selectValStatus,
            search,
            filterType
        );
    }, [
        dataValCat,
        tagName,
        dataFormat,
        selectValStatus,
        searchDebounce,
        filterType,
    ]);

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    {image?.poster_url ? (
                        <NextImageCard
                            url={image?.poster_url}
                            clasS="rounded-3 mb-2"
                            width="54px"
                            height="54px"
                        />
                    ) : (
                        <i className="fa-solid fa-image fa-2x"></i>
                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'age',
            width: 300,
            render: (name) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {name?.title}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 350,
            render: (category) => (
                <span key={category.id}>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {category?.name}
                </span>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
            key: 'address',
            render: (price) => (
                <span key={price}>
                    {' '}
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {+price == 0 ? 'Bepul' : addPeriodToThousands(price)}
                </span>
            ),
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Yuklanishlar soni',
            dataIndex: 'uploads_count',
            key: 'uploads_count',
            render: (uploads_count) => (
                <span key={uploads_count}>
                    {' '}
                    <i className="fa-solid fa-download"></i> {uploads_count}
                </span>
            ),
        },
        user?.role === 'seller' ? (
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
                    ) : (
                        <></>
                    ),
            }
        ) : (
            <></>
        ),

        {
            title: 'Harakatlar',
            dataIndex: 'content_type_id',
            key: 'address',
            render: (content_type_id) => (
                <div>
                    {data.some(
                        (el) =>
                            el.id == content_type_id?.id &&
                            el.data_status?.status === 'approved'
                    ) ? (
                        <a>
                            {copy === content_type_id?.id ? (
                                <i className="fa-solid fa-check mx-2 "></i>
                            ) : (
                                <i
                                    className="fa-solid fa-share text-success-emphasis mx-2"
                                    onClick={() =>
                                        copyVideoUrl(
                                            data.find(
                                                (item) =>
                                                    item.id ===
                                                    content_type_id?.id
                                            )
                                        )
                                    }></i>
                            )}
                        </a>
                    ) : (
                        <a>
                            <i
                                style={{ opacity: '0' }}
                                className="fa-solid fa-copy text-success-emphasis mx-2"></i>
                        </a>
                    )}

                    <a
                        data-bs-target="#staticBackdropView"
                        data-bs-toggle="modal">
                        <i
                            className="fa-solid fa-eye text-success-emphasis mx-2"
                            onClick={() =>
                                handleClickView(
                                    data.find(
                                        (item) =>
                                            item.id === content_type_id?.id
                                    )
                                )
                            }></i>
                    </a>
                    {data.some(
                        (el) =>
                            el.id == content_type_id?.id &&
                            el.data_status?.status === 'moderation'
                    ) ? (
                        <span style={{ cursor: "pointer" }}>
                            <i
                                className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                                onClick={() =>
                                    handleClickIdEdit(content_type_id)
                                }></i>
                        </span>
                    ) : data.some(
                        (el) =>
                            el.id == content_type_id?.id &&
                            el.data_status?.status === 'approved'
                    ) ? (

                        <>
                            {
                                (content_type_id?.content_type === "video" && content_type_id?.discount_price === 0) ? <></> :
                                    <a
                                        data-bs-target="#exampleModalMyProductsPrice"
                                        data-bs-toggle="modal"
                                        onClick={() =>
                                            handleClickIdEditModal(content_type_id?.id)
                                        }>
                                        <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"></i>
                                    </a>
                            }
                        </>

                    ) : data.some(
                        (el) =>
                            el.id == content_type_id?.id &&
                            el.data_status?.status === 'cancelled'
                    ) ? (
                        <span style={{ cursor: 'pointer' }}>
                            <i
                                className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                                onClick={() =>
                                    handleClickIdEdit(content_type_id)
                                }></i>
                        </span>
                    ) : (
                        <></>
                    )}
                    <a
                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal">
                        <i
                            className="fa-solid fa-trash-can text-danger mx-2"
                            onClick={() =>
                                setDeleteId(content_type_id?.id)
                            }></i>
                    </a>
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
                        margin: '0 20px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Qisqa video ko'rish
                </span>
            ),
            children: (
                <div>
                    <DefaultVideoAdmin product={View} short={short} />
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
                    <DefaultVideoAdmin product={View} short={short} />
                </div>
            ),
        },
    ];


    return (
        <section className="ps-my-account ps-page--account ">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    {user?.role === 'seller' ? (
                                        <div className="d-flex flex-column gap-2">
                                            <span className="fs-4">
                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                <strong>Moderatsiya</strong>{' '}
                                                <em>
                                                    ma'lumotlar ko'rib
                                                    chiqilmoqda...
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                <strong>Tasdiqlangan </strong>{' '}
                                                <em>
                                                    ma'lumotlaringiz
                                                    muvaffaqqiyatli tasdiqlandi!
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                                                <strong>Bekor qilingan</strong>{' '}
                                                <em>
                                                    ma'lumotlaringiz bekor
                                                    qilindi
                                                </em>
                                            </span>
                                            <br />
                                            <div className="border px-2 py-3 rounded-2">
                                                <p className="px-2">
                                                    <i className="fa-solid fa-triangle-exclamation text-warning"></i> Video yuklash uchun  xotira
                                                    haqida ma'lumot{' '}
                                                </p>
                                                <div className=" d-flex justify-content-between flex-wrap gap-5   p-2 ">
                                                    <div className="d-flex gap-3">
                                                        <div className="btn btn-outline-success  px-3 py-2 fs-5 rounded-3">
                                                            <strong>
                                                                Umumiy xotira :{' '}
                                                                {
                                                                    addPeriodToThousands(videosize?.storage_size)
                                                                } MB
                                                            </strong>
                                                        </div>
                                                        <div className="btn btn-outline-primary px-3 py-2 fs-5 rounded-3">
                                                            <strong>
                                                                Band qilingan xotira :{' '}
                                                                {
                                                                    addPeriodToThousands(videosize?.full_storage_size)
                                                                } MB
                                                            </strong>
                                                        </div>
                                                        <div className="btn btn-outline-danger px-3 py-2 fs-5 rounded-3">
                                                            <strong>
                                                                Bo'sh xotira :{' '}
                                                                {
                                                                    addPeriodToThousands(videosize?.empty_storage_size)
                                                                } MB
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <div

                                                        style={{
                                                            cursor: 'pointer',
                                                        }}>
                                                        <Link href="/account/buying_traffic">
                                                            <div className="btn btn-success px-3 py-2 fs-5 rounded-3" >
                                                                <span>
                                                                    Xotira qo'shish{' '}
                                                                    <i class="fa-solid fa-plus"></i>
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="row mx-auto gap-4  pb-4 pt-5">
                                        <label
                                            className={
                                                user?.role === 'seller'
                                                    ? 'rounded col-md-6   form-label border  m-0 p-0 d-flex justify-content-between align-items-center'
                                                    : 'form-label border col-md-9 eounded  m-0 p-0 d-flex justify-content-between align-items-center'
                                            }
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
                                        {user?.role === 'seller' ? (
                                            <Link
                                                href={
                                                    '/account/myproducts/product-selection'
                                                }>
                                                <button className="  btn btn-success col-md-3 py-3 ">
                                                    <span className="fs-4">
                                                        <i className="fa-solid fa-circle-plus"></i>{' '}
                                                        Yangi mahsulot
                                                    </span>
                                                </button>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                        <div
                                            className="accordion accordion-flush p-0"
                                            id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button
                                                        style={{
                                                            padding: '17px',
                                                            backgroundColor:
                                                                '#F1F1F2',
                                                        }}
                                                        className="accordion-button collapsed  responsiveCardButton   text-success "
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#flush-collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div
                                                    id="flush-collapseOne"
                                                    className="accordion-collapse collapse"
                                                    data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <Select
                                                            className="col-md-6 p-0"
                                                            mode="select"
                                                            showSearch
                                                            allowClear
                                                            style={{
                                                                width: '100%',
                                                                height: '47px',
                                                            }}
                                                            onChange={onChange}
                                                            onSearch={onSearchCategory}
                                                            placeholder="Barcha kategoriyalar">
                                                            <Option value="all">
                                                                Barcha
                                                                kategoriyalar
                                                            </Option>

                                                            {options}
                                                        </Select>
                                                        {user?.role ===
                                                            'seller' ? (
                                                            <Select
                                                                className="col-md-5 p-0"
                                                                mode="select"
                                                                showSearch
                                                                allowClear
                                                                style={{
                                                                    width: '100%',
                                                                    height: '47px',
                                                                }}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onSearch={onSearchTegs}
                                                                placeholder="Barcha teglar">
                                                                <Option value="tags">
                                                                    Barcha
                                                                    teglar
                                                                </Option>

                                                                {childiren}
                                                            </Select>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        {user?.role ===
                                                            'seller' ? (
                                                            <select
                                                                className="form-select col-md-3 fs-3 py-3 rounded-3"
                                                                onChange={(e) =>
                                                                    setSelectValStatus(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    className="fs-3"
                                                                    selected
                                                                    value="">
                                                                    Barcha
                                                                    holatlar
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
                                                                    Bekor
                                                                    qilingan
                                                                </option>
                                                            </select>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        <RangePicker
                                                            className="col-md-4 py-3   rounded-3"
                                                            onChange={(e) =>
                                                                setDate(e)
                                                            }
                                                        />
                                                        <select
                                                            className="form-select col-md-4 fs-3 py-3 rounded-3"
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
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {user?.role === 'seller' ? (
                                        <>
                                            <h4 className="ms-2 mb-4">
                                                Jami mahsulotlar soni {count} ta{' '}
                                            </h4>
                                            <Table
                                                dataSource={data}
                                                scroll={{ x: 1600 }}
                                                columns={columns}
                                                pagination={false}
                                            />
                                            <Pagination
                                                className="mt-3"
                                                total={pageCount}
                                                defaultCurrent={currPage}
                                                onChange={handlePagination}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Table
                                                dataSource={data}
                                                scroll={{ x: 1300 }}
                                                columns={columns}
                                                pagination={false}
                                            />
                                            <Pagination
                                                className="mt-3"
                                                total={pageCount}
                                                defaultCurrent={currPage}
                                                onChange={handlePagination}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalDelete onSuccess={DeleteItemsProducts} />
                <div
                    className="modal fade "
                    id="staticBackdropView"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog container ">
                        <div className="modal-content">
                            <div className="d-flex justify-content-end p-3">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setView(null)}></button>
                            </div>
                            <div className="ps-container">
                                {!loading ? (
                                    <>
                                        {View?.document?.content_type ===
                                            'audio' ? (
                                            <div className="row">
                                                <div className="col-12">
                                                    <DefaultAudioLive
                                                        product={
                                                            View ? View : ''
                                                        }
                                                        liveFile={View?.poster_url}
                                                        title={View?.title}
                                                        categoryName={
                                                            View?.category?.name
                                                        }
                                                    />
                                                    <ModuleAudioDetailTopInformationLive

                                                        product={View ? View : ''}
                                                        views={View?.view_count}

                                                        admin={true}
                                                        taxminiyNarx={
                                                            View?.price
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
                                                                        {View
                                                                            ?.tag
                                                                            ?.length >
                                                                            0 &&
                                                                            View?.tag?.map(
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
                                                                {View?.description
                                                                    ? parse(
                                                                        View?.description
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
                                        ) : View?.document?.content_type ===
                                            'video' ? (
                                            <div className="row">
                                                <div className="col-12">

                                                    <Tabs
                                                        defaultActiveKey="1"
                                                        items={items}
                                                        className="bg-white "
                                                        onChange={(e) => setShort(e == 1 ? true : false)}
                                                    />
                                                    <ModuleAudioDetailTopInformationLive
                                                        product={View}
                                                        views={View?.view_count}

                                                        admin={true}
                                                        taxminiyNarx={
                                                            View?.price
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
                                                                        {View
                                                                            ?.tag
                                                                            ?.length >
                                                                            0 &&
                                                                            View?.tag?.map(
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
                                                                {View?.description
                                                                    ? parse(
                                                                        View?.description
                                                                    )
                                                                    : "To'ldirilmadi"}
                                                            </div>
                                                        </TabPane>
                                                    </Tabs>
                                                </div>

                                                {/* <div className="d-flex justify-content-end p-5 ">
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
                                                </div> */}
                                            </div>
                                        ) : (
                                            <div className="ps-product--detail ps-product--fullwidth">
                                                <div className="ps-product__header ">
                                                    <ThumbnailDefault
                                                        product={View}
                                                        views={View?.view_count}
                                                    />
                                                    <div className="ps-product__info">
                                                        {View?.status ===
                                                            'cancelled' ? (
                                                            <div className="mb-4">
                                                                <strong className="text-danger pb-5">
                                                                    {
                                                                        View?.reason
                                                                    }
                                                                </strong>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                        <ModuleDetailTopInformation
                                                            product={
                                                                View ? View : ''
                                                            }
                                                        />
                                                        <ModuleProductDetailDescription
                                                            product={View}
                                                        />
                                                        <div className="ps-product__shopping row-gap-3">
                                                            <div>
                                                                <button
                                                                    className="ps-btn ps-btn--black"
                                                                    style={{
                                                                        cursor: 'not-allowed',
                                                                    }}>
                                                                    Savatga
                                                                    qo'shish
                                                                </button>
                                                                <button
                                                                    className="ps-btn"
                                                                    style={{
                                                                        cursor: 'not-allowed',
                                                                    }}>
                                                                    Sotib olish
                                                                </button>
                                                            </div>
                                                            <div className="ps-product__actions">
                                                                <a
                                                                    style={{
                                                                        cursor: 'not-allowed',
                                                                    }}>
                                                                    <i
                                                                        className={`icon-heart`}></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <p>Tezkor teglar</p>
                                                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                            {View?.tag?.length >
                                                                0 &&
                                                                View?.tag.map(
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
                                                                                        item.name
                                                                                    }{' '}
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ps-product__content ps-tab-root">
                                                    <Tabs defaultActiveKey="1">
                                                        <TabPane
                                                            tab="Mahsulot to’liq tavsifi"
                                                            key="1">
                                                            <PartialDescription
                                                                product={View}
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
                                    </>
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit
                    dataBsTarget="exampleModalMyProductsPrice"
                    onSubmited={handleItemsEditProductsPosts}
                    formID="products-edit_price">
                    {loading3 ? (
                        <div
                            className=" "
                            style={{
                                height: '200px',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '150px', height: '150px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <label htmlFor="priceCount" className="form-label">
                                Hujjatingizni chegirmasi
                                <input
                                    id="priceCount"
                                    onChange={(e) =>
                                        setViewPriceDiscount((prev) => ({
                                            ...prev,
                                            discount: e.target.value,
                                        }))
                                    }
                                    defaultValue={products2?.discount}
                                    type="number"
                                    className="form-control rounded-3"
                                    placeholder="Hujjatingizni chegirmasi"
                                />
                            </label>
                            <label htmlFor="discount" className="form-label">
                                Hujjatingizni narxi
                                <input
                                    id="discount"
                                    onChange={(e) =>
                                        setViewPriceDiscount((prev) => ({
                                            ...prev,
                                            price: e.target.value,
                                        }))
                                    }
                                    defaultValue={products2?.price}
                                    type="number"
                                    className="form-control rounded-3"
                                    placeholder="Hujjatingizni narxi"
                                />
                            </label>
                            <label htmlFor="discount" className="form-label">
                                Sotuvdagi narxi:{' '}
                                <span
                                    className={
                                        finalPrice < 1000 ||
                                            products2?.discount_pric < 1000
                                            ? 'text-danger'
                                            : 'text-primary'
                                    }>
                                    {' '}
                                    {JSON.stringify(finalPrice)}
                                </span>
                            </label>
                        </>
                    )}
                </ModalDeletePostEdit>
            </div>
        </section>
    );
}

export default MyProductsLists;
