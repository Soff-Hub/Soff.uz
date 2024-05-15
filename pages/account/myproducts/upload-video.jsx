import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../components/partials/account/CKeditor';
import { Button, Checkbox, Modal, Select, Tabs, Tooltip } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import Meta from '~/components/shared/headers/Meta';
import { InputNumber } from 'primereact/inputnumber';
import Link from 'next/link';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
import { useForm } from 'react-hook-form';
import Input from '~/components/form/Input';

const Posts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [fileImgFile, setFileImgFile] = useState(null);
    const [extraFiles, setExtraFiles] = useState(null);
    const [fileImgFileID, setFileImgFileID] = useState(null);
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [livePosterFile, setLivePosterFile] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [narx, setNarx] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDeisabled] = useState(false);
    const [free, setFree] = useState(false);
    const [customePoster, setCustomePoster] = useState(false);
    const [profile, setProfile] = useState(null);
    const [category_id, setCategoryId] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [videosize, setVideoSize] = useState(null);

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
        setCategoryId([]);
        const customecategory = [];
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                customecategory.push(dataCategory[j].id);
            }
        }

        setCategoryId(customecategory);

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
    };

    async function handleClickPosts() {
        if (
            customePoster.file ||
            free ||
            livePosterFile?.id ||
            fileImgFile?.file ||
            category_id[0] ||
            watch('title')
        ) {
            const formData = new FormData();
            formData.append('title', watch('title'));
            if (free) {
                formData.append('price', 0);
            } else {
                formData.append('price', narx);
            }
            formData.append('description', Fulldata);
            formData.append('tags', JSON.stringify(tagSearchResult));
            formData.append('poster', customePoster.file);

            formData.append('category', category_id[0]);
            formData.append('document', livePosterFile?.id);
            if (!free) {
                formData.append('short_content', fileImgFile?.file);
            }

            if (extraFiles) {
                formData.append('extra_file', extraFiles);
            }

            try {
                openClose('#staticBackdrop-2');

                const response = await fetch(
                    `${baseUrl}seller/video-product-create/`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${user?.access}`,
                        },
                        body: formData,
                    }
                );

                if (response.ok) {
                    openClose('#staticBackdrop-2');
                    Router.push('/account/myproducts');
                    const modal = Modal.warning({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content:
                            "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
                    });
                } else {
                    openClose('#staticBackdrop-2');
                    const errorMessage = await response.json();
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik!',
                        content: errorMessage?.msg?.map((item) => item),
                    });
                    throw new Error(errorMessage?.msg);
                }
            } catch (err) {
                console.log(err);
            }

            setDeisabled(false);
        } else {
            const modal = Modal.warning({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Iltimos maydonlarni to'ldiring!",
            });
        }
    }

    async function getVideoFunk() {
        const ItemsData = await GetRepository.getVideoSize(user?.access);
        if (ItemsData) {
            setVideoSize(ItemsData);
        }
    }

    async function PostFilePoster() {
        if (fileImgFileID && fileImgFileID?.size) {
            if (
                Math.ceil(fileImgFileID?.size / 1024 / 1024) <
                videosize?.empty_storage_size
            ) {
                setLivePosterFile('');

                const formData = new FormData();
                setLoading(true);
                formData.append('file', fileImgFileID);
                const ItemsData =
                    await PostsRepository.PostsMyProductsPosterVideo(
                        formData,
                        user?.access
                    );

                if (ItemsData?.status === 201) {
                    if (!ItemsData?.data?.images) {
                        setLivePosterFile({ ...ItemsData?.data, images: [] });
                    } else {
                        setLivePosterFile(ItemsData?.data);
                    }

                    setLoading(false);
                } else {
                    setLoading(false);
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik!',
                        content: ItemsData?.msg?.map((item) => item),
                    });
                }
            } else {
                const modal = Modal.warning({
                    centered: true,
                    title: 'Ogohlantirish!',
                    content: (
                        <div>
                            <p>
                                {videosize?.empty_storage_size} MB dan katta
                                hajmli Video yuklay olmaysiz!
                            </p>
                            <p>
                                Agar qo'shimcha joy sotib olishni istasangiz
                                Xotira sotib olish tugmasiga bosing!
                            </p>
                            <p className='btn btn-outline-success fs-5' style={{ cursor: 'pointer' }} onClick={() => (Router.push("/account/buying_traffic"), modal.destroy())} > Xotira sotib olish </p>
                        </div>
                    ),
                });
            }
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content:
                    "Video yuklashda xatolik yuz berdi. Qaytadan urinib ko'ring!",
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

    const handleFreeChange = (e) => {
        setFree(!free);
    };

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        GetItemsCategoryLists();
    }, []);

    useEffect(() => {
        if (fileImgFileID && fileImgFileID?.size) {
            PostFilePoster();
        }
    }, [fileImgFileID]);

    useEffect(() => {
        if (watch('file')) {
            setFileImgFileID(watch('file[0]'));
        }
    }, [watch('file')]);

    useEffect(() => {
        if (Math.round((watch('file_video[0]')?.size / 1024) / 1024) < 50) {
            const file = watch('file_video[0]');
            if (file) {
                const video = window.URL.createObjectURL(file);
                setFileImgFile({ file: file, video: video });
            }
        } else if (Math.round((watch('file_video[0]')?.size / 1024) / 1024) > 50) {
            const modal = Modal.warning({
                centered: true,
                title: 'Ogohlantirish!',
                content:
                    "Qisqa videoga 50 MB dan kichik bo'lishi kerak!",
            });
        }

    }, [watch('file_video')]);

    useEffect(() => {
        const images = watch('image[0]');
        if (images) {
            const img = window.URL.createObjectURL(images);
            setCustomePoster({ file: images, url: img });
        }
    }, [watch('image')]);

    useEffect(() => {
        if (user?.access) {
            ProfileUsers();
            getVideoFunk();
        }
    }, [user?.access]);



    return user?.role === 'seller' ? (
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
                            <div className="col-md-12 p-0  mt-3">
                                <div className="col-md-12  d-flex justify-content-between p-0 ">
                                    <h4 className="p-0">Video Mahsulot </h4>
                                    <p className={videosize?.empty_storage_size < 100 ? 'text-danger' : "text-success"}><i className="fa-solid fa-circle-exclamation"></i> Sizda Video yuklash uchun  qolgan joy {addPeriodToThousands(videosize?.empty_storage_size)} MB</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row mt-2">
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
                                            <Input
                                                name="title"
                                                type="text"
                                                className={'col-md-12 mb-2'}
                                                InputClassName={
                                                    'form-control  rounded-3 '
                                                }
                                                {...register('title', {
                                                    required:
                                                        "Video nomini to'ldirish majburiy",
                                                    validate: (value) =>
                                                        value.trim() !== '' ||
                                                        "Video nomi bo'sh bo'lishi mumkin emas",
                                                })}
                                                error={errors.title?.message}
                                            />
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Video sotish narxi: *</p>{' '}
                                                <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="d-flex">
                                                <Checkbox
                                                    defaultChecked={free}
                                                    className="col-md-4 d-flex align-items-center justify-content-start px-0 py-2"
                                                    onChange={handleFreeChange}>
                                                    Bepul
                                                </Checkbox>

                                                <InputNumber
                                                    required
                                                    disabled={free}
                                                    value={taxminiyNarx}
                                                    className="col-md-8 p-2 "
                                                    onValueChange={(e) => (
                                                        setTaxminiyNarx(
                                                            e.value
                                                        ),
                                                        setNarx(e.value)
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column mt-3">
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
                                                    onSearch={onSearch}>
                                                    {options}
                                                </Select>
                                            </div>
                                        </div>

                                        <div className=" col-md-12 d-flex flex-column ">
                                            <div className="m-0 pt-2 d-flex justify-content-between p-0">
                                                <p>Teglar:</p>{' '}
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
                                                    onChange={handleChange}>
                                                    {children}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12 d-flex flex-column ">
                                            
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Video(asosiy): *</p>{' '}

                                                <Tooltip title="Mijozlar to’lov qiglanidan so’ng, ko'rish mumkin bo’lgan video. Mahsulotingiz ixtiyoriy turdagi video bo’lishi mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="add-product-user-image d-flex flex-column justify-content-center align-content-center form-control py-5 rounded-3 text-truncate"
                                                    style={{
                                                        backgroundColor: errors
                                                            .file?.message
                                                            ? ' #fff'
                                                            : '#F1F1F1',
                                                        border: errors.file
                                                            ?.message
                                                            ? '1px solid red'
                                                            : '1px dashed green',
                                                        width: '100%',
                                                    }}>
                                                    {!fileImgFileID ||
                                                        livePosterFile === '' ? (
                                                        <span
                                                            className="d-flex flex-column align-items-center"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}>
                                                            {loading ? (
                                                                <span className="d-flex justify-content-center">
                                                                    <ClipLoader
                                                                        size={
                                                                            25
                                                                        }
                                                                        color="#36d7b7"
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className="d-flex flex-column align-items-center "
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                    }}>
                                                                    <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                                    <span>
                                                                        Asosiy
                                                                        video
                                                                    </span>

                                                                </span>
                                                            )}
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
                                                        name="file"
                                                        type="file"
                                                        {...register('file', {
                                                            required:
                                                                "Video qo'shish majburiy",
                                                            validate: (value) =>
                                                                !!value[0] ||
                                                                'Video tanlanishi majburiy',
                                                        })}
                                                        accept="video/*"
                                                    />
                                                </label>

                                                <p
                                                    className={
                                                        'my-2  text-danger'
                                                    }>
                                                    {errors?.file?.message}
                                                </p>
                                            </div>
                                        </div>
                                        {free ? <></> :
                                            <div className="col-md-12 d-flex flex-column ">
                                                <p className='text-warning p-0 m-0 mt-3'>Qisqa video 50 MB dan kichik bo'lishi kerak!</p>
                                             
                                                <div className="d-flex justify-content-between p-0">
                                                    <p>
                                                        Video(qisqa ko'rish uchun):
                                                        *
                                                    </p>{' '}
                                                    <Tooltip title="Mijozlar mahsulotingizni sotib olishdan oldin ushbu qisa 50MB'dan oshmagan treylerni ko'rib ishonch hosil qilishadi va mahsulotingizni sotib olishadi. Mahsulotingiz ixtiyoriy turdagi video bo’lishi mumkin.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="add-product-user-image d-flex flex-column justify-content-center  align-content-center form-control py-5 rounded-3 text-truncate"
                                                        style={{
                                                            backgroundColor: errors
                                                                .file_video?.message
                                                                ? ' #fff'
                                                                : '#F1F1F1',
                                                            border: errors
                                                                .file_video?.message
                                                                ? '1px solid red'
                                                                : '1px dashed green',
                                                            width: '100%',
                                                        }}>
                                                        {!fileImgFile ? (
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
                                                            name="file_video"
                                                            type="file"
                                                            {...register(
                                                                'file_video',
                                                                {
                                                                    required:
                                                                        "Qisqa video qo'shish majburiy",
                                                                    validate: (
                                                                        value
                                                                    ) =>
                                                                        !!value[0] ||
                                                                        'Qisqa video tanlanishi majburiy',
                                                                }
                                                            )}
                                                            accept="video/*"
                                                        />
                                                    </label>
                                                    <p
                                                        className={
                                                            'my-2  text-danger'
                                                        }>
                                                        {
                                                            errors?.file_video
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                        }

                                        <div className="col-md-12  d-flex flex-column ">
                                            <div className=" mt-2 d-flex justify-content-between p-0">
                                                <p>Video poster rasmi: *</p>
                                                <Tooltip title="Mijozlarni mahsulotingizga e'tiborini tortib qiziqtirish uchun video poster yuklang. U posterni maxsus yasashingiz yoki videoingizni eng qiziq bo'lgan qismini screenshot qilib yuklashingiz mumkin bo'ladi.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>
                                            <div className="w-full">
                                                <div
                                                    className="add-product-user-image d-flex justify-content-between gap-3  form-control p-2 pt-2 rounded-3"
                                                    style={{
                                                        backgroundColor: errors
                                                            .image?.message
                                                            ? ' #fff'
                                                            : '#F1F1F1',
                                                        border: errors.image
                                                            ?.message
                                                            ? '1px solid red'
                                                            : '1px dashed green',
                                                        width: '100%',
                                                        height: '100px',
                                                    }}>
                                                    <label
                                                        className="m-0"
                                                        style={{
                                                            width: '45%',
                                                            cursor: 'pointer',
                                                            backgroundColor:
                                                                errors.image
                                                                    ?.message
                                                                    ? ' #fff'
                                                                    : '#F1F1F1',
                                                            border: errors.image
                                                                ?.message
                                                                ? '1px solid red'
                                                                : '1px dashed green',
                                                            borderRadius: '5px',
                                                            position:
                                                                'relative',
                                                        }}>
                                                        <i className="fa-solid fa-plus fs-1 mt-5  mx-3 plus-icon-style "></i>
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            {...register(
                                                                'image',
                                                                {
                                                                    required:
                                                                        "Video rasmini qo'shish majburiy",
                                                                    validate: (
                                                                        value
                                                                    ) =>
                                                                        !!value[0] ||
                                                                        'Video rasmi tanlanishi majburiy',
                                                                }
                                                            )}
                                                            accept="image/*"
                                                            style={{
                                                                width: '50px',
                                                            }}
                                                        />
                                                    </label>
                                                    <div
                                                        className=""
                                                        style={{
                                                            width: '50%',
                                                            cursor: 'pointer',
                                                            backgroundColor:
                                                                errors.image
                                                                    ?.message
                                                                    ? ' #fff'
                                                                    : '#F1F1F1',
                                                            border: errors.image
                                                                ?.message
                                                                ? '2px solid red'
                                                                : '1px dashed green',
                                                            borderRadius: '5px',
                                                            position:
                                                                'relative',
                                                        }}>
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                            src={
                                                                customePoster?.url ||
                                                                '../../../static/img/videoposter.jpg'
                                                            }
                                                            alt="poster/video"
                                                        />
                                                    </div>
                                                </div>
                                                <p
                                                    className={
                                                        'my-2  text-danger'
                                                    }>
                                                    {errors?.image?.message}
                                                </p>
                                            </div>
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
                                            className="btn btn-success py-3 ">
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
                                src={fileImgFile?.video}
                                poster={customePoster?.url}
                                style={{ maxHeight: '250px' }}></video>
                            <div className="col-md-12 d-flex flex-column ">
                                <div className=" mt-2 d-flex justify-content-between p-0">
                                    <p>Qo'shimcha fayllar uchun (.zip)</p>{' '}
                                    <Tooltip title="Mijozlar mahsulotingizni sotib olgandan so'ng, unga tegishli bo'lgan yana boshqa qo'shimcha faylar bo'lsa yuklang. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .zip">
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
                                                <span>Qo'shimcha fayllar</span>
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
                </div>

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
                                            <div
                                                className="py-5 d-flex gap-3"
                                                style={{
                                                    flexDirection: 'column',
                                                }}>
                                                <span className="d-flex justify-content-center gap-3">
                                                    <span>Yuklanmoqda</span>
                                                    <ClipLoader
                                                        size={25}
                                                        color="#36d7b7"
                                                    />
                                                </span>
                                                <p
                                                    style={{
                                                        fontSize: '20px',
                                                        textAlign: 'center',
                                                    }}
                                                    className="fw-semibold">
                                                    Video yuklanmoqda bu sizning
                                                    internet tezligingizga qarab
                                                    turlicha vaqt olishi mumkin
                                                </p>

                                                <div className="d-flex gap-3 justify-content-center">
                                                    <button
                                                        className="btn btn-danger py-3 "
                                                        onClick={() => {
                                                            openClose(
                                                                '#staticBackdrop-2'
                                                            );
                                                            window.location.reload();
                                                        }}>
                                                        <span className="fs-4 px-5">
                                                            Bekor qilish{' '}
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="btn btn-success py-3 "
                                                        onClick={() => {
                                                            window.open(
                                                                'http://localhost:3000/account/myproducts/upload-video',
                                                                '_blank'
                                                            );
                                                        }}>
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
                                        <>
                                            {!fileImgFileID ? (
                                                <div className="video_container">
                                                    <div className="video_content">
                                                        <video
                                                            className=" border w-100"
                                                            controls
                                                            preload="none"
                                                            src={
                                                                fileImgFile?.video
                                                            }
                                                            poster={
                                                                customePoster?.url
                                                            }
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
                                                        objectFit: 'cover',
                                                    }}
                                                    height={350}
                                                />
                                            )}
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
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
