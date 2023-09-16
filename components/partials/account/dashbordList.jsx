import React, { useState, useEffect } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Table } from 'antd';
// import dynamic from 'next/dynamic';
import CalculateTimeDifference from './DateFormatter';
import Example from './Chart';
import { useSelector } from 'react-redux';


function DashbordList() {
    const [data, setData] = useState([]);
    const [dataOrders, setDataOrders] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [View, setView] = useState({});

    const { accountLinks, user } = useSelector(state => state.auth)

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

    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getSellerDashbord(user?.access);
        if (ItemsData) {

            setData(ItemsData);
        }
    }
    async function GetItemsProductsPopular() {
        const ItemsData = await GetRepository.getPopularProducts(user?.access);
        if (ItemsData?.info) {
            setDataProducts(ItemsData?.info);
        }
    }

    async function GetItemsProductsOrders(page) {
        if (page === 1) {
            setDataOrders([])
        }
        const ItemsData = await GetRepository.getOrdersListsDashbord(page, user?.access);
        if (ItemsData?.results) {
            setDataOrders((prev) => [...prev, ...ItemsData.results]);
            if (ItemsData?.next) {
                GetItemsProductsOrders(page + 1)
            }
        }
    }
    async function handleClickView(item) {
        const ItemsData = await GetRepository.getPopularProductsView(item.id, user?.access);
        setView(ItemsData);
    }
    useEffect(() => {
        GetItemsProducts()
        GetItemsProductsOrders(1)
        GetItemsProductsPopular()
    }, [])

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 350,
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'address',
            render: (seller) => (
                <span><i className="fa-solid fa-child-reaching text-primary-emphasis"></i> {seller?.first_name}</span>
            ),
        },
        {
            title: 'Buyurtmalar ',
            dataIndex: 'total_approved',
            key: 'address',
            render: (total_approved) => (
                <span> <i className="fa-solid fa-box"></i> {total_approved}</span>
            ),
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'age',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(price)}</span>
            ),
        },
        {
            title: 'Harakatlar',
            dataIndex: 'id',
            key: 'address',
            render: (id) => (
                <a data-bs-target="#staticBackdropViewPopular" data-bs-toggle="modal"><i className="fa-solid fa-eye text-success-emphasis mx-5" onClick={() => handleClickView(dataProducts.find(item => item.id === id))}></i></a>
            )

        },
    ];
    const columnsOrders = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'user_name',
            key: 'age',
        },
       user?.role==="admin" ?  {
            title: 'Telefon raqam',
            dataIndex: 'phone',
            key: 'age',
        } 
        : <></>,
        {
            title: 'Buyurtma nomi',
            dataIndex: 'title',
            key: 'age',
            width:300,
        },
        user.role==="admin" ?
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'address',
            render: (total_price) => (
                <span><i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(total_price)}</span>
            ),
        }
        : <></> ,   
        {
            title: 'Buyurtma sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => <span> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status) => (
                <span>{status === 'approved' ? (<span><i className="fa-solid text-success fa-circle-check"></i> tasdiqlangan</span>) : (<span><i class="fa-solid fa-circle-xmark text-danger"></i> tasdiqlanganmagan</span>)}</span>
            ),

        },
    ];
    // const DynamicComponentWithNoSSR = dynamic(
    //     () => import('./Chart'),
    //     { ssr: false }
    //   )

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                {
                    user?.role === "admin" ?
                        <div className='pb-4  d-flex gap-3 overflow-x-scroll' >
                            <div>
                                <div className=' bg-white py-5 px-4' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami daromad</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-money-check-dollar fa-2x text-warning"></i></div>
                                    </div>

                                    <h4 className='mt-5 '> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.all_revenue)} so'm</h4>

                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami daromad</h4>
                                            <span>(Oxirgi 30 kun)</span>
                                        </div>
                                        <div><i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i></div>
                                    </div>

                                            <h4 className='mt-5 '> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.total_revenue)} so'm</h4>
                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4  ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Bugungi daromad</h4>
                                            <span>(Bugungi daromad)</span>
                                        </div>
                                        <div><i className="fa-solid fa-sack-dollar fa-2x text-warning"></i></div>
                                    </div>

                                            <h4 className='mt-5'> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.today_revenue)} so'm</h4>

                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami buyurtma</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-truck fa-2x text-danger"></i></div>
                                    </div>
    
                                            <h4 className='mt-5'>{addPeriodToThousands(data?.total_order)} ta</h4>
                   
                                </div>
                            </div>

                            <div>
                                <div className=' bg-white py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami Sotuvchilar</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-shop fa-2x text-primary"></i></div>
                                    </div>

                                        <h4 className='mt-5 '>{addPeriodToThousands(data?.total_shops)} ta</h4>
        
                                </div>
                            </div>
                        </div>
                        :
                        <div className='pb-4  d-flex gap-3 overflow-x-scroll' >
                            <div>
                                <div className=' bg-white py-5 px-4' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami daromad</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-money-check-dollar fa-2x text-warning"></i></div>
                                    </div>
     
                                            <h4 className='mt-5 '> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.all_revenue)} so'm</h4>
               
                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami daromad</h4>
                                            <span>(Oxirgi 30 kun)</span>
                                        </div>
                                        <div><i className="fa-solid fa-hand-holding-dollar fa-2x text-success"></i></div>
                                    </div>

                                            <h4 className='mt-5 '> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.last_month_revenue)} so'm</h4>
                      
                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4  ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Bugungi daromad</h4>
                                            <span>(Bugungi daromad)</span>
                                        </div>
                                        <div><i className="fa-solid fa-sack-dollar fa-2x text-warning"></i></div>
                                    </div>
   
                                            <h4 className='mt-5'> <i className="fa-solid fa-coins text-warning"></i> {addPeriodToThousands(data?.today_revenue)} so'm</h4>

                                </div>
                            </div>
                            <div>
                                <div className=' bg-white py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Jami buyurtma</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-truck fa-2x text-danger"></i></div>
                                    </div>
        
                                            <h4 className='mt-5'>{addPeriodToThousands(data?.total_order)} ta</h4>

                                </div>
                            </div>

                            <div>
                                <div className=' bg-white py-5 px-4 ' style={{ width: "290px", height: "170px", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(0 0 0 / 0.1), 0 1px 2px -2px rgb(0 0 0 / 0.1)" }}>
                                    <div className='d-flex justify-content-between pb-4'>
                                        <div>
                                            <h4>Shaxsiy hisob</h4>
                                            <span>(Butun davr mobaynida)</span>
                                        </div>
                                        <div><i className="fa-solid fa-file-invoice-dollar fa-2x text-warning"></i></div>
                                    </div>

                          
                                        <h4 className='mt-5 '>{addPeriodToThousands(data?.wallet)} so'm</h4>
                
                                </div>
                            </div>
                        </div>
                }
                <div className="row pb-5 mt-5" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4 pb-5">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>

                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <Example />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              {
                user?.role==="admin" ?
                <div>
                <h4 className='bg-white m-0 text-center py-4'>Ommabop mahsulotlar</h4>
                <Table scroll={{ x: 850 }} dataSource={dataProducts} columns={columns} className='pb-5' />
            </div>
            :
            <></>
              }
                <div className='pb-5'>
                    <h4 className='bg-white m-0 text-center py-4'>So'nggi buyurtmalar</h4>
                    <Table scroll={{ x: 850 }} dataSource={dataOrders} columns={columnsOrders} />
                </div>
                <div className="modal fade " id="staticBackdropViewPopular" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='d-flex justify-content-end p-3'>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="card  " style={{ maxWidth: "840px" }}>
                                <div className="row g-0 px-3 modal-body m-0">
                                    <div className="col-md-4 mt-4 ">
                                        <img src={View?.poster_url} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body pt-5">
                                            <p className="card-text"> <strong>Nomi:</strong> {View?.category?.name}</p>
                                            <p className="card-text"><strong>Narxi:</strong>  ${View?.price} </p>
                                            <p className="card-text"><strong>Chegirma: </strong> {View?.discount}%</p>
                                            <p className="card-text"><strong>Sotuvchi Ismi:</strong> {View?.seller?.first_name}</p>
                                            <p className="card-text"><strong>Sotuvchi Familiyasi:</strong> {View?.seller?.last_name}</p>
                                            <p className="card-text"><strong>Sotuvchi Raqami:</strong> {View?.seller?.phone}</p>
                                            <p><strong>Teg:</strong> {View?.tag?.name}</p>

                                        </div>
                                    </div>
                                    <div className='col-md-12 pt-3'>
                                        <p className="card-text"><strong>Qisqa tasvir:</strong> {View?.short_description}</p>
                                        <p className="card-text m-0"><strong>Tavsifi:</strong> {View?.description}</p>
                                        <div className='d-flex justify-content-end py-3'>
                                            <a href={View?.file} className='btn btn-outline-warning w-25 py-2  fs-5' target='_blank' download> <i className="fa-solid fa-download mx-2"></i> File yuklash</a>

                                        </div>
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

export default DashbordList;
