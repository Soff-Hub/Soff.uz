import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import LoginPage from '../../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../../components/partials/account/CKeditor';
import { Button, Checkbox, Modal, Select, Tabs, Tooltip } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { ClipLoader } from 'react-spinners';
import Meta from '~/components/shared/headers/Meta';
import { InputNumber } from 'primereact/inputnumber';
import Link from 'next/link';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';

const Posts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const { user, products } = useSelector((state) => state.auth);
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const [taxminiyNarx, setTaxminiyNarx] = useState(products?.price);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [narx, setNarx] = useState('');
    const [chegirmaTek, setChegirmaTek] = useState(true);
    const [disabled, setDeisabled] = useState(false);
    const [free, setFree] = useState(Number(products?.price) === 0);
    const [profile, setProfile] = useState(null);
    const [category_id, setCategoryId] = useState([])
    const [dataCatStatus, setDataCatStatus] = useState(null);

    const [tagSearchResult1, setTagSearchResult2] = useState(null);
    const [tegProductsLists, setTegProdcutsLists] = useState([]);
    const [textAreaItems, setTextAreaItmes] = useState(null);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Video mahsulot qo’shish',
        },
    ];


    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryListsVideo();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }
    const Option = Select.Option;

    const onChange = async (e) => {
        setCategoryId([])
        const customecategory = []
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                customecategory.push(dataCategory[j].id);
            }
        }

        setCategoryId(customecategory)

        let arr = [];
        if (tagSearchResult?.length > 0) {
            for (let i = 0; i < tagItems.length; i++) {
                for (let j = 0; j < tagSearchResult.length; j++) {
                    if (tagItems[i].name === tagSearchResult[j]) {
                        arr.push(tagItems[i].id);
                    }
                }
            }
        }
        const data = {
            category_id: customecategory[0],
            tag_id: arr,
        };

        if (tagSearchResult?.length > 0 && e !== null) {
            const respons = await PostsRepository.TaxminiyNarxOlish(
                data,
                user?.access
            );
            if (
                respons?.recommended_price !== undefined &&
                respons?.recommended_price !== 0
            ) {
                setTaxminiyNarx(
                    `Tavsiya etilgan narx: ${addPeriodToThousands(
                        respons?.recommended_price
                    )} `
                );
                setNarx(respons?.recommended_price);
            }
        }
    };

    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData);
    }

    const onSearch = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryListsVideo(value);
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    };

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmesAktive();
        if (ItemsData) {
            setTagItems(ItemsData);
        }
    }

    async function GetItemsTagAktivmas() {
        const ItemsData = await GetRepository.getTagListsDeaktiv(user?.access);
        if (ItemsData) {
            setTegProdcutsLists(ItemsData);
        }
    }

    const children = [];
    const options = [];
    for (let i = 0; i < tagItems?.length; i++) {
        children.push(
            <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
        );
    }
    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
    }

    const childrenAktivmas = [];
    for (let i = 0; i < tegProductsLists?.length; i++) {
        childrenAktivmas.push(
            <Option key={tegProductsLists[i].name}>
                {tegProductsLists[i].name}
            </Option>
        );
    }

    const controller = new AbortController();

    function removePrefix(text) {
        const prefix = 'Tavsiya etilgan narx: ';
        const prefixBoolen = text.toString()?.includes(prefix);
        if (prefixBoolen) {
            if (text?.startsWith(prefix)) {
                return text?.slice(prefix.length);
            }
        }
        return text ? text : '';
    }

    async function handleChange(value) {
        setTagSearchResult(value);

        let arr = [];
        if (value?.length > 0) {
            for (let i = 0; i < tagItems.length; i++) {
                for (let j = 0; j < value.length; j++) {
                    if (tagItems[i].name === value[j]) {
                        arr.push(tagItems[i].id);
                    }
                }
            }
        }

        const data = {
            category_id: category_id[0],
            tag_id: arr,
        };

        if (value?.length > 0 && category_id[0] !== undefined) {
            const respons = await PostsRepository.TaxminiyNarxOlish(
                data,
                user?.access
            );
            if (
                respons?.recommended_price !== undefined &&
                respons?.recommended_price !== 0
            ) {
                setTaxminiyNarx(
                    `Tavsiya etilgan narx: ${addPeriodToThousands(
                        respons?.recommended_price
                    )} `
                );
                setNarx(respons?.recommended_price);
            }
        }
    }

    const openClose = (id) => {
        const btn = document.createElement('button');
        btn.setAttribute('data-bs-target', id);
        btn.setAttribute('data-bs-toggle', 'modal');
        document.body.appendChild(btn);
        btn.click();
        document.body.removeChild(btn);
    }

    const resuslts1 = products?.active_tag?.map((item) => item.name);
    const resuslts2 = products?.deactive_tag?.map((item) => item.name);

    const results = tagSearchResult?.concat(tagSearchResult1);
    const results3 = resuslts1?.concat(resuslts2);

    async function handleClickPosts(e) {
        e?.preventDefault?.();

        const data = {};
        if (dataCatStatus == "approved") {
            if (results) {
                Object.assign(data, { tags: results });
            }
            if (results3) {
                Object.assign(data, { tags: results3 });
            }
        }
        if (category_id?.[0]) {
            Object.assign(data, { category: category_id[0] });
        }

        if (dataCatStatus) {
            Object.assign(data, { status: dataCatStatus });
        }

        if (textAreaItems) {
            Object.assign(data, { reason: textAreaItems });
        }

        try {

            await PatchRepository.getProductsPatch(
                data,
                products?.id,
                user?.access
            );

            setFullData(null);

            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            Router.push(`/account/products?page=${Router.query.page}`);
        } catch (err) {
            console.log('Error: ', err)
            // const modal = Modal.warning({
            //     centered: true,
            //     title: 'Muvaffaqqiyatli!',
            //     content:
            //         "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
            // })

        } finally {
            setDeisabled(false)
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
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const chegirma = (foiz) => {
        if (narx) {
            const chegirmaNarx = narx - (narx * foiz) / 100;
            if (chegirmaNarx < 1000) {
                setChegirmaTek(false);
            } else {
                setChegirmaTek(true);
            }
        }
    };

    const dataStatus = [
        {
            id: 1,
            status: 'moderation',
        },
        {
            id: 2,
            status: 'approved',
        },
        {
            id: 3,
            status: 'cancelled',
        },
    ];

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        chegirma();
        GetItemsCategoryLists();
    }, []);

    // useEffect(() => {
    //     PostFilePoster();
    // }, [fileImgFile]);

    useEffect(() => {
        if (user?.access) {
            ProfileUsers();
        }
        GetItemsTagAktivmas()
    }, [user?.access]);

    const livePosterVideo = {};

    return user?.role === 'admin' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratish'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center ">
                    <div
                        className="row  w-100 gap-3 pt-5"
                        style={{ alignItems: 'flex-start' }}>
                        <div className='row d-flex justify-content-between'>
                            <h3 className="p-0  col-md-8  fw-semibold">
                                Mahsulotni tekshirish
                            </h3>
                            <div
                                className="col-md-4 m-0  d-flex justify-content-between p-0 "
                                style={{ maxWidth: '370px' }}>
                                <h4> Sotuvdagi ko'rinishi : </h4>
                                <Button
                                    className="btn-success "
                                    data-bs-target="#staticBackdrop"
                                    data-bs-toggle="modal"
                                >
                                    <i className="fa-solid  fa-eye text-success-emphasis mx-3 "></i>
                                </Button>
                            </div>
                        </div>

                        <form
                            onSubmit={handleClickPosts}
                            style={{ position: 'relative', width: '100%' }}
                            id="FormPostsMyProducts"
                            className="col-md-7 pb-5">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12  d-flex flex-column">
                                            <div className=" d-flex justify-content-between p-0 ">
                                                <p>Video nomi: *</p>
                                                <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                                </Tooltip>
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                className="form-control  rounded-3  mb-2"
                                                name="title"
                                                value={products?.title}
                                            />
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column ">
                                            <div className="m-0 pt-2 d-flex justify-content-between p-0">
                                                <p>Aktiv teglar:</p>{' '}
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="rounded-3  p-0 m-0 d-flex flex-column ">
                                                <Select
                                                    mode="tags"
                                                    style={{ width: '100%' }}
                                                    onChange={handleChange}
                                                    defaultValue={products?.active_tag?.map(el => el.name)}
                                                >
                                                    {children}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column ">
                                            <div className="m-0 pt-2 d-flex justify-content-between p-0">
                                                <p>Yangi teglar:</p>{' '}
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="rounded-3  p-0 m-0 d-flex flex-column ">
                                                <Select
                                                    mode="tags"
                                                    onChange={(e) => setTagSearchResult2(e)}
                                                    defaultValue={
                                                        products?.deactive_tag &&
                                                        products?.deactive_tag?.map(
                                                            (item) => item.name
                                                        )
                                                    }
                                                    className="col-md-12 p-0 mb-3" size='small'>
                                                    {childrenAktivmas}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className=" col-md-12 d-flex flex-column">
                                        <div className="d-flex justify-content-between p-0">
                                            <p>Kategoriya: *</p>{' '}
                                            <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                            </Tooltip>
                                        </div>
                                        <div className="rounded-3  p-0 m-0 d-flex flex-column">
                                            <Select
                                                mode="select"
                                                showSearch
                                                allowClear
                                                style={{
                                                    width: '100%',
                                                    height: '47px',
                                                }}
                                                defaultValue={products?.category?.name}
                                                onChange={onChange}
                                                onSearch={onSearch}>
                                                {options}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <p>Xolatini belgilang: *</p>{' '}
                                        <select
                                            className="form-select form-control fs-3 py-0 rounded-3"
                                            style={{ padding: '0 !important', height: '45px' }}
                                            onChange={(e) =>
                                                setDataCatStatus(e.target.value)
                                            }>
                                            {dataStatus?.map((item, i) =>
                                                products.status === item.status ? (
                                                    <option
                                                        selected
                                                        key={i}
                                                        value={item.status}>
                                                        {products.status === 'moderation'
                                                            ? 'Moderatsiyaga tushurish'
                                                            : products.status ===
                                                                'cancelled'
                                                                ? 'Bekor qilish'
                                                                : products.status === 'approved'
                                                                    ? 'Tasdiqlash'
                                                                    : ''}
                                                    </option>
                                                )
                                                    : (
                                                        <option value={item.status}>
                                                            {item.status === 'moderation'
                                                                ? 'Moderatsiya'
                                                                : item.status ===
                                                                    'cancelled'
                                                                    ? 'Bekor qilish'
                                                                    : item.status === 'approved'
                                                                        ? 'Tasdiqlash'
                                                                        : ''}
                                                        </option>
                                                    )
                                            )}
                                        </select>
                                    </div>
                                    {dataCatStatus === 'cancelled' ||
                                        products.status === 'cancelled' ? (
                                        <>
                                            <div className="col-12 d-flex justify-content-between p-0 mt-3">
                                                <p>Holat to'g'risida sabab: *</p>{' '}
                                                <Tooltip title="Mijozlarga mahsulot haqida qanaqadir xatolik bo'lsa o'sha xatolik to'g'risida sabab yozish ">
                                                    <i
                                                        style={{ cursor: 'pointer' }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>

                                            <div className="col-12">
                                                <textarea
                                                    defaultValue={products?.reason}
                                                    onChange={(e) =>
                                                        setTextAreaItmes(e.target.value)
                                                    }
                                                    required
                                                    rows={4}
                                                    className="rounded w-100 border p-3 border-danger"></textarea>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div className="col-md-12 row pr-0 mt-4">
                                    <div className="col-md-12  d-flex flex-column mt-3 p-0">
                                        <div className=" d-flex justify-content-between p-0">
                                            <p>Mahsulot to’liq tavsifi: </p>{' '}
                                            <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                            </Tooltip>
                                        </div>
                                        <div className=" p-0 rounded-3 col-md-12">
                                            <CKeditor
                                                name="description"
                                                onChange={(data) => {
                                                    setFullData(data);
                                                }}
                                                editorLoaded={editorLoaded}
                                                value={products?.description}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex justify-content-end mt-4 "
                                        style={{
                                            transform: 'translateX(16px)',
                                        }}>
                                        <button
                                            type="submit"
                                            className="btn btn-success py-3 "
                                            onClick={handleClickPosts}
                                        >
                                            <span className="fs-4 px-5">
                                                O'zgarishlarni saqlash{' '}
                                                <i className="fa-solid fa-cloud-arrow-up mx-2"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mahsulotingiz">
                                <span
                                    className="fixed-btn"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight">
                                    <i className="fa-solid fa-id-card fa-beat fs-1"></i>
                                </span>
                            </div>
                        </form>

                        <div
                            className="col-md-5 rounded-3  p-3  card"
                            style={{ maxWidth: '485px' }}>
                            <video
                                className=" border w-100"
                                controls
                                preload='none'
                                src={products?.document?.short_content_url}
                                // poster={customePoster?.url}
                                style={{ maxHeight: '250px' }}
                            >
                                {/* <source
                                    src={fileImgFile?.file}
                                    type={`video/*`}
                                /> */}
                            </video>
                            <div className="col-md-12 d-flex flex-column ">
                                <div className=" mt-2 d-flex justify-content-between p-0">
                                    <p>Qo'shimcha fayllar uchun (.zip)</p>{' '}
                                    <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .zip">
                                        <i
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>
                                {/* <div className="row"> */}
                                <div
                                    className="add-product-user-image d-flex flex-column justify-content-center align-content-center form-control py-4 rounded-3 text-truncate"
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        border: '1px dashed green',
                                        width: '100%',
                                    }}>
                                    <span
                                        className="d-flex flex-column align-items-center"
                                        style={{
                                            cursor: 'pointer',
                                        }}>
                                        <span>
                                            {' '}
                                            Tanlangan{' '}
                                            <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* offcanvas */}

                </div>

                {/* mahsulotning user qismi uchun real ko'rinishi */}

                <div
                    className="modal fade "
                    id="staticBackdrop-2"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content mahsulotingizElh3 ">
                            <div className="ps-container">
                                <div className="row">
                                    <div className="col-12">
                                        <div
                                            className={`product__top-information ${'video_user_information'} `}
                                            style={{ width: '100%' }}>
                                            <div className='py-5 d-flex gap-3' style={{ flexDirection: 'column' }}>
                                                <span className="d-flex justify-content-center gap-3">
                                                    <span>Yuklanmoqda</span>
                                                    <ClipLoader
                                                        size={25}
                                                        color="#36d7b7"
                                                    />
                                                </span>
                                                <p style={{ fontSize: '20px', textAlign: 'center' }} className='fw-semibold'>
                                                    Video yuklanmoqda bu sizning internet tezligingizga qarab turlicha  vaqt olishi mumkin
                                                </p>

                                                <div className="d-flex gap-3 justify-content-center">
                                                    <button
                                                        className="btn btn-danger py-3 "
                                                        onClick={() => {
                                                            openClose('#staticBackdrop-2')
                                                            window.location.reload()
                                                        }}
                                                    >
                                                        <span className="fs-4 px-5">
                                                            Bekor qilish{' '}
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="btn btn-success py-3 "
                                                        onClick={() => {
                                                            window.open('http://localhost:3000/account/myproducts/upload-video', '_blank');
                                                        }}
                                                    >
                                                        <span className="fs-4 px-5">
                                                            Yana yuklash{' '}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div
                    className="modal fade "
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog container ">
                        <div className="modal-content mahsulotingizElh3 ">
                            <div className="d-flex justify-content-end p-3">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="ps-container">
                                <div className="row">
                                    <div className="col-xl-8 col-lg-8 col-12">
                                        <div className="video_container">
                                            <div className="video_content">
                                                <video
                                                    id="videoPlayer"
                                                    className="video_iframe"
                                                    width="100%"
                                                    preload='none'
                                                    style={{
                                                        maxHeight:
                                                            '380px',
                                                    }}
                                                    controls
                                                    // poster={customePoster?.url}
                                                    src={products?.document?.short_content_url}
                                                >
                                                </video>
                                            </div>
                                        </div>
                                        <div
                                            className={`product__top-information ${'video_user_information'} `}
                                            style={{ width: '100%' }}>
                                            <div>
                                                <div
                                                    className="product__top-information-account"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}>
                                                    <div>
                                                        {profile?.image ? (
                                                            <img
                                                                alt="soff"
                                                                src={
                                                                    profile?.image
                                                                }
                                                                className="profile__image-client"
                                                            />
                                                        ) : (
                                                            <i
                                                                className=" fa-2x text-info fa-solid fa-circle-user"
                                                                style={{
                                                                    fontSize:
                                                                        '30px',
                                                                }}></i>
                                                        )}
                                                    </div>
                                                    {profile?.first_name && (
                                                        <p>
                                                            {
                                                                profile?.first_name
                                                            }{' '}
                                                            {profile?.last_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={`${'video_send_container'}`}>
                                                <div
                                                    className={`ps-product__actions heart_video `}>
                                                    <a
                                                        href="#"
                                                        style={{
                                                            cursor: `${'not-allowed'}`,
                                                        }}>
                                                        <i
                                                            className={`${'icon-heart'} `}></i>
                                                    </a>
                                                </div>
                                                <div className="views_video mt-1">
                                                    {' '}
                                                    <i class="fa-solid fa-eye"></i>{' '}
                                                    <span>{1}</span>
                                                </div>
                                                <div className="video_send">
                                                    <i class="fa-solid fa-share-nodes"></i>
                                                    ulashish
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-12 d-flex flex-column gap-4 ">
                                        <div className="ps-product--detail mb-0">
                                            <div className="ps-product__desc">
                                                <strong className="fs-4">
                                                    {' '}
                                                    Qisqa tavsif{' '}
                                                </strong>
                                                {
                                                    <ul
                                                        style={{
                                                            listStyleType:
                                                                'revert',
                                                        }}>
                                                        {
                                                            <li>
                                                                <strong>
                                                                    Davomiyligi
                                                                    :{' '}
                                                                </strong>{' '}
                                                                <div></div>{' '}
                                                                <span>
                                                                    {livePosterVideo
                                                                        ?.data
                                                                        ?.content_duration &&
                                                                        livePosterVideo
                                                                            ?.data
                                                                            ?.content_duration}
                                                                </span>
                                                            </li>
                                                        }
                                                        {
                                                            <li>
                                                                <strong>
                                                                    Sifati :{' '}
                                                                </strong>{' '}
                                                                <div></div>{' '}
                                                                <span>
                                                                    {livePosterVideo
                                                                        ?.data
                                                                        ?.content_quality &&
                                                                        livePosterVideo
                                                                            ?.data
                                                                            ?.content_quality}
                                                                </span>
                                                            </li>
                                                        }
                                                        {
                                                            <li>
                                                                <strong>
                                                                    Turi :{' '}
                                                                </strong>{' '}
                                                                <div></div>{' '}
                                                                <span className="file_type-color">
                                                                    {livePosterVideo
                                                                        ?.data
                                                                        ?.file_type &&
                                                                        livePosterVideo
                                                                            ?.data
                                                                            ?.file_type}
                                                                </span>
                                                            </li>
                                                        }
                                                        {
                                                            <li>
                                                                <strong>
                                                                    Hajmi :{' '}
                                                                </strong>{' '}
                                                                <div></div>{' '}
                                                                <span>
                                                                    {livePosterVideo
                                                                        ?.data
                                                                        ?.file_size &&
                                                                        livePosterVideo
                                                                            ?.data
                                                                            ?.file_size}
                                                                </span>
                                                            </li>
                                                        }
                                                        {
                                                            <li>
                                                                <strong>
                                                                    {' '}
                                                                    Kategoriyasi
                                                                </strong>{' '}
                                                                : <div></div>{' '}
                                                                <span>
                                                                    {' '}
                                                                    {categoryName &&
                                                                        categoryName}
                                                                </span>
                                                            </li>
                                                        }
                                                        {
                                                            <li>
                                                                <strong>
                                                                    Xarid
                                                                    qilishlar
                                                                    soni :{' '}
                                                                </strong>{' '}
                                                                <div></div>{' '}
                                                                <span>{0}</span>
                                                            </li>
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                        <div className="video--price-live">
                                            <p>narxi</p>
                                            <div className="">
                                                {taxminiyNarx ? (
                                                    <div className="ps-product__price">
                                                        <p>
                                                            {addPeriodToThousands(
                                                                removePrefix(
                                                                    taxminiyNarx
                                                                )
                                                            )}
                                                            so'm
                                                        </p>
                                                    </div>
                                                ) : free ? (
                                                    <div className="ps-product__price">
                                                        {' '}
                                                        <p>Bepul mahsulot</p>
                                                    </div>
                                                ) : (
                                                    <div className="ps-product__price">
                                                        <p>0 so'm</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="ps-product__shopping video_action quek_video_button">
                                            <div className={`btn--container  `}>
                                                {taxminiyNarx ? (
                                                    <>
                                                        <a
                                                            style={{
                                                                cursor: `${'not-allowed'}`,
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            className="ps-btn ps-btn--black max-class"
                                                            href="#">
                                                            Savatga qo'shish
                                                        </a>
                                                        <a
                                                            style={{
                                                                cursor: `${'not-allowed'}`,
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            className="ps-btn max-class"
                                                            href="#">
                                                            1 klikda sotib oling
                                                        </a>
                                                    </>
                                                ) : free ? (
                                                    <a
                                                        style={{
                                                            cursor: `${'not-allowed'}`,
                                                            textAlign: 'center',
                                                        }}
                                                        className="ps-btn ps-btn--black max-class"
                                                        href="#">
                                                        Bepul yuklab olish
                                                    </a>
                                                ) : (
                                                    <>
                                                        <a
                                                            style={{
                                                                cursor: `${'not-allowed'}`,
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            className="ps-btn ps-btn--black max-class"
                                                            href="#">
                                                            Savatga qo'shish
                                                        </a>
                                                        <a
                                                            style={{
                                                                cursor: `${'not-allowed'}`,
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                            className="ps-btn max-class"
                                                            href="#">
                                                            1 klikda sotib oling
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-0">
                                                Tezkor teglar
                                            </p>
                                            <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                {tagSearchResult?.length > 0 &&
                                                    tagSearchResult?.map(
                                                        (item, i) => (
                                                            <div
                                                                key={i}
                                                                className="m-2 tag-product">
                                                                <Link
                                                                    href="#"
                                                                    as="#">
                                                                    <a>
                                                                        {' '}
                                                                        #{
                                                                            item
                                                                        }{' '}
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="ps-product__content ps-tab-root mb-5">
                                            <Tabs defaultActiveKey="1">
                                                <TabPane
                                                    tab="Mahsulot to’liq tavsifi"
                                                    key="1">
                                                    <div className="ps-document">
                                                        {Fulldata
                                                            ? parse(Fulldata)
                                                            : "To'ldirilmadi"}
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    ) : (
        <LoginPage />
    );
};

export default Posts;
