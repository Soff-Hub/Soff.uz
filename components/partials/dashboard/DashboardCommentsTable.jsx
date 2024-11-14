import { Pagination, Table } from 'antd'
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchDashboardCommentsQuery } from '~/rtk-store/dashboard/api';
import { updateCommentsPage } from '~/rtk-store/dashboard/slice';

export default function DashboardCommentsTable() {
    const commentsColumn = [
        {
            title: 'Buyurtmachi',
            dataIndex: 'user_data',
            key: 'age',
            render: (user_data) => (
                <div className="d-flex flex-column">
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {user_data.first_name} {user_data.last_name}
                    </span>
                    <span className="truncate whitespace-nowrap">
                        {' '}
                        {user_data.email_or_phone}
                    </span>
                </div>
            ),
        },
        {
            title: 'Buyurtma nomi',
            dataIndex: 'document_data',
            key: 'age',
            // width: 300,
            render: (document_data) => (
                <Link href={`https://soff.uz/product/${document_data.slug}`}>
                    <a target='blank'>{document_data.title}</a>
                </Link>
            ),
        },
        {
            title: 'Izoh',
            dataIndex: 'text',
            key: 'address',
            render: (created_at) => (
                <span>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    {created_at}
                </span>
            ),
        },
    ];
    const { commentsPage } = useSelector(state => state.dashboard)
    const dispatch = useDispatch()

    const { data } = useFetchDashboardCommentsQuery(commentsPage)

    const comments = data ? data?.results : []
    const orderLoading = false

    const handlePaginate = (p) => {
        setTimeout(() => {
            scrollTo(0, 1000)
        }, 400);
        dispatch(updateCommentsPage(p))
    }

    return (
        <div>
            <Table
                dataSource={comments}
                columns={commentsColumn}
                pagination={false}
                loading={orderLoading}
                scroll={{ x: 1000 }}
            />

            <Pagination
                className='mt-4'
                pageSize={50}
                onChange={handlePaginate}
                showSizeChanger={false}
                total={data?.count}
                current={commentsPage}
            />
        </div>
    )
}
