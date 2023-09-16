import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Table } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { BeatLoader } from 'react-spinners';


function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth)
    const [data, setData] = useState([]);
    const [dataCat, setDataCat] = useState(null);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataPrice, setDataPrice] = useState(null);
    const [dataCard, setDataCard] = useState(null);
    const [dataCardModal, setDataCardModal] = useState(null);
    const [dataCardModalStatus, setDataCardModalStatus] = useState(null);
    const [dataCardModalImg, setDataCardModalImg] = useState(null);
    const [dataCardModalDes, setDataCardModalDes] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileCard, setProfileCard] = useState([]);


    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        setProfile(ItemsData)
    }

    async function getItemsSeller(page) {
        if (page === 1) {
            setData([])
        }
        const Items = await GetRepository.getProfileAriza(page, user?.access);
        if (Items?.results) {
            setData((prev) => [...prev, ...Items.results]);
            if (Items?.next) {
                getItemsSeller(page + 1)
            }
        }
    }
    async function getItemsSellerCardList() {
        const Items = await GetRepository.getProfileArizaCardLists(user?.access);
        if (Items?.results) {
            setProfileCard(Items?.results)
        }
    }
    async function getItemsSellerAdmin(page) {
        if (page === 1) {
            setDataAdmin([])
        }
        const Items = await GetRepository.getProfileArizaAdmin(page, dataCat, user?.access);
        if (Items?.results) {
            setDataAdmin((prev) => [...prev, ...Items.results]);
            if (Items?.next) {
                getItemsSellerAdmin(page + 1, dataCat)
            }
        }
    }

    async function getItemsSellerPost() {
        const data = { "credit_card": JSON.parse(dataCard), "amount": dataPrice }
        const Items = await PostsRepository.PostsMyProductsAriza(data, user?.access);
        getItemsSeller(1, dataCat);
        setProfile(null)
    }

    async function handleClickAriza() {
        const formData = new FormData();
        formData.append("receipt", dataCardModalImg)
        formData.append("status", dataCardModalStatus)
        formData.append("description", dataCardModalDes)
        const Items = await PatchRepository.getPatchProfileAriza(formData, dataCardModal?.id, user?.access);
        getItemsSellerAdmin(1, dataCat);

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
    useEffect(() => {
        getItemsSeller(1);
        getItemsSellerAdmin(1, dataCat);
        ProfileUsers();
        getItemsSellerCardList()
    }, [1, dataCat])

    const columns = [
        {
            title: 'Summa',
            dataIndex: 'amount',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(price)}</span>
            )
        },
        {
            title: 'Karta raqam',
            dataIndex: 'credit_card',
            key: 'address',
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'address',
            width: 350,
        },
        {
            title: 'Chek',
            dataIndex: 'receipt',
            key: 'address',
            render: (image) => (
                <div>
                    {
                        image ?
                            <a href={image} download>
                                <img src={image} width={74} height={46} className='rounded-3 mb-2' />
                            </a>
                            :
                            <i className="fa-solid fa-file fa-2x"></i>
                    }
                </div>
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
    ];
    const columnsAdmin = [
        {
            title: 'Summa',
            dataIndex: 'amount',
            key: 'address',
            render: (price) => (
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(price)}</span>
            )
        },
        {
            title: 'Karta raqam',
            dataIndex: 'user',
            key: 'address',
            render: (user) => (
                <span>{user?.credit_card}</span>
            )
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'user',
            key: 'address',
            render: (user) => (
                <span>{user?.phone}</span>
            )
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'address',
            width: 350,

        },
        {
            title: 'Chek',
            dataIndex: 'receipt',
            key: 'address',
            render: (image) => (
                <div>
                    {
                        image ?
                            <a href={image} download>
                                <img src={image} width={74} height={46} className='rounded-3 mb-2' />
                            </a>
                            :
                            <i className="fa-solid fa-file fa-2x"></i>
                    }
                </div>
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
            key: 'id',
            render: (id) => (
                dataAdmin.some(el => el.id == id && el.is_answer === true) ?
                    <a data-bs-target="#exampleModalToggleEditAdminSeller" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis" onClick={() => setDataCardModal(dataAdmin.find(item => item.id === id))}></i></a>
                    :
                    <a style={{ opacity: 0.6, cursor: "not-allowed" }}><i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis" onClick={() => setDataCardModal(dataAdmin.find(item => item.id === id))}></i></a>

            )
        },
    ];
    return (
        <section className="ps-my-account ps-page--account pb-5">
            <div className="container">
                <div className="row" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header mb-4 mx-3 mt-4">
                                    <h3>Ariza bo'limi</h3>
                                </div>
                                <div className="ps-section__content">
                                    {
                                        user?.role === "seller" ?
                                            (<>
                                                <form className='row row-gap-3 gap-4 mx-auto'>
                                                        <input required id='count' type="number" defaultValue={profile?.wallet} placeholder='Narx' className='form-control rounded-3 col-md-4' onChange={(e) => (setDataPrice(e.target.value))} />
                                                    <select className='form-select rounded-3 col-md-5 fs-3  ' style={{height:"50px"}} onChange={(e) => setDataCard(e.target.value)} >
                                                        <option className='fs-3' value=''>Kartalaringiz</option>

                                                        {
                                                            profileCard?.length > 0 && (
                                                                profileCard?.map(item => (
                                                                    <option key={item.id} value={item.credit_card}>{item.credit_card} </option>
                                                                ))
                                                            )
                                                        }
                                                        
                                                    </select>
                                                        {
                                                            profile?.is_application === true && profile?.is_payment === true ?
                                                                <Button onClick={getItemsSellerPost} className='bg-success text-light col-md-2' style={{
                                                                    height: "50px",
                                                                }}><span className='fs-4'>Yuborish</span></Button>
                                                                :
                                                                <Button onClick={getItemsSellerPost} disabled className='bg-success text-light col-md-2' style={{
                                                                    height: "50px",
                                                                }}>

                                                                    <span className='fs-4'>Ariza Yuborish</span>
                                                                </Button>
                                                        }

                                                </form>
                                                <h4 className='py-4'>Yuborilgan Arizalar</h4>
                                                {
                                                    data?.length>0 ?  
                                                    <Table scroll={{ x: 1000 }} dataSource={data} columns={columns} />
                                                    :
                                                   <div className='d-flex justify-content-center'>
                                                     <h4 ><span>Yuborilgan Arizalar yo'q</span></h4>
                                                   </div>
                                                }
                                            </>
                                            ) :
                                            <></>
                                    }
                                    {
                                        user?.role === "admin" ?
                                            (<>
                                                <div className='row g-3 mx-auto'>
                                                    <h4 className='py-3 col-md-4'>Arizalar</h4>
                                                    <select className='form-select col-md-5 mb-5 fs-3 py-3 rounded-3' onChange={(e) => setDataCat(e.target.value)}  >
                                                        <option className='fs-3' selected value="">Holatlar</option>
                                                        <option className='fs-3' value="moderation">Moderatsiya</option>
                                                        <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                    </select>
                                                </div>
                                                  {
                                                    dataAdmin?.length>0 ?
                                                <Table scroll={{ x: 1200 }} dataSource={dataAdmin} columns={columnsAdmin} />
                                                :
                                                <div className='d-flex justify-content-center'>
                                                <h4 ><span>Arizalar yo'q</span></h4>
                                              </div>
                                                  }
                                            </>) :
                                            <></>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditAdminSeller" formID={"edit-phone-admin"} onSubmited={handleClickAriza}  >
                    <label htmlFor="file" className='w-100 ' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                        Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i>
                        <input required type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={(e) => setDataCardModalImg(e.target.files[0])} />
                    </label>
                    <select required className='form-select fs-3 py-3' onChange={(e) => setDataCardModalStatus(e.target.value)}>
                        <option className='fs-3' selected disabled value="approved">Holatni tanlang</option>
                        <option className='fs-3' value="approved">Tasdiqlangan </option>
                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                        <option className='fs-3' value="moderation">Moderatsiya</option>
                    </select>
                    <input type="text" required className='form-control rounded-3' placeholder='Tavsif' onChange={(e) => (setDataCardModalDes(e.target.value))} />
                </ModalDeletePostEdit>
            </div>
        </section>
    );
}
export default Notifications;
