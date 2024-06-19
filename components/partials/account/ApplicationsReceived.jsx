import React, { useEffect, useId, useState } from 'react';
import DealsSidebar from './modules/DealsSidebar';
import { Modal, Pagination, Select } from 'antd';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import DealsList from './DealsList';
import ModalDelas from './ModalDeals';
const { Option } = Select;
import { Flex, Rate } from 'antd';



export default function ApplicationsReceiveds() {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [dataDetails, setDataDtails] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsIdUpdate, setProductsIdUpdate] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [openPosts, setOpenPosts] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [category, setCategory] = useState(null);
    const [filterData, setFilterData] = useState([]);
    const [filter, setFilter] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(null);
    const [appliactionId, setAppliactionId] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [valueRate, setValueRate] = useState(null);
    const [rateDes, setRateDes] = useState(null);
    const [userData, setUserData] = useState([]);
    const [userDataDeals, setUserDataDeals] = useState([]);
    const [userId, setUserId] = useState(null);



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

    function handleClickUpdate(item) {
        setAppliactionId(item?.id)
        if (item?.status === "new") {
            setCategoryStatus('in_progress')
        } else {
            setCategoryStatus('completed')
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
        const data = {
            status: categoryStatus,
            rating: valueRate ? valueRate : "",
            review: rateDes ? rateDes : ""
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
        setValueRate(null)
    }

    async function GetItemsProductsUpdatesProfile() {
        const ItemsData = await GetRepository.getOrdersMYDealListsUpdateUserData(userId);
        const ItemsDataDeals = await GetRepository.getOrdersMYDealListsUpdateUserDataDeals(userId);
        setUserData(ItemsData);
        setUserDataDeals(ItemsDataDeals?.results)

    }

    console.log(userData);
    console.log(userDataDeals);




    useEffect(() => {
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, category, filter, user?.access]);


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsUpdates()
        }
    }, [productsIdUpdate, open]);


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsFilter()
        }
    }, [keyword]);


    useEffect(() => {
        if (userId) {
            GetItemsProductsUpdatesProfile()
        }
    }, [userId, openUpdate])



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
                        className='p-0 '
                        allowClear
                        style={{ height: "45px", maxWidth: "400px", width: "100%" }}
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
                            Kelishildi va Ish boshlandi
                        </option>
                        <option
                            className="fs-3"
                            value="completed">
                            Tugallangan
                        </option>
                    </select>

                    <button className='col-md-3  btn btn-success rounded-3 fs-4 py-3'
                        onClick={() => setOpenPosts(true)} >
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
                                            <div onClick={() =>
                                                handleChangeID(item?.deal?.id)}
                                                className={`text-secondary fs-5 fw-medium pt-3 px-4
                                                    ${item?.status === 'new' ? " bg-secondary-subtle" :
                                                        item?.status === 'in_progress' ? "bg-warning-subtle" :
                                                            item?.status === 'cancelled' ? "bg-danger-subtle " :
                                                                "bg-success-subtle"} 
                                                   `
                                                }


                                                style={{ cursor: "pointer" }} >
                                                <i className='fa-solid fa-eye'></i>  Buyurtma</div>
                                            <div onClick={() =>
                                                handleChangeID(item?.deal?.id)}


                                                className={`d-md-flex justify-content-between gap-2 align-items-center  mb-2 px-4 pb-3 pt-1 
                                                    ${item?.status === 'new' ? " bg-secondary-subtle" :
                                                        item?.status === 'in_progress' ? "bg-warning-subtle" :
                                                            item?.status === 'cancelled' ? "bg-danger-subtle " :
                                                                "bg-success-subtle"} 
                                                   `
                                                }

                                                style={{ cursor: "pointer" }}>

                                                <div>
                                                    <h5 className="text-secondary fw-medium mb-2">
                                                        {item?.deal?.title}
                                                    </h5>
                                                </div>

                                                <div className='d-md-flex align-items-start gap-md-2 flex-wrap justify-content-end'>
                                                    <h5 className='text-secondary fw-medium mb-1  fs-5'>Topshirish sanasi: {item?.deal?.deadline_date}</h5>
                                                    <div className='d-flex justify-content-between align-items-start gap-2'>
                                                        <h5 className='text-secondary fw-medium mb-1 fs-5'>
                                                            Narxi:  {addPeriodToThousands(item?.deal?.price)} so'm

                                                        </h5>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='px-4 pb-4'>
                                                <span className=' fs-5 fw-medium'>Kelib tushgan ariza</span>
                                                <p
                                                    className='m-0 description_more'

                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                >
                                                    {item?.description}
                                                </p>



                                                <div className="d-md-flex justify-content-between gap-4  ">
                                                    <div className="d-flex gap-3 align-items-center my-2">
                                                        <span
                                                            onClick={() => (setOpenUpdate(true), setUserId(item?.user?.id))}

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
                                                        </span>
                                                        <div>

                                                            <span onClick={() => (setOpenUpdate(true), setUserId(item?.user?.id))} style={{ cursor: "pointer" }} >
                                                                <a className="fw-medium fs-5">
                                                                    {item?.user?.full_name}
                                                                </a>
                                                            </span>


                                                            <div>
                                                                <h5 className='text-success fw-medium mb-1 fs-5'>
                                                                    Aloqa:   <span className='text-secondary fs-5 fw-medium '>{item?.contact_info}</span>

                                                                </h5>
                                                                <span className="fw-medium text-success fs-5  ">Narxi:</span>{' '}
                                                                <span className="text-secondary fs-5 fw-medium ">
                                                                    {addPeriodToThousands(item?.price)} so'm
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='d-flex justify-content-between flex-wrap gap-1'>
                                                    <div>
                                                        <span className="text-success fs-5 fw-medium">
                                                            Tugatish muddati:
                                                        </span>{' '}
                                                        <span className="fw-medium fs-5 ">
                                                            {item?.deadline_date}
                                                        </span>
                                                    </div>

                                                    <div className='d-flex gap-3 align-items-center justify-content-between '>
                                                        {
                                                            item?.status === 'new' ? (
                                                                <span>
                                                                    <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                                    Moderatsiya
                                                                </span>
                                                            ) : item?.status === 'in_progress' ? (
                                                                <span>
                                                                    <i className="fa-regular fa-clock text-warning"></i>  Kelishildi va Ish boshlandi
                                                                </span>
                                                            ) : item?.status === "cancelled" ? (
                                                                <span>
                                                                    <i className="fa-solid fa-circle-xmark text-danger"></i> Bekor qilingan
                                                                </span>
                                                            ) :

                                                                (
                                                                    <span style={{ cursor: 'pointer' }}>
                                                                        <i className="fa-solid fa-circle-check text-success"></i>{' '}
                                                                        Tugallangan
                                                                    </span>
                                                                )
                                                        }
                                                        {

                                                            item?.status === 'new' ?
                                                                <button data-bs-target="#exampleModalToggleDeals" data-bs-toggle="modal"
                                                                    className='btn btn-success fs-5'
                                                                    onClick={() => handleClickUpdate(item)}>
                                                                    Qabul qilish
                                                                </button>
                                                                : item?.status === 'in_progress' ?
                                                                    <button data-bs-target="#exampleModalToggleDeals" data-bs-toggle="modal"
                                                                        className='btn btn-outline-success fs-5'
                                                                        onClick={() => handleClickUpdate(item)}>Tugatish</button> :
                                                                    <></>

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
                    }
                </div>


            </div>

            <Modal
                title=" "
                width={568}
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

                <div className='bg-light p-3 mb-3 mt-5 d-flex justify-content-between'>
                    <div className='d-flex gap-3 align-items-center'>
                        <img
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                            height={50} width={50} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPcbkP_unwSjPz808crGcqQhGjGoNC4GNyg&s"} alt={"user"} srcset="" />
                        <div className='d-flex flex-column '>
                            <span className='fs-4'>{userData?.full_name}</span>
                            <span className='text-secondary' fs-4>Qilgan ishlari: <span className='text-success'>
                                {userData?.total_applications} ta </span></span>
                        </div>
                    </div>
                    {
                        userData?.average_rating &&
                        <Flex gap="middle" vertical>
                            <Rate
                                disabled
                                className="fs-4"
                                value={userData?.average_rating}
                            />
                        </Flex>
                    }

                </div>


                <span className='fs-5 '>Qilgan ishlari ro'yxati</span>
                {
                    userDataDeals?.map(item => (
                        <>
                            {
                                (item?.review || item?.rating) &&
                                <div className='bg-success-subtle px-3 py-2'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        {
                                            item?.review &&
                                            <span>Fikrlar</span>
                                        }
                                        {
                                            item?.rating &&
                                            <Flex gap="middle" vertical >
                                                <Rate
                                                    disabled
                                                    className="fs-4"
                                                    value={item?.rating}
                                                />
                                            </Flex>
                                        }
                                    </div>
                                    {
                                        item?.review &&
                                        <span>{item?.review} </span>
                                    }
                                </div>
                            }

                            <div
                                className={`d-flex flex-column justify-content-between gap-2 align-items-start 
                                 mb-3  p-3 pb-4 `
                                }

                                style={{ cursor: "pointer", backgroundColor: "rgb(245 246 247 / 1)" }}>
                                <div>
                                    <h5 className="text-secondary fw-medium mb-2">
                                        {item?.deal?.title}
                                    </h5>
                                </div>
                                <div className='d-md-flex align-items-start gap-md-2 flex-wrap justify-content-between w-100'>
                                    <h5 className='text-secondary fw-medium mb-1  fs-5'>Topshirilgan sanasi: {item?.deal?.deadline_date}</h5>

                                    <h5 className='text-secondary fw-medium mb-1 fs-5'>
                                        Narxi:  {addPeriodToThousands(item?.deal?.price)} so'm

                                    </h5>

                                </div>

                            </div>
                        </>
                    ))
                }


            </Modal>


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
                                style={{ width: "100%", whiteSpace: 'pre-wrap' }}
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
                                                    Buyurtma sohasi:
                                                </span>{' '}
                                                <span className="fw-medium text-secondary fs-5">
                                                    {dataDetails?.type?.name}
                                                </span>
                                            </div>


                                            <div>
                                                <h5 className='text-success fw-medium mb-1 fs-5'>
                                                    Aloqa:   <span className='text-secondary fs-5 fw-medium '>{dataDetails?.contact_info}</span>

                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3 d-flex justify-content-between'>
                                    {dataDetails?.application_count !== 0 ?
                                        <div className="text-start mb-md-0  d-md-flex gap-3 align-items-center">

                                            <span className="fw-medium d-flex gap-3 ">

                                                <span className="text-success fs-5 fw-medium">
                                                    Topshirish sanasi: <span className="fw-medium text-secondary  fs-5 ">
                                                        {dataDetails?.deadline_date}
                                                    </span>
                                                </span>{' '}

                                                <span className='text-secondary fs-5'>
                                                    <span className='text-success'>Takliflar:</span> {dataDetails?.application_count}</span>

                                            </span>
                                        </div> : <span></span>
                                    }
                                </div>
                            </div>

                        </div>
                }


            </Modal>

            <Modal
                title="Buyurtma yaratish"
                width={550}
                centered
                open={openPosts}
                onOk={() => setOpenPosts(false)}
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

                onCancel={() => setOpenPosts(false)}>

                <DealsList setOpen={setOpenPosts} />
            </Modal>

            <ModalDelas onSuccess={postOrder}
                categoryStatus={categoryStatus}
                setValueRate={setValueRate}
                setRateDes={setRateDes}
                valueRate={valueRate}
            />

        </div >
    );
}
