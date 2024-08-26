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
import { Button, Modal, Select, Tabs, Tooltip } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';



const PostsProductsEdit = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState(null);
    const [tagSearchResult1, setTagSearchResult2] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataCatStatus, setDataCatStatus] = useState(null);
    const [Fulldata, setFullData] = useState(null);
    const [textAreaItems, setTextAreaItmes] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [tegProductsLists, setTegProdcutsLists] = useState([]);
    const [category_id, setCategory_ID] = useState(null)
    const routerId = Router.query?.id
    const [products, setProducts] = useState(null)
    const [page_count, setPageCount] = useState(0)





    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Mahsulotni tahrirlash',
        },
    ];

    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        if (products?.document?.content_type === 'file') {
            const ItemsData = await GetRepository.getAllCategoryLists();
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
        if (products?.document?.content_type === 'audio') {
            const ItemsData = await GetRepository.getAllCategoryListsAudio();
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
        if (products?.document?.content_type === 'template') {
            const ItemsData = await GetRepository.getAllCategoryListsDesign();
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
    }

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


    const onChange = async (e) => {
        setCategoryName(e);
        for (let j = 0; j < dataCategory.length; j++) {
            if (dataCategory[j].name === e) {
                setCategory_ID(dataCategory[j].id);
            }
        }
    };

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

    const onSearchTegsAktiv = async (value) => {

        const ItemsData = await MediaRepository.getTagItmesAktive(value);
        if (ItemsData) {
            setTagItems(ItemsData);
        }
    }

    const onSearchTegsDeAktiv = async (value) => {
        const ItemsData = await GetRepository.getTagListsDeaktiv(user?.access, value);
        if (ItemsData) {
            setTegProdcutsLists(ItemsData);
        }
    }



    const options = [];

    for (const item of dataCategory) {
        options.push(<Option key={item.name}>{item.name}</Option>);
    }

    async function getProducts() {
        if (routerId && user?.access) {
            setLoading(true)
            const ItemsData = await GetRepository.getShopsProductsAdmin(routerId, user?.access)
            setProducts(ItemsData);
            setLoading(false)
        }

    }
    useEffect(() => {
        getProducts()
    }, [routerId, user?.access])

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        GetItemsCategoryLists();
        GetItemsTagAktivmas();
    }, [user?.access]);



    async function handleClickPostsEdit(e) {
        e.preventDefault();
        if (
            title ||
            category_id ||
            dataCatStatus ||
            Fulldata ||
            textAreaItems
        ) {
            const data = {};
            if (title) {
                Object.assign(data, { title: title });
            }
            if (dataCatStatus == "approved") {
                if (results) {
                    Object.assign(data, { tags: results });
                }
                if (results3) {
                    Object.assign(data, { tags: results3 });
                }
            }
            if (category_id) {
                Object.assign(data, { category: category_id });
            }
            if (dataCatStatus) {
                Object.assign(data, { status: dataCatStatus });
            }
            if (textAreaItems) {
                Object.assign(data, { reason: textAreaItems });
            }
            if (page_count) {
                Object.assign(data, { page_count: page_count ? page_count : products?.document?.page_count });
            }
            if (Fulldata) {
                Object.assign(data, { description: Fulldata });
            }
            const patchItems = await PatchRepository.getProductsPatch(
                data,
                products?.id,
                user?.access
            );
            setFullData(null);
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz malumotlarni o'zgartirdingiz ",
            });
        } else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun ma'lumot kiritilmadi ",
            });
        }
        Router.back();
    }

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
        setCategory_ID(products?.category?.id)
    }, [products?.category?.id])



    

    return user?.role === 'admin' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Mahsulotni tahrirlash'} />
                <BreadCrumb breacrumb={breadCrumb} />
                {!loading ?

                    (products && <div className="d-flex container justify-content-center">
                        <div
                            className="row w-100 gap-3 mt-5 mb-5 "
                            style={{ alignItems: 'flex-start' }}>
                            <h4 className="col-md-8 m-0 p-0">
                                Mahsulotni tahrirlash
                            </h4>
                            <div
                                className="col-md-4 m-0  d-flex justify-content-between p-0 "
                                style={{ maxWidth: '360px' }}>
                                <h4>Sotuvdagi ko'rinishi : </h4>
                                <Button
                                    className="btn-success "
                                    data-bs-target="#staticBackdrop"
                                    data-bs-toggle="modal">
                                    <i className="fa-solid  fa-eye text-success-emphasis mx-3"></i>
                                </Button>
                            </div>
                            <form
                                onSubmit={handleClickPostsEdit}


                                style={{ position: 'relative' }}
                                id="FormPostsMyProducts"
                                className="pb-5 col-md-8">
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

                                    <input
                                        type="text"
                                        className="form-control  rounded-3 col-md-8 mb-3 bg-white "
                                        placeholder="Mahsulot nomi"
                                        name="title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        defaultValue={products?.title}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-4  d-flex justify-content-between p-0 ">
                                        {' '}
                                        <p>Mahsulot holati: *</p>
                                        <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                        </Tooltip>
                                    </div>

                                    <select
                                        className="form-select fs-3 py-3 rounded-3 col-md-8 mb-3"
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
                                {dataCatStatus === 'cancelled' ||
                                    products.status === 'cancelled' ? (
                                    <div className="row">
                                        <div className="col-md-4 d-flex justify-content-between p-0">
                                            <p>Holat to'g'risida sabab: *</p>{' '}
                                            <Tooltip title="Mijozlarga mahsulot haqida qanaqadir xatolik bo'lsa o'sha xatolik to'g'risida sabab yozish ">
                                                <i
                                                    style={{ cursor: 'pointer' }}
                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                            </Tooltip>
                                        </div>

                                        <div className="col-md-8 p-0 mb-3">
                                            <textarea
                                                defaultValue={products?.reason}
                                                onChange={(e) =>
                                                    setTextAreaItmes(e.target.value)
                                                }
                                                required
                                                rows={4}
                                                className="rounded w-100 border p-3 border-danger"></textarea>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="row">
                                    <div className="col-md-4 m-0 pt-2 d-flex justify-content-between p-0">
                                        <p>Aktiv teglar:</p>{' '}
                                        <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>

                                    <Select
                                        mode="tags"
                                        onChange={(e) => setTagSearchResult(e)}
                                        onSearch={onSearchTegsAktiv}
                                        defaultValue={
                                            products?.active_tag &&
                                            products?.active_tag?.map(
                                                (item) => item.name
                                            )
                                        }
                                        className="col-md-8 p-0 mb-3">
                                        {children}
                                    </Select>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 m-0 pt-2 d-flex justify-content-between p-0">
                                        <p>Aktiv emas teglar:</p>{' '}
                                        <Tooltip title="Mos teglarni tanlab qo’yishingiz, bu mahsulotingizni qidiruvlarida birinchilardan bo’lib chiqishiga sabab bo’ladi. Teg tanlang, agar mos teg bo’lmasa, maydoning o’ziga har bir mos teglaringizni kiritib qo’yishingiz mumkin.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2"></i>
                                        </Tooltip>
                                    </div>
                                    <Select
                                        mode="tags"
                                        onChange={(e) => setTagSearchResult2(e)}
                                        defaultValue={
                                            products?.deactive_tag &&
                                            products?.deactive_tag?.map(
                                                (item) => item.name
                                            )
                                        }
                                        onSearch={onSearchTegsDeAktiv}
                                        className="col-md-8 p-0 mb-3">
                                        {childrenAktivmas}
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

                                <div className="row">
                                    <div className="col-md-4  d-flex justify-content-between p-0 ">
                                        {' '}
                                        <p>Sahifa soni: *</p>
                                        <Tooltip title="Mijozlarga  mahsulotingiz sahifalari sonini ko'rinishi uchun kiritishingiz kerak.">
                                            <i
                                                style={{ cursor: 'pointer' }}
                                                className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                        </Tooltip>
                                    </div>

                                    <input
                                        type="number"
                                        className="form-control bg-white  rounded-3 col-md-8 mb-3 "
                                        placeholder="Sahifa soni"
                                        name="title"
                                        onChange={(e) => setPageCount(e.target.value)}
                                        defaultValue={products?.document?.page_count}
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

                                    <div className="col-md-8 p-0 mb-3">
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
                                style={{ maxWidth: '360px' }}>
                                <div className="image rounded ">
                                    <div className="image rounded ">
                                        {!products.poster_url ? (
                                            <img
                                                src="/static/img/docCopy.png"
                                                alt="doc"
                                                className="border mb-4"
                                                style={{ objectFit: 'cover' }}
                                            />

                                        ) : (
                                            <img
                                                src={products.poster_url}
                                                alt="doc"
                                                className="mb-4 border"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="text-start">
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Nomi</strong>:{' '}
                                        </span>{' '}
                                        <span style={{ maxWidth: '150px' }}>
                                            {title ? title : products?.title}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>Teglari</strong>:{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {products?.active_tag?.map((item) => (
                                                <span key={item.id}>
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
                                <h3 id="offcanvasRightLabel" className="m-0 elh3">
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
                                    <div className="image rounded">
                                        <div className="image rounded ">
                                            {!products.poster ? (
                                                <img
                                                    src="/static/img/docCopy.png"
                                                    alt="doc"
                                                    className="border mb-4"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <img
                                                    src={products.poster}
                                                    alt="doc"
                                                    className="mb-4 border"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-start">
                                        <p className="live-card-p">
                                            <span>
                                                <strong>Nomi</strong>:{' '}
                                            </span>{' '}
                                            <span style={{ maxWidth: '150px' }}>
                                                {title ? title : products?.title}
                                            </span>
                                        </p>
                                        <p className="live-card-p">
                                            <span>
                                                <strong>Teglari</strong>:{' '}
                                            </span>
                                            <span style={{ maxWidth: '150px' }}>
                                                {products?.tag?.map((item) => (
                                                    <span key={item.id}>
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
                        <div className="modal-content">
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
                                                        products?.document?.images.map(
                                                            (item) => (
                                                                <img
                                                                    src={
                                                                        item.image_url
                                                                    }
                                                                    key={
                                                                        item.id
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
                                                    {title
                                                        ? title
                                                        : products?.title}
                                                </h1>
                                                <h4>
                                                    {products
                                                        ? addPeriodToThousands(
                                                            products?.price
                                                        )
                                                        : '0'}{' '}
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
                                                {products?.active_tag?.length >
                                                    0 ? (
                                                    <p>
                                                        {' '}
                                                        <strong>
                                                            Aktiv teglar:{' '}
                                                        </strong>{' '}
                                                        {products?.active_tag?.map(
                                                            (item) => (
                                                                <span
                                                                    key={
                                                                        item.id
                                                                    }>
                                                                    {item.name}{' '}
                                                                </span>
                                                            )
                                                        )}{' '}
                                                    </p>
                                                ) : (
                                                    <></>
                                                )}
                                                {products?.deactive_tag
                                                    ?.length > 0 ? (
                                                    <p>
                                                        {' '}
                                                        <strong>
                                                            Aktiv emas teglar:{' '}
                                                        </strong>{' '}
                                                        {products?.deactive_tag?.map(
                                                            (item) => (
                                                                <span
                                                                    key={
                                                                        item.id
                                                                    }>
                                                                    {item.name}{' '}
                                                                </span>
                                                            )
                                                        )}{' '}
                                                    </p>
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

export default PostsProductsEdit;

