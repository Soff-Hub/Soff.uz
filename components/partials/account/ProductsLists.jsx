import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MyProductsEdit } from '~/store/auth/action';
import Link from 'next/link';
import Axios from 'axios';
var parse = require("html-react-parser");
import CalculateTimeDifference from './DateFormatter';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';

function ProductsLists() {
    const dispatch = useDispatch();
    const { accountLinks, user } = useSelector(state => state.auth)
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [deleteIdView, setDeleteIdView] = useState({});
    const [dataVal, setDataVal] = useState([]);
    const [dataValCat, setDataCat] = useState(null);
    const [dataValStatus, setDataCatStatus] = useState(null);
    const [date, setDate] = useState(null);
    const [dateArxiv, setDateArxiv] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');

    async function GetItemsProductsLists(page, category, dataValStatus, dataFormat, id, arxiv,) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getShopsProducts(page, category, dataValStatus, dataFormat, id, arxiv, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProductsLists(page + 1, category, dataValStatus, dataFormat, id, arxiv,)
            }
        }
    }
    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataVal([])
        }
        const ItemsData = await GetRepository.getCategory(page, user?.access);
        if (ItemsData.results) {
            setDataVal((prev) => [...prev, ...ItemsData.results]);
        }
    }
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getShopsProducts(null, null, null, null, item.id, null, user?.access);
        setDeleteIdView(ItemsData);
    }

    function handleClickIdEditProducts(productsItems) {
        dispatch(MyProductsEdit(productsItems))
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.seller?.last_name.toLowerCase().includes(text.toLowerCase()) ||
            item.seller?.first_name.toLowerCase().includes(text.toLowerCase()) ||
            item.seller?.phone?.includes(text)
        ))
        setData(filterSearch)
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
            const fileContent = deleteIdView
            const response = await Axios.get(
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
    useEffect(() => {
        GetItemsCategory(1)
    }, [])

    useEffect(() => {
        GetItemsProductsLists(1, dataValCat, dataValStatus, dataFormat, null, dateArxiv,)
    }, [dataValCat, dataValStatus, dataFormat, dateArxiv,])


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
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
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
                <a data-bs-target="#staticBackdrop" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-3" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                <Link href={"/account/products/edit"}>
                    <a><i className="fa-solid fa-pen-to-square mx-4  text-success-emphasis" onClick={() => handleClickIdEditProducts(data.find(item => item.id === id))}></i></a>
                </Link>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className='bg-white p-3'>
                                <span className='m-0 py-3 border d-flex justify-content-center h4'>Mahsulotlar soni: {data.length} ta</span>
                                    <div className='row border mt-3 pb-2 gap-4 mx-auto w-100   p-4'>
                                        
                                        <input style={{backgroundColor:"#F2F3F4F6"}} type='' className='form-control rounded  col-md-9' placeholder="Qidiruv" onInput={handleClick} />
                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header m-0">
                                                    <button style={{ backgroundColor:"#F1F1F1", padding: "17px" }} className="accordion-button collapsed  responsiveCardButton   text-warning" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                        <strong> Filter</strong>
                                                    </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className="accordion-body row mx-auto gap-4  pb-4 pt-5">
                                                        <select className='form-select rounded-3 col-md-6 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                                            <option className='fs-3' value=''> Barcha Kategoriyalar</option>
                                                            {
                                                                dataVal.length > 0 && (
                                                                    dataVal.map(item => (
                                                                        item.is_child === true ?
                                                                            <option key={item.id} value={item.id}>{item.name} </option>
                                                                            :
                                                                            <></>
                                                                    ))
                                                                )
                                                            }
                                                        </select>
                                                        <select className='form-select col-md-5 fs-3 py-3 rounded-3' onChange={(e) => setDataCatStatus(e.target.value)}  >
                                                            <option className='fs-3' selected value="">Barcha holatlar</option>
                                                            <option className='fs-3' value="moderation">Moderatsiya</option>
                                                            <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                            <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                        </select>
                                                        <RangePicker className='w-100 py-3 col-md-6 rounded-3' onChange={(e) => setDate(e)} />
                                                        <Button onClick={handleCLickArxiv} className='col-md-5 input py-3' style={{ height: "48px" }}><span className='fs-3'>Arxivlangan holatlar</span></Button>
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
                                    <Table scroll={{ x: 1400 }} dataSource={data} columns={columns} />
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
                                <div className="ps-product--detail ps-product--fullwidth">
                                    <div className="ps-product__header ">
                                        <ThumbnailDefault product={deleteIdView} />
                                        <div className="ps-product__info">
                                            <ModuleDetailTopInformation product={deleteIdView} />
                                            <div>
                                                <h4> Muallif : {deleteIdView?.seller?.first_name}</h4>
                                            </div>
                                            <ModuleProductDetailDescription product={deleteIdView} />
                                            <div className="ps-product__shopping row-gap-3" >
                                                <button
                                                    className="ps-btn ps-btn--black"
                                                    style={{cursor:"not-allowed"}}
                                                   >
                                                    Savatga qo'shish
                                                </button>
                                                <button className="ps-btn" style={{cursor:"not-allowed"}} >
                                                    Sotib olish
                                                </button>
                                                <div className="ps-product__actions">
                                                    <a style={{cursor:"not-allowed"}} >
                                                        <i className={`icon-heart`} ></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                            {
                                                deleteIdView?.active_tag?.length>0 ?
                                                <p> <strong>Aktiv teglar: </strong> {deleteIdView?.active_tag?.map(item => (<span>#{item.name}  </span>))} </p>
                                                :
                                                <></>
                                            }
                                            {
                                                deleteIdView?.deactive_tag?.length>0 ?
                                                <p> <strong>Aktiv emas teglar: </strong> {deleteIdView?.deactive_tag?.map(item => (<span>#{item.name}  </span>))}   </p>
                                                :
                                                <></>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <DefaultDescription product={deleteIdView} />
                                <div className='d-flex justify-content-end '>
                                            <button onClick={handleButtonClickViewProducts} className="btn btn-warning p-2 px-5 fs-4 "> <i className='fa-solid fa-download mx-1'></i> <span className='fs-3'>File ochish</span></button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default ProductsLists;
