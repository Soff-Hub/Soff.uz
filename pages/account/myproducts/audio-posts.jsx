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
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import Meta from '~/components/shared/headers/Meta';
import DefaultAudioLive from '~/components/elements/detail/thumbnail/DefaultAudioLive';
import ModuleAudioDetailTopInformationLive from '~/components/elements/detail/modules/ModuleAudioDetailTopInformationLive';
import ModuleAudioDetailShoppingActionsLive from '~/components/elements/detail/modules/ModuleAudioDetailShoppingActionsLive';
import Link from 'next/link';
import { InputNumber } from 'primereact/inputnumber';
import { useForm } from 'react-hook-form';
import Input from '~/components/form/Input';
import Progress from '~/components/progress/progress';



const category_id = [];

const AudioPosts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [narxNomi, setNarxNomi] = useState(true);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [liveFile, setLiveFile] = useState('');
    const [narx, setNarx] = useState('');
    const [free, setFree] = useState(false);
    const [audioPost, setAudioPost] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [customeFile, setCustomeFile] = useState(null);


    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Audio qo’shish',
        },
    ];

    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData);
    }

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryListsAudio();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    const Option = Select.Option;

    const onChange = async (e) => {
        category_id.length = 0;
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                category_id.push(dataCategory[j].id);
            }
        }

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
            category_id: category_id[0],
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



    const onSearch = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryListsAudio(value);
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
        return text ? text : ''
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

    async function handleClickPosts(data) {
        if (audioPost?.id) {
            setLoading2(true);
            const formData = new FormData();
            formData.append('title', data?.title);
            if (free) {
                formData.append('price', 0);
            } else {
                formData.append('price', narx);
            }
            formData.append('description', Fulldata);
            formData.append('tags', tagSearchResult);
            formData.append('document', audioPost?.id);
            formData.append('poster', fileImgPoster)
            formData.append('category', category_id?.[0])

            const patchItems = await PatchRepository.getPatchPoster(
                formData,
                user?.access
            );
            if (patchItems?.status === 201) {
                Router.push('/account/myproducts');
                const modal = Modal.warning({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content:
                        "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
                });
                setLoading2(false);
            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: patchItems?.data.msg,
                });
            }
        }
        else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: "Iltimos audio yuklab davom etishingiz mumkin!",
            });
        }
    }


    useEffect(() => {
        const selectedImage = watch('image[0]');
        setFileImgPoster(selectedImage);
        if (selectedImage) {
            const img = window?.URL?.createObjectURL(selectedImage);
            setLiveFile(img);
        }
    }, [watch('image')]);



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
        if (user?.access) {
            ProfileUsers();
        }
    }, [user?.access]);


    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Yangi mahsulot yaratish'} />
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

                        <div className={` rounded-3 col-md-8 mb-2`}>
                            <form
                                onSubmit={handleSubmit(handleClickPosts)}
                                style={{ position: 'relative', width: '100%' }}
                                id="FormPostsMyProducts"
                                className=" col-md-12 pb-5"

                                noValidate>
                                <div className="row   mt-3">
                                    <div className="col-md-4  d-flex justify-content-between p-0 ">
                                        <h4 className=" p-0">
                                            Yangi mahsulot{' '}
                                        </h4>
                                    </div>
                                </div>

                                <div className="row   mt-3">
                                    <div className="col-md-4  d-flex justify-content-between p-0 ">
                                        <p>Audio nomi: *</p>
                                        <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                        </Tooltip>
                                    </div>
                                    <Input
                                        name="title"
                                        type="text"
                                        className={"col-md-8 mb-2"}
                                        InputClassName={"form-control  rounded-3 "}
                                        {...register('title', {
                                            required: 'Maydon toldirish majburiy',
                                            validate: value => value.trim() !== "" || "Nomi bo'sh bo'lishi mumkin emas"
                                        })}
                                        error={errors.title?.message}
                                    />
                                </div>

                                <div className="row ">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Audio: *</p>{' '}
                                        <Tooltip title="Mijozlar to’lov qilganidan so’ng, yuklab olishlari mumkin bo’lgan audio. Mahsulotingiz quyidagi turdag audio bo’lishi mumkin: .mp3">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div className='col-md-8 p-0'>
                                        <Progress
                                            setDocument={setAudioPost}
                                            setLoading={setLoading}
                                            accept={"audio/mp3"}
                                            inputText={"Mahsulot (audio) yuklash uchun ushbu hududga bosing (.mp3)"}
                                            loadingText={"Audio tayyorlanmoqda..."}
                                            content_type={"audio"}
                                            setCustomeFile={setCustomeFile}
                                        />

                                    </div>




                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Audio posteri: *</p>{' '}
                                        <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz rasmi quyidagi turdagi fayl bo’lishi mumkin:  .jpeg yoki .jpg, .png, .svg">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div className='col-md-8 p-0'>
                                        <label
                                            className="add-product-user-image d-flex flex-column justify-content-center  align-content-center form-control py-5 rounded-3 text-truncate"
                                            style={{
                                                height: '61px',
                                                backgroundColor: errors.image?.message ? " #fff" : '#F1F1F1',
                                                border: errors.image?.message ? '1px solid red' : "1px dashed green",
                                                width: '100%',
                                            }}>
                                            <input
                                                name='image'
                                                type="file"
                                                {...register('image', {
                                                    required: "Rasm to'ldirish majburiy",
                                                    validate: value => !!value[0] || "Rasm tanlanishi majburiy"
                                                })}
                                                accept="image/*"
                                            />
                                            {
                                                liveFile !== '' ? <span
                                                    className="d-flex flex-column align-items-center"
                                                    style={{ cursor: 'pointer' }}>
                                                    <span>
                                                        {' '}
                                                        Siz rasm yukladingiz{' '}
                                                        <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                    </span>
                                                </span> :
                                                    <span
                                                        className="d-flex flex-column align-items-center "
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}>
                                                        <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                        <span>
                                                            Mahsulot rasmni yuklash uchun
                                                            ushbu hududga bosing.
                                                        </span>
                                                    </span>

                                            }
                                        </label>
                                        <p className={"my-2  text-danger"}>
                                            {errors?.image?.message}
                                        </p>
                                    </div>
                                </div>

                                <div className=" row ">
                                    <div className="col-md-4 m-0 pt-2 d-flex justify-content-between p-0">
                                        <p>Teglar:</p>{' '}
                                        <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div className="rounded-3  p-0 m-0 d-flex flex-column col-md-8">
                                        <Select
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            onChange={handleChange}>
                                            {children}
                                        </Select>
                                    </div>
                                </div>
                                <div className=" row  mt-2">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Kategoriya: *</p>{' '}
                                        <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div className="rounded-3  p-0 m-0 d-flex flex-column col-md-8">
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
                                <div className="row mt-3">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Audio sotish narxi: *</p>{' '}
                                        <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <Checkbox
                                        defaultChecked={free}
                                        className="col-md-2 d-flex align-items-center justify-content-start px-0 py-2"
                                        onChange={handleFreeChange}>
                                        Bepul
                                    </Checkbox>
                                    <InputNumber
                                        required
                                        disabled={free}
                                        value={taxminiyNarx}
                                        className="col-md-6 p-2 price_input_number"
                                        onValueChange={(e) => (
                                            setNarxNomi(false),
                                            setTaxminiyNarx(e.value),
                                            setNarx(e.value)
                                        )}
                                    />
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-4 d-flex justify-content-between p-0">
                                        <p>Audio to’liq tavsifi: </p>{' '}
                                        <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div className=" p-0 rounded-3 col-md-8">
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
                                    style={{ transform: 'translateX(16px)' }}>
                                    {loading2 ? (
                                        <button
                                            type="submit"
                                            className="btn btn-success py-3 "
                                            style={{ minWidth: '235px' }}>
                                            <div
                                                className="spinner-border"
                                                role="status">
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>
                                        </button>
                                    ) : (
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="btn btn-success py-3 ">
                                            <span className="fs-4 px-5">
                                                Audio qo'shish{' '}
                                                <i className="fa-solid fa-cloud-arrow-up mx-2"></i>
                                            </span>
                                        </button>
                                    )}
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
                        </div>
                        <div
                            className="col-md-4 rounded-3  p-3 cardResponsive  card mt-3"
                            style={{ maxWidth: '370px' }}>
                            <div className={` ${'image_audio mb-3'} `}>
                                <>
                                    {!liveFile ? (
                                        <>
                                            {audioPost?.short_content ? (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}>
                                                    <audio
                                                        type="audio/.mp3"
                                                        controls
                                                        src={
                                                            audioPost?.short_content
                                                        }></audio>
                                                </div>
                                            ) : (
                                                <div className="w-full d-flex justify-content-center ">
                                                    <img
                                                        src={
                                                            '/static/img/audio_null.png'
                                                        }
                                                        alt="doc"
                                                        className="mb-4 "
                                                        style={{
                                                            objectFit: 'cover',
                                                            width: '230px',
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <img
                                            src={liveFile}
                                            alt="doc"
                                            className="border mb-4 w-100"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                </>
                            </div>
                            <div className="text-start">
                                <p className="live-card-p">
                                    <strong>Nomi : </strong>{' '}
                                    <span style={{ maxWidth: `150px` }}>
                                        {watch("title") ? watch("title") : "To'ldirilmadi"}
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <strong>Narxi : </strong>
                                    <strong style={{ maxWidth: '150px' }}>
                                        <span>
                                            {' '}
                                            {taxminiyNarx
                                                ? addPeriodToThousands(
                                                    taxminiyNarx
                                                ) + "so'm"
                                                : "To'ldirilmadi"}
                                        </span>
                                    </strong>
                                </p>
                                <p className="live-card-p">
                                    <strong>Kategoriyasi : </strong>{' '}
                                    <span style={{ maxWidth: '150px' }}>
                                        {categoryName
                                            ? categoryName
                                            : "To'ldirilmadi"}{' '}
                                    </span>
                                </p>

                                <p className="live-card-p">
                                    <strong>Taglari : </strong>
                                    {/* <span style={{maxWidth:'150px'}} > </span> */}
                                    {tagSearchResult.length > 0
                                        ? tagSearchResult?.map((item, i) => {
                                            return (
                                                <span key={i}>{item} </span>
                                            );
                                        })
                                        : "To'ldirilmadi"}
                                </p>

                                <p className="live-card-p">
                                    <span>
                                        <strong className="fs-4">
                                            Qisqa tavsif
                                        </strong>
                                        :{' '}
                                    </span>
                                    <ul
                                        style={{ maxWidth: '200px' }}
                                        className="">
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Davomiyligi:{' '}
                                            </strong>{' '}
                                            {audioPost?.content_duration
                                                ? audioPost?.content_duration
                                                : ' '}{' '}
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Hajmi :{' '}
                                            </strong>{' '}
                                            {audioPost?.file_size}
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Turi :{' '}
                                            </strong>{' '}
                                            {audioPost?.file_type}
                                        </li>
                                    </ul>
                                </p>

                                <p className="live-card-p ">
                                    <strong> To'liq ma'lumot : </strong>{' '}
                                    <span style={{ maxWidth: '150px' }}>
                                        {Fulldata
                                            ? parse(Fulldata)
                                            : "To'ldirilmadi"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="offcanvas offcanvas-end"
                        tabindex="-1"
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h4 id="offcanvasRightLabel" className="mt-5 ">
                                <span>
                                    Qo'shayotgan mahsulotingizni ko'rinishi
                                </span>{' '}
                            </h4>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="card  rounded-3 ">
                                <div className="image rounded mb-3">
                                    {!liveFile ? (
                                        <img
                                            src={'/static/img/docCopy.png'}
                                            alt="doc"
                                            className="border mb-4"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <img
                                            src={liveFile}
                                            alt="doc"
                                            className="mb-4 border"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div className="text-start">
                                    <p className="live-card-p">
                                        <strong>Nomi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {' '}
                                            {watch("title") ? watch("title") : "To'ldirilmadi"}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Narxi : </strong>
                                        <strong style={{ maxWidth: '150px' }}>
                                            <span>
                                                {' '}
                                                {taxminiyNarx
                                                    ? addPeriodToThousands(
                                                        removePrefix(
                                                            taxminiyNarx
                                                        )
                                                    ) + "so'm"
                                                    : "To'ldirilmadi"}
                                            </span>
                                        </strong>
                                    </p>
                                    <p className="live-card-p">
                                        <strong>Kategoriyasi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {categoryName
                                                ? categoryName
                                                : "To'ldirilmadi"}{' '}
                                        </span>
                                    </p>

                                    <p className="live-card-p">
                                        <strong>Taglari : </strong>
                                        {/* <span style={{maxWidth:'150px'}} > </span> */}
                                        {tagSearchResult.length > 0
                                            ? tagSearchResult?.map(
                                                (item, i) => {
                                                    return (
                                                        <span key={i}>
                                                            {item}{' '}
                                                        </span>
                                                    );
                                                }
                                            )
                                            : "To'ldirilmadi"}
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong className="fs-4">
                                                Qisqa tavsif
                                            </strong>
                                            :{' '}
                                        </span>
                                        <ul
                                            style={{ maxWidth: '150px' }}
                                            className="">
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Davomiyligi:{' '}
                                                </strong>{' '}
                                                {audioPost?.content_duration
                                                    ? audioPost?.content_duration
                                                    : ' '}{' '}
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Hajmi :{' '}
                                                </strong>{' '}
                                                {
                                                    audioPost?.file_size
                                                }
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Turi :{' '}
                                                </strong>{' '}
                                                {
                                                    audioPost?.file_type
                                                }
                                            </li>
                                        </ul>
                                    </p>
                                    <p className="live-card-p">
                                        <strong> To'liq ma'lumot : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {Fulldata
                                                ? parse(Fulldata)
                                                : "To'ldirilmadi"}
                                        </span>
                                    </p>
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
                                    <div className="col-12">
                                        <DefaultAudioLive
                                            product={audioPost}
                                            liveFile={liveFile}
                                            title={watch("title")}
                                            categoryName={categoryName}
                                        />
                                        <ModuleAudioDetailTopInformationLive
                                            product={profile}
                                            views={0}
                                            admin={true}
                                            taxminiyNarx={taxminiyNarx}
                                        />
                                        <div className="price_and_tag">
                                            <ModuleAudioDetailShoppingActionsLive
                                                admin={true}
                                                free={free}
                                            />

                                            <>
                                                {
                                                    <div className="">
                                                        <p>Tezkor teglar</p>
                                                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                            {tagSearchResult?.length >
                                                                0 &&
                                                                tagSearchResult?.map(
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
                                                                                        item
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
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default AudioPosts;
