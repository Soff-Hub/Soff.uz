import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { DatePicker, Modal, Pagination, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import MediaRepository from '~/repositories/MediaRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector, useDispatch } from 'react-redux';
import ModalDelete from './Modal';
import Link from 'next/link';
import CalculateTimeDifference from './DateFormatter';
import { MyProductsEdit } from '~/store/auth/action';
import ModalDeletePostEdit from './ModalPostEdit';
import axios from 'axios';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
const { TabPane } = Tabs;

function MyProductsLists() {

    const [data, setData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [search, setSerach] = useState([]);
    const [tagName, setTagName] = useState(null);
    const [tagItems, setTagItems] = useState([]);
    const [View, setView] = useState({});
    const [ViewPriceDiscount, setViewPriceDiscount] = useState(null);
    const [dataValCat, setDataCat] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectValStatus, setSelectValStatus] = useState("");
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const { accountLinks, user, products } = useSelector(state => state.auth)


    async function GetItemsProducts(page, category, tagName, dataFormat, status, search) {
        const ItemsData = await GetRepository.getMyProducts(page, category, tagName, dataFormat, status,search, user?.access);
        if (ItemsData?.results) {
            setData(ItemsData?.results)
            setPageCount(ItemsData?.count);
            setCurrPage(page);
        }
    }
    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        setDataCategory(ItemsData.results);
    }
    async function GetItemsTag() {
        const ItemsData = await MediaRepository.getTagItmes(user?.access);
        if (ItemsData?.results) {
            setTagItems(ItemsData.results);
        }
    }

    async function handleClickView(item) {
        setLoading(true)
        const ItemsData = await GetRepository.getMyProductsView(item.id, user?.access);
        setView(ItemsData);
        setLoading(false)
    }
    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyProductsDelete(deleteId, user?.access);
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'chirdingiz`,
        });
        modal.update
        GetItemsProducts(currPage, dataValCat, tagName, dataFormat, selectValStatus, search)

    }
    function handleClickIdEdit(productsItems) {
        dispatch(MyProductsEdit(productsItems))
    }

    async function handleItemsEditProductsPosts() {
        const patchItems = await PatchRepository.getMyProductsPatch(ViewPriceDiscount, products?.id, user?.access);
        GetItemsProducts(currPage, dataValCat, tagName, dataFormat, status, search)
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
    const handleButtonClick = async (ID) => {

        try {
            const fileContent = data?.find(item => (item.id == ID))
            const response = await axios.get(
                fileContent.file,
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = fileContent.title + "." + fileContent.file.split('.')[fileContent.file.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file: ', error);
        }
    };



    const handlePagination = (pageNum) => {
        setCurrPage(pageNum)
        GetItemsProducts(pageNum, dataValCat, tagName, dataFormat, selectValStatus, search)
    }


    useEffect(() => {
        GetItemsCategory()
        GetItemsTag()
    }, [])
    useEffect(() => {
        GetItemsProducts(currPage, dataValCat, tagName, dataFormat, selectValStatus, search)
    }, [dataValCat, tagName, dataFormat, selectValStatus, search])

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster',
            key: 'name',
            render: (poster_url) => (
                <div >
                    {
                        poster_url ?
                            <img key={poster_url} className='rounded-3' src={poster_url} width={54} height={54} />
                            :
                            <i key={poster_url} className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 300,
            render: (title) => (
                <span key={title} className="truncate whitespace-nowrap"> {title}</span>

            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 300,
            render: (category) => (
                <span key={category.id}> <i className=" text-primary-emphasis fa-solid fa-layer-group"></i> {category?.name}</span>
            )
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'address',
            render: (price) => (
                <span key={price}> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(price)}</span>
            ),
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        user?.role === "seller" ? {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> Tasdiqlangan</span>) :
                        status === 'cancelled' ?
                            (<span><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>) :
                            <></>
            ),

        } : <></>,

        user?.role === "seller" ? {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdropView" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-2" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                {
                    data.some(el => el.id == id && el.status === 'moderation') ?
                        <Link href={"/account/myproducts/edit"}>
                            <a>
                                <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" onClick={() => handleClickIdEdit(data.find(item => item.id === id))}></i>
                            </a>
                        </Link> :
                        data.some(el => el.id == id && el.status === 'approved') ?
                            <a data-bs-target="#exampleModalMyProductsPrice" data-bs-toggle="modal">
                                <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" onClick={() => handleClickIdEdit(data.find(item => item.id === id))}></i>
                            </a>
                            :
                            <i style={{ opacity: 0.7, cursor: "not-allowed" }} className="fa-solid fa-pen-to-square mx-3  text-success-emphasis" ></i>

                }
                <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i className="fa-solid fa-trash-can text-danger mx-2" onClick={() => setDeleteId(id)}></i></a>

            </div>
        } : {
            title: 'Hujjat',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a><i className="fa-solid fa-file-arrow-down text-success-emphasis mx-3 fs-3" onClick={() => handleButtonClick(id)}></i></a>
            </div>
        },

    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row " style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    {
                                        user?.role === "seller" ?
                                            <div className='d-flex flex-column gap-2'>
                                                <span className='fs-4'><i className="text-primary-emphasis fa-solid fa-circle-info"></i> <strong>Moderatsiya</strong> <em>malumotlar ko'rib chiqilmoqda...</em></span>
                                                <span className='fs-4'><i className="fa-solid text-success fa-circle-check"></i> <strong>Tasdiqlangan </strong> <em>malumotlaringiz muvaffaqqiyatli tasdiqlandi!</em></span>
                                                <span className='fs-4'><i className="fa-solid fa-circle-xmark text-danger"></i> <strong>Bekor qilingan</strong> <em>malumotlaringiz bekor qilindi</em></span>
                                            </div>
                                            :
                                            <></>
                                    }
                                    <div className='row mx-auto gap-4  pb-4 pt-5'>
                                        <input type='search' className={user?.role === "seller" ? 'form-control rounded col-md-6' : "form-control rounded col-md-9"} placeholder="Qidiruv" onInput={e=>setSerach(e.target.value)} />
                                        {
                                            user?.role === "seller" ?
                                                <Link href={"/account/myproducts/posts"}>
                                                    <button className="  btn btn-success col-md-3 py-3 "  ><span className='fs-4'><i className="fa-solid fa-circle-plus"></i> Yangi mahsulot</span></button>
                                                </Link>
                                                :
                                                <></>
                                        }
                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button style={{ padding: "17px", backgroundColor: "#F1F1F2" }} className="accordion-button collapsed  responsiveCardButton   text-success " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <select className='form-select rounded-3 col-md-5 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                                            <option className='fs-3' value=''>Kategoriyalar</option>

                                                            {
                                                                dataCategory?.length > 0 && (
                                                                    dataCategory?.map(item => (

                                                                        <option key={item.id} value={item.id}>{item.name} </option>

                                                                    ))
                                                                )
                                                            }
                                                        </select>
                                                        {
                                                            user?.role === "seller" ?
                                                                <select
                                                                    className='form-select col-md-5 rounded-3 py-3 fs-3'
                                                                    onChange={(e) => setTagName(e.target.value)}
                                                                    style={{ height: "50px" }}
                                                                >
                                                                    <option value="">Teglar</option>
                                                                    {tagItems?.length > 0 &&
                                                                        tagItems.map((item) => (
                                                                            <option key={item.id} value={item.id}>
                                                                                {item.name}
                                                                            </option>
                                                                        ))}

                                                                </select>
                                                                :
                                                                <></>
                                                        }
                                                        {
                                                            user?.role === "seller" ?
                                                                <select className='form-select col-md-5 fs-3 py-3 rounded-3' onChange={(e) => setSelectValStatus(e.target.value)}  >
                                                                    <option className='fs-3' selected value="">Barcha holatlar</option>
                                                                    <option className='fs-3' value="moderation">Moderatsiya</option>
                                                                    <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                                    <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                                </select>
                                                                :
                                                                <></>
                                                        }

                                                        <RangePicker className='col-md-5 py-3   rounded-3' onChange={(e) => setDate(e)} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {
                                        user?.role === "seller" ?
                                            <>
                                                <Table dataSource={data} scroll={{ x: 1300 }} columns={columns} pagination={false} />
                                                <Pagination className="mt-3" total={pageCount} defaultCurrent={currPage} onChange={handlePagination} />
                                            </>
                                            :
                                            <>
                                                <Table dataSource={data} scroll={{ x: 1200 }} columns={columns} pagination={false} />
                                                <Pagination className="mt-3" total={pageCount} defaultCurrent={currPage} onChange={handlePagination} />
                                            </>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalDelete onSuccess={DeleteItemsProducts} />
                <div className="modal fade " id="staticBackdropView" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className='modal-dialog container '>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-end p-3'>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="ps-container">
                                {
                                    !loading ?
                                        <div className="ps-product--detail ps-product--fullwidth">
                                            <div className="ps-product__header ">
                                                <ThumbnailDefault product={View} />
                                                <div className="ps-product__info">
                                                    <header>
                                                        <h1>{View?.title}</h1>
                                                        <h4>
                                                            {addPeriodToThousands(View?.price)} so'm{' '}
                                                        </h4>
                                                    </header>
                                                    <div>
                                                        {
                                                            View?.seller ?
                                                                <h4> Muallif : {View?.seller?.first_name}  {View?.seller?.last_name}</h4>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <ModuleProductDetailDescription product={View} />
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
                                                        <p>{View?.tag?.map(item => (
                                                            <span className='mx-2' key={item.id}> #{item?.name} </span>
                                                        ))}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ps-product__content ps-tab-root">
                                                <Tabs defaultActiveKey="1">
                                                    <TabPane tab="Mahsulot to’liq tavsifi" key="1">
                                                        <PartialDescription product={View} />
                                                    </TabPane>
                                                </Tabs>
                                            </div>
                                        </div>
                                        :
                                        <div className='ps-product--detail ps-product--fullwidth' style={{ height: "690px", display: "grid", placeContent: "center" }}>
                                            <div className="spinner-border " role="status" style={{ width: "150px", height: "150px" }} >
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalMyProductsPrice" onSubmited={handleItemsEditProductsPosts} formID="products-edit_price" >
                    <label htmlFor="priceCount" className='form-label'>Hujjatingizni chegirmasi
                        <input id='priceCount' onChange={(e) => setViewPriceDiscount((prev) => ({ ...prev, discount: e.target.value }))} defaultValue={products?.discount} type="number" className='form-control rounded-3' placeholder='Hujjatingizni chegirmasi' />
                    </label>
                    <label htmlFor="discount" className='form-label'>Hujjatingizni narxi
                        <input id='discount' onChange={(e) => setViewPriceDiscount((prev) => ({ ...prev, price: e.target.value }))} defaultValue={products?.price} type="number" className='form-control rounded-3' placeholder='Hujjatingizni narxi' />
                    </label>
                </ModalDeletePostEdit >
            </div>
        </section >
    );

}

export default MyProductsLists;
