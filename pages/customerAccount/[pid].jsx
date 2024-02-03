import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { Table } from 'antd';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SellerAccount = ({ seller }) => {
    const [data, setData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const router = useRouter();
    const { pid } = router.query;
    const { user } = useSelector((state) => state.auth);

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const getDashboardData = async (id, token) => {
        if (token) {
            const ItemsData = await GetRepository.getSellerDashboard(id, token);
            setDashboardData(ItemsData);
        }
    };

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: data ? data?.full_name : 'Loading...',
        },
    ];

    async function GetCustomerList(val, token) {
        if (token) {
            const ItemsData = await GetRepository.getCustomerLists(val, token);
            setData(ItemsData?.user);
            setTableData(ItemsData?.result);
        }
    }

    useEffect(() => {
        if (user?.access && pid) {
            GetCustomerList(pid, user?.access);
        }
    }, [pid]);

    const columns = [
        {
            title: 'Mahsulot',
            dataIndex: 'document',
            key: 'document',
            width: 350,
            render: (document) => (
                <Link href={`/product/${document?.slug}`}>
                    <a className="truncate whitespace-nowrap">
                        {' '}
                        {document?.title}
                    </a>
                </Link>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span key={price}>{price + " so'm"}</span>,
        },
        {
            title: 'Sotib olingan sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Sotuvchi',
            dataIndex: 'seller',
            key: 'seller',
            render: (seller) => (
                <div className='d-flex flex-column' >
                    <span>{seller?.full_name}</span>
                    <span>{seller?.phone_or_email}</span>
                </div>
            ),
        },
    ];

    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`Soff | ${data?.full_name} } `}
                description={`Saytimizga o'z mahsulotlarini sotuvga qo'yayotgan ${data?.full_name} ning barcha mahsulotlarini ko'rishingiz mumkin`}
            />
            <div className="ps-product-list color-seller-background">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 user-inviter-customer">
                            <div className="d-flex gap-3 align-items-start">
                              
                                    <i className=" fa-3x text-info fa-solid fa-circle-user mb-3"></i>
                                <div>
                                    <h4 className="m-0">{data?.full_name}</h4>
                                    <span className="mb-4 d-block">
                                        {' '}
                                        {data?.email_or_phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            data?.all_benefit_site ? 
                            <h4 style={{backgroundColor:'#fff' , margin:'0'}} className='pb-5 ps-4' > - Jami {data?.all_benefit_site} so'm</h4> : ''
                        }
                           
                    </div>

                    <div className="row pb-5 ">
                        <div
                            className="col-lg-12 "
                            style={{ backgroundColor: '#fff' }}>
                            <Table
                                dataSource={tableData}
                                scroll={{ x: 800 }}
                                columns={columns}
                                pagination={false}
                            />
                            {/* <Pagination
                                            total={pageCount}
                                            defaultCurrent={currPage}
                                            className="my-3"
                                            onChange={(val) =>
                                                GetSellerList(
                                                    val
                                                )
                                            }
                                        /> */}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default SellerAccount;
