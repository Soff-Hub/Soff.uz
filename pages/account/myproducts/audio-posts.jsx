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

const category_id = [];

const AudioPosts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [fileImgFile, setFileImgFile] = useState(null);
    const [fileImgVideo, setFileImgVideo] = useState(null);
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
    const [livePosterFile, setLivePosterFile] = useState('');
    const [livePosterVideo, setLivePosterVideo] = useState('');
    const [livePosterAudio, setLivePosterAudio] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [liveFile, setLiveFile] = useState('');
    const [narx, setNarx] = useState('');
    const [chegirmaTek, setChegirmaTek] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [free, setFree] = useState(false);
    const [videoPost, setVideoPost] = useState(null);
    const [audioPost, setAudioPost] = useState(null);
    const [videoTab, setVideoTab] = useState('audio');
    const [completed, setCompleted] = useState(0);
    const [profile, setProfile] = useState(null);
    const maxCompleted = 100;
    const [progress, setProgress] = useState(0);
    const [emoje, setEmoje] = useState('');
    const [emojeTrue, setEmojeTrue] = useState(false);
    const [article, setArticle] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [socket, setSocket] = useState(null);

    // const Editor = useMemo(
    //     () => dynamic(() => import('@/components/Editor'), { ssr: false }),
    //     []
    // );

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

    const onChangeTabs = (key) => {
        setSocket(0);
        if (key === '2') {
            setVideoTab('video');
        } else if (key === '3') {
            setVideoTab('audio');
        } else if (key === '4') {
            setVideoTab('article');
        } else {
            setVideoTab('file');
        }
        // setSocket(0);
        // setCompleted(0);
        // document.getElementById('FormPostsMyProducts').reset();
        // setLiveFile('');
        // setLivePosterFile('');
        // setLivePosterVideo('');
        // setLivePosterAudio('');

        // setVideoPost('');
        // setAudioPost('');

        // setTitle('');
        // setTaxminiyNarx('');
        // setNarx('');
        // setCategoryName('');
        // setFullData('');
        // setTagSearchResult([]);
    };

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryLists();
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
        const ItemsData = await GetRepository.getAllCategoryLists(value);
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
        if (text.startsWith(prefix)) {
            return text.slice(prefix.length);
        }
        return text;
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
        liveFile?.images?.[0]?.id
            ? formData.append('poster_id', liveFile?.images?.[0]?.id)
            : 'None',
            fileImgPoster ? formData.append('poster', fileImgPoster) : 'None',
            fileImgFileID ? formData.append('poster_id', fileImgFileID) : '',
            formData.append('category', category_id[0]);
        formData.append(
            'document',
            livePosterVideo?.data?.id
                ? livePosterVideo?.data?.id
                : livePosterAudio?.data?.id
                ? livePosterAudio?.data?.id
                : livePosterFile.id
        );

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

    async function handleClickPostsArticle(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tags', tagSearchResult);
        formData.append('category', category_id[0]);
        formData.append('title', emoje ? emoje + articleTitle : articleTitle);
        formData.append('description', article);
        formData.append('price', 0);

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

    async function handleClickPostsArticle(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tags', tagSearchResult);
        formData.append('category', category_id[0]);
        formData.append('title', emoje ? emoje + articleTitle : articleTitle);
        formData.append('description', article);
        formData.append('price', 0);

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

    async function PostFilePoster() {
        if (fileImgFile) {
            setLiveFile('');
            setLivePosterFile('');
            const formData = new FormData();
            setLoading(true);
            formData.append('file', fileImgFile);
            formData.append('content_type', 'file');
            const ItemsData = await PostsRepository.PostsMyProductsPoster(
                formData,
                user?.access
            );

            //   const respons = await fetch(
            //         `${baseUrl}product-create-first/`,
            //         {

            //         method: 'POST',
            //         body: formData,
            //         headers: {
            //             Authorization: `Bearer ${user?.access}`,
            //         },
            //     })
            //     .then(res => {
            //         const contentLength = res.headers.get('content-length')
            //         console.log('contentLength', contentLength);
            //         let loaded = 0

            //         return new Response(
            //             new ReadableStream({
            //                 start(controller) {
            //                    const reader =  res.body.getReader()

            //                     read()
            //                    function read() {
            //                     reader.read()
            //                     .then((progressEvent) => {
            //                         if (progressEvent.done === true) {
            //                             controller.close();
            //                             return;
            //                         }
            //                         loaded += progressEvent.value.byteLength;
            //                         console.log(Math.round((loaded/contentLength)*100)+"%");
            //                         controller.enqueue(progressEvent.value)
            //                         read()
            //                     })

            //                    }

            //                 }
            //             })
            //         )

            //     })
            //     .then(res => res.blob())
            //     .then(blob => {
            //         const url = URL.createObjectURL(blob);
            //         const img = new Image();
            //         img.src = url
            //         console.log("img", img);
            //     })
            if (
                ItemsData?.status === 201 &&
                ItemsData?.data?.images?.length > 0
            ) {
                setCompleted(100);
                setLivePosterFile(ItemsData?.data);
                if (progress == 100) {
                    setTimeout(() => {
                        setProgress(0);
                    }, 1000);
                }
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Yangi file qo'shdingiz ",
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
                            ? "Sizning mahsulotingiz belgilangan hajmdan oshib ketti, bunday hajmli mahsulot qo'llab quvvatlamaydi "
                            : "File mahsulot qo'sha olmadingiz "
                    }`,
                });
            }
            setLoading(false);
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
                setLivePosterAudio(ItemsData);
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

    const handleFreeChange = (e) => {
        setFree(!free);
    };

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        chegirma();
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

    const OnEditor = (value) => {
        console.log('editor', value);
        setArticle(value);
    };

    console.log('socket 2 ==> ', progress);
    let progrees = 0;
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
                console.log('WebSocket progress ulanishi amalga oshirildi.');
            };

            // Xabarlarni qabul qilish uchun funksiya
            if (newSocket) {
                newSocket.onmessage = function (event) {
                    console.log('socketttt', JSON.parse(event.data).progress);
                    setProgress(JSON.parse(event.data).progress)
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

    // useEffect(() => {
    //     if (socket) {
    //         socket?.addEventListener('message', (event) => {
    //             console.log('socket 1 => ', JSON.parse(event.data).progress);
    //             // setTimeout(() => {
    //             setProgress(JSON.parse(event.data).progress);
    //             // }, 1000);
    //         });
    //     }
    // }, [socket]);

  

    useEffect(() => {
        if (user?.access) {
            // Agar user?.access mavjud bo'lsa
            const newSocket = new WebSocket(
                `wss://api.soff.uz/ws/document-progress/?token=${user?.access}`
            );

            // Yangi WebSocket ulanishini yaratish
            newSocket.onopen = function () {
                console.log('WebSocket progress ulanishi amalga oshirildi.');
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
                            {/* <Tabs
                                defaultActiveKey="1"
                                items={items}
                                onChange={onChangeTabs}
                            /> */}
                            <form
                                onSubmit={handleClickPosts}
                                style={{ position: 'relative', width: '100%' }}
                                id="FormPostsMyProducts"
                                className=" col-md-12 pb-5">
                                <div className="row">
                                    <p className="eslatma">
                                        <i class="fa-solid fa-circle-exclamation"></i>{' '}
                                        <span>
                                            {' '}
                                            Audio yuklash test rejimida
                                            ishlamoqda{' '}
                                        </span>{' '}
                                    </p>
                                </div>
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
                                        <Tooltip title="Mijozlar to’lov qilganidan so’ng, yuklab olishlari mumkin bo’lgan video. Mahsulotingiz quyidagi turdag video bo’lishi mumkin: .mp4, .mov, .avi, .wmv, .avchd, .webm, .flv">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    {/* <div className="row"> */}
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
                                                    // <span className="d-flex justify-content-center">
                                                    //     <ClipLoader
                                                    //         size={25}
                                                    //         color="#36d7b7"
                                                    //     />
                                                    // </span>
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
                                                            hududga bosing.
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
                                            accept="audio/*"
                                        />
                                        {/* {completed === 0 ? (
                                <></>
                            ) : (
                                <div className=" my-2">
                                    <ProgressBar
                                        completed={completed}
                                        maxCompleted={maxCompleted}
                                        width="100%"
                                        height="11px"
                                        labelSize="10px"
                                        bgColor="#00A44F"
                                        animateOnRender={true}
                                    />
                                </div>
                            )} */}
                                    </label>

                                    {/* </div> */}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Audio posteri: *</p>{' '}
                                        <Tooltip title="Mahsulotning saytdagi ko'rinishi uchun rasm yuklashingiz mumkin. Bu rasm quyidagi turda bo’lishi mumkin: .png , .jpg">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div
                                        className="add-product-user-image d-flex justify-content-between col-md-8  form-control pt-2 rounded-3"
                                        style={{
                                            backgroundColor: '#F1F1F1',
                                            border: '1px dashed green',
                                            height: '100px',
                                        }}>
                                        <label
                                            style={{
                                                width: '50px',
                                                cursor: 'pointer',
                                            }}>
                                            <i className="fa-solid fa-plus fs-1 mt-5 pt-1 mx-3"></i>
                                            <input
                                                type="file"
                                                onChange={(e) => LiveImage(e)}
                                                accept="image/*"
                                                style={{ width: '20px' }}
                                            />
                                        </label>
                                        <div
                                            className="overflow-x-scroll  d-flex  gap-1
                       "
                                            style={{ width: '430px' }}>
                                            {!livePosterFile?.images ? (
                                                <span
                                                    className="d-flex flex-column align-items-center mt-4 mx-5"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}>
                                                    <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                    <span className="text-center">
                                                        {' '}
                                                        Rasmini yuklash uchun
                                                        ushbu hududga bosing.{' '}
                                                    </span>
                                                </span>
                                            ) : (
                                                livePosterFile?.images?.map(
                                                    (item, i) =>
                                                        item.id ===
                                                        fileImgFileID ? (
                                                            <img
                                                                src={
                                                                    item.image_url
                                                                }
                                                                alt=" "
                                                                key={i}
                                                                style={{
                                                                    display:
                                                                        'block',
                                                                    border: '2px solid red',
                                                                    filter: 'blur(1px)',
                                                                    cursor: 'not-allowed',
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                className="mx-1 "
                                                                onClick={() => {
                                                                    setLiveFile(
                                                                        item?.image_url
                                                                    ),
                                                                        setFileImgFileID(
                                                                            item?.id
                                                                        );
                                                                }}
                                                                src={
                                                                    item?.image_url
                                                                }
                                                                alt=" "
                                                                key={i}
                                                                style={{
                                                                    display:
                                                                        'block',
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        )
                                                )
                                            )}
                                        </div>
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
                                    <input
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
                                    />
                                </div>

                                <div className="  row mt-3">
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
                            <div
                                className={` ${
                                    videoTab === 'audio' &&
                                    audioPost?.data?.short_content
                                        ? 'image_audio mb-3'
                                        : 'image rounded mb-3'
                                } `}>
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
                                                        controls
                                                        src={
                                                            audioPost?.data
                                                                ?.short_content
                                                        }></audio>
                                                </div>
                                            ) : (
                                                <img
                                                    src={
                                                        '/static/img/audio_null.png'
                                                    }
                                                    alt="doc"
                                                    className="border mb-4 w-100"
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
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
                                                      removePrefix(taxminiyNarx)
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
                                                  <span key={i}>#{item} </span>
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
                                        style={{
                                            maxWidth: `${
                                                videoTab ? '200px' : '150px'
                                            }`,
                                        }}
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
                                            src={
                                                livePosterFile?.images?.[0]
                                                    ?.image_url ||
                                                '/static/img/docCopy.png'
                                            }
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
                                    {/* <p className="live-card-p">
                                        <strong>Chegirmasi : </strong>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {' '}
                                            {discount
                                                ? discount + '%'
                                                : "To'ldirilmadi"}{' '}
                                        </span>
                                    </p> */}
                                    <p className="live-card-p">
                                        <strong>Taglari : </strong>
                                        {/* <span style={{maxWidth:'150px'}} > </span> */}
                                        {tagSearchResult.length > 0
                                            ? tagSearchResult?.map(
                                                  (item, i) => {
                                                      return (
                                                          <span key={i}>
                                                              #{item}{' '}
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
                                                    Betlar soni:{' '}
                                                </strong>{' '}
                                                {livePosterFile?.page_count
                                                    ? livePosterFile?.page_count +
                                                      ' ' +
                                                      'ta'
                                                    : ''}{' '}
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Hajmi:{' '}
                                                </strong>{' '}
                                                {livePosterFile?.file_size}
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Turi:{' '}
                                                </strong>{' '}
                                                {livePosterFile?.file_type}
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
                                {videoTab === 'audio' ? (
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
                                                                                        {' '}
                                                                                        #
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
                                ) : videoTab === 'video' ? (
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-8 col-12">
                                            {!liveFile ? (
                                                <>
                                                    {videoPost?.data
                                                        ?.short_content ? (
                                                        <div className="video_container">
                                                            <div className="video_content">
                                                                <video
                                                                    id="videoPlayer"
                                                                    className="video_iframe"
                                                                    width="100%"
                                                                    style={{
                                                                        maxHeight:
                                                                            '380px',
                                                                    }}
                                                                    controls>
                                                                    <source
                                                                        src={
                                                                            videoPost
                                                                                ?.data
                                                                                ?.short_content
                                                                        }
                                                                        type={`video/${videoPost?.data?.file_type?.replace(
                                                                            '.',
                                                                            ''
                                                                        )}`}
                                                                    />
                                                                    Your browser
                                                                    does not
                                                                    support the
                                                                    video tag.
                                                                </video>
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
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {videoPost?.data
                                                        ?.short_content ? (
                                                        <div className="video_container">
                                                            <div className="video_content">
                                                                <video
                                                                    id="videoPlayer"
                                                                    className="video_iframe"
                                                                    width="100%"
                                                                    height="auto"
                                                                    style={{
                                                                        maxHeight:
                                                                            '380px',
                                                                    }}
                                                                    controls
                                                                    poster={
                                                                        liveFile
                                                                    }>
                                                                    <source
                                                                        src={
                                                                            videoPost
                                                                                ?.data
                                                                                ?.short_content
                                                                        }
                                                                        type={`video/${videoPost?.data?.file_type?.replace(
                                                                            '.',
                                                                            ''
                                                                        )}`}
                                                                    />
                                                                    Your browser
                                                                    does not
                                                                    support the
                                                                    video tag.
                                                                </video>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={liveFile}
                                                            alt="docc"
                                                            className="border mb-4 w-100"
                                                            style={{
                                                                objectFit:
                                                                    'cover',
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            )}
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
                                                                {
                                                                    profile?.last_name
                                                                }
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
                                                                    :{' '}
                                                                    <div></div>{' '}
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
                                                                    <span>
                                                                        {0}
                                                                    </span>
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
                                                            <p>
                                                                Bepul mahsulot
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="ps-product__price">
                                                            <p>0 so'm</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="ps-product__shopping video_action quek_video_button">
                                                <div
                                                    className={`btn--container  `}>
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
                                                                1 klikda sotib
                                                                oling
                                                            </a>
                                                        </>
                                                    ) : free ? (
                                                        <a
                                                            style={{
                                                                cursor: `${'not-allowed'}`,
                                                                textAlign:
                                                                    'center',
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
                                                                1 klikda sotib
                                                                oling
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
                                                    {tagSearchResult?.length >
                                                        0 &&
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
                                                                            #
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
                                        </div>
                                        <div className="col-12">
                                            <div className="ps-product__content ps-tab-root mb-5">
                                                <Tabs defaultActiveKey="1">
                                                    <TabPane
                                                        tab="Mahsulot to’liq tavsifi"
                                                        key="1">
                                                        <div className="ps-document">
                                                            {Fulldata
                                                                ? parse(
                                                                      Fulldata
                                                                  )
                                                                : "To'ldirilmadi"}
                                                        </div>
                                                    </TabPane>
                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="ps-product--detail ps-product--fullwidth">
                                        <div className="ps-product__header ">
                                            <div className="ps-product__thumbnail">
                                                <div className="product_poster">
                                                    <figure>
                                                        <div>
                                                            {videoTab ===
                                                            'file' ? (
                                                                <>
                                                                    {!liveFile ? (
                                                                        <img
                                                                            src={
                                                                                livePosterFile
                                                                                    ?.images?.[0]
                                                                                    ?.image_url ||
                                                                                '/static/img/docCopy.png'
                                                                            }
                                                                            alt="doc"
                                                                            className="border mb-4"
                                                                            style={{
                                                                                objectFit:
                                                                                    'cover',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                liveFile
                                                                            }
                                                                            alt="doc"
                                                                            className="mb-4 border"
                                                                            style={{
                                                                                objectFit:
                                                                                    'cover',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {!liveFile ? (
                                                                        <img
                                                                            src={
                                                                                livePosterFile
                                                                                    ?.images?.[0]
                                                                                    ?.image_url ||
                                                                                '/static/img/docCopy.png'
                                                                            }
                                                                            alt="doc"
                                                                            className="border mb-4"
                                                                            style={{
                                                                                objectFit:
                                                                                    'cover',
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                liveFile
                                                                            }
                                                                            alt="doc"
                                                                            className="mb-4 border"
                                                                            style={{
                                                                                objectFit:
                                                                                    'cover',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </figure>
                                                </div>
                                            </div>

                                            <div className="ps-product__info">
                                                <header>
                                                    <h1>
                                                        {' '}
                                                        {title
                                                            ? title
                                                            : "To'ldirilmadi"}
                                                    </h1>
                                                    <h4>
                                                        {' '}
                                                        {taxminiyNarx
                                                            ? addPeriodToThousands(
                                                                  removePrefix(
                                                                      taxminiyNarx
                                                                  )
                                                              ) + "so'm"
                                                            : "To'ldirilmadi"}
                                                    </h4>
                                                </header>

                                                <div className="ps-product__desc">
                                                    <strong>
                                                        <span>
                                                            <strong className="fs-4">
                                                                Qisqa tavsif
                                                            </strong>
                                                            :{' '}
                                                        </span>
                                                        {videoTab ===
                                                            'file' && (
                                                            <ul
                                                                style={{
                                                                    maxWidth:
                                                                        '150px',
                                                                }}
                                                                className="">
                                                                <li>
                                                                    {' '}
                                                                    <strong className="fs-4">
                                                                        Betlar
                                                                        soni:{' '}
                                                                    </strong>{' '}
                                                                    {livePosterFile?.page_count
                                                                        ? livePosterFile?.page_count +
                                                                          ' ' +
                                                                          'ta'
                                                                        : ''}{' '}
                                                                </li>
                                                                <li>
                                                                    {' '}
                                                                    <strong className="fs-4">
                                                                        Hajmi:{' '}
                                                                    </strong>{' '}
                                                                    {
                                                                        livePosterFile?.file_size
                                                                    }
                                                                </li>
                                                                <li>
                                                                    {' '}
                                                                    <strong className="fs-4">
                                                                        Turi:{' '}
                                                                    </strong>{' '}
                                                                    {
                                                                        livePosterFile?.file_type
                                                                    }
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </strong>
                                                    <ul></ul>
                                                </div>
                                                <div className="ps-product__shopping row-gap-3">
                                                    <button
                                                        className="ps-btn ps-btn--black"
                                                        style={{
                                                            cursor: 'not-allowed',
                                                        }}>
                                                        Savatga qo'shish
                                                    </button>
                                                    <button
                                                        className="ps-btn"
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
                                                                className={`icon-heart`}></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                    {tagSearchResult.length >
                                                    0 ? (
                                                        tagSearchResult?.map(
                                                            (item, i) => {
                                                                return (
                                                                    <span
                                                                        className="mx-2"
                                                                        key={i}>
                                                                        {' '}
                                                                        #{
                                                                            item
                                                                        }{' '}
                                                                    </span>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-product__content ps-tab-root">
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
                                )}
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
