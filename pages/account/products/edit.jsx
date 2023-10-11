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
const category_id = []

const PostsProductsEdit = () => {
    const { TabPane } = Tabs;
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState(null);
    const [tagSearchResult1, setTagSearchResult2] = useState(null);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { products, user } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Shortdata, setShortData] = useState('');
    const [dataCatStatus, setDataCatStatus] = useState(null);
    const [Fulldata, setFullData] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [tegProductsLists, setTegProdcutsLists] = useState([]);

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Hujjatni tahrirlash',
        },
    ];
    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        if (ItemsData) {
            setDataCategory(ItemsData);
        }
    }

    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes();
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }
    async function GetItemsTagAktivmas() {
        const ItemsData = await GetRepository.getTagListsDeaktiv(user?.access);
        if (ItemsData?.results) {
            setTegProdcutsLists(ItemsData.results);
        }
    }

    const resuslts1 = products?.active_tag?.map(item => item.name)
    const resuslts2 = products?.deactive_tag?.map(item => item.name);

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
        category_id.length = 0
        setCategoryName(e)
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

    for (const item of dataCategory) {
        options.push(
            <Option key={item.name} >
                {item.name}
            </Option>
        );
    }

    useEffect(() => {
        GetItemsTag();
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        GetItemsCategoryLists();
        GetItemsTagAktivmas();
        GetItemsTagAktivmas();
    }, [user?.access]);



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

    async function handleClickPostsEdit(e) {
        e.preventDefault();
        const data = {};

        if (title) {
            Object.assign(data, { title: title });
        }
        if (results) {
            Object.assign(data, { tags: results });
        }
        else {
            Object.assign(data, { tags: results3 })
        }
        if (category_id[0]) {
            Object.assign(data, { category: category_id[0] });
        }
        if (dataCatStatus) {
            Object.assign(data, { status: dataCatStatus });
        }
        if (Fulldata) {
            Object.assign(data, { description: Fulldata });
        }
        if (Shortdata) {
            Object.assign(data, { short_description: Shortdata });
        }
        const patchItems = await PatchRepository.getProductsPatch(
            data,
            products?.id,
            user?.access
        );
        Router.push('/account/products');
        if (patchItems?.status === 400) {
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Nimadir xato ketidi qaytadan urinib ko'ring",
            });
            modal.update;
        } else {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            modal.update;
        }
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


    return user?.role === 'admin' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="d-flex container justify-content-center">
                    <div
                        className="row w-100 gap-3 mt-5 "
                        style={{ alignItems: 'flex-start' }}>
                        <h4 className="col-md-8 m-0 p-0">
                            Hujjatni tahrirlash
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
                                    className="form-control  rounded-3 col-md-8 mb-3 "
                                    placeholder="Hujjat nomi"
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
                                                {item.status === 'moderation'
                                                    ? 'Moderatsiya'
                                                    : item.status ===
                                                        'cancelled'
                                                        ? 'Bekor qilingan'
                                                        : item.status === 'approved'
                                                            ? 'Tasdiqlangan'
                                                            : ''}
                                            </option>
                                        ) : (
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
                                    defaultValue={
                                        products?.active_tag
                                        &&
                                        products?.active_tag?.map((item) => item.name)
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
                                        products?.deactive_tag

                                        &&
                                        products?.deactive_tag?.map((item) => item.name)
                                    }
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
                                        mode='select'
                                        showSearch
                                        style={{ width: '100%',  height:"47px" }}
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        defaultValue={products?.category?.name}
                                    >
                                        {options}

                                    </Select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 d-flex justify-content-between p-0">
                                    <p>Mahsulotning qisqacha tavsifi: *</p>{' '}
                                    <Tooltip title="Mijozlarga mahsulotingizga qiziqishini ortirish uchun mahsulot haqidagi qisqacha eng muhim bo’lgan tafsiflarni ko’rsatib o’ting.">
                                        <i
                                            style={{ cursor: 'pointer' }}
                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                    </Tooltip>
                                </div>

                                <div className="col-md-8 p-0 mb-3">
                                    <CKeditor
                                        name="description"
                                        onChange={(data) => {
                                            setShortData(data);
                                        }}
                                        editorLoaded={editorLoaded}
                                        value={products?.short_description}
                                    />
                                </div>
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
                            style={{ maxWidth: '370px' }}>
                            <div className="image rounded ">
                                <div className="image rounded ">
                                    {!products.poster ? (
                                        <img
                                            src="/static/img/docCopy.jpg"
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
                                        {products?.active_tag?.map((item) => (
                                            <span key={item.id}>#{item.name} </span>
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
                                        <strong>Qisqa tavsif</strong>:{' '}
                                    </span>
                                    <span style={{ maxWidth: '150px' }}>
                                        {Shortdata
                                            ? parse(Shortdata)
                                            : products?.short_description
                                                ? parse(products?.short_description)
                                                : ''}
                                    </span>
                                </p>
                                <p className="live-card-p">
                                    <span>
                                        <strong>
                                            Hujjatingiz haqida to'liq ma'umot
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
                                                src="/static/img/docCopy.jpg"
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
                                                <span key={item.id}>#{item.name} </span>
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
                                            <strong>Qisqa tavsif</strong>:{' '}
                                        </span>
                                        <span style={{ maxWidth: '150px' }}>
                                            {Shortdata
                                                ? parse(Shortdata)
                                                : products?.short_description
                                                    ? parse(
                                                        products?.short_description
                                                    )
                                                    : ''}
                                        </span>
                                    </p>
                                    <p className="live-card-p">
                                        <span>
                                            <strong>
                                                Hujjatingiz haqida to'liq
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
                </div>
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
                                                    {products?.iamges ? (
                                                        products?.iamges?.map(
                                                            (item) => (
                                                                <img
                                                                    src={
                                                                        item.image_url
                                                                    }
                                                                    key={item.id}
                                                                    alt="doc"
                                                                    className="border mb-3 img-fluid"
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
                                                <ul className="ps-list--dot">
                                                    <span>
                                                        <strong>
                                                            Qisqa tavsif :
                                                        </strong>
                                                        {Shortdata
                                                            ? parse(Shortdata)
                                                            : products?.short_description
                                                                ? parse(
                                                                    products?.short_description
                                                                )
                                                                : ''}
                                                    </span>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <strong>
                                                            Kategoriyasi
                                                        </strong>{' '}
                                                        :{' '}
                                                        {categoryName
                                                            ? categoryName
                                                            : products?.category
                                                                ?.name}
                                                    </li>
                                                </ul>
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
                                                                <span key={item.id}>
                                                                    #{item.name}{' '}
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
                                                                <span key={item.id}>
                                                                    #{item.name}{' '}
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
