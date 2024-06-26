import { Button, Dropdown, Form, Input, InputNumber, Menu, Modal, Pagination, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import DealsSidebar from './modules/DealsSidebar';
import DealsList from './DealsList';
import ModalDelete from './Modal';
import Link from 'next/link';
import ModalDelas from './ModalDeals';
import TextDescription from '~/components/progress/textDescription';
const { TextArea } = Input;



export default function MyDealCart() {
    const { user } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadingUpdate, setloadingUpdate] = useState(false);
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [data, setData] = useState([]);
    const [dataDetials, setDataDetials] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsID, setProductsID] = useState(null);
    const [productsId, setProductsId] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 800);
    const [lifetime, setDLifetime] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [contacInfo, setContacInfo] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(null);
    const [appliactionId, setAppliactionId] = useState(null);
    const [countdown, setCountdown] = useState(null);


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = (productsId) => {
        if (productsId) {
            setProductsID(productsId)
            setIsModalOpen(true);
        }
    };

    const showModalUpdate = (productsId) => {
        if (productsId) {
            setProductsID(productsId)
            setOpenUpdate(true);
        }
    };

    async function GetItemsProducts() {
        setloading(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersApplicationsLists(currPage, debouncedSearchTerm, '', category, token);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setDataDetials(ItemsData)
        setloading(false)
    }


    async function GetItemsProductsUpdates() {
        setloadingUpdate(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersApplicationsListsUpdates(productsID, token);
        if (ItemsData) {
            setDataDetials(ItemsData)
        }
        setloadingUpdate(false)
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
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };

    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyDealsDeleteApplicaiton(
            productsId,
            user?.access
        );
        if (ItemsData?.status === 204) {
            GetItemsProducts(currPage, '', '', '', user?.access)
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz malumotlarni o'chirdingiz`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status === 404 ? "O'chirish imkoniyati mavjud emas!" : ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
    }

    async function postOrder() {
        form.resetFields();
        const data = {
            description: description ? description : dataDetials?.description,
            price: price ? price : Number(dataDetials?.price),
            deadline_date: lifetime ? lifetime : dataDetials?.deadline_date,
            contact_info: contacInfo ? contacInfo : dataDetials?.contact_info,
        };

        const ItemsData = await PatchRepository.patchDealUpdateApplicaiton(dataDetials?.deal, data, user?.access);
        if (ItemsData?.status === 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz malumotlarni o'zgartirdingiz`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setOpenUpdate(false);
        GetItemsProducts(currPage, '', '', '', user?.access)
    }


    async function postOrderStatus() {
        const data = {
            status: categoryStatus,
        };
        const ItemsData = await PatchRepository.patchDealUpdateApplicaitonStatus(appliactionId, data, user?.access);
        if (ItemsData?.status === 200) {
            GetItemsProducts(currPage, '', '', '', user?.access);
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz malumotlarni o'zgartirdingiz`,
            });


        } else {
            if (ItemsData?.data?.msg) {
                const modal = Modal.warning({
                    centered: true,
                    title: 'Boshqa ariza ustida !',
                    content: ItemsData?.data?.msg,
                });

            } else {

                const modal = Modal.warning({
                    centered: true,
                    title: 'Xatolik!',
                    content: ItemsData?.status + ' ' + ItemsData?.statusText,
                });
            }
        }

    }


    const updateDate = data?.find((item) => item?.remain_datetime !== null);

    useEffect(() => {
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, debouncedSearchTerm, category, appliactionId, user?.access]);


    useEffect(() => {
        if (productsID) {
            GetItemsProductsUpdates()
        }
    }, [productsID, openUpdate, isModalOpen]);

    useEffect(() => {
        setCountdown(Math.floor(updateDate?.remain_datetime))
    }, [updateDate?.remain_datetime]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countdown]);



    return (
        <div className='container mx-auto row mt-5 mb-4 p-0  d-flex align-items-start'>
            <div className='col-md-3 '>
                <DealsSidebar />
            </div>
            <div className='col-md-9'>

                <div className='d-flex justify-content-between gap-3 mb-2  row px-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative col-md-6 p-0'} style={{ flex: 1 }}>
                        <input
                            className={"form-control input2 bg-white rounded-3 "}
                            type="text"
                            placeholder="Qidiruv..."
                            onChange={(e) => (setKeyword(e.target.value))}
                            style={{ minHeight: "42px" }}
                        />
                        <span className="ps-form__action position-absolute" style={{ right: '15px' }}>
                            <i className='fa-solid fa-search button_search_icon text-success' ></i>
                        </span>
                    </div>
                    <select
                        className="form-select col-md-3 fs-3 py-3 rounded-3"
                        onChange={(e) =>
                            setCategory(
                                e.target
                                    .value
                            )
                        }>
                        <option
                            className="fs-3"
                            selected
                            value="">
                            Barcha
                            holatlar
                        </option>
                        <option
                            className="fs-3"
                            value="new">
                            Moderatsiya
                        </option>
                        <option
                            className="fs-3"
                            value="in_progress">
                            Kelishildi va Ish boshlandi
                        </option>
                        <option
                            className="fs-3"
                            value="completed">
                            Tugallangan
                        </option>
                    </select>

                    <button className='col-md-3  btn btn-success rounded-3 fs-4 py-3'
                        onClick={() => setOpen(true)} >
                        <i class="fa-solid fa-plus"></i>   Buyurtma yaratish
                    </button>

                </div>

                <div className='mb-2'>
                    <span className='text-secondary'>Yuborilgan arizalar soni soni {data?.length} ta </span>
                </div>


                <div className='d-flex flex-column gap-3'>
                    {
                        loading ?

                            <div
                                style={{
                                    height: '80vh',
                                    display: 'grid',
                                    placeContent: 'center',
                                }}>
                                <div
                                    className="spinner-border "
                                    role="status"
                                    style={{ width: '150px', height: '150px' }}>
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>

                            :
                            <>
                                {
                                    data?.length > 0 ?
                                        <>

                                            {
                                                data?.map(item => (
                                                    <div >
                                                        <div
                                                            onClick={() => showModal(item?.id)} style={{ cursor: "pointer" }}
                                                            className={`rounded py-3 px-4 d-flex justify-content-between align-items-center
                                                 ${(item?.deal_application_status === 'new' && item?.deal_status_for_applicant !== 'completed') ? " bg-secondary-subtle" :
                                                                    item?.deal_application_status === 'in_progress' ? "bg-warning-subtle" :
                                                                        (item?.deal_application_status === 'cancelled' || item?.deal_status_for_applicant === 'completed') ?
                                                                            "bg-danger-subtle " :
                                                                            "bg-success-subtle"} 
                                                `
                                                            }

                                                        >

                                                            <span className='m-0 '>
                                                                <i className='fa-solid fa-eye mx-2' ></i>
                                                                Ariza holati:


                                                            </span>
                                                            {
                                                                (item?.deal_application_status === 'new' && item?.deal_status_for_applicant !== 'completed') ? (
                                                                    <span>
                                                                        <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                                        Moderatsiya
                                                                    </span>
                                                                ) : item?.deal_application_status === 'in_progress' ? (
                                                                    <span>
                                                                        <i className="fa-regular fa-clock text-warning"></i>  Kelishildi va Ish boshlandi
                                                                    </span>
                                                                ) : (item?.deal_application_status === 'cancelled' || item?.deal_status_for_applicant === 'completed') ? (
                                                                    <span>
                                                                        <i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan
                                                                    </span>
                                                                )

                                                                    : (
                                                                        <span style={{ cursor: 'pointer' }}>
                                                                            <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                                            Tugallangan
                                                                        </span>
                                                                    )
                                                            }
                                                        </div>

                                                        <div key={item?.id} className="border border-2 rounded-3 p-4 bg-white">
                                                            {
                                                                item?.deal_status_for_applicant === "in_progress" ?
                                                                    <div className='d-flex gap-2'>
                                                                        <Tooltip title={""}>
                                                                            <span style={{ cursor: 'pointer' }} >
                                                                                <i className="fa-solid fa-circle-question text-warning"></i>
                                                                            </span>
                                                                        </Tooltip>
                                                                        <span className="text-warning">
                                                                            Buyurtmachi boshqa arizachi bilan ishlamoqda
                                                                        </span>
                                                                    </div> :
                                                                    item?.deal_status_for_applicant === "completed" ? <div className='d-flex gap-2'>
                                                                        <Tooltip title={""}>
                                                                            <span style={{ cursor: 'pointer' }} >
                                                                                <i className="fa-solid fa-circle-question text-danger"></i>
                                                                            </span>
                                                                        </Tooltip>
                                                                        <span className="text-danger">
                                                                            Buyurtma boshqa arizachi tomonidan bajarildi!
                                                                        </span>
                                                                    </div>
                                                                        : <></>
                                                            }
                                                            <div className='d-flex justify-content-between gap-4 align-items-start'>
                                                                <h3 className="text-success fw-medium ">{item?.title}</h3>
                                                                {
                                                                    item?.deal_status_for_applicant !== "new" ? <></> :
                                                                        <Dropdown
                                                                            overlay={(
                                                                                <Menu>
                                                                                    <Menu.Item key="0">
                                                                                        <span style={{ cursor: "pointer" }} onClick={() => showModalUpdate(item?.id)}>
                                                                                            Tahrirlash
                                                                                            <i className="fa-solid fa-pen-to-square mx-3 text-success-emphasis"></i>
                                                                                        </span>
                                                                                    </Menu.Item>
                                                                                    <Menu.Item key="1">
                                                                                        <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
                                                                                            O'chirish
                                                                                            <i
                                                                                                className="fa-solid fa-trash-can text-danger mx-2"
                                                                                                onClick={() => setProductsId(item?.id)}
                                                                                            ></i>
                                                                                        </a>
                                                                                    </Menu.Item>
                                                                                </Menu>
                                                                            )}
                                                                            trigger={['click']}
                                                                        >
                                                                            <a className='d-flex justify-content-center' style={{
                                                                                cursor: "pointer",
                                                                                minWidth: "20px"

                                                                            }} onClick={(e) => e.preventDefault()}>
                                                                                <Space>
                                                                                    <i onClick={() => setProductsId(item?.id)} className="fa-solid fa-ellipsis-vertical"></i>
                                                                                </Space>
                                                                            </a>
                                                                        </Dropdown>
                                                                }


                                                            </div>


                                                            <TextDescription text={item?.description} />



                                                            <div>
                                                                <div className="d-md-flex justify-content-between gap-4  ">
                                                                    <div className="d-flex gap-3 align-items-center my-2">
                                                                        <Link
                                                                            href={item?.application_owner?.role === "seller" ? `/seller/${item?.application_owner?.id}` : "#"}

                                                                        >
                                                                            <a style={{
                                                                                width: "40px",
                                                                                height: "40px",
                                                                                borderRadius: "50%",
                                                                                cursor: "pointer"
                                                                            }}>
                                                                                <img
                                                                                    src={item?.application_owner?.image ? item?.application_owner?.image : "/static/img/ozodbek.png"}
                                                                                    alt="sca"
                                                                                />
                                                                            </a>
                                                                        </Link>

                                                                        <div>

                                                                            <Link
                                                                                href={item?.application_owner?.role === "seller" ? `/seller/${item?.application_owner?.id}` : "#"}
                                                                                style={{ cursor: "pointer" }} className="text-start">
                                                                                <a className="fw-medium fs-5">
                                                                                    {item?.application_owner?.full_name}
                                                                                </a>
                                                                            </Link>


                                                                            <div className='d-flex flex-column'>
                                                                                {
                                                                                    item?.application_owner?.contact_info &&
                                                                                    <span className='text-secondary fs-5'>
                                                                                        <span className='text-success '>Aloqa:</span> {item?.application_owner?.contact_info}
                                                                                    </span>
                                                                                }

                                                                                <span className='text-secondary fs-5'>
                                                                                    <span className='text-success '>Buyurtma sohasi:</span> {item?.type?.name}
                                                                                </span>
                                                                                <span className='text-secondary fs-5'>
                                                                                    <span className='text-success '>Narxi:</span>  {addPeriodToThousands(item?.price)} so'm
                                                                                </span>




                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='mt-3 
                                        d-flex justify-content-between 
                                        align-items-center flex-wrap gap-2'>
                                                                    {item?.application_count !== 0 ?
                                                                        <div className="mb-md-0   d-md-flex gap-3 align-items-center">

                                                                            <span className="fw-medium d-flex gap-3 ">

                                                                                <span className='text-secondary fs-5'>
                                                                                    <span className='text-success '>Topshirish sanasi:</span> {item?.deadline_date}</span>
                                                                                <span className='text-secondary fs-5'>

                                                                                    <span className='text-success '>Takliflar:</span> {item?.application_count}</span>
                                                                            </span>
                                                                        </div> : <span></span>
                                                                    }
                                                                    {
                                                                        (item?.remain_datetime && item?.deal_status_for_applicant !== "new") ?
                                                                            <button
                                                                                onClick={() => (setAppliactionId(item?.application_id), setCategoryStatus("cancelled"))}
                                                                                data-bs-target="#exampleModalToggleDeals" data-bs-toggle="modal"
                                                                                className='btn btn-danger align-items-center fs-5 d-flex flex-column'>

                                                                                <span className='border-bottom'>
                                                                                    {` ${Math.floor(countdown / 3600) < 10 ? '0' : ''}${Math.floor(countdown / 3600)} : ${Math.floor((countdown % 3600) / 60) < 10 ? '0' : ''}${Math.floor((countdown % 3600) / 60)} : ${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
                                                                                </span>
                                                                                <span>Bekor qilish</span>

                                                                            </button> : <></>
                                                                    }



                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))

                                            }


                                            <div className='d-flex justify-content-center my-4 '>
                                                <Pagination
                                                    className="mt-3"
                                                    total={pageCount}
                                                    defaultCurrent={currPage}
                                                    onChange={handlePagination}
                                                />
                                            </div>

                                        </>
                                        :
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: "50vh" }} >
                                            <span className='d-flex flex-column align-items-center gap-3'>
                                                <i class="fa-brands fa-dropbox fa-4x text-secondary"></i>
                                                Ma'luot topilmadi
                                            </span>
                                        </div>
                                }
                            </>


                    }
                </div>


            </div >


            <Modal
                title="Yuborilgan Ariza"
                width={800}
                centered
                open={isModalOpen}
                onOk={handleOk}
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

                onCancel={handleCancel}>

                {
                    loadingUpdate ?

                        <div
                            className=" "
                            style={{
                                height: '50vh',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '150px', height: '150px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                        :
                        <div className="border-top rounded-3 pt-3 bg-white">
                            <h3 className="text-secondary fs-5 fw-medium mb-1 ">Taklif summasi:   <span className='text-success fw-medium fs-5'>{addPeriodToThousands(dataDetials?.price)} so'm</span></h3>
                            <div className="d-md-flex gap-3 align-items-center">
                                <span className="fs-5 fw-medium  text-secondary">
                                    Tugatish muddati:
                                </span>{' '}
                                <span className="fw-medium d-flex gap-3 fs-5 text-success ">
                                    {dataDetials?.deadline_date}
                                </span>
                            </div>
                            <div className="mb-2 d-md-flex gap-3 align-items-center">
                                <span className="fs-5 fw-medium  text-secondary">
                                    Aloqa:
                                </span>{' '}
                                <span className="fw-medium d-flex gap-3 fs-5 text-success ">
                                    {dataDetials?.contact_info}
                                </span>
                            </div>



                            <span className="fs-5 fw-bold  text-secondary">
                                Ariza tavsifi
                            </span>{' '}
                            <p
                                style={{ width: "100%", whiteSpace: 'pre-wrap' }}
                            >
                                {dataDetials?.description}
                            </p>

                            <div className='d-flex justify-content-between align-items-center '>
                                <span></span>

                                {
                                    dataDetials?.status === 'new' ? (
                                        <span>
                                            <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                            Moderatsiya
                                        </span>
                                    ) : dataDetials?.status === 'in_progress' ? (
                                        <span>
                                            <i className="fa-regular fa-clock text-warning"></i>  Kelishildi va Ish boshlandi
                                        </span>
                                    ) :
                                        dataDetials?.status === 'cancelled' ? (
                                            <span>
                                                <i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan
                                            </span>
                                        ) : (
                                            <span style={{ cursor: 'pointer' }}>
                                                <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                Tugallangan
                                            </span>
                                        )
                                }


                            </div>
                        </div>
                }
            </Modal>

            <Modal
                title="Buyurtma yaratish"
                width={550}
                centered
                open={open}
                onOk={() => setOpen(false)}

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

                <DealsList setOpen={setOpen} />
            </Modal>

            <Modal
                title="Ariza tahrirlash"
                width={650}
                centered
                open={openUpdate}
                onOk={() => setOpenUpdate(false)}
                okText="Yopish"
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
                onCancel={() => setOpenUpdate(false)}>
                {
                    loadingUpdate ?
                        <div
                            className=" "
                            style={{
                                height: '70vh',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{ width: '150px', height: '150px' }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                        :
                        <Form
                            layout='vertical'
                            form={form}
                            onFinish={postOrder}
                            className="row  py-4  border-top rounded-3 px-4  bg-white ">


                            <div className="col-md-12 p-0 ">

                                <Form.Item
                                    label={"Tugatish muddati"}
                                    name={dataDetials?.deadline_date}
                                    className='mb-2'
                                >
                                    <Input type='date' onChange={(e) => setDLifetime(e.target.value)}
                                        defaultValue={dataDetials?.deadline_date} />
                                </Form.Item>
                            </div>

                            <div className="col-md-12 p-0 ">
                                <Form.Item
                                    label="Narxi"
                                    className='m-0'
                                    name={dataDetials?.price}>
                                    <InputNumber
                                        defaultValue={Number(dataDetials?.price)}
                                        placeholder="Narxi"
                                        className='w-100 py-2'
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                        onChange={(e) => setPrice(e)}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />


                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Bog'lanish uchun ma'lumot kiriting"
                                className="col-md-12 mt-2 p-0  mx-auto mb-3"
                                name={dataDetials?.contact_info}
                            >
                                <Input
                                    defaultValue={dataDetials?.contact_info}
                                    onChange={(e) =>
                                        setContacInfo(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Telefon, Elektron pochta, telegram username"></Input>
                            </Form.Item>

                            <div className="col-md-12 p-0  ">
                                <Form.Item
                                    label="Taklif"
                                    name={dataDetials?.description}>
                                    <TextArea
                                        rows={8}
                                        placeholder="Taklif"
                                        onChange={(e) => setDescription(e.target.value)}
                                        defaultValue={dataDetials?.description}
                                    />
                                </Form.Item>
                            </div>


                            <Form.Item className="col-md-12 d-flex justify-content-end m-0">
                                <Button
                                    // loading={loading}
                                    htmlType="submit"

                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        padding: "1px 30px"
                                    }}
                                    className="btn-success btn-send-email">
                                    <span
                                        style={{
                                            color: '#fff',
                                            fontSize: '16px',
                                        }}>
                                        Tahrirlash
                                    </span>
                                </Button>
                            </Form.Item>
                        </Form>
                }




            </Modal>


            <ModalDelete onSuccess={DeleteItemsProducts} />
            <ModalDelas onSuccess={postOrderStatus}
                categoryStatus={categoryStatus}

            />
        </div >
    );
}
