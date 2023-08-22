import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { accountLinks } from './modules/AccountLinks';
import { Table } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import { DatePicker} from 'antd';
import DateFormatterChange from './modules/DateFormatterDays';

function ProductsLists() {
    const [data, setData] = useState([]);
    const [search, setSerach] = useState([]);
    const [selectValSellers, setSelectValProducts] = useState({});
    const [deleteIdEditProducts, setDeleteIdEditProducts] = useState(null);
    const [deleteIdView, setDeleteIdView] = useState({});
    const [dataVal, setDataVal] = useState([]);
    const [dataValCat, setDataCat] = useState(null);
    const [dataValStatus, setDataCatStatus] = useState(null);
    const [date, setDate] = useState(null);
    const { RangePicker } = DatePicker;

    async function GetItemsProducts(page, category, dataValStatus, date, id) {
        if (page === 1) {
            setData([])
        }
        const ItemsData = await GetRepository.getShopsProducts(page, category, dataValStatus, date, id);
        setData((prev) => [...prev, ...ItemsData.results]);
        setSerach((prev) => [...prev, ...ItemsData.results]);
        if (ItemsData.next) {
            GetItemsProducts(page + 1, category, dataValStatus, date, id)
        }
    }
    async function GetItemsCategory(page) {
        if (page === 1) {
            setDataVal([])
        }
        const ItemsData = await GetRepository.getCategory(page);
        setDataVal((prev) => [...prev, ...ItemsData.results]);
    }
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getShopsProducts(null, null, null, null, item.id);
        setDeleteIdView(ItemsData);
    }
    function handleClick(e) {
        const text = e.target.value;
        const filterSearch = search.filter(item => (
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setData(filterSearch)
    }
    async function handleItemsEditProducts() {
        const patchItemsSellers = await PatchRepository.getProductsPatch({ status: selectValSellers }, deleteIdEditProducts?.id)
        setData([])
        GetItemsProducts(1, dataValCat, dataValStatus, date, null)
    }
    useEffect(() => {
        GetItemsProducts(1, dataValCat, dataValStatus, date, null)
        GetItemsCategory(1)
    }, [])

    useEffect(() => {
        GetItemsProducts(1, dataValCat, dataValStatus, date, null)
    }, [dataValCat, dataValStatus, date])

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
            render: (title) => (
                <span className="truncate whitespace-nowrap"> {title}</span>

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
                <span><i className="fa-solid fa-coins text-warning"></i> {price}</span>
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
                            <></>
            ),

        },

        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => <div >
                <a data-bs-target="#staticBackdrop" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis" onClick={() => handleClickView(data.find(item => item.id === id))}></i></a>
                <a data-bs-target="#exampleModalToggleEditProducts" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-4  text-success-emphasis" onClick={() => setDeleteIdEditProducts(data.find(item => item.id === id))}></i></a>
            </div>
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="ps-section__header p-5 mb-5 rounded" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#fff", boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }}>
                    <h3>Mahsulotlar</h3>
                    <input type='search' className='form-control rounded w-50' placeholder="Qidiruv" onInput={handleClick} />
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
                                    <div className='d-flex gap-3 pb-3'>
                                        <select defaultValue='' className='form-select rounded-3  fs-3 py-3' onChange={(e) => setDataCat(e.target.value)} >
                                            <option className='fs-3' value=''>Barcha kategoriyalar</option>
                                            {
                                                dataVal.length > 0 && (
                                                    dataVal.map(item => (
                                                        <option key={item.id} value={item.id}>{item?.name} <span>{item.name.length}</span> </option>
                                                    ))
                                                )
                                            }
                                        </select>
                                        <select className='form-select fs-3 py-3 rounded-3' onChange={(e) => setDataCatStatus(e.target.value)}  >
                                            <option className='fs-3' selected value="">Barcha holatlar</option>
                                            <option className='fs-3' value="moderation">Moderatsiya</option>
                                            <option className='fs-3' value="approved">Tasdiqlangan</option>
                                            <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                        </select>
                                        {/* <RangePicker className='w-100   rounded-3' onChange={(e)=>console.log(DateFormatterChange(e))}  /> */}
                                        <input type="date" className='form-control rounded-3' onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                    <Table scroll={{ x: 1100 }} dataSource={data} columns={columns} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditProducts" onSubmited={handleItemsEditProducts} formID="products-edit" >
                    <select className='form-select fs-3 py-3' onChange={(e) => setSelectValProducts(e.target.value)}>
                        <option className='fs-3' selected disabled value="approved">Holatni tanlang</option>
                        <option className='fs-3' value="approved">Tasdiqlangan</option>
                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                        <option className='fs-3' value="moderation">Moderatsiya</option>
                    </select>
                </ModalDeletePostEdit >
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
                                    <p className="card-text"> <strong>Nomi:</strong> {deleteIdView?.title}</p>
                                    <p className="card-text"><strong>Narxi:</strong>  ${deleteIdView?.price} </p>
                                    <p className="card-text"><strong>Chegirma: </strong> {deleteIdView?.discount}%</p>
                                    <p className="card-text"><strong>Sotuvchi:</strong> {deleteIdView?.seller?.phone }</p>
                                     <p><strong>Teg:</strong> {deleteIdView?.tag?.name}</p>
                           
                                </div>
                            </div>
                            <div className='col-md-12 pt-3'>
                            <p className="card-text"><strong>Qisqa tasvir:</strong> {deleteIdView?.short_description}</p>
                            <p className="card-text m-0"><strong>Tavsifi:</strong> {deleteIdView?.description}</p>
                             <div className='d-flex justify-content-end py-3'>
                            <a href={deleteIdView?.file}  className='btn btn-outline-warning w-25 py-2  fs-5' target='_blank' download> <i className="fa-solid fa-download mx-2"></i> File yuklash</a>

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
