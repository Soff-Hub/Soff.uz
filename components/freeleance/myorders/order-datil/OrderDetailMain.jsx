import React from 'react'
import OrderMain from './ui/OrderMain'
import OrderStatus from './ui/OrderStatus'
import useGetOrderById from './api/useGetOrderById'
import { useRouter } from 'next/router'

const OrderDetailMain = () => {
    const { query } = useRouter()
    const { data: order } = useGetOrderById(query?.id)

    return (
        <div className='row'>
            <OrderMain order={order} />
            <OrderStatus order={order} />
        </div>
    )
}

export default OrderDetailMain