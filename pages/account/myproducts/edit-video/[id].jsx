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
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
const { Option } = Select;
const { TextArea } = Input;

export const formatPrice = (price) => {
    if (typeof price === 'string') {
        return parseFloat(price.replace(/,/g, ''));
    }
    return price;
};

const Posts = () => {
    const Router = useRouter();

    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [tegProductsLists, setTegProdcutsLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingIs, setLoadingIs] = useState(false);
    const [free, setFree] = useState(false);  // Video narxini beppul qilish uchun 
    const [freePlay, setFreePlay] = useState(false);  // PlayList narxini beppul qilish uchun 
    const [customePoster, setCustomePoster] = useState(false);
    const [products, setProducts] = useState(null)
    const [category, setCategory] = useState(null)
    const routerId = Router.query?.id;
    const [loadingPlay, setLoadingPlay] = useState(false); // Modal ochilishi uchun
    const [itemsPlayLists, setItemsPlayLists] = useState([]);   // tagslar listini saqlash uchun
    const [open, setOpen] = useState(false); // Modal ochilishi uchun
    const [customePosterPlay, setCustomePosterPlay] = useState(null); // PlayList posterini olsih uchun 
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [valuesPlayLists, setvaluesPlayLists] = useState(null); // Modal ochilishi uchun

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Video mahsulot tahrirlash',
        },
    ];

    // Kategoriya listini olib kelish uchun funksiya

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryListsVideo();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    // Kategoriyani qidirish uchun funksiya

    const onSearch = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryListsVideo(value);
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    };

    // Taglarni Listini olib kelish

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmesAktive();
        if (ItemsData) {
            setTagItems(ItemsData);
        }
    }

    // Video PlayListslarini olib kelish uchun getFunksiya

    async function GetItemsPlayLists() {
        const ItemsData = await GetRepository.getItemsPlayLists(user?.access)
        if (ItemsData?.results) {
            setItemsPlayLists(ItemsData?.results);
        }
    }

    async function GetItemsTagAktivmas() {
        const ItemsData = await GetRepository.getTagListsDeaktiv(user?.access);
        if (ItemsData) {
            setTegProdcutsLists(ItemsData);
        }
    }



    // Vidoega Play-List qo'shish uchun Post funksiyasi

    const postPlayLists = async (values) => {

        const formData = new FormData();
        const newPrice = parseInt(values.price !== 0 && formatPrice(values?.price));
        formData.append('price', (freePlay || values.price == 0) ? 0 : newPrice); // Video narxi
        formData.append('title', values?.title),
            formData.append('image', customePosterPlay?.poster),
            formData.append('description', values?.description || '')

        try {
            setLoadingPlay(true)
            await PostsRepository.PostsPLaylists(
                formData,
                user?.access
            )
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqiyatli!',
                content: 'Muvaffaqiyatli yaratildi',
            });
            GetItemsPlayLists()
        } catch (error) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: error?.response?.data?.msg[0] || error?.message,
            });
        }
        finally {
            setOpen(false)
            setCustomePosterPlay(null)
            setLoadingPlay(false)

        }

    }

    //  Mahsulot detailini olib kelish uchun funksiya

    async function getProducts() {
        if (routerId) {
            setLoadingIs(true)
            if (user?.role == "seller") {
                const ItemsData = await GetRepository.getMyProductsView(
                    routerId,
                    user?.access
                );
                setProducts(ItemsData);
            } else {
                const ItemsData = await GetRepository.getShopsProductsAdmin(routerId, user?.access);
                setProducts(ItemsData);
            }
            setLoadingIs(false)
        }

    }


    //   Videoga rasm yuklash uchun funksiya

    const LivePoster = (images) => {
        if (images) {
            const img = window.URL.createObjectURL(images);
            setCustomePoster({ poster: images, url: img });
        }
    }

    //   PlayListga rasm yuklash uchun funksiya

    const LivePosterPlayLists = (images) => {
        if (images) {
            const img = window.URL.createObjectURL(images);
            setCustomePosterPlay({ poster: images, url: img });
        }
    }

    // Videoni Update qilish uchun funksiya
    async function postOrder(values) {

        const resuslts1 = products?.active_tag?.map((item) => item.name);
        const resuslts2 = products?.deactive_tag?.map((item) => item.name);
        const results = values?.tags?.concat(values?.deactive_tag);
        const results3 = resuslts1?.concat(resuslts2);

        const formData = new FormData();
        formData.append('title', values?.title); // Video nomi

        if (results && user?.role === 'admin') {
            formData.append('tags', JSON.stringify(results));
        }
        if (results3 && user?.role === 'admin') {
            formData.append('tags', JSON.stringify(results3));
        }
        if (user?.role === 'seller') {
            formData.append('tags', JSON.stringify(values?.tags)); // Video taglar listi
        }

        if (customePoster?.poster) {
            formData.append('poster', customePoster?.poster); // Video posteri
        }
        const newPrice = parseInt(values.price !== 0 && formatPrice(values?.price));

        formData.append('price', (free || values.price == 0) ? 0 : newPrice); // Video narxi
        if (values?.description) {
            formData.append('description', values?.description); // Video haqida to'liq izoh
        }

        // Video kategoriyasi
        const selectedCategory = dataCategory.find(cat => cat.name === values?.category);
        if (selectedCategory) {
            formData.append('category', selectedCategory?.id);
        }
        if (user?.role === 'admin') {
            formData.append('status', values?.status);
        }
        if (user?.role === 'admin' && values?.reason) {
            formData.append('resaon', values?.reason);
        }
        const selectedPlaylists = itemsPlayLists.find(cat => cat.title === valuesPlayLists);

        if (selectedPlaylists && user?.role === 'seller') {
            if (selectedPlaylists) {
                formData.append('playlist', selectedPlaylists?.id);
            }
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
            const modal = Modal.warning({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz malumotlarni o'zgartirdingiz ",

            });
        } catch (err) {
            console.log("Error edit", err);
        }


    }

    //   Mahsulot malumotlarini inputni valuesiga tushirish

    useEffect(() => {
        if (products) {
            form.setFieldsValue({
                title: products?.title,
                poster: products?.poster_url,
                price: products?.price,
                category: products?.category?.name,
                description: products?.description || '',
                tags: user?.role === 'admin' ? products?.active_tag?.map(item => item?.name) : products?.tag?.map((item) => item.name),
                category: products?.category?.name,
                deactive_tag: products?.deactive_tag?.map(
                    (item) => item.name
                ),
                playlist: products?.playlist?.title,
                status: products?.status,
                reason: products?.reason,

            });

            if (products?.price === 0) {
                setFree(true)
            }
        }
    }, [products, form]);

    //   Modal ichidagi valuelarni tozalash

    useEffect(() => {
        if (open) {
            form2.setFieldsValue({
                description: null,
                image: null,
                price: null,
                title: null
            });
        }
    }, [open, form2]);

    useEffect(() => {
        getProducts()
    }, [routerId])


    useEffect(() => {
        if (user?.access) {
            GetItemsTag();
            setEditorLoaded(true);
            GetItemsCategoryLists();
            GetItemsPlayLists()
            GetItemsTagAktivmas()
        }
    }, [user?.access]);


    const dataStatus = [
        {
            id: 1,
            status: 'moderation',
        },
        {
            status: 'approved',
        },
        {
            status: 'cancelled',
        },
    ];

    const status = {
        'moderation': 'Moderatsiya',
        'approved': 'Tasdiqlangan',
        'cancelled': 'Bekor qilingan',
    }



    return (user?.role === 'seller' || user?.role === 'admin') ? (
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



                            <div className='row m-0 p-0 mb-5' style={{ overflowY: "auto", height: "50vh" }}>

                                <Form
                                    form={form}
                                    onFinish={postOrder}
                                    className="col-md-7 pl-0 row  "
                                    layout='vertical'

                                >

                                    {user?.role === 'admin' &&
                                        <>

                                            <Form.Item
                                                label={'Holati'}
                                                name="status"
                                                className='col-md-12 mb-2'
                                            >
                                                <Select
                                                    name="tags"
                                                    mode="select"
                                                    style={{ width: '100%', height: "45.4px" }}
                                                    onChange={(e) => setCategory(e)}
                                                >
                                                    {
                                                        dataStatus?.map(item => (
                                                            <Option key={item?.status}>{status[item?.status]}</Option>
                                                        ))
                                                    }
                                                </Select>

                                            </Form.Item>

                                            {(products?.status === 'cancelled' || category === 'cancelled') &&

                                                <Form.Item
                                                    label={'Sabab'}
                                                    name="reason"
                                                    className='col-md-12 mb-2'
                                                    rules={[
                                                        {
                                                            required: products?.reason ? false : true,
                                                            message:
                                                                'Sabab kiritsh majburiy',
                                                        },
                                                    ]}
                                                >
                                                    <TextArea
                                                        rows={3}
                                                        placeholder='Sabab'
                                                    />

                                                </Form.Item>
                                            }
                                        </>
                                    }



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
                                                defaultValue={products?.price}
                                                disabled={free}
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
                                                defaultChecked={free}
                                                className=" d-flex align-items-center justify-content-start px-0 py-2"
                                                onChange={() => setFree(!free)}>
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
                                                height: '45.4px',
                                            }}
                                            onSearch={onSearch}>
                                            {
                                                dataCategory?.length > 0 && dataCategory?.map(item => (
                                                    <Option key={item?.name}  >{item?.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video Aktiv teglari</span>
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
                                            name="tags"
                                            mode="tags"
                                            placeholder="Video teglari "
                                            style={{ width: '100%', height: "45.4px" }}
                                            defaultValue={products?.tag?.map((item) => item.name)}
                                        >
                                            {
                                                tagItems?.length > 0 && tagItems?.map(item => (
                                                    <Option key={item?.name}>{item?.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>

                                    {user?.role === 'admin' && <Form.Item
                                        label={
                                            <div className='d-flex align-items-center gap-3'>
                                                <span>Video Aktivmas teglari</span>
                                                <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                        name="deactive_tag"
                                        className='col-md-12 mb-2'
                                    >
                                        <Select
                                            name="deactive_tag"
                                            mode="tags"
                                            placeholder="Video teglari "
                                            style={{ width: '100%', height: "45.4px" }}
                                            defaultValue={
                                                products?.deactive_tag &&
                                                products?.deactive_tag?.map(
                                                    (item) => item.name
                                                )
                                            }
                                        >
                                            {
                                                tegProductsLists?.length > 0 && tegProductsLists?.map(item => (
                                                    <Option key={item?.name}>{item?.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>}


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
                                        name="playlist"
                                        className='col-md-12 mb-2'
                                    >
                                        <div className='d-flex gap-3 '>
                                            <Select
                                                disabled={user?.role === 'admin'}
                                                name="playlist"
                                                mode="select"
                                                placeholder="Video teglari "
                                                style={{
                                                    width: '100%',
                                                    height: '45.4px',
                                                }}
                                                onChange={(e) => setvaluesPlayLists(e)}
                                                defaultValue={products?.playlist?.title}

                                            >
                                                {
                                                    itemsPlayLists?.length > 0 && itemsPlayLists?.map(item => (
                                                        <Option key={item?.title}  >
                                                            <div className='d-flex justify-content-between'>
                                                                <div className='d-flex gap-2'>
                                                                    <img
                                                                        style={{
                                                                            objectFit: "cover"
                                                                        }}
                                                                        height={30}
                                                                        width={30}
                                                                        src={item?.image}
                                                                        alt="images"
                                                                    />
                                                                    <span>{item?.title}</span>
                                                                </div>
                                                                <span>
                                                                    {item?.price > 0 ?
                                                                        addPeriodToThousands(Number(item?.price)) + ' ' + "so'm" :
                                                                        "Bepul"

                                                                    }

                                                                </span>
                                                            </div>
                                                        </Option>
                                                    ))
                                                }
                                            </Select>

                                            {user?.role === "seller" && <span
                                                onClick={() => setOpen(true)}
                                                style={{
                                                    width: '20%',
                                                    height: '44px',

                                                }}

                                                className='btn
                                                rounded-3
                                                 btn-outline-success
                                                 d-flex align-items-center justify-content-center gap-2
                                                 '>
                                                <i className="fa-solid fa-plus fs-4"></i> <span className='fs-4'>Yaratish</span>
                                            </span>}

                                        </div>
                                    </Form.Item>

                                    <Form.Item
                                        className="rounded-5 col-md-12 mb-2"
                                        name={"description"}
                                        label={
                                            <div className=" d-flex align-items-center gap-3 ">
                                                <p className='m-0'>Mahsulot to’liq tavsifi: </p>{' '}
                                                <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question "></i>
                                                </Tooltip>
                                            </div>
                                        }
                                    >


                                        <CKeditor

                                            editorLoaded={editorLoaded}
                                        />
                                    </Form.Item>

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

                                <div className='col-md-5 m-0 p-0 ' style={{
                                    position: "sticky",
                                    alignSelf: "flex-start",
                                    top: "30px"
                                }}>

                                    <video
                                        className=" p-0 "
                                        controls
                                        poster={customePoster?.url || products?.poster_url}
                                        preload="none"
                                        src={products?.file_url}
                                        style={{
                                            width: '100%', maxHeight:
                                                '300px',
                                        }}>

                                    </video>

                                    {products?.title && <div className='px-4 py-2'>
                                        <p>{products?.title}</p>
                                    </div>}
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

            </div>

            {/* Play List yaratish uchun playLists modali */}

            <Modal
                title="Yangi pleylist yaratish"
                width={550}
                centered
                open={open}
                onOk={() => setOpen(false)}
                okText="Yopish"
                footer={null}


                onCancel={() => setOpen(false)}>
                <Form
                    form={form2}
                    onFinish={postPlayLists}
                    className="w-100 mt-5"
                    layout='vertical'
                >
                    <Form.Item
                        label={'Rasm'}
                        name={"poster"}
                        className='col-md-12 mb-2 p-0'
                        rules={[
                            {
                                required: customePosterPlay?.url ? false : true,
                                message:
                                    'Rasm kiritish majburiy',
                            },
                        ]}
                    >

                        <label
                            style={{
                                display: 'inline-block',
                                width: '100%',
                                height: '45.4px',
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
                                (customePosterPlay?.url) ?
                                    <span>Video poster rasm yuklangan <i className="fa-solid fa-circle-check text-success mt-2"></i></span>
                                    :
                                    <span><i className="fa-solid fa-cloud-arrow-up text-success mx-2 fs-3"></i> Video poster rasmini yuklash uchun rasm tanlang</span>
                            }
                            <Input

                                name='poster'
                                accept='image/*'
                                onChange={(e) => LivePosterPlayLists(e.target.files[0])}
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
                        label='Nomi (majburiy)'
                        name="title"
                        className=' mb-3 '
                        rules={[
                            {
                                required: true,
                                message:
                                    'Nomi kiritish majburiy',
                            },
                        ]}
                    >
                        <Input
                            name='title'
                            placeholder="Nomlang"

                        />
                    </Form.Item>

                    <Form.Item
                        label={'Narxi'}
                        name="price"
                        className='col-md-12 mb-2 p-0'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Video  narx majburiy',
                            },
                        ]}
                    >
                        <div className='d-flex align-items-center gap-3 '>

                            <InputNumber
                                style={{ height: "45.4px" }}

                                disabled={freePlay}
                                placeholder="Narxi"
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
                                defaultChecked={free}
                                className=" d-flex align-items-center justify-content-start px-0 py-2"
                                onChange={() => setFreePlay(!freePlay)}>
                                <strong className='text-success'>Bepul</strong>
                            </Checkbox>
                        </div>

                    </Form.Item>

                    <Form.Item
                        label='Tavsif'
                        name='description'
                        className='mb-3'
                    >
                        <TextArea placeholder='Tavsif kiriting' rows={4}></TextArea>
                    </Form.Item>

                    <Form.Item
                        className='m-0 mt-3 d-flex justify-content-end w-100'
                    >
                        <Button
                            loading={loadingPlay}
                            className='px-5'
                            type='primary'
                            htmlType='submit'
                        >Yaratish</Button>
                    </Form.Item>
                </Form>

            </Modal>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
};

export default Posts;
