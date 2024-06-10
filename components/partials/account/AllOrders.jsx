import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal, Pagination, Progress, Tooltip } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import useDebounce from '~/hooks/useDebounce';
import DealsSidebar from './modules/DealsSidebar';
import DealsList from './DealsList';
import { useSelector } from 'react-redux';

export default function DealCart() {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 800);
    const [lifetime, setLifetime] = useState('');
    const [lifetime2, setLifetime2] = useState('');
    const [type, setType] = useState('');
    const [progressPrice, setProgressPrice] = useState(0);
    const [progressData, setProgressData] = useState(0);
    const [isExpanded, setIsExpanded] = useState(2);
    const [needsToggle, setNeedsToggle] = useState(false);
    const [needsId, setNeedsId] = useState(null);
    const [innerWidth, setInnerWidth] = useState(null);
    const tokens = user?.access;
    const { query } = useRouter();
    const { show } = query


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

    async function GetItemsProducts() {
        const token = user?.access
        setLoading(true)
        const ItemsData = await GetRepository.getOrdersDealLists(
            currPage,
            debouncedSearchTerm,
            lifetime,
            lifetime2,
            type,
            progressPrice[0],
            progressPrice[1],
            '',
            token
        );
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setLoading(false)
    }


    async function GetItemsProductsProgress() {
        const ItemsData = await GetRepository.getOrdersProgressBar(user?.access);
        if (ItemsData) {
            setProgressData(ItemsData);
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
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };


    useEffect(() => {
        GetItemsProducts();
    }, [currPage, debouncedSearchTerm, lifetime, lifetime2, type, progressPrice[0], progressPrice[1], tokens]);


    useEffect(() => {
        if (user?.access) {
            GetItemsProductsProgress()
        }
    }, [user?.access])


    useEffect(() => {
        setInnerWidth(window.innerWidth);
    }, [])

    useEffect(() => {
        if (show === "modal") {
            setOpen(true)
        }
    }, [])



    return (
        <div className={`container row mx-auto p-0 gy-4 d-flex align-items-start mt-5`}>
            <div className='col-md-3'>
                <DealsSidebar setLifetime={setLifetime} setLifetime2={setLifetime2} setType={setType} setProgressPrice={setProgressPrice} />
            </div>

            <div className={'col-md-9 mb-4'}>
                <div className='d-flex justify-content-between gap-3 mb-2  row px-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative p-0'} style={{ flex: 1 }}>
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
                    <button className='col-md-3  btn btn-success rounded-3 fs-4 py-3'
                        onClick={() =>
                            user?.access ?
                                setOpen(true) : Router.push("/account/register?deal=deal")} >
                        <i class="fa-solid fa-plus"></i>   Buyurtma yaratish
                    </button>
                </div>
                {user?.access && <div>
                    <Tooltip title={"urishinlar soni haqida malumot"}>
                        <span style={{ cursor: 'pointer' }} >
                            <i className="fa-solid fa-circle-question text-warning"></i>
                        </span>
                    </Tooltip>
                    <span className='mx-2'>{progressData?.full_deal_coin ? progressData?.full_deal_coin : 0} ta urishinishdan sonidan {progressData?.remain_deal_coin ? progressData?.remain_deal_coin : 0} ta qoldi</span>

                    <Progress
                        className='p-0 w-100'
                        format={() => ''}
                        percent={Math.floor((progressData?.remain_deal_coin / progressData?.full_deal_coin) * 100)} strokeColor={"#28a745"} />
                </div>}


                <div className='d-flex flex-column gap-3'>
                    {loading ?

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
                            {data?.map(item => (
                                <div key={item?.id} className="border border-2 rounded-3 p-4 bg-white">
                                    <h3 className="text-success fw-medium ">{item?.title}</h3>


                                    <p
                                        className='m-0 description_more'

                                        style={{
                                            WebkitLineClamp: item?.id === needsId ? isExpanded : "2",
                                            whiteSpace: 'pre-wrap'
                                        }}
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

                                                    <div  >
                                                        {' '}
                                                        <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                                        <span className="text-secondary fs-5 fw-medium ">
                                                            {addPeriodToThousands(item?.price)} so'm
                                                        </span>
                                                    </div>

                                                    <div >
                                                        <span className="text-success fs-5 fw-medium">
                                                            Kategoriya:
                                                        </span>{' '}
                                                        <span className="fw-medium fs-5 text-secondary ">
                                                            {item?.type?.name}
                                                        </span>
                                                    </div>


                                                    <div >
                                                        <span className="text-success fs-5 fw-medium">
                                                            Tugash muddati:
                                                        </span>{' '}
                                                        <span className="fw-medium text-secondary fs-5 ">
                                                            {item?.deadline_date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-3 
                                    d-flex justify-content-between 
                                    align-items-center'>
                                            {item?.application_count !== 0 ?
                                                <div className="text-start mb-md-0  d-md-flex gap-3 align-items-center">

                                                    <span className="fw-medium d-flex gap-3 ">

                                                        <span className='text-secondary fs-5'>
                                                            <span className='text-success '>Takliflar:</span> {item?.application_count}</span>

                                                    </span>
                                                </div> : <span></span>
                                            }


                                            <div className='d-flex justify-content-end'>

                                                {!item?.is_owner ?
                                                    (!item?.can_apply ? (
                                                        <button
                                                            onClick={() => Router.push(`/account/deal-applications`)}
                                                            className='btn btn-outline-success px-4 fs-5'
                                                        >
                                                            Ariza topshirgansiz
                                                        </button>
                                                    ) : (
                                                        progressData?.remain_deal_coin ?
                                                            <button
                                                                onClick={() => Router.push(user?.access ? `/deal/${item?.id}` : `/account/register?deal=deal`)}
                                                                className='btn btn-success px-4 fs-5'
                                                            >
                                                                Ariza topshirsh
                                                            </button> :
                                                            <button
                                                                onClick={() =>
                                                                    user?.access ?
                                                                        setOpenPayment(true) :
                                                                        Router.push(`/account/register?deal=deal`)
                                                                }
                                                                className='btn btn-success px-4 fs-5'
                                                            >
                                                                Ariza topshirsh
                                                            </button>
                                                    )) : <></>
                                                }


                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))}

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
                title="Buyurtma yaratish"
                width={550}
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

                <DealsList setOpen={setOpen} />
            </Modal>

            <Modal
                title="Buyurtma yaratish"
                width={550}
                centered
                open={openPayment}
                onOk={() => Router?.push('/account/deal-payment')}
                okText="Sotib olish"
                cancelText="Bekor qilish"
                cancelButtonProps={{
                    className: 'cancel-button',
                }}
                okButtonProps={{
                    style: {
                        backgroundColor: '#28a745'
                    },
                }}
                onCancel={() => setOpenPayment(false)}>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore praesentium vero deserunt quidem voluptate deleniti animi excepturi, nemo in consequatur sed odio ipsam repudiandae iste repellat id rerum quae modi, dolores dolor ipsum illum quasi? Consequuntur quidem saepe expedita optio molestiae est, eligendi cupiditate ipsum reprehenderit, officiis magni, sit esse.</p>
            </Modal>


        </div >
    );
}
