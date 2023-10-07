import React, {useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Modal, Table } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';


function ApplicationLists() {
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
        if (Items?.status === 200 || Items?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: 'Arizangiz muvaffaqqiyatli qabul qilindi, admin tomonidan ko\'rib chiqilmoqda',
            });
            modal.update
            getItemsSeller(1, dataCat);
            setProfile(null)
        }else if(Items?.status >= 400){
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${Items?.data?.msg ? Items?.data?.msg[0] : 'Ariza yuborishda narx va kartangizni belgilashingiz zarur!'}`,
            });
            modal.update
        }

    }

    async function handleClickAriza() {
        const formData = new FormData();
        if (dataCardModalImg) {
            formData.append("receipt", dataCardModalImg)
        }
        if (dataCardModalStatus) {
            formData.append("status", dataCardModalStatus)
        }
        if (dataCardModalDes) {
            formData.append("description", dataCardModalDes)
        }
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
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(price)} so'm</span>
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
                            <a href={image} download target='_blank'>
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
                <span><i className="fa-solid fa-coins text-warning"></i>  {addPeriodToThousands(price)} so'm</span>
            )
        },
        {
            title: 'Karta raqam',
            dataIndex: 'credit_card',
            key: 'address',
            render: (credit_card) => (
                <span>{credit_card}</span>
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
                            <a href={image} download target='_blank'>
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
                    <a style={{ opacity: 0.6, cursor: "not-allowed" }}><i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis" ></i></a>

            )
        },
    ];
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
    
    
    return (
        <section className="ps-my-account ps-page--account pb-5 p-0">
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
                                <div className="ps-section__content">
                                    {
                                        user?.role === "seller" ?
                                            (<>
                                                <form className='row row-gap-3 gap-4 mx-auto'>
                                                    <label className='h4 ' style={{color:"orange"}} >
                                                        Balansdagi pulingizni yechib olishingiz uchun ariza yuboring. Sizga 24 soat ichida arizangizda ko’rsatilgan summa bo’yicha pul o’tkaziladi va bu bo’yicha xabar yuboriladi. <br />
                                                       <strong>!Eslatma: Xisobingizda kamida 10 000 so’m bo’lishi kerak.</strong>
                                                    </label>
                                                    <input required id='count' type="number" defaultValue={profile?.wallet} placeholder='Narx' className='form-control rounded-3 col-md-4' onChange={(e) => (setDataPrice(e.target.value))} />
                                                    <select className='form-select rounded-3 col-md-5 fs-3  ' style={{ height: "50px" }} onChange={(e) => setDataCard(e.target.value)} >
                                                        <option className='fs-3' value='' selected disabled >Kartalaringiz</option>

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

                                                                <span className='fs-4'>Yuborish</span>
                                                            </Button>
                                                    }

                                                </form>
                                                <h4 className='py-4'>Yuborilgan Arizalar</h4>
                                                <Table scroll={{ x: 1000 }} dataSource={data} columns={columns} />

                                            </>
                                            ) :
                                            <></>
                                    }
                                    {
                                        user?.role === "admin" ?
                                            (<>
                                                <div className='row g-3 mx-auto'>
                                                    <h4 className='py-3 col-md-4'>{user?.role === "seller" ? "Arizalar" : "Arizalar Bo'limi"}</h4>
                                                    <select className='form-select col-md-5 mb-5 fs-3 py-3 rounded-3' onChange={(e) => setDataCat(e.target.value)}  >
                                                        <option className='fs-3' selected value="">Holatlar</option>
                                                        <option className='fs-3' value="moderation">Moderatsiya</option>
                                                        <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                    </select>
                                                </div>
                                                <Table scroll={{ x: 1200 }} dataSource={dataAdmin} columns={columnsAdmin} />

                                            </>) :
                                            <></>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDeletePostEdit dataBsTarget="exampleModalToggleEditAdminSeller" formID={"edit-phone-admin"} onSubmited={handleClickAriza}  >
                    <label htmlFor="file" className='w-100 text-truncate' style={{ border: "1px solid #dddddd", boxShadow: "0 0 0 #000", borderRadius: "5px", padding: "13px 12px", cursor: "pointer" }}>
                        {
                            dataCardModal?.receipt ? dataCardModal?.receipt :
                                <span>Rasm tanlash uchun bosing <i className="fa-regular fa-hand-pointer"></i></span>
                        }

                        <input type="file" name='file' id='file' style={{ display: "none" }} className='form-control pt-4 rounded-3 fileUpload' onChange={(e) => setDataCardModalImg(e.target.files[0])} />
                    </label>
                    <select className='form-select fs-3 py-3' onChange={(e) => setDataCardModalStatus(e.target.value)}>
                        {
                            dataStatus?.map((item, i) => (
                                dataCardModal?.status === item.status ?
                                    <option key={i} selected value={item.status} >{item.status === "moderation" ? "Moderatsiya" : item.status === "cancelled" ? "Bekor qilingan" : item.status === "approved" ? "Tasdiqlangan" : ""}</option>
                                    :
                                    <option key={i} value={item.status}>{item.status === "moderation" ? "Moderatsiya" : item.status === "cancelled" ? "Bekor qilingan" : item.status === "approved" ? "Tasdiqlangan" : ""}</option>
                            ))

                        }
                    </select>
                    <input type="text" defaultValue={dataCardModal?.description} className='form-control rounded-3' placeholder='Tavsif' onChange={(e) => (setDataCardModalDes(e.target.value))} />
                </ModalDeletePostEdit>
            </div>
        </section>
    );
}
export default ApplicationLists;
