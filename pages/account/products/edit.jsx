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
import { Modal, Select } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
var parse = require("html-react-parser");
import { useRouter } from 'next/router';


const PostsProductsEdit = () => {
    const Router = useRouter();
    const [tagSearchResult, setTagSearchResult] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [tagItems, setTagItems] = useState([]);
    const { products, user } = useSelector((state) => state.auth);
    const [category_id, setCategory_id] = useState(null);
    const [title, setTitle] = useState('');
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [Shortdata, setShortData] = useState('');
    const [dataCatStatus, setDataCatStatus] = useState(null);
    const [Fulldata, setFullData] = useState('');

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Hujjatni tahrirlash",
        },
    ];
    const Option = Select.Option;

    async function GetItemsCategoryLists() {
        const data = [];
        const token = user?.access;
        const ItemsData = await GetRepository.getCategoryLists(token);
        if (ItemsData?.results) {
            for (let i = 0; i < ItemsData?.results?.length; i++) {
                if (ItemsData?.results[i].parent !== null) {
                    data.push(ItemsData?.results[i]);
                }

                setDataCategory(data);
            }
        }
        }

        async function GetItemsTag() {
            const ItemsData = await MediaRepository.getTagItmes();
            if (ItemsData?.results) {
                setTagItems(ItemsData.results);
            }
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
        }

        const children = [];
        for (let i = 0; i < tagItems?.length; i++) {
            children.push(
                <Option key={tagItems[i].name}>{tagItems[i].name}</Option>
            );
        }


        useEffect(() => {
            GetItemsTag();
            setEditorLoaded(true);
        }, []);

        useEffect(() => {
            GetItemsCategoryLists();
        }, [user?.access]);

        const tags = JSON.stringify(tagSearchResult.join(" "));
        async function handleClickPostsEdit(e) {
            e.preventDefault()
            const data = {}

            if (title) {
                Object.assign(data, { "title": title })
            }
            if (tags) {
                Object.assign(data, { "tags": tags })
            }
            if (category_id) {
                Object.assign(data, { "category": category_id })
            }
            if (dataCatStatus) {
                Object.assign(data, { "status": dataCatStatus })
            }
            if (Fulldata) {
                Object.assign(data, { "description": Fulldata })
            }
            if (Shortdata) {
                Object.assign(data, { "short_description": Shortdata })
            }
            const patchItems = await PatchRepository.getProductsPatch(data, products?.id, user?.access);
            Router.push('/account/products');
            if (patchItems?.status === 400) {
                const modal = Modal.error({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Nimadir xato ketidi qaytadan urinib ko'ring",
                });
                modal.update
            }
            else {
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqqiyatli!',
                    content: "Siz  malumotlarni o'zgartirdingiz ",
                });
                modal.update
            }
        }
        const dataStatus = [
            {
                id: 1,
                status: "moderation"
            },
            {
                id: 2,
                status: "approved"
            },
            {
                id: 3,
                status: "cancelled"
            }
        ]

        return user?.role === 'admin' ? (
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="d-flex container justify-content-center">
                        <form
                            onSubmit={handleClickPostsEdit}
                            style={{ position: "relative" }}
                            id="FormPostsMyProducts"
                            className="row mx-auto  gap-3 py-5 w-100">
                            <h4 className="col-md-12">Mahsulot Qo'shish</h4>

                            <div className='col-md-5'>
                                <label>Hujjat nomi</label>
                                <input
                                    type="text"
                                    className="form-control  rounded-3 "
                                    placeholder="Hujjat nomi"
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    defaultValue={products?.title}
                                />
                            </div>
                            <div className='col-md-5 '>
                                <label>Holatlar</label>
                                <select className='form-select fs-3 py-3 rounded-3' onChange={(e) => setDataCatStatus(e.target.value)}  >
                                    {
                                        dataStatus?.map(item => (
                                            products.status === item.status ?
                                                <option selected value={item.status} >{item.status === "moderation" ? "Moderatsiya" : item.status === "cancelled" ? "Bekor qilingan" : item.status === "approved" ? "Tasdiqlangan" : ""}</option>
                                                :
                                                <option value={item.status}>{item.status === "moderation" ? "Moderatsiya" : item.status === "cancelled" ? "Bekor qilingan" : item.status === "approved" ? "Tasdiqlangan" : ""}</option>
                                        ))

                                    }
                                </select>
                            </div>
                            <div className="rounded-3 col-md-5  m-0 d-flex flex-column">
                                <label>Teglar</label>
                                <Select
                                    mode="tags"
                                    placeholder="Hujjatga tag qo'shing"
                                    onChange={handleChange}
                                    defaultValue={products?.tag && products?.tag?.map(item => (item.name))}
                                >
                                    {children}
                                </Select>
                            </div>

                            <div className='col-md-5'>
                                <label>Kategoriya</label>
                                <select
                                    style={{ alignItems: "flex-start" }}
                                    className="form-select rounded-3 fs-4 py-3"
                                    onChange={(e) =>
                                        setCategory_id(e.target.value)
                                    }>
                                    {dataCategory?.length > 0 &&
                                        dataCategory.map((item) => (

                                            products?.category === item.name ?
                                                <option selected value={item.id}>{item.name}</option>
                                                :
                                                <option value={item.id}>{item.name}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="rounded-3 col-md-10">
                                <span>Hujjat haqida qisqa ma'umot</span>
                                <CKeditor
                                    name="description"
                                    onChange={(data) => {
                                        setShortData(data);
                                    }}
                                    editorLoaded={editorLoaded}
                                    value={products?.short_description}

                                />
                            </div>
                            <div className="rounded-3 col-md-10">
                                <span>Hujjat haqida to'liq ma'umot</span>
                                <CKeditor
                                    name="description"
                                    onChange={(data) => {
                                        setFullData(data);
                                    }}
                                    editorLoaded={editorLoaded}
                                    value={products?.description}

                                />
                            </div>

                            <div className="d-flex justify-content-center col-md-10">
                                <button
                                    type='submit'
                                    className="btn btn-success py-3 col-md-3 ">
                                    <span className="fs-4">
                                        Saqlash
                                    </span>
                                </button>
                            </div>
                            <div className="mahsulotingiz" >
                                <p>Hujjatingiz</p>
                                <span
                                    className='fixed-btn'
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight">
                                    <i className="fa-solid fa-id-card fa-beat fs-1"></i>
                                </span>
                            </div>
                        </form>
                        <div
                            className="offcanvas offcanvas-end"
                            tabindex="-1"
                            id="offcanvasRight"
                            aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header pt-5">
                                <h3 id="offcanvasRightLabel" className='m-0 elh3'><span >Tahrirlanayotgan  mahsulotingizni ko'rinishi</span> </h3>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="card rounded-3 ">
                                    <div className="image" style={{
                                        backgroundImage: `url(${products?.poster_url})`
                                    }}>
                                    </div>
                                    <div className="text-start">
                                        <p className="live-card-p">
                                            <span><strong>Nomi</strong>: </span> <span style={{ maxWidth: '150px' }} >{title ? title : products?.title}</span>
                                        </p>
                                        <p className="live-card-p">
                                            <span><strong>Teglari</strong>: </span>
                                            <span style={{ maxWidth: '150px' }} >
                                                {
                                                    products?.tag?.map(item => (<span>#{item.name} </span>))
                                                }
                                            </span>
                                        </p>
                                        <p className="live-card-p">
                                            <span><strong>Kategoriya</strong>: </span>
                                            <span style={{ maxWidth: '150px' }} >
                                                {
                                                    category_id ? category_id : "Kategoriya qo'shing"
                                                }
                                            </span>
                                        </p>
                                        <p className="live-card-p">
                                            <span><strong>Qisqa tavsif</strong>: </span>
                                            <span style={{ maxWidth: '150px' }} >
                                                {
                                                    Shortdata ? Shortdata : products?.short_description
                                                }

                                            </span>
                                        </p>
                                        <p className="live-card-p">
                                            <span><strong>Hujjatingiz haqida to'liq ma'umot</strong>: </span>
                                            <span style={{ maxWidth: '150px' }} >
                                                {
                                                    Fulldata ? parse(Fulldata) : products?.description ? parse(products?.description) : ""
                                                }

                                            </span>
                                        </p>
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
