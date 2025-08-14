import React from 'react'
import OrderMain from './ui/OrderMain'
import OrderStatus from './ui/OrderStatus'

const OrderDetailMain = () => {
  return (
    <div className='row'>
        <OrderMain/>
        <OrderStatus/>
    </div>
  )
}

export default OrderDetailMain