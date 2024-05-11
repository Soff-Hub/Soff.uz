import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../../components/partials/account/CKeditor';
import { Button, Modal, Select, Tabs, Tooltip } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';

import Link from 'next/link';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
import { useForm } from 'react-hook-form';
import Input from '~/components/form/Input';

const Posts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState(null);
    const [tagSearchResult1, setTagSearchResult2] = useState(null);
    const [tegProductsLists, setTegProdcutsLists] = useState([]);
    const [fileImgFile, setFileImgFile] = useState(null);
    const [extraFiles, setExtraFiles] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCatStatus, setDataCatStatus] = useState(null);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingIs, setLoadingIs] = useState(false);
    const [free, setFree] = useState(false);
    const [customePoster, setCustomePoster] = useState(false);
    const [profile, setProfile] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [products, setProducts] = useState(null)
    const routerId = Router.query?.id;
    const [category_id, setCategory_ID] = useState(null)

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Video mahsulot tahrirlash',
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
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                setCategory_ID(dataCategory[j].id);
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

    const resuslts1 = products?.active_tag?.map((item) => item.name);
    const resuslts2 = products?.deactive_tag?.map((item) => item.name);

    const results = tagSearchResult?.concat(tagSearchResult1);
    const results3 = resuslts1?.concat(resuslts2);

    const childrenAktivmas = [];
    for (let i = 0; i < tegProductsLists?.length; i++) {
        childrenAktivmas.push(
            <Option key={tegProductsLists[i].name}>
                {tegProductsLists[i].name}
            </Option>
        );
    }

    const children = [];
    for (let i = 0; i < tagItems?.length; i++) {
        children.push(
            <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
        );
    }


    const options = [];
    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
    }



    async function handleClickPosts() {

        if (extraFiles || watch('title' || Fulldata) || customePoster.file || fileImgFile?.file) {
            const formData = new FormData();

            if (watch('title')) {
                formData.append('title', watch('title'));
            }
            if (Fulldata) {
                formData.append('description', Fulldata);
            }
            if (results) {
                formData.append('tags', JSON.stringify(results));
            }
            if (results3) {
                formData.append('tags', JSON.stringify(results3));
            }
            if (customePoster.file) {
                formData.append('poster', customePoster.file);
            }
            if (category_id) {
                formData.append('category', category_id);
            }
            if (fileImgFile?.file) {
                formData.append('short_content', fileImgFile?.file);
            }
            if (dataCatStatus) {
                formData.append('status', dataCatStatus);
            }


            if (extraFiles) {
                formData.append('extra_file', extraFiles);
            }

            try {
                const resp = await axios.patch(
                    `${baseUrl}seller/video-product-update/${products?.id}/`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.access}`,
                        },
                    }
                );
                Router.back();
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Siz malumotlarni o'zgartirdingiz ",
                });
            } catch (err) {
                console.log("Error edit", err);
            }
        } else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun ma'lumot kiritilmadi ",
            });
        }

    }



    async function getProducts() {
        if (routerId && user?.access) {
            setLoadingIs(true)
            const ItemsData = await GetRepository.getShopsProductsAdmin(routerId, user?.access)
            setProducts(ItemsData);
            setLoadingIs(false)
        }

    }
    useEffect(() => {
        getProducts()
    }, [routerId, user?.access])



    useEffect(() => {
        if (user?.access) {
            GetItemsTag();
            GetItemsTagAktivmas()
            setEditorLoaded(true);
            GetItemsCategoryLists();
        }
    }, [user?.access]);


    function LivePoster(e) {
        const file = e.target.files[0];
        if (file) {
            const img = window.URL.createObjectURL(file);
            setCustomePoster({ file: file, url: img });
        }
    }


    function LivePosterLive(e) {
        const file = e.target.files[0];
        if (file) {
            const video = window.URL.createObjectURL(file);
            setFileImgFile({ file: file, video: video });
        }
    }

    useEffect(() => {
        if (user?.access) {
            ProfileUsers();
        }
    }, [user?.access]);

    useEffect(() => {
        setCategory_ID(products?.category?.id)
    }, [products?.category?.id])


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




    return user?.role === 'admin' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratish'} />
                <BreadCrumb breacrumb={breadCrumb} />

                {!loadingIs ? (products && <div className="d-flex container justify-content-center ">
                    <div
                        className="row  w-100 gap-3 pt-5"
                        style={{ alignItems: 'flex-start' }}>
                        <h5 className="p-0  col-md-8 fs-4  text-warning fw-semibold lh-base">
                            {' '}
                            <i className="fa-solid fa-triangle-exclamation"></i>{' '}
                            Hurmatli Sotuvchi mahsulot yuklayotganingizda
                            mahsulot o'zingizni shaxsiy mahsulotingiz ekanligiga
                            ishonch hosil qiling. Aks holda o'sha
                            mahsulotingizni sotuvda ko'rinmasligi va profilingiz
                            bloklab qo'yilishi mumkin. E'tiborli bo'ling!
                        </h5>

                        <div
                            className="col-md-4 m-0  d-flex justify-content-between p-0 "
                            style={{ maxWidth: '370px' }}>
                            <h4> Sotuvdagi ko'rinishi : </h4>
                            <Button
                                className="btn-success "
                                data-bs-target="#staticBackdrop"
                                data-bs-toggle="modal">
                                <i className="fa-solid  fa-eye text-success-emphasis mx-3 "></i>
                            </Button>
                        </div>

                        <form
                            onSubmit={handleSubmit(handleClickPosts)}
                            style={{ position: 'relative', width: '100%' }}
                            id="FormPostsMyProducts"
                            className=" col-md-7 pb-5"
                            noValidate>
                            <div className="col-md-8 p-0  mt-3">
                                <div className="col-md-12  d-flex justify-content-between p-0 ">
                                    <h4 className="p-0">Video Mahsulot </h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mt-2">
                                        <div className="col-md-12  d-flex flex-column p-0">
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
                                            <Input
                                                name="title"
                                                type="text"
                                                className={"col-md-12 mb-2"}
                                                InputClassName={"form-control  rounded-3 "}
                                                {...register('title', {
                                                    required: "Video nomini to'ldirish majburiy",
                                                    validate: value => value.trim() !== "" || "Video nomi bo'sh bo'lishi mumkin emas"
                                                })}
                                                error={errors.title?.message}
                                                defaultValue={products?.title}
                                            />

                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3 p-0">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
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
                                                    onChange={onChange}
                                                    onSearch={onSearch}
                                                    defaultValue={products?.category?.name}>
                                                    {options}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3 p-0">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Aktiv teglar:</p>{' '}
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{ cursor: 'pointer' }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="rounded-3  p-0 m-0 d-flex flex-column">
                                                <Select
                                                    mode="tags"
                                                    onChange={(e) => setTagSearchResult(e)}
                                                    defaultValue={
                                                        products?.active_tag &&
                                                        products?.active_tag?.map(
                                                            (item) => item.name
                                                        )
                                                    }
                                                    className="p-0 ">
                                                    {children}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3 p-0">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Aktiv emas teglar:</p>{' '}
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{ cursor: 'pointer' }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="rounded-3  p-0 m-0 d-flex flex-column">
                                                <Select
                                                    mode="tags"
                                                    onChange={(e) => setTagSearchResult2(e)}
                                                    defaultValue={
                                                        products?.deactive_tag &&
                                                        products?.deactive_tag?.map(
                                                            (item) => item.name
                                                        )
                                                    }
                                                    className="p-0 ">
                                                    {childrenAktivmas}
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">


                                        <div className="col-md-12 d-flex flex-column ">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>
                                                    Video(qisqa ko'rish uchun):
                                                    *
                                                </p>{' '}
                                                <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .doc va docx, .ppt, .pptx .pdf">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className='w-full'>

                                                <label
                                                    className="add-product-user-image d-flex flex-column justify-content-center  align-content-center form-control py-5 rounded-3 text-truncate"
                                                    style={{
                                                        backgroundColor: '#F1F1F1',
                                                        border: "1px dashed green",
                                                        width: '100%',
                                                    }}>
                                                    {!fileImgFile || products?.document?.short_content_url ? (
                                                        <span
                                                            className="d-flex flex-column align-items-center"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}>
                                                            <span
                                                                className="d-flex flex-column align-items-center "
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}>
                                                                <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                                <span>
                                                                    Qisqa
                                                                    ko'rish
                                                                    uchun video
                                                                </span>
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="d-flex flex-column align-items-center"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}>
                                                            <span>
                                                                {' '}
                                                                Siz mahsulot
                                                                yukladingiz{' '}
                                                                <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                            </span>
                                                        </span>
                                                    )}
                                                    <input
                                                        name='file_video'
                                                        type="file"
                                                        onChange={LivePosterLive}
                                                        accept="video/*"

                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12  d-flex flex-column ">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Video poster rasmi: *</p>
                                                <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz rasmi quyidagi turdagi fayl bo’lishi mumkin:  .jpeg yoki .jpg, .png, .svg">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className='w-full'>

                                                <div
                                                    className="add-product-user-image d-flex justify-content-between gap-3  form-control p-2 pt-2 rounded-3"
                                                    style={{
                                                        backgroundColor: '#F1F1F1',
                                                        border: "1px dashed green",
                                                        width: '100%',
                                                        height: "100px"
                                                    }}>
                                                    <label
                                                        className='m-0'
                                                        style={{
                                                            width: '45%',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#F1F1F1',
                                                            border: "1px dashed green",
                                                            borderRadius: '5px',
                                                            position: 'relative',
                                                        }}>
                                                        <i className="fa-solid fa-plus fs-1 mt-5  mx-3 plus-icon-style "></i>
                                                        <input
                                                            name='image'
                                                            type="file"
                                                            onChange={LivePoster}
                                                            accept="image/*"
                                                            style={{
                                                                width: '50px',
                                                            }}

                                                        />
                                                    </label>
                                                    <div className=""
                                                        style={{
                                                            width: '50%',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#F1F1F1',
                                                            border: "1px dashed green",
                                                            borderRadius: '5px',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                            src={customePoster?.url ? customePoster?.url : products?.poster_url


                                                            }
                                                            alt="poster/video"
                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                {' '}
                                                <p>Mahsulot holati: *</p>
                                                <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                    <i
                                                        style={{ cursor: 'pointer' }}
                                                        className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                                </Tooltip>
                                            </div>

                                            <div className="rounded-3  p-0 m-0 d-flex flex-column">
                                                <select
                                                    className="form-select fs-3 rounded-3 col-md-12 py-3"
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
                                                                    ? 'Moderatsiya'
                                                                    : products.status ===
                                                                        'cancelled'
                                                                        ? 'Bekor qilingan'
                                                                        : products.status === 'approved'
                                                                            ? 'Tasdiqlangan'
                                                                            : ''}
                                                            </option>
                                                        )
                                                            : (
                                                                <option value={item.status}>
                                                                    {item.status === 'moderation'
                                                                        ? 'Moderatsiya'
                                                                        : item.status ===
                                                                            'cancelled'
                                                                            ? 'Bekor qilingan'
                                                                            : item.status === 'approved'
                                                                                ? 'Tasdiqlangan'
                                                                                : ''}
                                                                </option>
                                                            )
                                                    )}
                                                </select>
                                            </div>
                                            {
                                                dataCatStatus === 'cancelled' ||
                                                    products.status === 'cancelled' ?
                                                    <div className="col-md-12  d-flex flex-column mt-3 p-0">
                                                        <div className=" d-flex justify-content-between p-0 ">
                                                            <p>Holat to'g'risida sabab: *</p>{' '}
                                                            <Tooltip title="Mijozlarga mahsulot haqida qanaqadir xatolik bo'lsa o'sha xatolik to'g'risida sabab yozish ">
                                                                <i
                                                                    style={{ cursor: 'pointer' }}
                                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                            </Tooltip>
                                                        </div>

                                                        <div className="col-md-12 p-0 mb-3">
                                                            <textarea
                                                                defaultValue={products?.reason}
                                                                onChange={(e) =>
                                                                    setTextAreaItmes(e.target.value)
                                                                }
                                                                required
                                                                rows={4}
                                                                className="rounded w-100 border p-3 border-danger"></textarea>
                                                        </div>
                                                    </div> : <></>
                                            }

                                        </div>



                                    </div>
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
                                            disabled={loading}
                                            className="btn btn-success py-3 "
                                        >
                                            <span className="fs-4 px-5">
                                                Mahsulot qo'shish{' '}
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
                            className="col-md-5 rounded-3  p-3  card mt-5"
                            style={{ maxWidth: '485px' }}>
                            <video
                                className=" border w-100"
                                controls
                                preload="none"
                                src={fileImgFile?.video ? fileImgFile?.video : products?.document?.short_content_url}
                                poster={customePoster?.url ? customePoster?.url : products?.poster_url}
                                style={{ maxHeight: '250px' }}>

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
                                <label
                                    className="add-product-user-image d-flex flex-column justify-content-center align-content-center form-control py-5 rounded-3 text-truncate"
                                    style={{
                                        backgroundColor: '#F1F1F1',
                                        border: '1px dashed green',
                                        width: '100%',
                                    }}>
                                    {!extraFiles ? (
                                        <span
                                            className="d-flex flex-column align-items-center"
                                            style={{
                                                cursor: 'pointer',
                                            }}>
                                            <span
                                                className="d-flex flex-column align-items-center "
                                                style={{
                                                    cursor: 'pointer',
                                                }}>
                                                <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                <span>
                                                    Qo'shimcha fayllar
                                                </span>
                                            </span>
                                        </span>
                                    ) : (
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
                                    )}
                                    <input
                                        required
                                        type="file"
                                        onChange={(e) =>
                                            setExtraFiles(e.target.files[0])
                                        }
                                        accept=".zip"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                </div>) :

                    <div className="ps-container">
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
                }

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

                                        <>
                                            {

                                                products ? (
                                                    <div className="video_container">
                                                        <div className="video_content">
                                                            <video
                                                                className=" border w-100"
                                                                controls
                                                                preload="none"
                                                                src={fileImgFile?.video ? fileImgFile?.video : products?.document?.short_content_url}
                                                                poster={customePoster?.url ? customePoster?.url : products?.poster_url}
                                                                style={{
                                                                    maxHeight:
                                                                        '250px',
                                                                }}></video>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={
                                                            'https://kohantextilejournal.com/wp-content/uploads/2018/04/video-poster.jpg'
                                                        }
                                                        alt="docc"
                                                        className="border mb-4 w-100"
                                                        style={{
                                                            objectFit:
                                                                'cover',
                                                        }}
                                                        height={350}
                                                    />
                                                )
                                            }
                                        </>

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
                                                                    {' '}
                                                                    Kategoriyasi
                                                                </strong>{' '}
                                                                : <div></div>{' '}
                                                                <span className='text-truncate'>
                                                                    {' '}
                                                                    {categoryName || products?.category?.name}
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
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
