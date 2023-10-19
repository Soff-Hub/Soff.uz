import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Button, Pagination, Select, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MyProductsEdit } from '~/store/auth/action';
import Link from 'next/link';
import Axios from 'axios';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';

import PartialDescription from '~/components/elements/detail/description/PartialDescription';
const { TabPane } = Tabs;
import { Tabs } from 'antd';
import CalculateTimeDifference from './DateFormatter';
import Router from 'next/router';

function ProductsLists() {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector(state => state.auth)
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteIdView, setDeleteIdView] = useState({});
    const [dataVal, setDataVal] = useState([]);
    const [dataValStatus, setDataCatStatus] = useState(null);
    const [date, setDate] = useState(null);
    const [date2, setDate2] = useState(null);
    const [dateArxiv, setDateArxiv] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [pageCount, setPageCount] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [category_id, setCategoryID] = useState(null)
    const Option = Select.Option;

    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');

    async function GetItemsProductsLists(page, category, dataValStatus, dataFormat, id, arxiv, search) {
        const ItemsData = await GetRepository.getShopsProducts(page, category, dataValStatus, dataFormat, id, arxiv, search, user?.access);
        setPageCount(ItemsData.count)
        setData([...ItemsData.results]);
    }
    async function GetItemsCategory() {
        const ItemsData = await GetRepository.getAllCategoryLists();
        if (ItemsData) {
            setDataVal(ItemsData);
        }
    }


    const onChange = async (name) => {
        if (name !== 'all') {
            for (let j = 0; j < dataVal.length; j++) {
                if (dataVal[j].name === name) {
                    setCategoryID(dataVal[j].id);
                }
            }
        }
        else {
            setCategoryID("")
        }
    };



    const options = [];

    for (let i = 0; i < dataVal?.length; i++) {
        options.push(
            <Option key={dataVal[i].name}>{dataVal[i].name}</Option>
        );
    }


    async function handleClickView(item) {
        setLoading(true);
        const ItemsData = await GetRepository.getShopsProducts(null, null, null, null, item, null, search, user?.access);
        setDeleteIdView(ItemsData);
        setLoading(false)
    }

    async function handleClickIdEditProducts(productsItems) {
        const ItemsData = await GetRepository.getShopsProducts(null, null, null, null, productsItems, null, search, user?.access);
        if (ItemsData) {
            dispatch(MyProductsEdit(ItemsData))
            Router.push("/account/products/edit")
        }
    }

    function handleCLickArxiv() {
        setDateArxiv(!dateArxiv);
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
    const handleButtonClickViewProducts = async () => {
        try {
            setLoading2(true)
            const fileContent = deleteIdView?.document
            const response = await Axios.get(
                fileContent?.file_url,
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = deleteIdView.title + "." + fileContent.file_url.split('.')[fileContent.file_url?.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setLoading2(false)
        } catch (error) {
            console.error('Error downloading file: ', error);
            setLoading2(false)
        }
    };


    const handlePagination = (pageNum) => {
        console.log(pageNum);
        setCurrPage(pageNum)
        GetItemsProductsLists(pageNum, category_id, dataValStatus, dataFormat, null, dateArxiv, search)
    }


    useEffect(() => {
        GetItemsCategory()
    }, [])

    useEffect(() => {
        GetItemsProductsLists(currPage, category_id, dataValStatus, dataFormat, null, dateArxiv, search)
    }, [category_id, dataValStatus, dataFormat, dateArxiv, search])


    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster',
            key: 'name',
            render: (poster_url) => (
                <div>
                    {
                        poster_url ?
                            <img src={poster_url} width={54} className='rounded' height={54} />
                            :
                            <i className="fa-solid fa-image fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 350,
            render: (title) => (
                <span className="truncate whitespace-nowrap "> {title}</span>

            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 350,
            render: (category) => (
                <span> <i className=" text-primary-emphasis fa-solid fa-layer-group"></i> {category?.name}</span>
            )
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <div className='d-flex flex-column'>
                    <span> {seller?.first_name} {seller.last_name}</span>
                    <span> {seller?.phone}</span>
                </div>
            ),
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /> </span>
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(price)}</span>
            ),
        },
        {
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
                            status === 'Arxivlangan' ?
                                (<span><i className="fa-solid fa-inbox text-danger"></i> Arxivlangan</span>) :
                                <></>
            ),

        },

        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdrop" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-3" onClick={() => handleClickView(id)}></i></a>
                <Link href={"#"}>
                    <a><i className="fa-solid fa-pen-to-square mx-4  text-success-emphasis" onClick={() => handleClickIdEditProducts(id)}></i></a>
                </Link>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className='bg-white p-3'>
                                    <span className='m-0 py-3 border d-flex justify-content-center h4'>Mahsulotlar soni: {pageCount} ta</span>
                                    <div className='row border mt-3 pb-2 gap-4 mx-auto w-100   p-4'>

                                        <input style={{ backgroundColor: "#F2F3F4F6" }} type='' className='form-control rounded  col-md-9' placeholder="Qidiruv" onInput={e => (setSerach(e.target.value))} />
                                        <div className="accordion accordion-flush p-0" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0 ">
                                                    <button style={{ backgroundColor: "#F1F1F1", padding: "17px" }} className="accordion-button collapsed  responsiveCardButton   text-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <Select
                                                            className='col-md-6 p-0'
                                                            mode='select'
                                                            showSearch
                                                            style={{ width: '100%', height: "47px" }}
                                                            onChange={onChange}
                                                            placeholder="Barcha kategoriyalar"
                                                        >
                                                            <Option value="all" selected>
                                                                Barcha kategoriyalar
                                                            </Option>

                                                            {options}

                                                        </Select>
                                                        <select className='form-select col-md-5 fs-3 py-3 rounded-3' onChange={(e) => setDataCatStatus(e.target.value)}  >
                                                            <option className='fs-3' selected value="">Barcha holatlar</option>
                                                            <option className='fs-3' value="moderation">Moderatsiya</option>
                                                            <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                            <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                        </select>
                                                        <RangePicker className='w-100 py-3 col-md-6 rounded-3' onChange={(e) => setDate(e)} />
                                                        <Button onClick={handleCLickArxiv} className='col-md-5 input py-3' style={{ height: "48px" }}><span className='fs-3 text-dark'>Arxivlangan holatlar</span></Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='d-flex flex-column gap-2 bg-white px-3 py-4 rounded'>
                                        <span className='fs-4'><i className="text-primary-emphasis fa-solid fa-circle-info"></i> <strong>Moderatsiya</strong> <em>malumotlar ko'rib chiqilmoqda...</em></span>
                                        <span className='fs-4'><i className="fa-solid text-success fa-circle-check"></i> <strong>Tasdiqlangan </strong> <em>malumotlaringiz muvaffaqqiyatli tasdiqlandi!</em></span>
                                        <span className='fs-4'><i className="fa-solid fa-circle-xmark text-danger"></i> <strong>Bekor qilingan</strong> <em>malumotlaringiz bekor qilindi</em></span>
                                    </div>
                                    <Table scroll={{ x: 1700 }} dataSource={data} columns={columns} pagination={false}
                                    />
                                    <Pagination className="mt-3" defaultCurrent={currPage} total={pageCount} onChange={handlePagination} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
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
                                                <ThumbnailDefault product={deleteIdView} />
                                                <div className="ps-product__info">
                                                    <header>
                                                        <h1>{deleteIdView?.title}</h1>
                                                        <h4>
                                                            {addPeriodToThousands(deleteIdView?.discount_price)} so'm{' '}
                                                        </h4>
                                                    </header>
                                                    <div>
                                                        {
                                                            deleteIdView?.seller ?
                                                                <h4> Muallif : {deleteIdView?.seller?.first_name}  {deleteIdView?.seller?.last_name}</h4>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <ModuleProductDetailDescription product={deleteIdView} />
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
                                                        {
                                                            deleteIdView?.active_tag?.length > 0 ?
                                                                <p> <strong>Aktiv teglar: </strong> {deleteIdView?.active_tag?.map(item => (<span key={item.id}>#{item.name}  </span>))} </p>
                                                                :
                                                                <></>
                                                        }

                                                    </div>
                                                    <div className=" d-flex justify-content-start align-content-center flex-wrap">

                                                        {
                                                            deleteIdView?.deactive_tag?.length > 0 ?
                                                                <p> <strong>Aktiv emas teglar: </strong> {deleteIdView?.deactive_tag?.map(item => (<span key={item.id}>#{item.name}  </span>))}   </p>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ps-product__content ps-tab-root">
                                                <Tabs defaultActiveKey="1">
                                                    <TabPane tab="Izoh" key="1">
                                                        <PartialDescription product={deleteIdView} />
                                                    </TabPane>
                                                </Tabs>
                                            </div>
                                            <div className='d-flex justify-content-end '>
                                                {
                                                    loading2 ?

                                                        <button  className="btn btn-success  p-2 px-5 fs-4 " style={{ width: "179px", cursor:"not-allowed" }}>

                                                            <div className="spinner-border " role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>

                                                        </button>
                                                        :
                                                        <button onClick={handleButtonClickViewProducts} className="btn btn-success p-2 px-5 fs-4 ">

                                                        <i className='fa-solid fa-download mx-1'></i> <span className='fs-3'>File ochish</span>

                                                    </button>
                                                }
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
            </div>
        </section>
    );

}

export default ProductsLists;
