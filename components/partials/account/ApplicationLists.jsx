import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Form, Modal, Pagination, Table, Input, Select } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CalculateTimeDifference from './DateFormatter';
import NextImageCard from '~/components/nextImagecard';
import { DatePicker } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import { addPeriodToThousands } from './ProductsLists';
import SidebarLayout from '../SidebarLayout';
const { TextArea } = Input;
const { Option } = Select;



function ApplicationLists() {
    const { accountLinks, user } = useSelector(state => state.auth)
    const { profile } = useSelector((state) => state.ecomerce);
    const [data, setData] = useState([]);
    const [data1, setData2] = useState([]);
    const [loadingData, setloadingData] = useState(false);
    const [loadingSeller, setloadingSeller] = useState(false);
    const [loadingOffer, setloadingOffer] = useState(false);
    const [loadingOfferSeller, setloadingOfferSeller] = useState(false);
    const [dataCat, setDataCat] = useState(null);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataAdmintaklif, setDataAdminTaklif] = useState([]);
    const [dataPrice, setDataPrice] = useState(null);
    const [dataCard, setDataCard] = useState(null);
    const [dataCardModal, setDataCardModal] = useState(null);
    const [profileCard, setProfileCard] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [pageCount1, setPageCount1] = useState(0)
    const [pageCount2, setPageCount2] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [textItems, setTextItems] = useState(null)
    const [textItemsId, setTextItemsId] = useState(null)
    const [sellerSearch, setSellerSearch] = useState('')
    const [loading, setLoading] = useState({ loadingButton: true })

    const [allPrice, setAllPrice] = useState(null);
    const { RangePicker } = DatePicker;
    const [alertMess, setAlertMess] = useState("");
    const [dataBlock, setdataBlock] = useState(null);
    const [open, setOpen] = useState(false);
    const [openApplication, setOpenAplication] = useState(false);
    const [form] = Form.useForm();
    const [valuesImage, setValuesImage] = useState(null);

    const [lifeTime, setLifetime] = useState('');
    const [lifeTime1, setLifetime2] = useState('');


    const handleChangeDate = (date) => {

        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime('');
            setLifetime2('');
        }
    };
    const dataFormat = `${lifeTime}&end_date=${lifeTime1}`;





    async function ProfileUsersBLock() {
        const token = user?.access
        const ItemsData = await GetRepository.getProfileBlock(token);
        setdataBlock(ItemsData);
    }


    async function ProfileUsersTextItems(page, dataFormat) {
        setloadingOffer(true)
        const ItemsData = await GetRepository.getTagTaklifLists(page, dataFormat, user?.access, user?.role === "admin");
        if (ItemsData?.results) {
            setData2([...ItemsData.results]);
            setPageCount1(ItemsData?.count);
        }
        getItemsSellerTaklif(currPage)
        setloadingOffer(false)
    }

    async function ProfileUsersTextItem(values) {
        form.resetFields();
        if (values?.description) {
            const ItemsData = await PatchRepository.getTextItemsUpdate({ description: values?.description }, textItemsId?.id, user?.access);
            if (ItemsData?.status == 200) {
                const modal = Modal.success({
                    centered: true,
                    title: 'Muvaffaqiyatli!',
                    content: "Siz  kelib tushgan taklifga javob berdingiz ",
                });
                modal.update;
                form.resetFields();
                getItemsSellerTaklif(currPage)
                ProfileUsersTextItems(currPage)

            } else {
                const modal = Modal.error({
                    centered: true,
                    title: 'Xato!',
                    content: ItemsData?.status + ' ' + ItemsData?.statusText,
                });
                modal.update;
            }
        }
        else {
            const modal = Modal.info({
                centered: true,
                title: "Qayta urinib ko'ring",
                content: "O'zgartirish uchun malumot kiritilmadi ",
            });
        }



    }


    async function getItemsSeller(page) {
        setloadingSeller(true)
        const Items = await GetRepository.getProfileAriza(page, user?.access, user?.role === "admin");
        if (Items?.results) {
            setData([...Items.results]);
            setPageCount(Items?.count);
            setAlertMess(Items.additional_data)
        }
        setloadingSeller(false)
    }


    async function getItemsSellerCardList() {
        const Items = await GetRepository.getProfileArizaCardLists(user?.access);
        if (Items?.results) {
            setProfileCard(Items?.results)
        }
    }


    async function getItemsSellerAdmin(page) {
        setloadingData(true)
        const Items = await GetRepository.getProfileArizaAdmin(page, dataCat, user?.access, user?.role === "admin", sellerSearch);
        if (Items && user?.role === "admin") {
            setAllPrice(Items?.total_amount?.amount__sum)
            setloadingData(false)
            return setDataAdmin([...Items.results]);
        }
        if (Items.results) {
            setDataAdmin([...Items.results]);
            setloadingData(false)
        }
    }

    async function getItemsSellerTaklif(page) {
        setloadingOfferSeller(true)
        const Items = await GetRepository.getProfileArizaTaklif(page, user?.access);
        if (Items?.results) {
            setDataAdminTaklif([...Items.results]);
            setPageCount2(Items?.count);
        }
        setloadingOfferSeller(false)
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
        } else if (Items?.status >= 400) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${Items?.data?.msg ? Items?.data?.msg[0] : 'Ariza yuborishda narx va kartangizni belgilashingiz zarur!'}`,
            });
            modal.update
        }

    }


    async function getItemsTextItmes(e) {
        e.preventDefault()
        setLoading({ loadingButton: false })
        const Items = await PostsRepository.PostsMyProductsTextItmes({ offer: textItems }, user?.access);
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Sizning taklifingiz yuborildi`,
        });
        modal.update
        ProfileUsersTextItems(currPage)
        setLoading({ loadingButton: true })
        e.target.reset()

    }
    const handlePagination = (pageNum) => {
        setCurrPage(pageNum)
        getItemsSeller(pageNum, dataCat)
    }

    async function postOrder(values) {
        form.resetFields();
        const formData = new FormData();
        if (valuesImage) {
            formData.append("receipt", valuesImage)
        }
        if (values?.description) {
            formData.append("description", values?.description)
        }
        if (values?.status) {
            formData.append("status", values?.status)
        }

        const ItemsData = await PatchRepository.getPatchProfileAriza(formData, dataCardModal?.id, user?.access);
        if (ItemsData?.status == 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqiyatli!',
                content: `${ItemsData?.data?.msg
                    ? ItemsData?.data?.msg
                    : "Siz  malumotlarni o'zgartirdingiz "
                    }  `,
            });
            modal.update;
            form.resetFields();
            getItemsSellerAdmin(1, dataCat);

        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
            modal.update;
        }

    }


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
            dataIndex: 'answer_data',
            key: 'id',
            render: (answer_data) => (
                answer_data?.is_answer ?
                    <a >
                        <i className="fa-solid fa-pen-to-square mx-5  text-success-emphasis"
                            onClick={() => (setDataCardModal(dataAdmin.find(item => item.id === answer_data?.id)), setOpen(true))}>
                        </i></a>
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
            dataIndex: 'data',
            key: 'address',
            width: 150,
            render: (data) => (
                <span
                    style={{ cursor: "pointer" }}
                ><i className='fa-solid fa-edit mx-5'
                    onClick={() => (setTextItemsId(data), setOpenAplication(true))}></i></span>
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

    const statusText = {
        moderation: "Moderatsiya",
        cancelled: "Bekor qilingan",
        approved: "Tasdiqlangan"
    }

    useEffect(() => {
        if (user?.access && user?.role === "seller") {
            ProfileUsersBLock()
        }
    }, [user?.access]);


    useEffect(() => {
        getItemsSellerAdmin(currPage, dataCat, sellerSearch);
    }, [dataCat, sellerSearch])

    useEffect(() => {
        getItemsSeller(currPage);
        if (user?.access && user?.role == "seller") {

            getItemsSellerTaklif(currPage)
            getItemsSellerCardList()
        }
        if (user?.access && user?.role == "seller") {

            getItemsSellerTaklif(currPage)
            getItemsSellerCardList()
        }

    }, [user?.access])

    useEffect(() => {
        ProfileUsersTextItems(currPage, dataFormat);
    }, [dataFormat])

    useEffect(() => {
        if (open && dataCardModal) {
            form.setFieldsValue({
                status: dataCardModal?.status,
                description: `Arizangiz muvaffaqiyatli tasdiqlandi! Kartangizga ${addPeriodToThousands(dataCardModal?.amount)} so'm miqdoridagi summa o'tkazildi`
                ,
            });
        }
    }, [open, dataCardModal, form]);


    useEffect(() => {
        if (openApplication && textItemsId) {
            form.setFieldsValue({
                description: textItemsId?.description,
            });
        }
    }, [open, textItemsId, form]);


    return (
        <section className="ps-my-account ps-page--account pb-5">
            <div className="container">
                <div className="row" style={{ alignItems: "flex-start" }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content ">
                            <div className="ps-section--account-setting ">
                                <div className="ps-section__content ">
                                    {
                                        user?.role === "seller" ?
                                            (<>

                                                <div className='border py-4 rounded '>
                                                    {dataBlock?.has_blocked ? <div className=' px-4'>
                                                        <span className='text-danger fw-bold '>
                                                            <i className="fa-solid fa-lock"></i> Siz Bloklangansiz. Bu davr mobaynida Pul yechib olish uchun ariza yuborishni imkoni yo'q.</span>
                                                    </div> :
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

                                                        </form>}

                                                    <h4 className='py-4 px-4'>Yuborilgan Arizalar</h4>
                                                    <Table scroll={{ x: 1250 }} dataSource={data} columns={columns} pagination={false} loading={loadingSeller} />
                                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                                        onChange={handlePagination} />
                                                </div>


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
                                                <Table scroll={{ x: 1800 }} dataSource={dataAdmin} columns={columnsAdmin}
                                                    loading={loadingData}
                                                    pagination={false} />
                                                <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                                    onChange={getItemsSellerAdmin} />
                                            </>) :
                                            <></>

                                    }
                                </div>
                            </div>
                        </div>
                    </SidebarLayout>
                    {
                        user?.role === "admin" ?
                            <div className='px-4'>
                                <div className='my-5 bg-white mx-auto p-4 container'>
                                    <h4 className='text-center mb-4'>Kelib tushgan takliflar   </h4>
                                    <RangePicker className='py-3 col-md-4 mb-4 shadow-sm rounded-3' onChange={handleChangeDate} />
                                    <Table scroll={{ x: 1500 }} dataSource={data1} columns={columnsTextArea}
                                        loading={loadingOffer}
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
                            <form className='border mt-5 rounded bg-white p-4' onSubmit={getItemsTextItmes} >
                                <h4>Taklif berish <i className="fa-solid fa-file-signature"></i></h4>
                                <textarea onChange={(e) => setTextItems(e.target.value)} required className='w-100 p-3 border border-success rounded' rows={4} placeholder="Bu qismga takliflaringizni yuboring"></textarea>
                                <div className='w-100 d-flex justify-content-end'>
                                    <button className="btn-success btn mt-3" type='submit' style={{ height: "40px", width: "120px" }}><span className='fs-4'>
                                        {
                                            loading?.loadingButton ?
                                                "Yuborish"
                                                :
                                                <div className="spinner-border mx-2 " role="status" style={{ cursor: "not-allowed" }}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                        }
                                    </span></button>
                                </div>
                            </form>

                            <div className='mb-5 mt-3 bg-white  p-4 '>
                                <h4 className='text-center mb-4'>Yuborilgan takliflar </h4>
                                <Table scroll={{ x: 800 }} dataSource={dataAdmintaklif} columns={columnsTextAreaseller}
                                    loading={loadingOfferSeller}
                                    pagination={false} />
                                <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount2}
                                    onChange={getItemsSellerTaklif} />
                            </div>
                        </div>
                        : <></>
                }

                <Modal
                    title="Arizani tasdiqlash"
                    width={550}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    okText="Yopish"
                    footer={null}
                    cancelButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    okButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}

                    onCancel={() => setOpen(false)}>

                    <h5 className='mb-0 text-success'>{dataCardModal?.seller_info?.name}</h5>
                    <h5 className='mb-0 text-success'>{addPeriodToThousands(dataCardModal?.amount)} so'm </h5>

                    <Form
                        form={form}
                        onFinish={postOrder}
                        className="row  pt-4 "
                        layout='vertical'
                        initialValues={{
                            status: dataCardModal?.status,
                            description: dataCardModal?.description,


                        }}
                    >

                        <Form.Item
                            label="Chek rasmi"
                            name={"receipt"}
                            className='col-md-12 mb-3 '>

                            <label
                                style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '45px',
                                    border: '1px solid #ccc',
                                    padding: '10px 15px',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    borderRadius: "5px"
                                }}
                            >

                                {
                                    (dataCardModal?.receipt || valuesImage) ?
                                        <span>Chek rasmi yuklangan <i className="fa-solid fa-circle-check text-success"></i></span>
                                        :
                                        <span><i className="fa-solid fa-cloud-arrow-up text-primary mx-2 fs-3"></i> Chek rasmini yuklash uchun rasm tanlang</span>
                                }
                                <Input
                                    accept='image/*'
                                    onChange={(e) => setValuesImage(e.target.files[0])}
                                    type='file'
                                    style={{
                                        position: 'absolute',
                                        width: '1px',
                                        height: '1px',
                                        overflow: 'hidden',
                                        clip: 'rect(0, 0, 0, 0)',
                                        border: '0'
                                    }}
                                />
                            </label>

                        </Form.Item>

                        <Form.Item label="Holat" name={"status"} className='col-md-12 mb-3'>


                            <Select style={{ height: "45px" }} >
                                {
                                    dataStatus?.map((item) => (
                                        <Option key={item?.id} value={item.status}>{statusText[item?.status]}</Option>
                                    ))

                                }

                            </Select>


                        </Form.Item>

                        <Form.Item
                            label="Tavsif"
                            name="description"
                            className='col-md-12 mb-3'>
                            <TextArea
                                rows={4}
                                placeholder="Tavsif"

                            />
                        </Form.Item>

                        <Form.Item className="col-md-12 d-flex justify-content-end m-0  mt-3">
                            <Button
                                onClick={() => setOpen(false)}
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                    height: '37px',
                                    padding: "1px 30px"
                                }}
                                className="btn-success btn-send-email">
                                <span
                                    style={{
                                        color: '#fff',
                                        fontSize:
                                            '16px',
                                    }}>
                                    Tasdiqlash
                                </span>
                            </Button>
                        </Form.Item>

                    </Form>


                </Modal>


                <Modal
                    title="Kelib tushgan taklifga javob"
                    width={550}
                    centered
                    open={openApplication}
                    onOk={() => setOpenAplication(false)}
                    okText="Yopish"
                    footer={null}
                    cancelButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    okButtonProps={{
                        style: {
                            display: 'none',
                        },
                    }}

                    onCancel={() => setOpenAplication(false)}>

                    <Form
                        form={form}
                        onFinish={ProfileUsersTextItem}
                        className="row  pt-4 "
                        layout='vertical'
                        initialValues={{
                            description: textItemsId?.description,
                        }}
                    >


                        <Form.Item
                            label="Tavsif"
                            name="description"
                            className='col-md-12 mb-3'>
                            <TextArea
                                rows={4}
                                placeholder="Tavsif"

                            />
                        </Form.Item>

                        <Form.Item className="col-md-12 d-flex justify-content-end m-0  mt-3">
                            <Button
                                onClick={() => setOpenAplication(false)}
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                    height: '37px',
                                    padding: "1px 30px"
                                }}
                                className="btn-success btn-send-email">
                                <span
                                    style={{
                                        color: '#fff',
                                        fontSize:
                                            '16px',
                                    }}>
                                    Tasdiqlash
                                </span>
                            </Button>
                        </Form.Item>

                    </Form>


                </Modal>



            </div>
        </section>
    );
}
export default ApplicationLists;
