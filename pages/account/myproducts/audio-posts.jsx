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
import { Button, Checkbox, Modal, Progress, Select, Tabs, Tooltip } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import Meta from '~/components/shared/headers/Meta';
import DefaultAudioLive from '~/components/elements/detail/thumbnail/DefaultAudioLive';
import ModuleAudioDetailTopInformationLive from '~/components/elements/detail/modules/ModuleAudioDetailTopInformationLive';
import ModuleAudioDetailShoppingActionsLive from '~/components/elements/detail/modules/ModuleAudioDetailShoppingActionsLive';
import Link from 'next/link';
import { InputNumber } from 'primereact/inputnumber';

const category_id = [];

const AudioPosts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [fileImgAudio, setFileImgAudio] = useState(null);
    const [fileImgFileID, setFileImgFileID] = useState('');
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [narxNomi, setNarxNomi] = useState(true);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [livePosterAudio, setLivePosterAudio] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [liveFile, setLiveFile] = useState('');
    const [narx, setNarx] = useState('');
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [free, setFree] = useState(false);
    const [audioPost, setAudioPost] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [profile, setProfile] = useState(null);
    const maxCompleted = 100;
    const [progress, setProgress] = useState(0);
    const [socket, setSocket] = useState(null);

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

    async function handleClickPosts(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        if (free) {
            formData.append('price', 0);
        } else {
            formData.append('price', narx);
        }
        formData.append('description', Fulldata);
        formData.append('tags', tagSearchResult);
        formData.append('document', livePosterAudio?.id);
        liveFile?.images?.[0]?.id
            ? formData.append('poster_id', liveFile?.images?.[0]?.id)
            : 'None',
            fileImgPoster ? formData.append('poster', fileImgPoster) : 'None',
            fileImgFileID ? formData.append('poster_id', fileImgFileID) : '',
            formData.append('category', category_id[0]);

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
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: patchItems?.data.msg,
            });
        }
    }

    async function PostAudioPoster() {
        if (fileImgAudio) {
            const progresInterval = setInterval(() => {
                if (maxCompleted <= completed) {
                    clearInterval(progresInterval);
                } else {
                    setCompleted((completed += 1));
                }
            }, 1000);
            setLiveFile('');
            setLivePosterAudio('');
            const formData = new FormData();
            setLoadingAudio(true);
            formData.append('file', fileImgAudio);
            formData.append('content_type', 'audio');

            const ItemsData = await PostsRepository.PostsMyProductsPoster(
                formData,
                user?.access
            );
            if (ItemsData?.status === 201) {
                clearInterval(progresInterval);
                setCompleted(100);
                setLivePosterAudio(ItemsData?.data);
                setAudioPost(ItemsData);
                if (progress == 100) {
                    setTimeout(() => {
                        setProgress(0);
                    }, 1000);
                }
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Yangi audio qo'shdingiz ",
                });
            } else {
                if (progress == 100) {
                    setTimeout(() => {
                        setProgress(0);
                    }, 1000);
                }
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: `${
                        ItemsData?.status === 400
                            ? ItemsData?.data?.msg
                                ? ItemsData?.data?.msg
                                : "Sizning mahsulotingiz belgilangan hajmdan oshib ketti, bunday hajmli mahsulot qo'llab quvvatlamaydi "
                            : ItemsData?.status === 413
                            ? "Sizning mahsulotingiz belgilangan hajmdan oshib ketti, bunday hajmli mahsulot qo'llab quvvatlanmaydi "
                            : "Audio mahsulot qo'sha olmadingiz "
                    }`,
                });
            }
            setLoadingAudio(false);
        }
    }

    function LiveImage(e) {
        setFileImgFileID('');
        setFileImgPoster(e.target.files[0]);
        const img = window.URL.createObjectURL(e.target.files[0]);
        setLiveFile(img);
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

    const handleFreeChange = (e) => {
        setFree(!free);
    };

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        GetItemsCategoryLists();
    }, []);

    useEffect(() => {
        PostAudioPoster();
    }, [fileImgAudio]);

    useEffect(() => {
        if (user?.access) {
            ProfileUsers();
        }
    }, [user?.access]);

    useEffect(() => {
        if (user?.access) {
            setSocket(
                new WebSocket(
                    `wss://api.soff.uz/ws/document-progress/?token=${user?.access}`
                )
            );

            // Agar user?.access mavjud bo'lsa
            const newSocket = new WebSocket(
                `wss://api.soff.uz/ws/document-progress/?token=${user?.access}`
            );

            // Yangi WebSocket ulanishini yaratish
            newSocket.onopen = function () {
                // console.log('WebSocket progress ulanishi amalga oshirildi.');
            };

            // Xabarlarni qabul qilish uchun funksiya
            if (newSocket) {
                newSocket.onmessage = function (event) {
                    // console.log('socketttt', JSON.parse(event.data).progress);
                    setProgress(JSON.parse(event.data).progress);
                };
            }

            // WebSocket ulanishida xatolik bo'lganida ishlaydigan funksiya
            newSocket.onerror = function (error) {
                console.error('WebSocket xatosi:', error);
            };

            // useEffect funksiyasiga qaytariladigan cleanup funksiya
            return () => {
                // WebSocket ulanishini yopish
                newSocket.close();
            };
        }
    }, [user?.access]);

    useEffect(() => {
        if (user?.access) {
            // Agar user?.access mavjud bo'lsa
            const newSocket = new WebSocket(
                `wss://api.soff.uz/ws/document-progress/?token=${user?.access}`
            );

            // Yangi WebSocket ulanishini yaratish
            newSocket.onopen = function () {
                // console.log('WebSocket progress ulanishi amalga oshirildi.');
            };

            // Xabarlarni qabul qilish uchun funksiya
            if (newSocket) {
                newSocket.onmessage = function (event) {
                    setSocket(JSON.parse(event.data));
                };
            }

            // WebSocket ulanishida xatolik bo'lganida ishlaydigan funksiya
            newSocket.onerror = function (error) {
                console.error('WebSocket xatosi:', error);
            };

            // useEffect funksiyasiga qaytariladigan cleanup funksiya
            return () => {
                // WebSocket ulanishini yopish
                newSocket.close();
            };
        }
    }, [user?.access]);

    return user?.role === 'seller' || user?.role === 'customer' ? (
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

                        <div className={` rounded-3 col-md-8 mb-2`}>
                            <form
                                onSubmit={handleClickPosts}
                                style={{ position: 'relative', width: '100%' }}
                                id="FormPostsMyProducts"
                                className=" col-md-12 pb-5">
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
                                    <input
                                        required
                                        type="text"
                                        className="form-control  rounded-3 col-md-8 mb-2"
                                        name="title"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
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

                                    <label
                                        className="add-product-user-image d-flex flex-column justify-content-center col-md-8 align-content-center form-control py-5 rounded-3 text-truncate"
                                        style={{
                                            backgroundColor: '#F1F1F1',
                                            border: '1px dashed green',
                                            width: '100%',
                                        }}>
                                        {livePosterAudio === '' ? (
                                            <span
                                                className="d-flex flex-column align-items-center"
                                                style={{ cursor: 'pointer' }}>
                                                {loadingAudio ? (
                                                    <Tooltip title="Mahsulot yuklash davom etmoqda">
                                                        <Progress
                                                            percent={
                                                                socket?.progress
                                                            }
                                                            success={{
                                                                percent: 30,
                                                            }}
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <span
                                                        className="d-flex flex-column align-items-center "
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}>
                                                        <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                        <span>
                                                            Mahsulot (audio)
                                                            yuklash uchun ushbu
                                                            hududga bosing
                                                            (.mp3)
                                                        </span>
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            <span
                                                className="d-flex flex-column align-items-center"
                                                style={{ cursor: 'pointer' }}>
                                                <span>
                                                    {' '}
                                                    Siz audio yukladingiz{' '}
                                                    <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                </span>
                                            </span>
                                        )}
                                        <input
                                            required
                                            type="file"
                                            onChange={(e) =>
                                                setFileImgAudio(
                                                    e.target.files[0]
                                                )
                                            }
                                            accept="audio/mp3"
                                        />
                                    </label>
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
                                    <label
                                        className="add-product-user-image d-flex flex-column justify-content-center col-md-8 align-content-center form-control py-5 rounded-3 text-truncate"
                                        style={{
                                            backgroundColor: '#F1F1F1',
                                            border: '1px dashed green',
                                            height: '61px',
                                        }}>
                                        <input
                                            type="file"
                                            onChange={(e) => LiveImage(e)}
                                            accept="image/*"
                                            style={{ width: '20px' }}
                                        />
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
                                    </label>
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
                                    {/* <input
                                        required
                                        type={narxNomi ? 'text' : 'number'}
                                        className="form-control  rounded-3 col-md-6"
                                        name="price"
                                        disabled={free}
                                        value={taxminiyNarx}
                                        onChange={(e) => (
                                            setNarxNomi(false),
                                            setTaxminiyNarx(e.target.value),
                                            setNarx(e.target.value)
                                        )}
                                    /> */}
                                    <InputNumber
                                    required
                                        disabled={free}
                                        value={taxminiyNarx}
                                        className="col-md-6 p-2"
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
                                    <button
                                        type="submit"
                                        className="btn btn-success py-3 ">
                                        <span className="fs-4 px-5">
                                            Audio qo'shish{' '}
                                            <i className="fa-solid fa-cloud-arrow-up mx-2"></i>
                                        </span>
                                    </button>
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
                                            {audioPost?.data?.short_content ? (
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
                                                            audioPost?.data
                                                                ?.short_content
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
                                        {title ? title : "To'ldirilmadi"}
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
                                            {livePosterAudio?.data
                                                ?.content_duration
                                                ? livePosterAudio?.data
                                                      ?.content_duration
                                                : ' '}{' '}
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Hajmi :{' '}
                                            </strong>{' '}
                                            {livePosterAudio?.data?.file_size}
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Turi :{' '}
                                            </strong>{' '}
                                            {livePosterAudio?.data?.file_type}
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
                                            {title ? title : "To'ldirilmadi"}
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
                                                {livePosterAudio?.data
                                                    ?.content_duration
                                                    ? livePosterAudio?.data
                                                          ?.content_duration
                                                    : ' '}{' '}
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Hajmi :{' '}
                                                </strong>{' '}
                                                {
                                                    livePosterAudio?.data
                                                        ?.file_size
                                                }
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Turi :{' '}
                                                </strong>{' '}
                                                {
                                                    livePosterAudio?.data
                                                        ?.file_type
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
                                            title={title}
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
