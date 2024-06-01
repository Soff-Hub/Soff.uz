import { Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import DealsSidebar from './DealsSidebar';
import DealsList from '../DealsList';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import CalculateTimeDifference from '../DateFormatter';
import useDebounce from '~/hooks/useDebounce';
import { Tooltip } from 'chart.js';


export default function MyDealCart() {
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([]);
    const [dataDetials, setDataDetials] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsID, setProductsId] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [category, setCategory] = useState('')

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = (productsId) => {
        if (productsId) {
            setProductsId(productsId)
            setIsModalOpen(true);
        }
    };


    async function GetItemsProducts() {
        setloading(true)
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersApplicationsLists(currPage, debouncedSearchTerm, productsID, category, token);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setDataDetials(ItemsData)
        setloading(false)
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
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, debouncedSearchTerm, productsID, category, user?.access]);


    return (
        <div className='container mx-auto row mt-5 mb-4 p-0 gy-4 d-flex align-items-start'>
            <div className='col-md-3'>
                <DealsSidebar />
            </div>
            <div className='col-md-9'>

                <div className='d-flex justify-content-between gap-3 mb-4  row px-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative col-md-6 p-0'} style={{ flex: 1 }}>
                        <input
                            className={"form-control input2 bg-white rounded-3 "}
                            type="text"
                            placeholder="Qidiruv..."
                            onChange={(e) => (setKeyword(e.target.value))}
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
                            value="active">
                            Tasdiqlangan
                        </option>
                        <option
                            className="fs-3"
                            value="cancelled">
                            Bekor
                            qilingan
                        </option>
                    </select>

                    <button className='col-md-3  btn btn-success rounded-3 fs-4'
                        onClick={() => setOpen(true)} >
                        Buyurtma yaratish
                    </button>
                </div>

                <div className='d-flex flex-column gap-3'>
                    {
                        data?.map(item => (
                            <div key={item?.id} className="border border-2 rounded-3 p-4 bg-white">
                                <h3 className="text-success fw-medium ">{item?.title}</h3>


                                <p
                                    style={{ width: "100%" }}
                                >
                                    {item?.description}
                                </p>
                                <div>
                                    <div className="d-md-flex justify-content-between gap-4  ">
                                        <div className="d-flex align-items-center ">
                                            <img
                                                className="d-block"
                                                width={80}
                                                src="/static/img/docCopy.jpg"
                                                alt="sca"
                                            />
                                            <div>

                                                <div className="text-start" >
                                                    {' '}
                                                    <span className="fw-medium text-success fs-5 ">Narxi:</span>{' '}
                                                    <span className="text-success fs-4 fw-medium ">
                                                        {addPeriodToThousands(item?.price)} so'm
                                                    </span>
                                                </div>

                                                <div className="text-start">
                                                    <span className="text-success fs-5 fw-medium">
                                                        Kategriyasi:
                                                    </span>{' '}
                                                    <span className="fw-medium ">
                                                        {item?.type}
                                                    </span>
                                                </div>


                                                <div className="text-start">
                                                    <span className="text-success fs-5 fw-medium">
                                                        Muddati:
                                                    </span>{' '}
                                                    <span className="fw-medium ">
                                                        {item?.deadline_date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3 
                                    d-md-flex justify-content-between 
                                    align-items-center'>
                                        <div className="text-start mb-md-0 mb-3 d-md-flex gap-3 align-items-center">
                                            <span className="text-success fs-5 fw-medium ">
                                                Yaratilgan vaqti:
                                            </span>{' '}
                                            <span className="fw-medium d-flex gap-3 ">
                                                <CalculateTimeDifference targetDate={item?.created_at} />
                                                <span>Takliflar: {item?.application_count ? item?.application_count : 0}</span>

                                            </span>
                                        </div>


                                        <div className='d-flex justify-content-end'>
                                            <button
                                                onClick={() => showModal(item?.id)}
                                                className='btn btn-outline-success px-4 fs-5'>Arizani ko'rish</button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div className='d-flex justify-content-center my-4 '>
                    <Pagination
                        className="mt-3"
                        total={pageCount}
                        defaultCurrent={currPage}
                        onChange={handlePagination}
                    />
                </div>

            </div >
            <Modal
                title="Yuborilgan Ariza"
                width={800}
                centered
                open={isModalOpen}
                onOk={handleOk}
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

                onCancel={handleCancel}>
                <div className="border-top rounded-3 pt-3 bg-white">
                    <h3 className="text-secondary fs-3 fw-medium mb-2 ">Taklif summasi:   <span className='text-success fw-medium'>{addPeriodToThousands(dataDetials?.price)} so'm</span></h3>
                    <div className="mb-2 d-md-flex gap-3 align-items-center">
                        <span className="fs-3 fw-medium  text-secondary">
                            Tugatish muddati:
                        </span>{' '}
                        <span className="fw-medium d-flex gap-3 text-success ">
                            {dataDetials?.deadline_date}
                        </span>
                    </div>
                    <span className="fs-3 fw-medium  text-secondary">
                        Ariza tavsifi
                    </span>{' '}
                    <p
                        style={{ width: "100%" }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dolor nam, beatae ut saepe facere corrupti eum animi, eligendi, deserunt odio? Quis quibusdam animi porro pariatur necessitatibus eligendi nihil, quaerat dolore atque tenetur cumque dolorem officiis voluptatibus sequi. Saepe facere, laudantium optio quidem et modi similique! Autem quisquam sit nostrum. Tenetur illum aspernatur porro laborum quisquam, corrupti fugit numquam dolores voluptate accusantium ipsum quas hic nobis necessitatibus molestiae, voluptatem deserunt earum ipsa veniam suscipit inventore sunt fugiat eum! Provident labore alias explicabo et ducimus sit est ipsa reiciendis, enim magnam? Eaque, minima aspernatur? Voluptatibus vel deserunt repellat facilis laudantium eius!
                    </p>

                    <div className='d-flex justify-content-between align-items-center '>
                        <strong className='d-flex gap-2 align-items-center'>
                            <i className='fa-solid fa-eye'></i>
                            Ko'rildi
                        </strong>
                        {
                            dataDetials?.status === 'new' ? (
                                <span>
                                    <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                    Moderatsiya
                                </span>
                            ) : dataDetials?.status === 'active' ? (
                                <span>
                                    <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                    Tasdiqlangan
                                </span>
                            ) : (
                                <span style={{ cursor: 'pointer' }}>
                                    <i className="fa-solid fa-circle-question text-danger"></i>{' '}
                                    Bekor qilingan{' '}
                                </span>
                            )
                        }
                    </div>
                </div>
            </Modal>

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
        </div >
    );
}
