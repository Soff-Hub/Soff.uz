import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MyProductsEdit } from '~/store/auth/action';
import Link from 'next/link';
import Axios from 'axios';

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

    async function GetItemsProductsLists(page, category, dataValStatus, dataFormat, id, arxiv) {
        if (page === 1) {
            await setData([])
            setSerach([])
        }
        const ItemsData = await GetRepository.getShopsProducts(page, category, dataValStatus, dataFormat, id, arxiv, user?.access);
        if (ItemsData?.results) {
            setData((prev) => [...prev, ...ItemsData.results]);
            setSerach((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData.next) {
                GetItemsProductsLists(page + 1, category, dataValStatus, dataFormat, id, arxiv)
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
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    function handleClickIdEditProducts(productsItems) {
        dispatch(MyProductsEdit(productsItems))
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
            a.download = fileContent.title+"." + fileContent.file.split('.')[fileContent.file.split('.').length - 1];
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
        GetItemsProductsLists(1, dataValCat, dataValStatus, dataFormat, null, dateArxiv)
    }, [dataValCat, dataValStatus, dataFormat, dateArxiv])


    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_url',
            key: 'name',
            render: (poster_url) => (
                <div>
                    {
                        poster_url ?
                            <img src={poster_url} width={54} height={54} />
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
                <span><i className="fa-solid fa-child-reaching text-primary-emphasis"></i> {seller?.phone}</span>
            ),
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
                <div className="row g-3 mx-auto p-5 mb-5 rounded" style={{ backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <div className='col-md-5'>
                        <h3 className='m-0'>Mahsulotlar</h3>
                    </div>
                    <div className='col-md-7'>
                        <input type='search' className='form-control rounded' placeholder="Qidiruv" onInput={handleClick} />
                    </div>
                </div>
                <div className="row pb-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div>
                                    <div className='row  pb-3 gap-4 mx-auto w-100'>
                                        <select className='form-select rounded-3 col-md-6 fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                            <option className='fs-3' value=''> Barcha Kategoriyalar</option>
                                            {
                                                dataVal.length > 0 && (
                                                    dataVal.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name} </option>
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
                                    <Table scroll={{ x: 1300 }} dataSource={data} columns={columns} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-end p-3'>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="card  " style={{ maxWidth: "840px" }}>
                                <div className="row g-0 px-3 modal-body m-0">
                                    <div className="col-md-4 mt-4 ">
                                        <img src={deleteIdView?.poster_url} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pt-5">
                                            <p className="card-text"><strong>Sotuvchi ism familiyasi:</strong> {deleteIdView?.seller?.first_name}   {deleteIdView?.seller?.last_name }</p>
                                            <p className="card-text"> <strong>Mahsulot nomi:</strong> {deleteIdView?.title}</p>
                                            <p className="card-text"> <strong>Kategoriya:</strong> {deleteIdView?.category?.name}</p>
                                            <p className="card-text"><strong>Narxi:</strong> {addPeriodToThousands(deleteIdView?.price)} so'm </p>
                                            <p className="card-text"><strong>Chegirma: </strong> {deleteIdView?.discount}%</p>
                                            <p className="card-text"><strong>Sotuvchi:</strong> {deleteIdView?.seller?.phone}</p>
                                            <p><strong>Teg:</strong> #{deleteIdView?.active_tag?.map(item=>(item.name))} {deleteIdView?.deactive_tag?.map(item=>(<span>#{item.name} </span>))} </p>

                                        </div>
                                    </div>
                                    <div className='col-md-12 pt-3'>
                                        <p className="card-text"><strong>Qisqa tasvir:</strong> {deleteIdView?.short_description}</p>
                                        <p className="card-text m-0"><strong>Tavsifi:</strong> {deleteIdView?.description}</p>
                                        <div className='d-flex justify-content-end py-3'>
                                            <a className='btn btn-outline-warning w-25 py-2  fs-5' onClick={()=>handleButtonClickViewProducts()} > <i className="fa-solid fa-download mx-2"></i> File yuklash</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </section>
    );

}

export default ProductsLists;
