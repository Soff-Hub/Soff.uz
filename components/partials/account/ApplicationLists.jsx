import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Button, Form, Modal, Pagination, Table, Input, Select, Tooltip, InputNumber } from 'antd';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import CalculateTimeDifference from './DateFormatter';
import { DatePicker } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import { addPeriodToThousands } from './ProductsLists';
import SidebarLayout from '../SidebarLayout';
import Link from 'next/link';
import { setSavedPrfileData } from '~/rtk-store/ecomerce';
const { TextArea } = Input;



function ApplicationLists() {
    const { accountLinks, user } = useSelector(state => state.auth)
    const { profile } = useSelector((state) => state.ecomerce);
    const [data, setData] = useState([]);
    const [data1, setData2] = useState([]);
    const [loadingData, setloadingData] = useState(false);
    const [loadingSeller, setloadingSeller] = useState(false);
    const [loadingOffer, setloadingOffer] = useState(false);
    const [loadingOfferSeller, setloadingOfferSeller] = useState(false);
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataAdmintaklif, setDataAdminTaklif] = useState([]);
    const [dataPrice, setDataPrice] = useState(null);
    const [dataCard, setDataCard] = useState(null);
    const [profileCard, setProfileCard] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [pageCount1, setPageCount1] = useState(0)
    const [pageCount2, setPageCount2] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [textItems, setTextItems] = useState(null)
    const [textItemsId, setTextItemsId] = useState(null)
    const [sellerSearch, setSellerSearch] = useState('')
    const [loading, setLoading] = useState({ loadingButton: true })
    const [loadingPayment, setLoadingPayment] = useState(false)
    const [allPrice, setAllPrice] = useState(null);
    const { RangePicker } = DatePicker;
    const [alertMess, setAlertMess] = useState("");
    const [dataBlock, setdataBlock] = useState(null);
    const [openApplication, setOpenAplication] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lifeTime, setLifetime] = useState('');
    const [lifeTime1, setLifetime2] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


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
                    maskClosable: true,
                    maskClosable: true,
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
                    maskClosable: true,
                    title: 'Xato!',
                    maskClosable: true,
                    content: ItemsData?.status + ' ' + ItemsData?.statusText,
                });
                modal.update;
            }
        }
        else {
            Modal.info({
                centered: true,
                maskClosable: true,
                maskClosable: true,
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
        const Items = await GetRepository.getProfileArizaAdmin(page, null, user?.access, user?.role === "admin", sellerSearch);
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
        setIsModalOpen(false)
        if (dataPrice < Number(alertMess)) {
            return Modal.error({
                centered: true,
                maskClosable: true,
                title: 'Xatolik!',
                content: `Hisobingizda mablag' yetarli emas. Minimal o'tkazma miqdori ${addPeriodToThousands(alertMess)} so'm bo'lishi kerak. Iltimos, balansingizni tekshirib, qayta urinib ko'ring.`,
            });
        }

        setLoadingPayment(true);
        const data = { credit_card: dataCard, amount: dataPrice }
        const Items = await PostsRepository.PostsMyProductsAriza(data, user?.access);
        if (Items?.status === 200 || Items?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: null,
                icon: null,
                maskClosable: true,
                content: (
                    <div className='bg-white  rounded ' style={{ textAlign: 'center', maxWidth: "368px" }}>
                        <i className="fa-solid fa-circle-check fa-4x mb-5 text-success"></i>
                        <h3 style={{ marginBottom: '10px', color: '#333' }}>Toʻlov muvaffaqqiyatli! o'tkazildi!</h3>
                        <p style={{ marginBottom: '10px', color: '#666' }}>
                            {
                                `**** **** **** ${String(dataCard).slice(-4)} karta raqamiga ${addPeriodToThousands(dataPrice ? dataPrice : profile?.wallet)} so'm 💴 miqdoridagi pul o'tkazildi!
                        `
                            }
                        </p>
                        <p style={{ marginBottom: '20px', color: '#666' }}>
                            Kuningiz xayrli o'tsin🫡!
                        </p>
                        <Button
                            className='bg-success '
                            type="primary"
                            style={{
                                borderRadius: '8px',
                                padding: '5px 20px',
                            }}
                            onClick={() => Modal.destroyAll()}
                        >
                            Yopish
                        </Button>
                    </div>
                ),
                footer: null,
            });
            modal.update
            getItemsSeller(1, null);
            if (user?.access) {
                const ItemsDataProfile = await GetRepository.getProfile(user?.access);
                dispatch(setSavedPrfileData(ItemsDataProfile))
            }
        } else if (Items?.status >= 400) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                maskClosable: true,
                content: `${Items?.data?.msg || Items?.data?.amount || `Status: ${Items?.status} Xatolik yuz berdi`}`,
            });
            modal.update
        }
        setLoadingPayment(false);

    }



    async function getItemsTextItmes(e) {
        e.preventDefault()
        setLoading({ loadingButton: false })
        await PostsRepository.PostsMyProductsTextItmes({ offer: textItems }, user?.access);
        const modal = Modal.success({
            centered: true,
            maskClosable: true,
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
        getItemsSeller(pageNum, null)
    }

    const columns = [
        {
            title: 'Tranzaksiya ID',
            dataIndex: 'amount',
            key: 'address',
            render: (id) => (
                <span># {id}</span>
            )
        },
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
                <span><i className="fa-solid fa-credit-card text-success"></i>  **** **** ****  {String(credit_card)?.slice(-4)}</span>
            )
        },

        {
            title: 'Vaqt',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => <span key={created_at}> <i className="fa-solid fa-clock text-info-emphasis"></i> <CalculateTimeDifference targetDate={created_at} /></span>
        },
        {
            title: 'Holat',
            dataIndex: 'status',
            key: 'address',
            render: (status, rowItems) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> To'landi</span>) :
                        status === 'cancelled' ?
                            (
                                <Tooltip title={rowItems?.description}>
                                    <span style={{ cursor: "pointer" }}><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>
                                </Tooltip>
                            ) :
                            <span><i className="fa-solid text-success fa-circle-check"></i> To'landi</span>
            ),
        },
    ];


    const columnsAdmin = [
        {
            title: 'Tranzaksiya ID',
            dataIndex: 'amount',
            key: 'address',
            render: (id) => (
                <span>#{id}</span>
            )
        },
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
                <span><i className="fa-solid fa-credit-card text-success"></i> {String(credit_card).replace(/(\d{4})(?=\d)/g, "$1 ")}</span>
            )
        },
        {
            title: 'Telefon raqam yoki email',
            dataIndex: 'seller_info',
            key: 'address',
            render: (seller_info) => (
                <Link href={`/sellerAccount/${seller_info?.id}`}>
                    <a className="d-flex flex-column">
                        <span className="truncate whitespace-nowrap">
                            {' '}
                            {seller_info.name}
                        </span>
                        <span>{seller_info.email_or_phone}</span>
                    </a>
                </Link>
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
            render: (status, rowItems) => (
                status === "moderation" ?
                    (<span><i className="text-primary-emphasis fa-solid fa-circle-info"></i> Moderatsiya</span>) :
                    status === 'approved' ?
                        (<span><i className="fa-solid text-success fa-circle-check"></i> To'landi</span>) :
                        status === 'cancelled' ?
                            (<Tooltip title={rowItems?.description}>
                                <span style={{ cursor: "pointer" }}><i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan</span>
                            </Tooltip>) :
                            <span><i className="fa-solid text-success fa-circle-check"></i> To'landi</span>
            ),
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


    useEffect(() => {
        if (user?.access && user?.role === "seller") {
            ProfileUsersBLock()
        }
    }, [user?.access]);


    useEffect(() => {
        getItemsSellerAdmin(currPage, null, sellerSearch);
    }, [sellerSearch])

    useEffect(() => {
        getItemsSeller(currPage);
        if (user?.access && user?.role == "seller") {

            getItemsSellerTaklif(currPage)
            getItemsSellerCardList()
        }

    }, [user?.access])

    useEffect(() => {
        ProfileUsersTextItems(currPage, dataFormat);
    }, [dataFormat])

    useEffect(() => {
        if (openApplication && textItemsId) {
            form.setFieldsValue({
                description: textItemsId?.description,
            });
        }
    }, [textItemsId, form]);



    return (
        <section className="ps-my-account ps-page--account pb-5">
            <div className="container">
                <div className="row" style={{ alignItems: "flex-start" }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content ">

                            {/* To'lov tarixilari */}
                            <div className="ps-section--account-setting ">

                                {/* Seller To'lov tarixi  */}
                                {user?.role === 'seller' && <div className="ps-section__content ">
                                    <div className='border py-4 rounded '>
                                        {dataBlock?.has_blocked ? <div className=' px-4'>
                                            <span className='text-danger fw-bold '>
                                                <i className="fa-solid fa-lock"></i> Siz Bloklangansiz. Bu davr mobaynida Pul yechib olish uchun ariza yuborishni imkoni yo'q.</span>
                                        </div> :
                                            <form className='row row-gap-3 px-4 gap-4 mx-auto'>
                                                <label className='h4 p-0 '  >
                                                    <strong>Hisobingizda kamida {alertMess ? formatCurrency(alertMess) : '35 000'} so’m bo’lishi kerak.</strong>
                                                </label>
                                                <input required id='count' type="number" style={{ height: "41.6px" }} placeholder='Summa' className='form-control rounded-3 col-md-4' onChange={(e) => (setDataPrice(e.target.value))} />

                                                <select className='form-select rounded-3 col-md-5 fs-3 ' style={{ height: "41.6px", cursor: "pointer" }} onChange={(e) => setDataCard(e.target.value)} >
                                                    <option className='fs-3' value='' selected disabled >Kartalaringiz</option>

                                                    {
                                                        profileCard?.length > 0 && (
                                                            profileCard?.map(item => (
                                                                <option key={item.id} value={item.credit_card}>{String(item?.credit_card).replace(/(\d{4})(?=\d)/g, "$1 ")} </option>
                                                            ))
                                                        )
                                                    }

                                                </select>

                                                {
                                                    (dataCard && dataPrice) ?
                                                        <Button onClick={showModal} disabled={loadingPayment} className=' text-light col-md-2' style={{
                                                            height: "41.6px",
                                                            backgroundColor: "#28A745"
                                                        }}>
                                                            {
                                                                loadingPayment && <div
                                                                    className="spinner-border fs-5"
                                                                    role="status"
                                                                    style={{ width: '15px', height: '15px' }}
                                                                >
                                                                    <span className="visually-hidden">
                                                                        Loading...
                                                                    </span>
                                                                </div>
                                                            }
                                                            <span className='fs-4'>Yechib olish</span></Button>
                                                        :
                                                        <Button disabled className='text-light col-md-2' style={{
                                                            height: "41.6px",
                                                            backgroundColor: "#28A745"
                                                        }}>

                                                            <span className='fs-4'>Yechib olish</span>
                                                        </Button>
                                                }

                                            </form>}

                                        <h5 className='pt-4 px-4 fs-3'><i className="fa-solid fa-clock-rotate-left"></i>  To'lovlar tarixi</h5>
                                        <Table scroll={{ x: 800 }} dataSource={data} columns={columns} pagination={false} loading={loadingSeller} />
                                        <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                            onChange={handlePagination} />
                                    </div>
                                </div>}

                                {/* Admin To'lov tarixi  */}

                                {user?.role === "admin" && user?.is_superuser && <div className="ps-section__content ">
                                    <div className='row g-3 mx-auto'>
                                        <h4 className='py-3 col-md-6'>{`Arizalar Bo'limi - ${addPeriodToThousands(allPrice)} so'm `}</h4>

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
                                    <Table scroll={{ x: 1200 }} dataSource={dataAdmin} columns={columnsAdmin}
                                        loading={loadingData}
                                        pagination={false} />
                                    <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount}
                                        onChange={getItemsSellerAdmin} />
                                </div>}
                            </div>
                        </div>

                        {/* Takliflar bo'limi */}
                        <>
                            {/* Admin takliflar (kelib tushgan) */}
                            {
                                user?.role === "admin" &&
                                <div className=''>
                                    <div className='mb-5 bg-white mx-auto p-4 container'>
                                        <h4 className='text-center mb-4'>Kelib tushgan takliflar   </h4>
                                        <RangePicker className='py-3 col-md-4 mb-4 shadow-sm rounded-3' onChange={handleChangeDate} />
                                        <Table scroll={{ x: 1500 }} dataSource={data1} columns={columnsTextArea}
                                            loading={loadingOffer}
                                            pagination={false} />
                                        <Pagination className="mt-3" defaultCurrent={currPage || 1} total={pageCount1}
                                            onChange={ProfileUsersTextItems} />
                                    </div>
                                </div>
                            }
                            {/* Seller takliflar (yuborgan) */}

                            {
                                user?.role === "seller" &&
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
                            }

                        </>

                    </SidebarLayout>
                </div>

                {/* Kelib tushgan takliflarga javob berish modalkasi */}
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

                <Modal
                    title={"Amalni tasdiqlaysizmi?"}
                    open={isModalOpen}
                    centered
                    onOk={getItemsSellerPost}
                    onCancel={handleCancel}
                    okText="Ha, davom etaman"
                    cancelText="Yo'q"
                    okButtonProps={{ style: { backgroundColor: "#28A745", borderColor: "#28A745", } }}
                    cancelButtonProps={{ style: { borderColor: "#28A745", color: "#28A745" } }}
                >
                    <p style={{ marginBottom: '10px', color: '#666' }}>
                        Sizning hisobingizdan
                        {
                            ` **** **** ****  ${String(dataCard).slice(-4)} karta raqamiga ${addPeriodToThousands(dataPrice ? dataPrice : profile?.wallet)} so'm 💴 mablag' o'tkaziladi. Davom etishga ishonchingiz komilmi?
                        `
                        }
                    </p>
                </Modal>



            </div>
        </section>
    );
}
export default ApplicationLists;
