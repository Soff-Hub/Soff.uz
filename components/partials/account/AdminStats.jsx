import React, { useEffect, useState } from 'react'
import UserDashboardsChart from './UserDashboardsChart'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import UserDashboardProductChart from './UserDashboardProductChart';


export default function AdminStats({ year, month }) {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])

    const getData = async () => {
        setLoading(true)
        setUsers([])
        const resp = await Axios.get(orginalUrl + `seller/admin/users-chart/?year=${year}&month=${month || ''}`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setUsers(resp.data.map(el => ({ ...el, month: el?.day || el?.month })));
        setLoading(false)
    }

    const getProducts = async () => {
        setProducts([])
        const resp = await Axios.get(orginalUrl + `seller/admin/documents-chart/?year=${year}&month=${month || ''}`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setProducts(resp.data.map(el => ({ ...el, month: el?.day || el?.month })));
    }


    useEffect(() => {
        Promise.all([
            getData(),
            getProducts()
        ])
    }, [year, month])

    return (
        <div className='d-flex flex-column my-3 gap-2 w-100'>
            <div className='d-flex bg-white rounded w-100'>
                {
                    loading ? <Skeleton.Node
                        style={{ height: '260px' }}
                        className='my-2 w-100 px-3'
                        active={true}>
                        <DotChartOutlined
                            style={{
                                fontSize: 90,
                                color: '#bfbfbf',
                            }}
                        />
                    </Skeleton.Node> : <UserDashboardProductChart data={products} />
                }
            </div>
            <div className='d-flex bg-white rounded w-100'>
                {
                    loading ? <Skeleton.Node
                        style={{ height: '260px' }}
                        className='my-2 w-100 px-3'
                        active={true}>
                        <DotChartOutlined
                            style={{
                                fontSize: 90,
                                color: '#bfbfbf',
                            }}
                        />
                    </Skeleton.Node> : <UserDashboardsChart data={users} />
                }
            </div>
        </div>
    )
}
