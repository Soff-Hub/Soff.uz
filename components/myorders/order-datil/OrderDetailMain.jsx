import React from 'react'
import OrderMain from './order-cols/OrderMain'
import OrderStatus from './order-cols/OrderStatus'

const OrderDetailMain = () => {
  return (
    <div className='row'>
        <OrderMain/>
        <OrderStatus/>
    </div>
  )
}

export default OrderDetailMain