import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Modal, Pagination, Table } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import ModalDeletePostEdit from './ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CalculateTimeDifference from './DateFormatter';
import NextImageCard from '~/components/nextImagecard';
import { DatePicker } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';



function ApplicationLists() {
    const { accountLinks, user } = useSelector(state => state.auth)
    const [data, setData] = useState([]);
    const [data1, setData2] = useState([]);
    const [dataCat, setDataCat] = useState(null);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataAdmintaklif, setDataAdminTaklif] = useState([]);
    const [dataPrice, setDataPrice] = useState(null);
    const [dataCard, setDataCard] = useState(null);
    const [dataCardModal, setDataCardModal] = useState(null);
    const [dataCardModalStatus, setDataCardModalStatus] = useState(null);
    const [dataCardModalImg, setDataCardModalImg] = useState(null);
    const [dataCardModalDes, setDataCardModalDes] = useState(null);
    const [dataCardModalDesID, setDataCardModalDesID] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileCard, setProfileCard] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [pageCount1, setPageCount1] = useState(0)
    const [pageCount2, setPageCount2] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [textItems, setTextItems] = useState(null)
    const [textItemsId, setTextItemsId] = useState(null)
    const [sellerSearch, setSellerSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState(null);
    const [allPrice, setAllPrice] = useState(null);
    const { RangePicker } = DatePicker;
    const dateFormat0 = date ? `${date[0]?.$y}-${`${date[0].$M + 1}`.length === 1 ? `0${date[0].$M + 1}` : date[0].$M + 1}-${date[0].$D}` : ''
    const dateFormat1 = date ? `${date[1]?.$y}-${`${date[1].$M + 1}`.length === 1 ? `0${date[1].$M + 1}` : date[1].$M + 1}-${date[1].$D}` : ''
    const dataFormat = (date ? `${dateFormat0}&end_date=${dateFormat1}` : '');
    const [alertMess, setAlertMess] = useState("")


    async function ProfileUsers() {
        const ItemsData = await GetRepository.getProfile(user?.access);
        if (ItemsData) {
            setProfile(ItemsData)
        }
    }

    async function ProfileUsersTextItems(page, dataFormat) {
        const ItemsData = await GetRepository.getTagTaklifLists(page, dataFormat, user?.access, user?.role === "admin");
        if (ItemsData?.results) {
            setData2([...ItemsData.results]);
            setPageCount1(ItemsData?.count);
        }
        getItemsSellerTaklif(currPage)
    }

    async function ProfileUsersTextItem(e) {
        e.preventDefault();
        if (dataCardModalDesID) {
            const ItemsData = await PatchRepository.getTextItemsUpdate({ description: dataCardModalDesID }, textItemsId, user?.access);
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: "Siz  malumotlarni o'zgartirdingiz ",
            });
            getItemsSellerTaklif(currPage)
            ProfileUsersTextItems(currPage)
            setDataCardModalDesID(null)
        }
        else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }
        e.target.reset()

    }


    async function getItemsSeller(page) {
        const Items = await GetRepository.getProfileAriza(page, user?.access, user?.role === "admin");
        if (Items?.results) {
            setData([...Items.results]);
            setPageCount(Items?.count);
            setAlertMess(Items.additional_data)
        }
    }


    async function getItemsSellerCardList() {
        const Items = await GetRepository.getProfileArizaCardLists(user?.access);
        if (Items?.results) {
            setProfileCard(Items?.results)
        }
    }


    async function getItemsSellerAdmin(page) {
        const Items = await GetRepository.getProfileArizaAdmin(page, dataCat, user?.access, user?.role === "admin", sellerSearch);
        if (Items && user?.role === "admin") {
            setAllPrice(Items?.total_amount?.amount__sum)
            console.log('item', Items);
            return setDataAdmin([...Items.results]);
        }
        if (Items.results) {
            setDataAdmin([...Items.results]);
        }
    }

    async function getItemsSellerTaklif(page) {
        const Items = await GetRepository.getProfileArizaTaklif(page, user?.access);
        if (Items?.results) {
            setDataAdminTaklif([...Items.results]);
            setPageCount2(Items?.count);
        }
    }

    async function getItemsSellerPost() {
        const data = { credit_card: dataCard, amount: dataPrice ? dataPrice : profile?.wallet }
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
        } else if (Items?.status >= 400) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${Items?.data?.msg ? Items?.data?.msg[0] : 'Ariza yuborishda narx va kartangizni belgilashingiz zarur!'}`,
            });
            modal.update
        }

    }

    async function handleClickAriza() {
        try {
            if (dataCardModalImg || dataCardModalStatus || dataCardModalDes) {
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

                const response = await PatchRepository.getPatchProfileAriza(formData, dataCardModal?.id, user?.access);

                if (response || response?.status === 201 || response?.status == 200) {
                    const modal = Modal.success({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: "Siz malumotlarni o'zgartirdingiz",
                    });

                    // Reload the data after successful update
                    getItemsSellerAdmin(1, dataCat);
                    setDataCardModalStatus(null);
                    setDataCardModalDes(null);
                    setDataCardModalImg(null);
                } else {
                    throw new Error("An error occurred while updating data");
                }
            } else {
                const modal = Modal.info({
                    centered: true,
                    title: "Qayta urinib ko'ring",
                    content: "O'zgartirish uchun malumot kiritilmadi",
                });
            }
        } catch (error) {
            console.log(error);
            // Display error message to the user
            const modal = Modal.error({
                centered: true,
                title: "Xatolik",
                content: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
            });
        }
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
    async function getItemsTextItmes(e) {
        e.preventDefault()
        setLoading(false)
        const Items = await PostsRepository.PostsMyProductsTextItmes({ offer: textItems }, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Sizning taklifingiz yuborildi`,
        });
        modal.update
        ProfileUsersTextItems(currPage)
        setLoading(true)
        e.target.reset()

    }
    const handlePagination = (pageNum) => {
        setCurrPage(pageNum)
        getItemsSeller(pageNum, dataCat)
    }

    const dataDescripton = data1.find(item => (item?.id == textItemsId && item))


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
                                <NextImageCard url={image} clasS=' rounded-3 mb-2' width='74px' height='46px' />
                            </a>
                            :
                            <i className="fa-solid fa-file fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: ' Yuborilgan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
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
            title: 'Telefon raqam yoki email',
            dataIndex: 'seller_info',
            key: 'address',
            render: (seller_info) => (
                <a href={`/sellerAccount/${seller_info?.id}`} className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {seller_info.name}
                    </span>
                    <span>{seller_info.email_or_phone}</span>
                </a>),
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
                                <NextImageCard url={image} clasS='rounded-3 mb-2' width='74px' height='46px' />
                            </a>
                            :
                            <i className="fa-solid fa-file fa-2x"></i>
                    }
                </div>
            ),
        },
        {
            title: ' Ariza sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
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
                    <a style={{ cursor: "not-allowed", opacity: "0.6" }}><i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis" ></i></a>

            )
        },
    ];
    const columnsTextArea = [
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'seller_info',
            key: 'address',
            render: (seller_info) => (
                <a href={`/sellerAccount/${seller_info?.id}`} className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {seller_info.full_name}
                    </span>
                    <span>{seller_info.email_or_phone}</span>
                </a>),
        },
        {
            title: 'Taklif',
            dataIndex: 'offer',
            key: 'address',
            width: 350,
        },
        {
            title: 'Yuborilgan javobi',
            dataIndex: 'description',
            key: 'address',
            width: 350,
            render: (data) => (
                data ? <span>{data}</span> :
                    <span><i className='fa-solid fa-xmark text-danger'></i> Javob berilmadi</span>
            )
        },
        {
            title: ' Taklif sana',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 350,
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Taklif javobi',
            dataIndex: 'id',
            key: 'address',
            width: 150,
            render: (id) => (
                <span style={{ cursor: "pointer" }} data-bs-target="#exampleModalToggleEditAdminSellerID" data-bs-toggle="modal" ><i className='fa-solid fa-edit mx-5' onClick={() => setTextItemsId(id)}></i></span>
            )
        },
    ];
    const columnsTextAreaseller = [

        {
            title: 'Taklif',
            dataIndex: 'offer',
            key: 'address',
            width: 600,
        },
        {
            title: 'Taklif javobi',
            dataIndex: 'description',
            key: 'address',
            width: 350,
            render: (data) => (
                data ? <span>{data}</span> :
                    <span>Ko'rib chiqilmoqda...</span>
            )
        },
        {
            title: ' Taklif sana',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 500,
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
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

    useEffect(() => {
        getItemsSellerAdmin(currPage, dataCat, sellerSearch);
    }, [dataCat, sellerSearch])

    useEffect(() => {
        getItemsSeller(currPage);
        ProfileUsers();
        getItemsSellerCardList()
        getItemsSellerTaklif(currPage)
    }, [])

    useEffect(() => {
        ProfileUsersTextItems(currPage, dataFormat)
    }, [dataFormat])


    return (
        <section className="ps-my-account ps-page--account pb-5 p-0">
            <div className="container">
                <div className="row" style={{ alignItems: "flex-start" }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} data1={data1} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    {
                                        user?.role === "seller" ?
                                            (<>
                                                <div className='border py-4 rounded'>
                                                    <form className='row row-gap-3 px-4 gap-4 mx-auto'>
                                                        <label className='h4 p-0 ' style={{ color: "orange" }} >
                                                            Balansdagi pulingizni yechib olishingiz uchun ariza yuboring. Sizga 24 soat ichida arizangizda ko’rsatilgan summa bo’yicha pul o’tkaziladi va bu bo’yicha xabar yuboriladi. <br />
                                                            <strong>!Eslatma: Xisobingizda kamida {alertMess ? formatCurrency(alertMess) : '10 000'} so’m bo’lishi kerak.</strong>
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
                                                    <h4 className='py-4 px-4'>Yuborilgan Arizalar</h4>
                                                    <Table scroll={{ x: 1250 }} dataSource={data} columns={columns} pagination={false} />
                                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                                        onChange={handlePagination} />
                                                </div>

                                                <form className='border mt-5 rounded p-3' onSubmit={getItemsTextItmes} >
                                                    <h4>Taklif berish <i className="fa-solid fa-file-signature"></i></h4>
                                                    <textarea onChange={(e) => setTextItems(e.target.value)} required className='w-100 p-3 border border-success rounded' rows={4} placeholder="Bu qismga takliflaringizni yuboring"></textarea>
                                                    <div className='w-100 d-flex justify-content-end'>
                                                        <button className="btn-success btn mt-3" type='submit' style={{ height: "40px", width: "120px" }}><span className='fs-4'>
                                                            {
                                                                loading ?
                                                                    "Yuborish"
                                                                    :
                                                                    <div className="spinner-border mx-2 " role="status" style={{ cursor: "not-allowed" }}>
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>
                                                            }
                                                        </span></button>
                                                    </div>
                                                </form>
                                            </>
                                            ) :
                                            <></>
                                    }
                                    {
                                        user?.role === "admin" ?
                                            (<>
                                                <div className='row g-3 mx-auto'>
                                                    <h4 className='py-3 col-md-6'>{user?.role === "seller" ? "Arizalar" : `Arizalar Bo'limi - ${addPeriodToThousands(allPrice)} so'm `}</h4>
                                                    <select className='form-select col-md-5  fs-3 py-3 rounded-3' onChange={(e) => setDataCat(e.target.value)}  >
                                                        <option className='fs-3' selected value="">Holatlar</option>
                                                        <option className='fs-3' value="moderation">Moderatsiya</option>
                                                        <option className='fs-3' value="approved">Tasdiqlangan</option>
                                                        <option className='fs-3' value="cancelled">Bekor qilingan</option>
                                                    </select>
                                                    <label
                                                        className={`form-label border col-md-12 p-0 d-flex justify-content-between align-items-center`}
                                                        style={{
                                                            backgroundColor: '#F1F1F1',
                                                        }}>
                                                        <input
                                                            type="search"
                                                            className="form-control"
                                                            style={{ border: 'none' }}
                                                            placeholder="Qidiruv"
                                                            onInput={(e) =>
                                                                setSellerSearch(
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <span className="px-4">
                                                            <i className="fa-solid fa-search "></i>
                                                        </span>
                                                    </label>
                                                </div>
                                                <Table scroll={{ x: 1700 }} dataSource={dataAdmin} columns={columnsAdmin}
                                                    pagination={false} />
                                                <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                                    onChange={getItemsSellerAdmin} />
                                            </>) :
                                            <></>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        user?.role === "admin" ?
                            <div className='px-4'>
                                <div className='my-5 bg-white mx-auto p-4 container'>
                                    <h4 className='text-center mb-4'>Kelib tushgan takliflar   </h4>
                                    <RangePicker className='py-3 col-md-4 mb-4 shadow-sm rounded-3' onChange={(e) => setDate(e)} />
                                    <Table scroll={{ x: 1500 }} dataSource={data1} columns={columnsTextArea}
                                        pagination={false} />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount1}
                                        onChange={ProfileUsersTextItems} />
                                </div>
                            </div>
                            : <></>
                    }
                </div>
                {
                    user?.role === "seller" ?
                        <div className='p-0'>
                            <div className='my-5 bg-white  p-4 '>
                                <h4 className='text-center mb-4'>Yuborilgan takliflar </h4>
                                <Table scroll={{ x: 800 }} dataSource={dataAdmintaklif} columns={columnsTextAreaseller}
                                    pagination={false} />
                                <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount2}
                                    onChange={getItemsSellerTaklif} />
                            </div>
                        </div>
                        : <></>
                }
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
                <div
                    className="modal fade modalPost"
                    id="exampleModalToggleEditAdminSellerID"
                    aria-hidden="true"
                    aria-labelledby="staticBackdropLabel"
                    data-bs-backdrop="static">
                    <div className="modal-dialog modal-lg  modal-dialog-centered ">
                        <div className="modal-content ">
                            <div
                                className="d-flex justify-content-end p-4"
                                style={{ border: 'none !important' }}>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <form
                                onSubmit={ProfileUsersTextItem}
                                className="w-100 px-4 py-4 d-flex row-gap-3 flex-column"
                                id="edit-phone-adminID">
                                <textarea onChange={(e) => (setDataCardModalDesID(e.target.value))} defaultValue={data1 ? dataDescripton?.description : ""} className='w-100 p-3 border border-success rounded' rows={4} placeholder="Bu qismga takliflarga  yuboring"></textarea>
                                <div className="d-flex justify-content-end  py-3">
                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-success d-block w-25 py-2">
                                        <span className="fs-3">Saqlash</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
export default ApplicationLists;
