import { Button, Pagination, Table } from 'antd'
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFetchDashboardCommentsQuery } from '~/rtk-store/dashboard/api';
import { updateCommentsPage } from '~/rtk-store/dashboard/slice';
import useResponsive from '~/utilities/useResponsive';
import CalculateTimeDifference from '../account/DateFormatter';
import DashboardReplyComment from './DashboardReplyComment';

export default function DashboardCommentsTable() {
    const [replyId, setReplyId] = useState(null)
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
            title: 'Mahsulot',
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
                    {created_at}
                </span>
            ),
        },
        {
            title: 'Sanasi',
            dataIndex: 'created_at',
            key: 'address',
            render: (created_at) => (
                <div style={{minWidth:"200px"}}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </div>
            ),
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'age',
            render: (id, src) => (
                <Button
                    data-bs-target="#replyToComment" data-bs-toggle="modal"
                    onClick={() => setReplyId(src)} size='small'>
                    Javob yozish
                </Button>
            ),
        }
    ];

    const { commentsPage } = useSelector(state => state.dashboard)
    const { isMobile } = useResponsive()
    const dispatch = useDispatch()

    const { data } = useFetchDashboardCommentsQuery(commentsPage, {
        refetchOnMountOrArgChange: true
    })

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
            {
                isMobile ? (
                    <div className='dashboard-orders d-flex flex-column gap-2 px-2'>
                        {
                            comments?.map((el, i) => (
                                <div className='order-card py-2 px-3 pt-3 bg-white' key={i} style={{ borderRadius: '8px' }}>
                                    <div className="order-card-top d-flex align-items-center justify-content-between mb-2">
                                        <div className="d-flex flex-column">
                                            <span className="truncate whitespace-nowrap" style={{ color: '#00A44F' }}>
                                                {' '}
                                                <i class="fa-solid fa-user me-2"></i>
                                                {el?.user_data.first_name} {el?.user_data.last_name}
                                            </span>
                                            <span className="truncate whitespace-nowrap">
                                                {' '}
                                                {el?.user_data.email_or_phone}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '10px' }}>
                                            <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                                            <CalculateTimeDifference targetDate={el?.created_at} />
                                        </span>
                                    </div>
                                    <div className="order-card-top d-flex align-items-start flex-column gap-2">
                                        <i>
                                            {el?.text}
                                        </i>
                                        <Link href={`https://soff.uz/product/${el?.document_data?.slug}`}>
                                            <a target='blank'>
                                                <p className='m-0 mb-1' style={{ fontSize: '12px' }}>
                                                    {el?.document_data?.title}
                                                </p>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <Table
                        dataSource={comments}
                        columns={commentsColumn}
                        pagination={false}
                        loading={orderLoading}
                        scroll={{ x: 1600 }}
                    />
                )
            }

            <Pagination
                className='mt-4'
                pageSize={50}
                onChange={handlePaginate}
                showSizeChanger={false}
                total={data?.count}
                current={commentsPage}
            />

            <DashboardReplyComment item={replyId} setReplyId={setReplyId} />
        </div>
    )
}
