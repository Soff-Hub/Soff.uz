import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '~/pages/page/page-404';
import LoginPage from '../login';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MediaRepository from '~/repositories/MediaRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CKeditor from '../../../components/partials/account/CKeditor';
import { Button, Checkbox, Modal, Select, Tabs, Tooltip } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';
import { InputNumber } from 'primereact/inputnumber';
import { useForm } from 'react-hook-form';
import Input from '~/components/form/Input';


const PostsMyProducts = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [taxminiyNarx, setTaxminiyNarx] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Fulldata, setFullData] = useState('');
    const [free, setFree] = useState(false);
    const [category_id, setCategory_ID] = useState(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const routerId = Router.query?.id
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    const [customePoster, setCustomePoster] = useState([]);
    const [customeFile, setCustomeFile] = useState(null);


    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Mahsulotni tahrirlash',
        },
    ];

    async function getProducts() {
        if (routerId) {
            setLoading(true)
            const ItemsData = await GetRepository.getMyProductsView(
                routerId,
                user?.access
            );
            setProducts(ItemsData);
            setLoading(false)
        }

    }
    useEffect(() => {
        getProducts()
    }, [routerId])




    useEffect(() => {
        if (products && products.document && products.document.images) {
            setCustomePoster([...products.document.images]);
        }
    }, [products]);

    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

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

    async function handleClickPostsEdit(data) {

        if (data?.title || taxminiyNarx || tagSearchResult || category_id) {
            const formData = new FormData();
            if (watch('title')) {
                formData.append('title', data?.title);
            }
            if (free && !taxminiyNarx) {
                formData.append('price', 0);
            } else {
                formData.append('price', taxminiyNarx);
            }
            if (Fulldata) {
                formData.append('description', Fulldata);
            }
            if (category_id) {
                formData.append('category', category_id);
            }
            if (tagSearchResult) {
                formData.append('tags', tagSearchResult);
            }

    const onSearch = async (value) => {
        if (products?.document?.content_type === 'file') {
            const ItemsData = await GetRepository.getAllCategoryLists(value);
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
        if (products?.document?.content_type === 'audio') {
            const ItemsData = await GetRepository.getAllCategoryListsAudio(value);
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
        if (products?.document?.content_type === 'template') {
            const ItemsData = await GetRepository.getAllCategoryListsDesign(value);
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }

    };

            const customePosters = customePoster
                .filter((el) => el.custome)
                .map((el) => el.file);
            const oldPosters = customePoster
                .filter((el) => el?.custome !== true)
                .map((el) => el.id);

            if (customePosters.length > 0) {
                for (const file of customePosters) {
                    formData.append('images', file);
                }
            }

            if (oldPosters.length > 0) {
                for (const file of oldPosters) {
                    formData.append('images_id', file);
                }
            }

            if (customeFile?.file) {
                formData.append('poster', customeFile.file);
            } else {
                if (customeFile) {
                    formData.append('poster_id', customeFile.id);
                }
            }

            const patchItems = await PatchRepository.getMyProductsPatch(
                formData,
                products?.id,
                user?.access
            );
            if (patchItems?.status == 202) {
                Router.push('/account/myproducts');
                const modal = Modal.warning({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content:
                        "Sizning mahsulotingiz muvaffaqqiyatli o'zgartirildi! 24 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin",
                });
                setTagSearchResult(null);
                setTaxminiyNarx(null);
            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik!',
                    content: patchItems?.data.msg,
                });
                setDeisabled(false);
            }
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
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const onChange = async (e) => {
        category_id.length = 0;
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                category_id.push(dataCategory[j].id);
            }
        }
    };

    const onSearch = async (value) => {
        const ItemsData = await GetRepository.getAllCategoryLists(value);
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    };
    const options = [];

    for (let i = 0; i < dataCategory?.length; i++) {
        options.push(
            <Option key={dataCategory[i].name}>{dataCategory[i].name}</Option>
        );
    }

    const handleFreeChange = (e) => {
        setFree(!free);
    };

    function LiveImage(e) {
        const img = window.URL.createObjectURL(e.target.files[0]);

        if (customePoster.length <= 8) {
            setCustomePoster([
                {
                    id: new Date().getTime(),
                    image_url: img,
                    file: e.target.files[0],
                    custome: true,
                },
                ...customePoster,
            ]);
        } else {
            const modal = Modal.info({
                centered: true,
                title: 'Xatolik',
                content: "8 tarasmdan ko'p yuklay olmaysiz",
            });
        }
    }

    useEffect(() => {
        if (products?.price === 0) {
            setFree(true);
        }
        GetItemsTag();
        setEditorLoaded(true);
        GetItemsCategoryLists();
    }, []);

    useEffect(() => {
        setCategory_ID(products?.category?.id)
    }, [])


    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Mahsulotni tahirirlash'} />
                <BreadCrumb breacrumb={breadCrumb} />


                {!loading ? (products && <div className="d-flex container justify-content-center">
                    <div
                        className="row w-100 gap-3 pt-5 "
                        style={{ alignItems: 'flex-start' }}>
                        <h4 className="col-md-8 m-0 p-0">
                            Mahsulotni tahrirlash
                        </h4>
                        <div
                            className="col-md-4 m-0  d-flex justify-content-between p-0 "
                            style={{ maxWidth: '370px' }}>
                            <h4>Sotuvdagi ko'rinishi : </h4>
                            <Button
                                className="btn-success "
                                data-bs-target="#staticBackdrop"
                                data-bs-toggle="modal">
                                <i className="fa-solid  fa-eye text-success-emphasis mx-3"></i>
                            </Button>
                        </div>
                        <form

                            onSubmit={handleSubmit(handleClickPostsEdit)}
                            style={{ position: 'relative' }}
                            id="FormPostsMyProducts"
                            className=" pb-5  col-md-8"
                            noValidate>
                            <div className="row">
                                <div className="col-md-4  d-flex justify-content-between p-0 ">
                                    {' '}
                                    <p>Mahsulot nomi: *</p>
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
                                    defaultValue={products?.title}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-4 m-0 pt-2 d-flex justify-content-between p-0">
                                    <p>Teglar:</p>{' '}
                                    <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>

                                <Select
                                    className=" p-0 col-md-8 mb-3"
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    onChange={(e) => setTagSearchResult(e)}
                                    defaultValue={
                                        products?.tag &&
                                        products?.tag?.map((item) => item.name)
                                    }>
                                    {children}
                                </Select>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                    <p>Kategoriya: *</p>{' '}
                                    <Tooltip title="Mahsulotingiz uchun mos kategoriyani tanlang.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>

                                <div className="rounded-3  mb-3 p-0 m-0 d-flex flex-column col-md-8">
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


                            {products?.document?.content_type !== 'audio' ? (
                                <div className="row mb-3">
                                    <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                        <p>Mahsulot rasmi: *</p>
                                        <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz rasmi quyidagi turdagi fayl bo’lishi mumkin: .jpeg yoki .jpg, .png, .psd, .svg">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <div
                                        className="add-product-user-image d-flex justify-content-between col-md-8  form-control pt-2 rounded-3"
                                        style={{
                                            backgroundColor: '#F1F1F1',
                                            border: `1px dashed green`,
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
                                            className="overflow-x-scroll  d-flex  gap-1"
                                            style={{ width: '430px' }}>
                                            {!customePoster?.length > 0 ? (
                                                <span
                                                    className="d-flex flex-column align-items-center mt-4 mx-5"
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}>
                                                    <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                    <span className="text-center">
                                                        {' '}
                                                        {false
                                                            ? 'Ilitmos kamida 3ta rasmini yuklang.'
                                                            : 'Rasmini yuklash uchun ushbu hududga bosing.'}{' '}
                                                    </span>
                                                </span>
                                            ) : (
                                                customePoster?.map((item, i) =>
                                                    customeFile?.image_url ===
                                                        item.image_url ? (
                                                        <div
                                                            className="selected-img"
                                                            style={{
                                                                display:
                                                                    'block',
                                                                border: `1px solid red`,
                                                                cursor: 'default',
                                                                padding: 1,
                                                                width: '80px',
                                                                backgroundImage: `url(${item.image_url})`,
                                                                backgroundPosition:
                                                                    'center',
                                                                backgroundSize:
                                                                    '100%',
                                                            }}
                                                            alt=""
                                                            key={i}>
                                                            <span
                                                                onClick={() => {
                                                                    setCustomePoster(
                                                                        (c) => [
                                                                            ...c.filter(
                                                                                (
                                                                                    el
                                                                                ) =>
                                                                                    el.image_url !==
                                                                                    item.image_url
                                                                            ),
                                                                        ]
                                                                    );
                                                                    setCustomeFile(
                                                                        null
                                                                    );
                                                                }}>
                                                                <img
                                                                    src="/static/img/delete.png"
                                                                    alt=""
                                                                    width={20}
                                                                />
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            className="mx-1 "
                                                            onClick={() => {
                                                                setCustomeFile(
                                                                    item
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
                            ) : (
                                ''
                            )}

                            <div className="row">
                                <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                    <p>Mahsulot sotish narxi: *</p>{' '}
                                    <Tooltip title="Mahsulotingiz uchun narx kiriting. Narx kiritish oldi mahsulotingizga o’xshash bo’lgan mahsulotlar narxini ko’rishingiz tafsiya beriladi.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>
                                <Checkbox
                                    checked={free}
                                    className="col-md-2 d-flex align-items-center justify-content-start px-0 py-2"
                                    onChange={handleFreeChange}>
                                    Bepul
                                </Checkbox>
                                {/* <input
                                    type="number"
                                    className="form-control  rounded-3 col-md-6 mb-3"
                                    name="price"
                                    disabled={free}
                                    defaultValue={products?.price}
                                    onChange={(e) =>
                                        setTaxminiyNarx(e.target.value)
                                    }
                                /> */}

                                <InputNumber
                                    disabled={free}
                                    value={products?.price}
                                    className="col-md-6 p-2 post-price"
                                    onValueChange={(e) => setTaxminiyNarx(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 d-flex justify-content-between p-0">
                                    <p>Mahsulot to’liq tavsifi: *</p>{' '}
                                    <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>

                                <div className="col-md-8 p-0  mb-3">
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

                                className="d-flex justify-content-end "
                                style={{ transform: 'translateX(16px)' }}>
                                <button
                                    type="submit"
                                    className="btn btn-success py-3 px-5 ">
                                    <span className="fs-4">
                                        Saqlash{' '}
                                        <i className="fa-solid fa-cloud-arrow-down mx-2"></i>
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
                            className="card rounded-3 col-md-4 p-3 cardResponsive "
                            style={{ maxWidth: '370px' }}>
                            <div className="image rounded mb-3">
                                <img
                                    src={
                                        customeFile?.image_url ||
                                        products.poster
                                    }
                                    alt="doc"
                                    className="mb-4 border"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="text-start">
                                <p className="live-card-p">
                                    <span>
                                        <strong>Nomi</strong>:{' '}
                                    </span>{' '}
                                    <span style={{ maxWidth: '150px' }}>
                                        {watch("title") ? watch("title") : products?.title}
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span>
                                        <strong>Narxi</strong>:{' '}
                                    </span>
                                    <span style={{ maxWidth: '150px' }}>
                                        {taxminiyNarx
                                            ? addPeriodToThousands(taxminiyNarx)
                                            : addPeriodToThousands(
                                                products?.discount_price
                                            )}
                                        so'm
                                    </span>
                                </p>

                                <p className="live-card-p">
                                    <span>
                                        <strong>Teglari</strong>:{' '}
                                    </span>
                                    <span style={{ maxWidth: '150px' }}>
                                        {products?.tag?.map((item) => (
                                            <span key={item.name}>
                                                #{item.name}{' '}
                                            </span>
                                        ))}
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span>
                                        <strong>Kategoriya</strong>:{' '}
                                    </span>
                                    <span style={{ maxWidth: '150px' }}>
                                        {categoryName
                                            ? categoryName
                                            : products?.category?.name}
                                    </span>
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
                                            {products?.document?.page_count} ta
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Hajmi:{' '}
                                            </strong>{' '}
                                            {products?.document?.file_size}
                                        </li>
                                        <li>
                                            {' '}
                                            <strong className="fs-4">
                                                Turi:{' '}
                                            </strong>{' '}
                                            {products?.document?.file_type}
                                        </li>
                                    </ul>
                                </p>
                                <p className="live-card-p">
                                    <span>
                                        <strong>
                                            Mahsulotingiz haqida to'liq ma'umot
                                        </strong>
                                        :{' '}
                                    </span>
                                    <span style={{ maxWidth: '150px' }}>
                                        {Fulldata
                                            ? parse(Fulldata)
                                            : products?.description
                                                ? parse(products?.description)
                                                : ''}
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
                        <div className="offcanvas-header pt-5">
                            <h3 id="offcanvasRightLabel" className="m-0 elh3 ">
                                <span>
                                    Tahrirlanayotgan mahsulotingizni ko'rinishi
                                </span>{' '}
                            </h3>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="card rounded-3 ">
                                <div className="image rounded mb-3">
                                    <img
                                        src={products.poster}
                                        alt="doc"
                                        className="mb-4 border"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="text-start">
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Nomi</strong>:{' '}
                                        </span>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {watch("title") ? watch("title") : products?.title}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Narxi</strong>:{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {taxminiyNarx
                                                ? addPeriodToThousands(
                                                    taxminiyNarx
                                                )
                                                : addPeriodToThousands(
                                                    products?.discount_price
                                                )}
                                            so'm
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Teglari</strong>:{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {products?.tag?.map((item) => (
                                                <span key={item.name}>
                                                    #{item.name}{' '}
                                                </span>
                                            ))}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Kategoriya</strong>:{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {categoryName
                                                ? categoryName
                                                : products?.category?.name}
                                        </span>
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
                                                {products?.document?.page_count}{' '}
                                                ta
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Hajmi:{' '}
                                                </strong>{' '}
                                                {products?.document?.file_size}
                                            </li>
                                            <li>
                                                {' '}
                                                <strong className="fs-4">
                                                    Turi:{' '}
                                                </strong>{' '}
                                                {products?.document?.file_type}
                                            </li>
                                        </ul>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>
                                                Mahsulotingiz haqida to'liq
                                                ma'umot
                                            </strong>
                                            :{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {Fulldata
                                                ? parse(Fulldata)
                                                : products?.description
                                                    ? parse(products?.description)
                                                    : ''}
                                        </span>
                                    </p>
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
                    </div>}


                <div
                    className="modal fade "
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog container ">
                        <div className="modal-content  mahsulotingizElh3">
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
                                                    {products?.document
                                                        ?.images ? (
                                                        products?.document?.images?.map(
                                                            (item) => (
                                                                <img
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    src={
                                                                        item.image_url
                                                                    }
                                                                    alt="doc"
                                                                    className="border mb-3 img-fluid"
                                                                />
                                                            )
                                                        )
                                                    ) : (
                                                        <img
                                                            src="/static/img/docCopy.png"
                                                            alt="doc"
                                                        />
                                                    )}
                                                </div>
                                            </figure>
                                        </div>
                                        <div className="ps-product__info">
                                            <header>
                                                <h1>
                                                    {watch("title")
                                                        ? watch("title")
                                                        : products?.title}
                                                </h1>
                                                <h4>
                                                    {taxminiyNarx
                                                        ? addPeriodToThousands(
                                                            taxminiyNarx
                                                        )
                                                        : addPeriodToThousands(
                                                            products?.discount_price
                                                        )}{' '}
                                                    so'm
                                                </h4>
                                            </header>
                                            <div>
                                                <h4>
                                                    {' '}
                                                    Muallif :{' '}
                                                    {
                                                        products?.seller
                                                            ?.first_name
                                                    }{' '}
                                                    {
                                                        products?.seller
                                                            ?.last_name
                                                    }
                                                </h4>
                                            </div>
                                            <div className="ps-product__desc">
                                                <strong>
                                                    <span>
                                                        <strong className="fs-4">
                                                            Qisqa tavsif
                                                        </strong>
                                                        :{' '}
                                                    </span>
                                                    <ul
                                                        style={{
                                                            listStyleType:
                                                                'revert',
                                                        }}>
                                                        <li>
                                                            {' '}
                                                            <strong className="fs-4">
                                                                Betlar soni:{' '}
                                                            </strong>{' '}
                                                            {
                                                                products
                                                                    ?.document
                                                                    ?.page_count
                                                            }{' '}
                                                            ta
                                                        </li>
                                                        <li>
                                                            {' '}
                                                            <strong className="fs-4">
                                                                Hajmi:{' '}
                                                            </strong>
                                                            {
                                                                products
                                                                    ?.document
                                                                    ?.file_size
                                                            }
                                                        </li>
                                                        <li>
                                                            {' '}
                                                            <strong className="fs-4">
                                                                Turi:{' '}
                                                            </strong>
                                                            {
                                                                products
                                                                    ?.document
                                                                    ?.file_type
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Kategoriyasi
                                                            </strong>{' '}
                                                            :{' '}
                                                            {categoryName
                                                                ? categoryName
                                                                : products
                                                                    ?.category
                                                                    ?.name}
                                                        </li>
                                                    </ul>
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
                                                {products?.tag?.map((item) => (
                                                    <span
                                                        className="mx-3"
                                                        key={item.name}>
                                                        #{item.name}{' '}
                                                    </span>
                                                ))}
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
                                                        : products?.description
                                                            ? parse(
                                                                products?.description
                                                            )
                                                            : ''}
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

export default PostsMyProducts;
