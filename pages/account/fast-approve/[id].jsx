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
import { message, Modal, Select, Tooltip } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require('html-react-parser');
import { useRouter } from 'next/router';
import Meta from '~/components/shared/headers/Meta';
import { useLazyRegenrateAdminProductQuery } from '~/rtk-store/products/api';
import { useFastApprove } from '~/hooks/useFastApprove';
import ViewProductModal from '~/components/products/fast-approve/ViewProductModal';

const PostsProductsEdit = () => {
    const Router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [generateImg, { isLoading }] = useLazyRegenrateAdminProductQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        loading,
        setLoading,
        submitLoading,
        setSubmitLoading,
        products,
        setProducts,
        dataCategory,
        setDataCategory,
        tagItems,
        setTagItems,
        tegProductsLists,
        setTegProdcutsLists,
        title,
        setTitle,
        categoryName,
        setCategoryName,
        category_id,
        setCategory_ID,
        dataCatStatus,
        setDataCatStatus,
        Fulldata,
        setFullData,
        textAreaItems,
        setTextAreaItems,
        page_count,
        setPageCount,
        demoLink,
        setDemoLink,
        posters,
        setPosters,
        poster,
        setPoster,
        tagSearchResult,
        setTagSearchResult,
        tagSearchResult1,
        setTagSearchResult2,
        routerId,
    } = useFastApprove(user);

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
            const ItemsData = await GetRepository.getAllCategoryListsAudio(
                value
            );
            if (ItemsData) {
                setDataCategory(ItemsData);
            }
        }
        if (products?.document?.content_type === 'template') {
            const ItemsData = await GetRepository.getAllCategoryListsDesign(
                value
            );
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
    };

    const onSearchTegsDeAktiv = async (value) => {
        const ItemsData = await GetRepository.getTagListsDeaktiv(
            user?.access,
            value
        );
        if (ItemsData) {
            setTegProdcutsLists(ItemsData);
        }
    };

    const options = [];

    for (const item of dataCategory) {
        options.push(<Option key={item.name}>{item.name}</Option>);
    }

    async function getProducts() {
        if (routerId && user?.access) {
            setLoading(true);
            const ItemsData = await GetRepository.getShopsProductsAdmin(
                routerId,
                user?.access
            );
            setProducts(ItemsData);
            setLoading(false);
        }
    }
    useEffect(() => {
        getProducts();
    }, [routerId, user?.access]);

    useEffect(() => {
        if (Router.query?.end) {
            Modal.success({
                title: 'Tabriklaymiz',
                content: 'Tasdiqlanmagan mahsulotlar tugadi',
            });
        }
    }, [Router.query]);

    useEffect(() => {
        if (user?.access) {
            GetItemsTag();
            setEditorLoaded(true);
        }
    }, [user?.access]);

    useEffect(() => {
        if (user?.access) {
            GetItemsCategoryLists();
            GetItemsTagAktivmas();
        }
    }, [user?.access]);

    // console.log(posters?.length > 0)

    async function handleClickPostsEdit(e) {
        e.preventDefault();
        if (!products?.document?.images?.[0]?.image_url && !posters?.length) {
            const modal = Modal.warning({
                centered: true,
                title: 'Xatolik!',
                content: "Kamida bitta rasm kiriting ",
            });
            return
        }
        if (
            title ||
            category_id ||
            dataCatStatus ||
            Fulldata ||
            textAreaItems
        ) {
            const data = {};
            const formData = new FormData();
            if (title) {
                // Object.assign(data, { title: title });
                formData.append('title', title);
            }
            if (dataCatStatus == 'approved') {
                let tags = [];
                if (results?.length) {
                    // Object.assign(data, { tags: results });
                    // formData.append('tags', results?.join(','))
                    tags = [...results];
                }
                if (results3) {
                    tags = [...tags, ...results3];
                    // Object.assign(data, { tags: results3 });
                    // formData.append('tags', [...results3, ...results]?.join(','))
                }
                formData.append('tags', tags?.join(','));
            }
            if (category_id) {
                // Object.assign(data, { category: category_id });
                formData.append('category', category_id);
            }
            if (demoLink) {
                // Object.assign(data, { demo_link: demoLink })
                formData.append('demo_link', demoLink);
            }

            if (!products?.document?.[0]?.images?.image_url) {
                for (const img of posters) {
                    formData.append('images', img?.file);
                }
                if (poster) {
                    formData.append('poster', poster?.file);
                }
            }

            if (dataCatStatus) {
                // Object.assign(data, { status: dataCatStatus });
                formData.append('status', dataCatStatus);
            }
            if (textAreaItems) {
                // Object.assign(data, { reason: textAreaItems });
                formData.append('reason', textAreaItems);
            }
            if (page_count) {
                // Object.assign(data, { page_count: page_count ? page_count : products?.document?.page_count });
                formData.append(
                    'page_count',
                    page_count ? page_count : products?.document?.page_count
                );
            }
            if (Fulldata) {
                // Object.assign(data, { description: Fulldata });
                formData.append('description', Fulldata);
            }
            setSubmitLoading(true);
            await PatchRepository.getProductsPatch(
                formData,
                // data,
                products?.id,
                user?.access
            );
            setSubmitLoading(false);
            setFullData(null);
            message.success("O'zgarishlar saqlandi");
            Router.push('/account/fast-approve');
        } else {
            setSubmitLoading(false);
            message.error('Xatolik');
        }
    }

    const handleSkip = () => {
        message.warning('Tekshirish keyinga qoldirildi #' + routerId);
        Router.push('/account/fast-approve?pk=' + routerId);
    };

    const handlePrev = () => {
        Router.push('/account/fast-approve?prev=true&pk=' + routerId);
    };

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

    const handleRegenerate = async () => {
        const resp = await generateImg(routerId);
        if (resp.data && resp.data?.msg?.startsWith('File not found')) {
            message.error(
                "Hozircha bu faylga rasm generatsiya qilishni imkoni yo'q"
            );
        } else {
            message.success('Rasm generatsiya qilindi');
            getProducts();
        }
    };

    useEffect(() => {
        setCategory_ID(products?.category?.id);
    }, [products?.category?.id]);


    return user?.role === 'admin' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Mahsulotni tahrirlash'} />
                <BreadCrumb breacrumb={breadCrumb} />
                {!loading ? (
                    products && (
                        <div className="d-flex container justify-content-center">
                            <div
                                className="row w-100 gap-3 mt-5 mb-5 "
                                style={{ alignItems: 'flex-start' }}>
                                <div className="col-md-8 p-0">
                                    {products?.poster_url ? (
                                        ''
                                    ) : (
                                        <button
                                            className="btn-success border-0 d-flex align-items-center"
                                            href={products?.document?.file_url}
                                            target="_blank"
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                            }}
                                            onClick={
                                                isLoading
                                                    ? undefined
                                                    : handleRegenerate
                                            }>
                                            {isLoading ? (
                                                <i className="fa-solid fa-arrows-rotate fa-spin-pulse fs-2 me-2"></i>
                                            ) : (
                                                <i className="fa-solid fa-arrows-rotate fs-2 me-2"></i>
                                            )}
                                            <span>Rasm generatsiya qilish</span>
                                        </button>
                                    )}
                                </div>

                                <div
                                    className="col-md-4 m-0  d-flex justify-content-end gap-2 p-0 "
                                    style={{ maxWidth: '360px' }}>
                                    {products?.document?.content_type ===
                                        'video' ||
                                        products?.document?.content_type ===
                                        'audio' ? (
                                        <button
                                            className="btn-success"
                                            onClick={() => setIsModalOpen(true)}
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                border: 0,
                                            }}>
                                            <i className="fa-solid fa-eye me-2"></i>
                                            {products?.document
                                                ?.content_type === 'video'
                                                ? 'Videoni ko’rish'
                                                : 'Audioni tinglash'}
                                        </button>
                                    ) : (
                                        <a
                                            className="btn-success"
                                            href={products?.document?.file_url}
                                            target="_blank"
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                            }}>
                                            <i className="fa-solid fa-download me-2"></i>
                                            Faylni yuklab olish
                                        </a>
                                    )}
                                </div>
                                <ViewProductModal
                                    title={products?.title}
                                    isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}
                                    type={products?.document?.content_type}
                                    url={products?.document?.file_url}
                                />
                                <form
                                    onSubmit={handleClickPostsEdit}
                                    style={{ position: 'relative' }}
                                    id="FormPostsMyProducts"
                                    className="pb-5 col-md-12">
                                    <div className="row">
                                        <div className="col-md-4  d-flex justify-content-between p-0 ">
                                            {' '}
                                            <p>Mahsulot nomi: *</p>
                                            <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                            </Tooltip>
                                        </div>

                                        <input
                                            type="text"
                                            className="form-control  rounded-3 col-md-8 mb-3 bg-white "
                                            placeholder="Mahsulot nomi"
                                            name="title"
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            defaultValue={products?.title}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4  d-flex justify-content-between p-0 ">
                                            {' '}
                                            <p>Mahsulot holati: *</p>
                                            <Tooltip title="Mijozlarga ko’rsatiladigan mahsulotingiz nomini kiritishingiz kerak.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                            </Tooltip>
                                        </div>

                                        <select
                                            className="form-select fs-3 py-3 rounded-3 col-md-8 mb-3"
                                            onChange={(e) =>
                                                setDataCatStatus(e.target.value)
                                            }>
                                            {dataStatus?.map((item, i) =>
                                                products.status ===
                                                    item.status ? (
                                                    <option
                                                        selected
                                                        key={i}
                                                        value={item.status}>
                                                        {products.status ===
                                                            'moderation'
                                                            ? 'Moderatsiya'
                                                            : products.status ===
                                                                'cancelled'
                                                                ? 'Bekor qilingan'
                                                                : products.status ===
                                                                    'approved'
                                                                    ? 'Tasdiqlangan'
                                                                    : ''}
                                                    </option>
                                                ) : (
                                                    <option value={item.status}>
                                                        {item.status ===
                                                            'moderation'
                                                            ? 'Moderatsiya'
                                                            : item.status ===
                                                                'cancelled'
                                                                ? 'Bekor qilingan'
                                                                : item.status ===
                                                                    'approved'
                                                                    ? 'Tasdiqlangan'
                                                                    : ''}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    {
                                        // products?.document?.images.length > 1 ? '' :
                                        <div className="row mb-3">
                                            <div className="col-md-4 mt-2 d-flex justify-content-between p-0">
                                                <p>Mahsulot rasmi: *</p>
                                                <Tooltip title="Mijozlar to’lov qiglanidan so’ng, yuklab olishlari mumkin bo’lgan fayl. Mahsulotingiz rasmi quyidagi turdagi fayl bo’lishi mumkin: .jpeg yoki .jpg, .png, .psd, .svg">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>

                                            <div className="col-md-8 p-0">
                                                <div
                                                    className="add-product-user-image bg-white d-flex justify-content-between w-100 form-control py-2 rounded-3"
                                                    style={{
                                                        height: '100px',
                                                        backgroundColor: false
                                                            ? ' #fff'
                                                            : '#F1F1F1',
                                                        border: '1px dashed green',
                                                    }}>
                                                    <label
                                                        style={{
                                                            width: '50px',
                                                            cursor: 'pointer',
                                                        }}>
                                                        <i className="fa-solid fa-plus fs-1 mt-5 pt-1 mx-3"></i>
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            onChange={(e) => {
                                                                const item = {
                                                                    image_url:
                                                                        URL.createObjectURL(
                                                                            e
                                                                                .target
                                                                                .files[0]
                                                                        ),
                                                                    file: e
                                                                        .target
                                                                        .files[0],
                                                                };
                                                                setPosters(
                                                                    (c) => [
                                                                        ...c,
                                                                        item,
                                                                    ]
                                                                );
                                                                if (
                                                                    !posters.length
                                                                ) {
                                                                    setPoster(
                                                                        item
                                                                    );
                                                                }
                                                            }}
                                                            style={{
                                                                width: '20px',
                                                            }}
                                                            accept="image/*"
                                                        />
                                                    </label>

                                                    <div
                                                        className="overflow-x-scroll w-100 d-flex justify-content-center   gap-1"
                                                    >
                                                        {products?.poster_url ? (
                                                            products?.document?.images?.map(
                                                                (item, i) => (
                                                                    <img
                                                                        className="mx-1 "
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
                                                        ) : !posters.length >
                                                            0 ? (
                                                            <span
                                                                className="d-flex flex-column align-items-center mt-4 mx-5"
                                                                style={{
                                                                    cursor: 'pointer',
                                                                }}>
                                                                <i className="fa-solid fa-inbox text-primary mt-1"></i>
                                                                <span className="text-center">
                                                                    Rasmini
                                                                    yuklash
                                                                    uchun ushbu
                                                                    hududga
                                                                    bosing.
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            posters?.map(
                                                                (item, i) => (
                                                                    <img
                                                                        className="mx-1 "
                                                                        onClick={() => {
                                                                            setPoster(
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
                                        </div>
                                    }
                                    {dataCatStatus === 'cancelled' ||
                                        products.status === 'cancelled' ? (
                                        <div className="row">
                                            <div className="col-md-4 d-flex justify-content-between p-0">
                                                <p>
                                                    Holat to'g'risida sabab: *
                                                </p>{' '}
                                                <Tooltip title="Mijozlarga mahsulot haqida qanaqadir xatolik bo'lsa o'sha xatolik to'g'risida sabab yozish ">
                                                    <i
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                </Tooltip>
                                            </div>

                                            <div className="col-md-8 p-0 mb-3">
                                                <textarea
                                                    defaultValue={
                                                        products?.reason
                                                    }
                                                    onChange={(e) =>
                                                        setTextAreaItems(
                                                            e.target.value
                                                        )
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
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                            </Tooltip>
                                        </div>

                                        <Select
                                            mode="tags"
                                            onChange={(e) =>
                                                setTagSearchResult(e)
                                            }
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
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2"></i>
                                            </Tooltip>
                                        </div>
                                        <Select
                                            mode="tags"
                                            onChange={(e) =>
                                                setTagSearchResult2(e)
                                            }
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
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
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
                                                defaultValue={
                                                    products?.category?.name
                                                }>
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
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    className="fa-regular fa-circle-question px-4 mt-2 "></i>
                                            </Tooltip>
                                        </div>

                                        <input
                                            type="number"
                                            className="form-control bg-white  rounded-3 col-md-8 mb-3 "
                                            placeholder="Sahifa soni"
                                            name="title"
                                            onChange={(e) =>
                                                setPageCount(e.target.value)
                                            }
                                            defaultValue={
                                                products?.document?.page_count
                                            }
                                        />
                                    </div>

                                    {products?.document?.content_type ===
                                        'template' && (
                                            <div className="  row mt-3">
                                                <div className="col-md-4 d-flex justify-content-between p-0">
                                                    <p>Shablon demo link: </p>{' '}
                                                    <Tooltip title="Mijozlarga mahsulotingizni to'liq ko'rishi uchun. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                        <i
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className="fa-regular fa-circle-question px-4 mt-2"></i>
                                                    </Tooltip>
                                                </div>
                                                <div className=" p-0 rounded-3 col-md-8">
                                                    <input
                                                        type="url"
                                                        defaultValue={
                                                            products?.demo_link
                                                        }
                                                        className="form-control  rounded-3  bg-white"
                                                        onChange={(e) =>
                                                            setDemoLink(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}

                                    <div className="row">
                                        <div className="col-md-4 d-flex justify-content-between p-0">
                                            <p>Mahsulot to’liq tavsifi: *</p>{' '}
                                            <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                                <i
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
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
                                        className="d-flex justify-content-end gap-4"
                                        style={{
                                            transform: 'translateX(16px)',
                                        }}>
                                        <button
                                            type="button"
                                            onClick={handlePrev}
                                            className="btn btn-secondary py-2 px-3 ">
                                            <span className="fs-4">
                                                <i
                                                    class="fa-solid fa-forward me-2"
                                                    style={{
                                                        transform:
                                                            'rotateY(180deg)',
                                                    }}></i>
                                                Oldingisi{' '}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSkip}
                                            className="btn btn-secondary py-2 px-3 ">
                                            <span className="fs-4">
                                                Keyinga qoldirish{' '}
                                                <i class="fa-solid fa-forward ms-2"></i>
                                            </span>
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={submitLoading}
                                            className="btn btn-success py-2 px-3 ">
                                            <span className="fs-4">
                                                {submitLoading
                                                    ? 'Saqlanmoqda...'
                                                    : 'Saqlash'}{' '}
                                                <i class="fa-solid fa-circle-check ms-2"></i>
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
                                className="offcanvas offcanvas-end"
                                tabindex="-1"
                                id="offcanvasRight"
                                aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header pt-5">
                                    <h3
                                        id="offcanvasRightLabel"
                                        className="m-0 elh3">
                                        <span>
                                            Tahrirlanayotgan mahsulotingizni
                                            ko'rinishi
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
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={products.poster}
                                                        alt="doc"
                                                        className="mb-4 border"
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-start">
                                            <p className="live-card-p">
                                                <span>
                                                    <strong>Nomi</strong>:{' '}
                                                </span>{' '}
                                                <span
                                                    style={{
                                                        maxWidth: '150px',
                                                    }}>
                                                    {title
                                                        ? title
                                                        : products?.title}
                                                </span>
                                            </p>
                                            <p className="live-card-p">
                                                <span>
                                                    <strong>Teglari</strong>:{' '}
                                                </span>
                                                <span
                                                    style={{
                                                        maxWidth: '150px',
                                                    }}>
                                                    {products?.tag?.map(
                                                        (item) => (
                                                            <span key={item.id}>
                                                                #{item.name}{' '}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                            <p className="live-card-p">
                                                <span>
                                                    <strong>Kategoriya</strong>:{' '}
                                                </span>
                                                <span
                                                    style={{
                                                        maxWidth: '150px',
                                                    }}>
                                                    {categoryName
                                                        ? categoryName
                                                        : products?.category
                                                            ?.name}
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
                                                    style={{
                                                        maxWidth: '150px',
                                                    }}
                                                    className="">
                                                    <li>
                                                        {' '}
                                                        <strong className="fs-4">
                                                            Betlar soni:{' '}
                                                        </strong>{' '}
                                                        {
                                                            products?.document
                                                                ?.page_count
                                                        }{' '}
                                                        ta
                                                    </li>
                                                    <li>
                                                        {' '}
                                                        <strong className="fs-4">
                                                            Hajmi:{' '}
                                                        </strong>{' '}
                                                        {
                                                            products?.document
                                                                ?.file_size
                                                        }
                                                    </li>
                                                    <li>
                                                        {' '}
                                                        <strong className="fs-4">
                                                            Turi:{' '}
                                                        </strong>{' '}
                                                        {
                                                            products?.document
                                                                ?.file_type
                                                        }
                                                    </li>
                                                </ul>
                                            </p>
                                            <p className="live-card-p">
                                                <span>
                                                    <strong>
                                                        Mahsulotingiz haqida
                                                        to'liq ma'umot
                                                    </strong>
                                                    :{' '}
                                                </span>
                                                <span
                                                    style={{
                                                        maxWidth: '150px',
                                                    }}>
                                                    {Fulldata
                                                        ? parse(Fulldata)
                                                        : products?.description
                                                            ? parse(
                                                                products?.description
                                                            )
                                                            : ''}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
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
                )}
                <div
                    className="modal fade "
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div
                        className="modal-dialog container"
                        style={{ maxWidth: '600px' }}>
                        <div className="modal-content">
                            <div className="d-flex justify-content-end p-3">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
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
