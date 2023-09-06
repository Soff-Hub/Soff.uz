import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Table } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';


function Notifications() {
    const { accountLinks, user } = useSelector(state => state.auth)
    const [data , setData] =useState([]);
    const [dataAdmin , setDataAdmin] =useState([]);
    const [dataPrice , setDataPrice] =useState(null);
    const [dataCard , setDataCard] =useState(null);
    const [dataCardModal , setDataCardModal] =useState(null);
    const [dataCardModalStatus , setDataCardModalStatus] =useState(null);
    const [dataCardModalImg , setDataCardModalImg] =useState(null);
    const [dataCardModalDes , setDataCardModalDes] =useState(null);

    async function getItemsSeller(){
        const Items = await GetRepository.getProfileAriza(user?.access);
        setData(Items?.results)
    }
    async function getItemsSellerAdmin(){
        const Items = await GetRepository.getProfileArizaAdmin(user?.access);
        setDataAdmin(Items?.results)
    }

    async function getItemsSellerPost(){
        const data ={"credit_card" : dataCard , "amount" : dataPrice}
        const Items = await PostsRepository.PostsMyProductsAriza(data, user?.access);
        getItemsSeller()
    }
    async function handleClickAriza(){
        const formData = new FormData();
        formData.append("receipt",  dataCardModalImg )
        formData.append("status",dataCardModalStatus )
        formData.append("description",dataCardModalDes )
        const data ={"credit_card" : dataCard , "amount" : dataPrice}
        const Items = await PatchRepository.getPatchProfileAriza(formData, dataCardModal?.id , user?.access);
        getItemsSellerAdmin()
    }
    useEffect(()=>{
        getItemsSeller();
        getItemsSellerAdmin();
    },[])
    const columns = [
        {
            title: 'Summa',
            dataIndex: 'amount',
            key: 'address',
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
            render:(price)=>(
                <span><i className="fa-solid fa-coins text-warning"></i>  {price}</span>
            )
        },
        {
            title: 'Karta raqam',
            dataIndex: 'credit_card',
            key: 'address',
        },
        {
            title: 'Telefon raqam',
            dataIndex: 'user',
            key: 'address',
            render:(user)=>(
                <span>{user?.phone}</span>
            )
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'address',
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
            render:(id)=>(
                <a data-bs-target="#exampleModalToggleEditAdminSeller" data-bs-toggle="modal"><i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis" onClick={() => setDataCardModal(dataAdmin.find(item => item.id === id))}></i></a>
        
            )
        },
    ];
    return (
        <section className="ps-my-account ps-page--account pb-5">
            <div className="container">
                <div className="row">
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
                                    user?.role==="seller" ?
                                    (<>
                                    <form className='row g-2'>
                                    <div className='col-md-4'>
                                    <label for="count">Summani kiriting</label>
                                    <input id='count' type="number" placeholder='Narx' className='form-control rounded-3' onChange={(e)=>(setDataPrice(e.target.value))} />
                                    </div>
                                    <div className='col-md-5'>
                                    <label for="ccn">Karta raqam kiriting</label>
                                <input  onChange={(e)=>(setDataCard(e.target.value))} id="ccn" type="tel" className='form-control rounded-3' inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"/>

                                    </div>
                                    <div className='col-md-2'>  
                                    <Button onClick={getItemsSellerPost} className='bg-success text-light' style={{
                                        height:"50px",
                                        marginTop:"25px"
                                    }}><span className='fs-4'>Ariza Yuborish</span></Button>

                                    </div>
                                </form>
                                <h4 className='py-4'>Yuborilgan Arizalar</h4>
                                <Table scroll={{ x: 740 }} pagination={{ disabled: true }} dataSource={data} columns={columns} />
                                    </>
                                ):
                                <></>
                                }
                                {
                                    user?.role==="admin" ?
                                  (<>
                                    <h4 className='py-3'>Arizalar</h4>
                                    
                                <Table scroll={{ x: 1050 }} pagination={{ disabled: true }} dataSource={dataAdmin} columns={columnsAdmin} />
                                  </>) :
                                  <></>
                               
                                } 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditAdminSeller"  formID={"edit-phone-admin"} onSubmited={handleClickAriza}  >
                <label htmlFor="file" className='w-100 ' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                    Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i>
                    <input required type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={(e) => setDataCardModalImg(e.target.files[0])} />
                </label>
                <select className='form-select fs-3 py-3' onChange={(e) => setDataCardModalStatus(e.target.value)}>
                        <option className='fs-3' selected disabled value="approved">Holatni tanlang</option>
                        <option className='fs-3' value="approved">Tasdiqlangan </option>
                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                        <option className='fs-3' value="moderation">Moderatsiya</option>
                    </select>
                <input type="text" className='form-control rounded-3' placeholder='Tavsif' onChange={(e)=>(setDataCardModalDes(e.target.value))}/>
                </ModalDeletePostEdit>
            </div>
        </section>
    );
}
export default Notifications;
