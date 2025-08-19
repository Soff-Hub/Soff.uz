import React from 'react'
import PageLayout from '~/components/layouts/PageLayout'
import MyOrdersMain from '~/components/freeleance/myorders/MyOrdersMain'

const MyOrders = () => {
  return (
    <PageLayout>
        <div className='container'>
            <MyOrdersMain/>
        </div>
    </PageLayout>
  )
}

export default MyOrders