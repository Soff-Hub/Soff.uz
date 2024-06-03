import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal, Pagination, Progress } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import useDebounce from '~/hooks/useDebounce';
import DealsSidebar from './modules/DealsSidebar';
import CalculateTimeDifference from './DateFormatter';
import DealsList from './DealsList';

export default function DealCart() {
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [open, setOpen] = useState(false)
    const { asPath } = useRouter();
    const [keyword, setKeyword] = useState('');
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [lifetime, setLifetime] = useState('');
    const [lifetime2, setLifetime2] = useState('');
    const [type, setType] = useState('');
    const [progressPrice, setProgressPrice] = useState(0);



    async function GetItemsProducts() {
        const ItemsData = await GetRepository.getOrdersDealLists(currPage, debouncedSearchTerm, lifetime, lifetime2, type);
        console.log(ItemsData);
        if (ItemsData?.results) {
            setPageCount(ItemsData.count);
            setData(ItemsData.results);
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
    }, [currPage, debouncedSearchTerm, lifetime, lifetime2, type]);

    // console.log("first", progressPrice[0]);
    // console.log("second", progressPrice[1]);


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
                        />
                        <span className="ps-form__action position-absolute" style={{ right: '15px' }}>
                            <i className='fa-solid fa-search button_search_icon text-success' ></i>
                        </span>
                    </div>
                    <button className='col-md-3  btn btn-success rounded-3 fs-4'
                        onClick={() => setOpen(true)} >
                        Buyurtma yaratish
                    </button>
                </div>
                <div>
                    <Progress percent={99.9}  strokeColor={"#28a745"} />
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
                                                        {item?.type?.name}
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
                                                <span>Takliflar: {item?.application_count}</span>

                                            </span>
                                        </div>


                                        <div className='d-flex justify-content-end'>
                                            <button
                                                onClick={() => Router.push(`/deal/${item?.id}`)}
                                                className='btn btn-success px-4 fs-5'>Ariza topshirsh</button>
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
