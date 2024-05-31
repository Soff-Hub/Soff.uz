import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DealsSidebar from './DealsSidebar';
import DealsList from '../DealsList';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import CalculateTimeDifference from '../DateFormatter';

export default function DealCart() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false)
    const { asPath } = useRouter();


    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getOrdersDealLists(currPage);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
        }
    }


    let clearTextView,
        loadingView
    if (true) {
        clearTextView = <span className="ps-form__action position-absolute" style={{ right: '15px' }}>
            <i className='fa-solid fa-search button_search_icon text-success' ></i>
        </span>
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
    }, [currPage]);



    return (
        <div className={`container row mx-auto p-0 gy-4 d-flex align-items-start ${asPath === "/account/all-orders" ? "mt-5 " : "mt-0 "}`}>
            {
                asPath === "/account/all-orders" ?
                    <div className='col-md-3'>
                        <DealsSidebar />
                    </div> : <></>
            }

            <div className={asPath === "/account/all-orders" ? 'col-md-9 mb-4' : "col-md-12 p-0"}>
                <div className='w-full d-flex justify-content-between gap-4 mb-4 p-0'>
                    <div className={'ps-form__input d-flex align-items-center position-relative'} style={{ flex: 1 }}>
                        <input
                            className={'form-control input2 bg-white rounded-3 '}
                            type="text"
                            placeholder="Qidiruv..."
                        />
                        {clearTextView}
                        {loadingView}
                    </div>
                    <button className='col-md-3  btn btn-success rounded-3 fs-4'
                        onClick={() => setOpen(true)} >
                        Buyurtma yaratish
                    </button>
                </div>

                <div className='d-flex flex-column gap-3'>
                    {
                        data?.map(item => (
                            <div key={item?.id} className="border border-2 rounded-3 p-4 bg-white">
                                <div className="d-md-flex justify-content-between  ">
                                    <h3 className="text-success">{item?.title}</h3>
                                    <div>
                                        {' '}
                                        <span className="fw-medium">narxi:</span>{' '}
                                        <span className="text-success fs-3 fw-bold">
                                            {addPeriodToThousands(item?.price)} so'm
                                        </span>
                                    </div>
                                </div>
                                <p>
                                    {item?.description}
                                </p>
                                <div>
                                    <div className="d-md-flex justify-content-between gap-4  ">
                                        <div className="d-flex align-items-start ">
                                            <img
                                                className="d-block"
                                                width={80}
                                                src="/static/img/docCopy.jpg"
                                                alt="sca"
                                            />
                                            <div>
                                                <div className="text-start">
                                                    <span className="text-success fs-3 fw-medium">
                                                    <i class="fa-solid fa-list fs-4"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium ">
                                                      {item?.type}
                                                    </span>
                                                </div>
                                                <div className="text-start">
                                                    <span className="text-success fs-3 fw-medium">
                                                        <i class="fa-solid fa-clock text-info-emphasis fs-4"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium ">
                                                        <CalculateTimeDifference targetDate={item?.created_at} />

                                                    </span>
                                                </div>

                                                <div className="text-start">
                                                    <span className="text-success fs-3 fw-medium">
                                                        <i class="fa-solid fa-calendar-days fs-4"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium ">
                                                        {item?.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
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

        </div>
    );
}
