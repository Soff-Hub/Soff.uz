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
import { Button, Form, Modal, Select, Tabs, Tooltip, InputNumber, Checkbox, Input } from 'antd';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';

import Link from 'next/link';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
const Option = Select.Option;

const Posts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState(null);

    const [fileImgFile, setFileImgFile] = useState(null);
    const [extraFiles, setExtraFiles] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
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
    const [products, setProducts] = useState(null)
    const routerId = Router.query?.id;
    const [form] = Form.useForm();

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


    async function ProfileUsers(token) {
        const ItemsData = await GetRepository.getProfile(token);
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



    async function getProducts() {
        if (routerId) {
            setLoadingIs(true)
            const ItemsData = await GetRepository.getMyProductsView(
                routerId,
                user?.access
            );
            setProducts(ItemsData);
            setLoadingIs(false)
        }

    }

    useEffect(() => {
        getProducts()
    }, [routerId])


    useEffect(() => {
        if (user?.access) {
            GetItemsTag();
            setEditorLoaded(true);
            GetItemsCategoryLists();
        }
    }, [user?.access]);


    function LivePoster(file) {

        if (file) {
            const img = window.URL.createObjectURL(file);
            setCustomePoster({ file: file, url: img });
        }
    }

    useEffect(() => {
        if (user?.access) {
            ProfileUsers(user?.access);
        }
    }, [user?.access]);


    async function postOrder(values) {

        const formData = new FormData();
        formData.append('title', values?.title);

        if (free) {
            formData.append('price', 0);
        } else {
            formData.append('price', Number(values?.price));
        }

        formData.append('description', Fulldata);
        formData.append('poster', customePoster?.file);

        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === values?.category) {
                formData.append('category', dataCategory[j]?.id);
            }
        }
        formData.append('tags', values?.tags);


        if (values?.extra_file && values?.extra_file !== undefined) {
            formData.append('extra_file', values?.extra_file);
        }

        // try {
        //     const resp = await axios.patch(
        //         `${baseUrl}seller/video-product-update/${products?.id}/`,
        //         formData,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${user?.access}`,
        //             },
        //         }
        //     );
        //     Router.back();
        //     const modal = Modal.warning({
        //         centered: true,
        //         title: 'Muvaffaqqiyatli!',
        //         content: "Siz malumotlarni o'zgartirdingiz ",

        //     });
        // } catch (err) {
        //     console.log("Error edit", err);
        // }

    }

    const handleFreeChange = (e) => {
        setFree(!free);
    };

    useEffect(() => {
        if (products) {
            form.setFieldsValue({
                title: products?.title,
                poster: products?.poster_url,
                price: products?.price,
                category: products?.category?.name,
                tags: products?.tag &&
                    products?.tag?.map((item) => item.name),

            });
        }
    }, [products, form]);



    return user?.role === 'seller' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Soff | Yangi mahsulot yaratish'} />
                <BreadCrumb breacrumb={breadCrumb} />

                {!loadingIs ?
                    (products && <div className="d-flex container justify-content-center ">
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

                            <div className='row m-0 p-0 mb-5' style={{ overflowY: "auto", height: "50vh" }}>

                                <Form
                                    form={form}
                                    onFinish={postOrder}
                                    className="col-md-7 pl-0 row  "
                                    layout='vertical'

                                >
                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video nomi</span>
                                                <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="title"
                                        className='col-md-12 mb-2 '

                                    >
                                        <Input
                                            name='title'
                                            placeholder="Video nomi"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video poster rasmi</span>
                                                <Tooltip title="Mijozlarni mahsulotingizga e'tiborini tortib qiziqtirish uchun video poster yuklang. U posterni maxsus yasashingiz yoki videoingizni eng qiziq bo'lgan qismini screenshot qilib yuklashingiz mumkin bo'ladi.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name={"poster"}
                                        className='col-md-12 mb-2 '

                                    >

                                        <label
                                            style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                height: '43px',
                                                border: '1px solid #ccc',
                                                padding: '10px 15px',
                                                boxSizing: 'border-box',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                backgroundColor: '#fff',
                                                borderRadius: "5px"
                                            }}
                                        >

                                            {
                                                (customePoster?.url || products?.poster_url) ?
                                                    <span>Video poster rasm yuklangan <i className="fa-solid fa-circle-check text-success mt-2"></i></span>
                                                    :
                                                    <span><i className="fa-solid fa-cloud-arrow-up text-primary mx-2 fs-3"></i> Video poster rasmini yuklash uchun rasm tanlang</span>
                                            }
                                            <Input
                                                name='poster'
                                                accept='image/*'
                                                onChange={(e) => LivePoster(e.target.files[0])}
                                                type='file'
                                                style={{
                                                    position: 'absolute',
                                                    width: '1px',
                                                    height: '1px',
                                                    overflow: 'hidden',
                                                    clip: 'rect(0, 0, 0, 0)',
                                                    border: '0'
                                                }}
                                            />
                                        </label
                                        >

                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video narxi</span>
                                                <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="price"
                                        className='col-md-12 mb-2'

                                    >
                                        <div className='d-flex align-items-center gap-3 '>

                                            <InputNumber
                                                name='price'
                                                disabled={free || products?.price === 0}
                                                placeholder="Video  narxi"
                                                className='w-100 py-2'
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                            <Checkbox
                                                defaultChecked={free || products?.price === 0}
                                                className=" d-flex align-items-center justify-content-start px-0 py-2"
                                                onChange={handleFreeChange}>
                                                <strong className='text-success'>Bepul</strong>
                                            </Checkbox>
                                        </div>

                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video kategoriyasi</span>
                                                <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="category"
                                        className='col-md-12 mb-2'

                                    >
                                        <Select
                                            name="category"
                                            mode="select"
                                            showSearch
                                            allowClear
                                            placeholder="Video kategoriyasi"
                                            style={{
                                                width: '100%',
                                                height: '47px',
                                            }}
                                            onSearch={onSearch}>
                                            {options}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video teglari</span>
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="tags"
                                        className='col-md-12 mb-2'

                                    >
                                        <Select
                                            mode="tags"
                                            placeholder="Video teglari "
                                            style={{ width: '100%' }}
                                        >
                                            {children}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Qo'shimcha fayllar (.zip)</span>
                                                <Tooltip title="Mijozlar mahsulotingizni sotib olgandan so'ng, unga tegishli bo'lgan yana boshqa qo'shimcha faylar bo'lsa yuklang. Mahsulotingiz quyidagi turdagi fayl bo’lishi mumkin: .zip">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name={"extra_file"}
                                        className='col-md-12 mb-2 '>

                                        <label
                                            style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                height: '43px',
                                                border: '1px solid #ccc',
                                                padding: '10px 15px',
                                                boxSizing: 'border-box',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                backgroundColor: '#fff',
                                                borderRadius: "5px"
                                            }}
                                        >

                                            {
                                                // (true) ?
                                                //     <span>Chek rasmi yuklangan <i className="fa-solid fa-circle-check text-success"></i></span>
                                                //     :
                                                <span><i className="fa-solid fa-cloud-arrow-up text-primary mx-2 fs-3"></i> Qo'shimcha fayllar</span>
                                            }
                                            <Input
                                                name='extra_file'
                                                accept='image/*'
                                                onChange={(e) => setValuesImage(e.target.files[0])}
                                                type='file'
                                                style={{
                                                    position: 'absolute',
                                                    width: '1px',
                                                    height: '1px',
                                                    overflow: 'hidden',
                                                    clip: 'rect(0, 0, 0, 0)',
                                                    border: '0'
                                                }}
                                            />
                                        </label>

                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Play Listlar</span>
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="tags"
                                        className='col-md-12 mb-2'

                                    >
                                        <div className='d-flex gap-3 '>
                                            <Select
                                                mode="select"
                                                placeholder="Video teglari "
                                                style={{
                                                    width: '100%',
                                                    height: '47px',
                                                }}
                                            >
                                                {children}
                                            </Select>
                                            <span
                                                onClick={() => setOpen(true)}
                                                style={{
                                                    width: '10%',
                                                    height: '47px',

                                                }}

                                                className='btn
                rounded-3
                 btn-outline-primary
                 d-flex align-items-center justify-content-center
                 '><i className="fa-solid fa-plus fs-3"></i></span>
                                        </div>
                                    </Form.Item>

                                    <div className="rounded-5 col-md-12 mt-2">
                                        <div className=" d-flex align-items-center gap-3 mb-2">
                                            <p className='m-0'>Mahsulot to’liq tavsifi: </p>{' '}
                                            <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question "></i>
                                            </Tooltip>
                                        </div>

                                        <CKeditor
                                            name="description"
                                            onChange={(data) => {
                                                setFullData(data);
                                            }}
                                            editorLoaded={editorLoaded}
                                            value={products?.description}
                                        />
                                    </div>

                                    <Form.Item className="col-md-12 d-flex justify-content-end m-0  my-4">
                                        <Button
                                            loading={loading}
                                            htmlType="submit"
                                            style={{
                                                width: '100%',
                                                height: '37px',
                                                padding: "1px 30px"
                                            }}
                                            className="btn-success btn-send-email">
                                            <span
                                                style={{
                                                    color: '#fff',
                                                    fontSize:
                                                        '16px',
                                                }}>
                                                Tasdiqlash
                                            </span>
                                        </Button>
                                    </Form.Item>

                                </Form>

                                <div className='col-md-5 m-0 p-0 bg-white ' style={{
                                    position: "sticky",
                                    alignSelf: "flex-start",
                                    top: "30px"
                                }}>

                                    <video
                                        className="shadow p-0 "
                                        controls
                                        preload="none"
                                        src={fileImgFile?.video}
                                        poster={customePoster?.url}
                                        style={{
                                            width: '100%', maxHeight:
                                                '300px',
                                        }}>

                                    </video>

                                    {loading && <p style={{
                                        color: "#fff",
                                        position: "absolute",
                                        top: "35%",
                                        left: "35%",
                                        transform: "tranlate(-35%, -40%)"



                                    }}><span className="d-flex mb-2 justify-content-center">
                                            <ClipLoader
                                                size={
                                                    25
                                                }
                                                color="#36d7b7"
                                            />
                                        </span> Video yuklanmoqda</p>}

                                    <div className='px-4 py-2'>
                                        <p>{products?.name}</p>
                                    </div>
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
