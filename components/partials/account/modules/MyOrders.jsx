import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DealsSidebar from './DealsSidebar';
import DealsList from '../DealsList';
import { Modal, Pagination, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from '../DateFormatter';
import useDebounce from '~/hooks/useDebounce';
import ModalDelete from '../Modal';
import PatchRepository from '~/reositoriy-admin/PatchRepository';

export default function MyOrders() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [dataDetails, setDataDtails] = useState({});
    const [currPage, setCurrPage] = useState(1);
    const [productsId, setProductsId] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [category, setCategory] = useState(null)

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
        const token = user?.access
        const ItemsData = await GetRepository.getOrdersMYDealLists(currPage, debouncedSearchTerm, productsId, category, token);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
        setDataDtails(ItemsData)
    }



    async function DeleteItemsProducts() {
        const ItemsData = await PatchRepository.getMyDealsDelete(
            productsId,
            user?.access
        );
        GetItemsProducts(currPage, debouncedSearchTerm, productsId, user?.access)
        const modal = Modal.error({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz malumotlarni o'chirdingiz`,
        });
    }


    const handlePagination = (pageNum) => {
        setCurrPage(pageNum);
    };

    useEffect(() => {
        if (user?.access) {
            GetItemsProducts();
        }
    }, [currPage, debouncedSearchTerm, open, category, user?.access]);



    return (
        <div className={`container row mx-auto p-0 gy-4 d-flex align-items-start mt-5`}>

            <div className='col-md-3'>
                <DealsSidebar />
            </div>

            <div className={"col-md-9 mb-4"}>
                <div className='d-flex justify-content-between gap-3 mb-4  row px-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative p-0'} style={{ flex: 1 }}>
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
                                <div className='d-md-flex justify-content-between gap-4 align-items-center'>
                                    <h3 className="text-success fw-medium ">{item?.title}</h3>

                                    <div className="d-flex align-items-center">
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            className=" h-25 fs-4 p-3 text-success fw-bold text-center"
                                        >
                                            <span style={{ cursor: "pointer" }}>
                                                <i
                                                    className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                                                ></i>
                                            </span>
                                            <a data-bs-target="#exampleModalToggle"
                                                data-bs-toggle="modal">
                                                <i
                                                    className="fa-solid fa-trash-can text-danger mx-2"
                                                    onClick={() =>
                                                        setProductsId(item?.id)
                                                    }
                                                ></i>
                                            </a>

                                        </div>
                                    </div>
                                </div>



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
                                    <div className='mt-3 d-md-flex justify-content-between'>
                                        <div className="text-start">
                                            <span className="text-success fs-5 fw-medium">
                                                Yaratilgan vaqti:
                                            </span>{' '}
                                            <span className="fw-medium ">
                                                <CalculateTimeDifference targetDate={item?.created_at} />

                                            </span>
                                        </div>


                                        {
                                            item?.data_status?.status === 'new' ? (
                                                <span>
                                                    <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                    Moderatsiya
                                                </span>
                                            ) : item?.data_status?.status === 'active' ? (
                                                <span>
                                                    <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                    Tasdiqlangan
                                                </span>
                                            ) : (
                                                <Tooltip title={item?.data_status?.reason}>
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
            <ModalDelete onSuccess={DeleteItemsProducts} />

        </div >
    );
}
