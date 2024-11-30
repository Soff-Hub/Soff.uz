import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLayout from '../SidebarLayout';
import { Pagination, Select, Table } from 'antd';
import { useFetchReportsQuery } from '~/rtk-store/admin/reportsApi';
import { updateReportPagePrams } from '~/rtk-store/admin/reportSlice';
import { updateProductParams } from '~/rtk-store/products/slice';
import Router from 'next/router';

/**
 * ReportsList is a React component that displays a list of reports (complaints)
 * fetched from a server. It uses the Redux `useSelector` hook to access
 * authentication state and retrieves the necessary authorization token. It
 * fetches the reports data using an HTTP GET request and populates a table
 * with the report ID, contact, and message. The component also incorporates
 * a sidebar layout with links.
 */
function ReportsList() {
    const { accountLinks } = useSelector((state) => state.auth);
    const { pageParams } = useSelector((state) => state.reports);
    const { data, isLoading } = useFetchReportsQuery(pageParams);
    const dispatch = useDispatch();

    const handleClickProduct = (title) => {
        dispatch(updateProductParams({ search: title }));
        Router.push(`/account/admin-products`);
    };

    const reportsColumns = [
        {
            dataIndex: 'contact',
            title: 'Kontakt',
            width: 100,
        },
        {
            dataIndex: 'message',
            title: 'Xabar',
            width: 160,
        },
        {
            dataIndex: 'document_data',
            title: 'Mahsulot',
            width: 160,
            render: (document_data) => (
                <span
                    style={{ cursor: 'pointer' }}
                    className='report__link'
                    onClick={() => handleClickProduct(document_data?.title)}>
                    {' '}
                    <i className="fa-solid fa-layer-group"></i>{' '}
                    {document_data?.title}
                </span>
            ),
        },
    ];

    const handlePagination = (page, page_size) => {
        if (page_size !== Number(pageParams?.page_size)) {
            dispatch(updateReportPagePrams({ page_size, page: 1 }));
        } else dispatch(updateReportPagePrams({ page }));
    };

    return (
        <section className="ps-my-account ps-page--account pb-5 py-2">
            <div className="container">
                <div className="row" style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="ps-page__content bg-white p-2" style={{ borderRadius: '6px' }}>
                            <p className="fs-3 text-black">Kelib tushgan shikoyatlar</p>
                            <Table
                                loading={isLoading}
                                columns={reportsColumns}
                                dataSource={data?.results}
                                pagination={false}
                                scroll={{ x: 1024 }}
                            />
                            {pageParams?.page ? (
                                <div
                                    className="bg-white py-3 mb-4"
                                    style={{ borderRadius: '8px' }}>
                                    <div className="d-flex flex-wrap justify-content-center">
                                        <Pagination
                                            total={data?.count}
                                            current={pageParams?.page}
                                            pageSize={pageParams?.page_size}
                                            showSizeChanger={false}
                                            onChange={handlePagination}
                                        />
                                        <Select
                                            value={pageParams?.page_size}
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
export default ReportsList;
