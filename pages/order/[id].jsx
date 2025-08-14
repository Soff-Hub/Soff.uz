import React from 'react'
import PageLayout from '~/components/layouts/PageLayout'
import OrderDetailMain from '~/components/freeleance/myorders/order-datil/OrderDetailMain'

const OrderDatail = () => {
  return (
    <PageLayout>
        <div className='container'>
            <OrderDetailMain/>
        </div>
    </PageLayout>
  )
}

export default OrderDatail