import React from 'react'
import UserDashboardsChart from './UserDashboardsChart'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import UserDashboardProductChart from './UserDashboardProductChart';
import { useFetchDashboardUploadsQuery, useFetchDashboardUsersQuery } from '~/rtk-store/dashboard/api';


export default function AdminStats() {
    const { graphParams } = useSelector(state => state.dashboard)
    const { year, month } = graphParams

    const { data, isFetching: productFetching } = useFetchDashboardUploadsQuery(`year=${year}&month=${month}`, {
        keepUnusedDataFor: 600
    })
    const { data: usersData, isFetching: usersFetching } = useFetchDashboardUsersQuery(`year=${year}&month=${month}`, {
        keepUnusedDataFor: 600
    })

    const products = data ? data.map(el => ({ ...el, month: el?.day || el?.month })) : []
    const users = usersData ? usersData.map(el => ({ ...el, month: el?.day || el?.month })) : []

    return (
        <div className='d-flex flex-column my-3 gap-2 w-100'>
            <div className='d-flex bg-white rounded w-100'>
                {
                    productFetching ? <Skeleton.Node
                        style={{ height: '260px' }}
                        className='my-2 w-100 px-3'
                        active={true}>
                        <DotChartOutlined
                            style={{
                                fontSize: 90,
                                color: '#bfbfbf',
                            }}
                        />
                    </Skeleton.Node> : data ? <UserDashboardProductChart data={products} /> : ''
                }
            </div>
            <div className='d-flex bg-white rounded w-100'>
                {
                    usersFetching ? <Skeleton.Node
                        style={{ height: '260px' }}
                        className='my-2 w-100 px-3'
                        active={true}>
                        <DotChartOutlined
                            style={{
                                fontSize: 90,
                                color: '#bfbfbf',
                            }}
                        />
                    </Skeleton.Node> : usersData ? <UserDashboardsChart data={users} /> : ''
                }
            </div>
        </div>
    )
}
