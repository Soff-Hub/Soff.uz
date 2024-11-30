import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLayout from '../SidebarLayout';
import { Pagination, Select, Table } from 'antd';
import { useFetchHostingsQuery } from '~/rtk-store/admin/reportsApi';
import { updateHostingPagePrams } from '~/rtk-store/admin/reportSlice';
import { addPeriodToThousands } from './ProductsLists';

/**
 * HostingList is a React component that displays a list of reports (complaints)
 * fetched from a server. It uses the Redux `useSelector` hook to access
 * authentication state and retrieves the necessary authorization token. It
 * fetches the reports data using an HTTP GET request and populates a table
 * with the report ID, contact, and message. The component also incorporates
 * a sidebar layout with links.
 */

const status = {
    by_card: 'Kartadan',
    click: 'Click',
    payme: 'Payme',
};

function HostingList() {
    const { accountLinks } = useSelector((state) => state.auth);
    const { hostingPageParams } = useSelector((state) => state.reports);
    const { data, isLoading } = useFetchHostingsQuery(hostingPageParams);
    const dispatch = useDispatch();

    const reportsColumns = [
        {
            dataIndex: 'given_storage_data',
            title: 'Olingan umumiy',
            width: 60,
            render: (given_storage_data) => (
                <span> {given_storage_data} MB</span>
            ),
        },
        {
            dataIndex: 'quantity',
            title: 'Soni',
            width: 1,
            render: (quantity) => <span> x{quantity}</span>,
        },
        {
            dataIndex: 'traffic_data',
            title: "Ta'rif",
            width: 40,
            render: (traffic_data) => <span> {traffic_data?.size} MB</span>,
        },
        {
            dataIndex: 'amount',
            title: 'Narxi',
            width: 80,
            render: (amount) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {addPeriodToThousands(Number(amount))} uzs
                </span>
            ),
        },
        {
            dataIndex: 'seller_data',
            title: 'Oluvchi',
            width: 100,
            render: (seller_data) => <span> {seller_data?.fullname}</span>,
        },
        {
            dataIndex: 'provider',
            title: 'Sana',
            width: 20,
            render: (provider) => <span> {status[provider]}</span>,
        },
    ];

    const handlePagination = (page, page_size) => {
        if (page_size !== Number(pageParams?.page_size)) {
            dispatch(updateHostingPagePrams({ page_size, page: 1 }));
        } else dispatch(updateHostingPagePrams({ page }));
    };

    return (
        <section className="ps-my-account ps-page--account pb-5 py-2">
            <div className="container">
                <div className="row" style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div
                            className="ps-page__content bg-white p-2"
                            style={{ borderRadius: '6px' }}>
                            <p className="fs-3 text-black">
                                Sotilgan hostinglar
                            </p>
                            <Table
                                loading={isLoading}
                                columns={reportsColumns}
                                dataSource={data?.results}
                                pagination={false}
                                scroll={{ x: 900 }}
                            />
                            {hostingPageParams?.page ? (
                                <div
                                    className="bg-white py-3 mb-4"
                                    style={{ borderRadius: '8px' }}>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        <Pagination
                                            total={data?.count}
                                            current={hostingPageParams?.page}
                                            pageSize={
                                                hostingPageParams?.page_size
                                            }
                                            showSizeChanger={false}
                                            onChange={handlePagination}
                                        />
                                        <Select
                                            value={hostingPageParams?.page_size}
                                            style={{
                                                width: 60,
                                            }}
                                            onChange={(v) =>
                                                handlePagination(1, v)
                                            }
                                            options={[
                                                {
                                                    value: 10,
                                                    label: '10',
                                                },
                                                {
                                                    value: 20,
                                                    label: '20',
                                                },
                                                {
                                                    value: 50,
                                                    label: '50',
                                                },
                                                {
                                                    value: 100,
                                                    label: '100',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </SidebarLayout>
                </div>
            </div>
        </section>
    );
}
export default HostingList;
