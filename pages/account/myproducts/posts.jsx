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
import { Button, Modal, Select, Tabs, Tooltip } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { ClipLoader } from 'react-spinners';
const category_id = []


const Posts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [fileImgFile, setFileImgFile] = useState(null);
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
    const [categoryName, setCategoryName] = useState('');
    const [fileImgPoster, setFileImgPoster] = useState('');
    const [liveFile, setLiveFile] = useState('');
    const [liveFile2, setLiveFile2] = useState('');
    const [narx, setNarx] = useState('');
    const [chegirmaTek, setChegirmaTek] = useState(true);
    const [loading, setLoading] = useState(false);

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Mahsulot qo’shish",
        },
    ];

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }
    const Option = Select.Option;

    const onChange = async (e) => {
        category_id.length = 0
        setCategoryName(e)
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
        const ItemsData = await MediaRepository.getTagItmes();
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }

    const children = [];
    const options = [];
    for (let i = 0; i < tagItems?.length; i++) {
        children.push(
            <Option key={tagItems[i].name} >{tagItems[i].name}</Option>
        );
    }
    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}  >{dataCategory[i].name}</Option>
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
        formData.append('title', title),
            formData.append('price', narx),
            formData.append('description', Fulldata),
            formData.append('tags', tagSearchResult),
            liveFile2?.images?.[0]?.id ? formData.append('poster_id', liveFile2?.images?.[0]?.id) : "None",
            fileImgPoster ? formData.append('poster', fileImgPoster) : 'None',
            fileImgFileID ? formData.append('poster_id', fileImgFileID) : '',
            formData.append('category', category_id[0]);
        formData.append('document', livePosterFile?.id)

        const patchItems = await PatchRepository.getPatchPoster(
            formData,
            user?.access
        );
        if (patchItems?.status === 201) {
            Router.push('/account/myproducts');
            const modal = Modal.warning({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 24 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
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
            setLiveFile('')
            setLivePosterFile('')
            const formData = new FormData();
            setLoading(true);
            formData.append('file', fileImgFile);
            const ItemsData = await PostsRepository.PostsMyProductsPoster(
                formData,
                user?.access
            );

            if (ItemsData?.status === 201 && ItemsData?.data?.images?.length > 0) {
                setLivePosterFile(ItemsData?.data);
                setLiveFile2(ItemsData?.data)
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Yangi file qo'shdingiz ",
                });
            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: "File mahsulot qo'sha olmadingiz ",
                });
            }
            setLoading(false);
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

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
        chegirma();
        GetItemsCategoryLists();
    }, []);


    useEffect(() => {
        PostFilePoster();
    }, [fileImgFile]);



    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center ">
                    <div
                        className="row  w-100 gap-3 pt-5"
                        style={{ alignItems: 'flex-start' }}>
                       <div className='col-md-8 d-flex'>
                        <h4 className="m-0 p-0">Yangi mahsulot </h4>
                       <h5 className="p-0 col-md-9 fs-4 mx-auto  pb-4 text-warning fw-semibold lh-base"> <i className="fa-solid fa-triangle-exclamation"></i> Hurmatli Sotuvchi mahsulot yuklayotganingizda mahsulot o'zingizni shaxsiy mulkingiz ekanligiga ishonch hosil qiling. Aks holda o'sha mahsulotingizni 
                        so'mmasi tashab berilmasligi va profilingiz o'chirilib yuborilishi mumkin. E'tiborli bo'ling!
                        </h5>
                       </div>

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
                            onSubmit={handleClickPosts}
                            style={{ position: 'relative', width: '100%' }}
                            id="FormPostsMyProducts"
                            className=" col-md-8 pb-5">
                            <div className="row   mt-3">
                                <div className="col-md-4  d-flex justify-content-between p-0 ">
                                    <p>Mahsulot nomi: *</p>
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
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="row ">
                                <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                    <p>Mahsulot: *</p>{' '}
                                    <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .doc va docx, .xlsx, .ppt, .pdf, .jpeg yoki .jpg, .png, .psd, .svg, html, .txt, .mp4, mp3, .zip.">
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
                                    }}>
                                    {
                                        livePosterFile === '' ? (
                                            <span
                                                className="d-flex flex-column align-items-center"
                                                style={{ cursor: 'pointer' }}>
                                                {
                                                    loading ?
                                                        <span className="d-flex justify-content-center">
                                                            <ClipLoader
                                                                size={25}
                                                                color="#36d7b7"
                                                            />
                                                        </span>
                                                        :
                                                        <span
                                                            className="d-flex flex-column align-items-center "
                                                            style={{ cursor: 'pointer' }}>
                                                            <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                            <span>
                                                                Yuklash uchun faylni ushbu
                                                                hududga bosing.
                                                            </span>
                                                        </span>
                                                }
                                            </span>
                                        ) : (
                                            <span className="d-flex flex-column align-items-center"
                                                style={{ cursor: 'pointer' }}>
                                                <span>
                                                    {' '}
                                                    Siz mahsulot yukladingiz  <i className="fa-solid fa-circle-check text-success"></i>{' '}

                                                </span>
                                            </span>
                                        )
                                    }
                                    <input
                                        required
                                        type="file"
                                        onChange={(e) =>
                                            setFileImgFile(e.target.files[0])
                                        }
                                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    />
                                </label>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                    <p>Mahsulot rasmi: *</p>{' '}
                                    <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .doc va docx, .xlsx, .ppt, .pdf, .jpeg yoki .jpg, .png, .psd, .svg, html, .txt, .mp4, mp3, .zip.">
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
                                                style={{ cursor: 'pointer' }}>
                                                <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                <span>
                                                    {' '}
                                                    Yuklash uchun rasmni ushbu
                                                    hududga bosing.{' '}
                                                </span>
                                            </span>
                                        ) : (
                                            livePosterFile?.images?.map(
                                                (item, i) =>
                                                    item.id ===
                                                        fileImgFileID ? (
                                                        <img
                                                            src={item.image_url}
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
                                        mode='select'
                                        showSearch
                                        allowClear
                                        style={{ width: '100%', height: "47px" }}
                                        onChange={onChange}
                                        onSearch={onSearch}
                                    >
                                        {options}

                                    </Select>
                                </div>
                            </div>
                            <div className="row   mt-3">
                                <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                    <p>Mahsulot sotish narxi: *</p>{' '}
                                    <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>
                                <input
                                    required
                                    type={narxNomi ? 'text' : 'number'}
                                    className="form-control  rounded-3 col-md-8"
                                    name="price"
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
                                    <p>Mahsulot to’liq tavsifi: </p>{' '}
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
                                        Mahsulot qo'shish{' '}
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
                        <div
                            className="col-md-4 rounded-3  p-3 cardResponsive  card mt-3"
                            style={{ maxWidth: '370px' }}>
                            <div className="image rounded mb-3">
                                {!liveFile ? (
                                    <img
                                        src={livePosterFile?.images?.[0]?.image_url || "/static/img/docCopy.jpg"}
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
                                        ? tagSearchResult?.map((item, i) => {
                                            return (
                                                <span key={i}>#{item} </span>
                                            );
                                        })
                                        : "To'ldirilmadi"}
                                </p>
                                <p className="live-card-p">
                                    <span>
                                        <strong className='fs-4'>Qisqa tavsif</strong>:{' '}
                                    </span>
                                    <ul style={{ maxWidth: '150px' }} className=''>
                                        <li> <strong className='fs-4'>Betlar soni: </strong> {livePosterFile?.page_count ? livePosterFile?.page_count + " " + "ta" : ""} </li>
                                        <li> <strong className='fs-4'>Hajmi: </strong> {livePosterFile?.file_size}</li>
                                        <li> <strong className='fs-4'>Turi: </strong> {livePosterFile?.file_type}</li>
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
                                            src={livePosterFile?.images?.[0]?.image_url || "/static/img/docCopy.jpg"}
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
                                            <strong className='fs-4'>Qisqa tavsif</strong>:{' '}
                                        </span>
                                        <ul style={{ maxWidth: '150px' }} className=''>
                                            <li> <strong className='fs-4'>Betlar soni: </strong> {livePosterFile?.page_count ? livePosterFile?.page_count + " " + "ta" : ""} </li>
                                            <li> <strong className='fs-4'>Hajmi: </strong> {livePosterFile?.file_size}</li>
                                            <li> <strong className='fs-4'>Turi: </strong> {livePosterFile?.file_type}</li>
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
                                <div className="ps-product--detail ps-product--fullwidth">
                                    <div className="ps-product__header ">
                                        <div className="ps-product__thumbnail">
                                            <figure>
                                                <div className="ps-wrapper">
                                                    {livePosterFile?.images ? (
                                                        livePosterFile?.images?.map(
                                                            (item) => (
                                                                <img
                                                                    src={
                                                                        item.image_url
                                                                    }
                                                                    alt="doc"
                                                                    key={item.id}
                                                                    className="border mb-3 "
                                                                    style={{
                                                                        objectFit:
                                                                            'contain',
                                                                    }}
                                                                />
                                                            )
                                                        )
                                                    ) : (
                                                        <img
                                                            src="/static/img/docCopy.jpg"
                                                            alt="doc"
                                                        />
                                                    )}
                                                </div>
                                            </figure>
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
                                                        <strong className='fs-4'>Qisqa tavsif</strong>:{' '}
                                                    </span>
                                                    <ul style={{ listStyleType: "revert" }}>
                                                        <li> <strong className='fs-4'>Betlar soni: </strong> {livePosterFile?.page_count ? livePosterFile?.page_count + " " + "ta" : ""} </li>
                                                        <li> <strong className='fs-4'>Hajmi: </strong>{livePosterFile?.file_size}</li>
                                                        <li> <strong className='fs-4'>Turi: </strong>{livePosterFile?.file_type}</li>
                                                        <li>
                                                            <strong>
                                                                Kategoriyasi
                                                            </strong>{' '}
                                                            :{' '}
                                                            {categoryName
                                                                ? categoryName
                                                                : livePosterFile?.category
                                                                    ?.name}
                                                        </li>
                                                    </ul>

                                                </strong>
                                                <ul>

                                                </ul>
                                            </div>
                                            <div className="ps-product__shopping row-gap-3" >
                                                <button
                                                    className="ps-btn ps-btn--black"
                                                    style={{ cursor: "not-allowed" }}
                                                >
                                                    Savatga qo'shish
                                                </button>
                                                <button className="ps-btn" style={{ cursor: "not-allowed" }} >
                                                    Sotib olish
                                                </button>
                                                <div className="ps-product__actions">
                                                    <a style={{ cursor: "not-allowed" }} >
                                                        <i className={`icon-heart`} ></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                                {tagSearchResult.length > 0 ? (
                                                    tagSearchResult?.map(
                                                        (item, i) => {
                                                            return (
                                                                <span
                                                                    className="mx-2"
                                                                    key={i}>
                                                                    {' '}
                                                                    #{item}{' '}
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
