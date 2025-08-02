import React from 'react'
import MyOrderTabs from './myorder-details/MyOrderTabs'

const MyOrdersMain = () => {
  return (
    <div style={{height: "100vh", marginTop: "40px", maxWidth: "100%"}}>
        <h1 style={{fontSize: "30px"}}>Mening buyurtmalarim</h1>
        <MyOrderTabs/>
    </div>
  )
}

export default MyOrdersMain