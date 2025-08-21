import React from 'react'
import OrderMain from './ui/OrderMain'
import OrderStatus from './ui/OrderStatus'
import useGetOrderById from './api/useGetOrderById'
import { useRouter } from 'next/router'
import CommentSection from '../../services/service-deatail/ui/CommentSection'

const OrderDetailMain = () => {
    const { query } = useRouter()
    const { data: order } = useGetOrderById(query?.id)

    return (
        <div className='row'>
            <OrderMain order={order} />
            <OrderStatus order={order} />
            {order?.feedback &&
                <CommentSection id={query?.id} type={"order_id"} />
            }
        </div>
    )
}

export default OrderDetailMain