import React, { useEffect, useState } from 'react';
import DealsSidebar from './modules/DealsSidebar';
import { Dropdown, Menu, Modal, Pagination, Select, Space, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import Link from 'next/link';
const { Option } = Select;



export default function ApplicationsReceiveds() {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [dataDetails, setDataDtails] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsIdUpdate, setProductsIdUpdate] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [category, setCategory] = useState(null);
    const [filterData, setFilterData] = useState([]);
    const [filter, setFilter] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(null);
    const [appliactionId, setAppliactionId] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(2);
    const [needsToggle, setNeedsToggle] = useState(false);
    const [needsId, setNeedsId] = useState(null);
    const [innerWidth, setInnerWidth] = useState(null);



    function handleDescriptionMore(id) {
        setNeedsId(id)
        setIsExpanded(50);
        setNeedsToggle(true)
    }

    function handleDescription(id) {
        setNeedsId(id)
        setIsExpanded(2);
        setNeedsToggle(false)
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

    async function GetItemsProducts() {
        setLoading(true)
        const token = user?.access
        const ItemsData = await GetRepository.getApplicationsReceived(currPage, category, filter, token);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setDataDtails(ItemsData)
        setLoading(false)
    }

    async function GetItemsProductsUpdates() {
        setLoadingDetails(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersMYDealListsUpdate(productsIdUpdate, token);
        setDataDtails(ItemsData);
        setLoadingDetails(false)
    }


    function handleClickUpdate(id) {
        if (id) {
            setAppliactionId(id)
            setOpenUpdate(true);
        }
    }

    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };

    async function GetItemsProductsFilter() {
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersMYDealLists(currPage, keyword, '', '', token);
        if (ItemsData?.results) {
            setFilterData(ItemsData.results);
        }
    }


    const onSearch = async (value) => {
        setKeyword(value)
    };

    function handleChange(value) {
        for (let i = 0; i < filterData.length; i++) {
            if (filterData[i].title === value) {
                setFilter(filterData[i].id);
            }
        }
    }

    function handleChangeID(id) {
        if (id) {
            setProductsIdUpdate(id)
            setOpen(true)
        }
    }

    async function postOrder() {

        if (categoryStatus) {

            const data = {
                status: categoryStatus
            };
            const ItemsData = await PatchRepository.patchDealUpdateApplicaitonUpdates(appliactionId, data, user?.access);
            if (ItemsData?.status === 200) {
                GetItemsProducts()
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
        } else {
            const modal = Modal.warning({
                centered: true,
                title: 'Xatolik!',
                content: 'Holatni tanlashingiz kerak',
            });
        }
        setOpenUpdate(false)
        setCategory(null)
    }


    useEffect(() => {
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, category, filter, user?.access]);


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsUpdates()
        }
    }, [productsIdUpdate, openUpdate, open]);


    useEffect(() => {
        GetItemsProductsFilter()
    }, [keyword]);

    useEffect(() => {
        setInnerWidth(window.innerWidth);
    }, [])




    return (
        <div className={`container row mx-auto p-0  d-flex align-items-start mt-5`}>

            <div className='col-md-3'>
                <DealsSidebar />
            </div>

            <div className={"col-md-9 mb-4"}>

                <div className='d-md-flex gap-3 mb-4  justify-content-between '>

                    <Select
                        mode="single"
                        showSearch
                        className='p-0 w-100'
                        allowClear
                        style={{ height: "45px" }}
                        placeholder="Barcha Buyurtmalar"
                        onSearch={onSearch}
                        onChange={handleChange}
                    >
                        <Option key={""} value={""}>Barcha Buyurtmalar</Option>
                        {filterData.map(item => (
                            <Option key={item.id} value={item.title} >{item.title}</Option>
                        ))}
                    </Select>


                    <select
                        className="form-select col-md-3 fs-3 py-3 my-3 my-md-0 rounded-3"
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
                            Jarayonda
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

                <div className='d-flex flex-column gap-3'>
                    {

                        loading ?

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
                            <>
                                {
                                    data?.map(item => (
                                        <div key={item?.id} className="border border-2 rounded-3 bg-white">
                                            <div className='d-md-flex justify-content-between gap-2 align-items-center  mb-3 px-4 py-3 ' style={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}>
                                                <div>
                                                    <h5 className="text-success fw-medium mb-2">
                                                        {item?.deal?.title}
                                                    </h5>
                                                </div>

                                                <div className='d-md-flex align-items-start gap-md-3 flex-wrap '>
                                                    <h5 className='text-success fw-medium mb-1  fs-5'>Muddati: {item?.deal?.deadline_date}</h5>
                                                    <div className='d-flex justify-content-between align-items-start gap-3'>
                                                        <h5 className='text-success fw-medium mb-1 fs-5'>
                                                            {addPeriodToThousands(item?.deal?.price)} so'm

                                                        </h5>

                                                        <Dropdown
                                                            overlay={(
                                                                <Menu>
                                                                    <Menu.Item key="1">
                                                                        <span onClick={() =>
                                                                            handleChangeID(item?.deal?.id)

                                                                        } className='text-secondary' style={{ cursor: "pointer" }}>
                                                                            Buyurtmani ko'rish   <i className='fa-solid fa-eye'></i>
                                                                        </span>
                                                                    </Menu.Item>

                                                                    {
                                                                        item?.status !== 'active' ?
                                                                            <Menu.Item key="0">
                                                                                <span style={{ cursor: "pointer" }} onClick={() => handleClickUpdate(item?.id)} >
                                                                                    Tahrirlash
                                                                                    <i className="fa-solid fa-pen-to-square mx-3 text-success-emphasis"></i>
                                                                                </span>
                                                                            </Menu.Item> : <></>
                                                                    }

                                                                </Menu>
                                                            )}
                                                            trigger={['click']}
                                                        >
                                                            <a className='d-flex justify-content-center' style={{
                                                                cursor: "pointer",
                                                                minWidth: "20px"

                                                            }}>
                                                                <Space>
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                </Space>
                                                            </a>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='px-4 pb-4'>

                                                <p
                                                    className='m-0 description_more'

                                                    style={{ WebkitLineClamp: item?.id === needsId ? isExpanded : "2",whiteSpace: 'pre-wrap' }}
                                                >
                                                    {item?.description}
                                                </p>

                                                {
                                                    innerWidth < 414 ?
                                                        <div className='d-flex justify-content-end'>
                                                            {
                                                                (needsToggle && (item?.id === needsId)) ?
                                                                    <span onClick={() => handleDescription(item?.id)}
                                                                        className='text-success' style={{ cursor: "pointer" }}>
                                                                        <i className='fa-solid fa-eye-slash'></i> Yashirish
                                                                    </span> :
                                                                    <span onClick={() => handleDescriptionMore(item?.id)}
                                                                        className='text-success' style={{ cursor: "pointer" }}>
                                                                        <i className='fa-solid fa-eye'></i> Batafsil ko'rish
                                                                    </span>
                                                            }
                                                        </div> :
                                                        item?.description?.length > 252 ?
                                                            <div className='d-flex justify-content-end'>
                                                                {
                                                                    (needsToggle && (item?.id === needsId)) ?
                                                                        <span onClick={() => handleDescription(item?.id)}
                                                                            className='text-success' style={{ cursor: "pointer" }}>
                                                                            <i className='fa-solid fa-eye-slash'></i> Yashirish
                                                                        </span> :
                                                                        <span onClick={() => handleDescriptionMore(item?.id)}
                                                                            className='text-success' style={{ cursor: "pointer" }}>
                                                                            <i className='fa-solid fa-eye'></i> Batafsil ko'rish
                                                                        </span>
                                                                }
                                                            </div> : <></>

                                                }



                                                <div className="d-md-flex justify-content-between gap-4  ">
                                                    <div className="d-flex gap-3 align-items-center my-2">
                                                        <Link href={`/seller/${item?.user?.id}`}

                                                        >
                                                            <a style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",
                                                                cursor: "pointer"
                                                            }}>
                                                                <img
                                                                    src={item?.user?.image_url ? item?.user?.image_url : "/static/img/ozodbek.png"}
                                                                    alt="sca"
                                                                />
                                                            </a>
                                                        </Link>
                                                        <div>

                                                            <Link href={`/seller/${item?.user?.id}`} style={{ cursor: "pointer" }} className="text-start">
                                                                <a className="fw-medium fs-5">
                                                                    {item?.user?.full_name}
                                                                </a>
                                                            </Link>


                                                            <div>

                                                                <span className="fw-medium text-success fs-5  ">Narxi:</span>{' '}
                                                                <span className="text-secondary fs-5 fw-medium ">
                                                                    {addPeriodToThousands(item?.price)} so'm
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div>
                                                        <span className="text-success fs-5 fw-medium">
                                                            Muddati:
                                                        </span>{' '}
                                                        <span className="fw-medium fs-5 ">
                                                            {item?.deadline_date}
                                                        </span>
                                                    </div>

                                                    {
                                                        item?.status === 'new' ? (
                                                            <span>
                                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                                Moderatsiya
                                                            </span>
                                                        ) : item?.status === 'in_progress' ? (
                                                            <span>
                                                                <i className="fa-regular fa-clock text-warning"></i>  Jarayonda
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
                    }
                </div>


            </div>

            <Modal
                title="Buyurtmangiz"
                width={1024}
                centered
                open={open}
                onOk={() => setOpen(false)}
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

                onCancel={() => setOpen(false)}>

                {
                    loadingDetails ?
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
                        </div> :
                        <div className="border border-2 rounded-3 p-4 bg-white">
                            <div className='d-md-flex justify-content-between gap-4 align-items-center'>
                                <h3 className="text-success fw-medium ">{dataDetails?.title}</h3>

                            </div>
                            <p
                                style={{ width: "100%" }}
                            >
                                {dataDetails?.description}
                            </p>
                            <div>
                                <div className="d-md-flex justify-content-between gap-4  ">
                                    <div className="d-flex align-items-center ">
                                        <img
                                            className="d-block"
                                            width={60}
                                            src="/static/img/docCopy.jpg"
                                            alt="sca"
                                        />
                                        <div>

                                            <div >
                                                {' '}
                                                <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                                <span className="text-secondary fs-5 fw-medium ">
                                                    {addPeriodToThousands(dataDetails?.price)} so'm
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-success fs-5 fw-medium">
                                                    Buyurtma turi:
                                                </span>{' '}
                                                <span className="fw-medium text-secondary fs-5">
                                                    {dataDetails?.type?.name}
                                                </span>
                                            </div>


                                            <div>
                                                <span className="text-success fs-5 fw-medium">
                                                    Muddati:
                                                </span>{' '}
                                                <span className="fw-medium fs-5 ">
                                                    {dataDetails?.deadline_date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3 d-flex justify-content-between'>
                                    {dataDetails?.application_count !== 0 ?
                                        <div className="text-start mb-md-0  d-md-flex gap-3 align-items-center">

                                            <span className="fw-medium d-flex gap-3 ">

                                                <span className='text-secondary fs-5'>
                                                    <span className='text-success'>Takliflar:</span> {dataDetails?.application_count}</span>

                                            </span>
                                        </div> : <span></span>
                                    }


                                    {
                                        dataDetails?.status === 'new' ? (
                                            <span>
                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                Moderatsiya
                                            </span>
                                        ) : dataDetails?.status === 'active' ? (
                                            <span>
                                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                Tasdiqlangan
                                            </span>
                                        ) : (
                                            <Tooltip title={dataDetails?.reason}>
                                                <span style={{ cursor: 'pointer' }}>
                                                    <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                                                    Bekor qilingan{' '}
                                                </span>
                                            </Tooltip>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                }


            </Modal>

            <Modal
                title="Arizani tasdiqlash"
                width={416}
                centered
                open={openUpdate}
                onOk={postOrder}
                okText="Tasdiqlash"
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                okButtonProps={{
                    style: {
                        backgroundColor: "#28a745"
                    },
                }}

                onCancel={() => setOpenUpdate(false)}>

                <select
                    className="form-select   fs-3 py-3 rounded-3"
                    onChange={(e) =>
                        setCategoryStatus(
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
                        Jarayonda
                    </option>
                    <option
                        className="fs-3"
                        value="completed">
                        Tugallangan
                    </option>
                </select>
            </Modal>


        </div >
    );
}
