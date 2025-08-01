import { Button, Typography } from 'antd'
import React from 'react'

const OrderMain = () => {
    return (
        <div className='col-12 col-md-9 order_detail_main'>
            <div className='order_pay_card'>
                <div>
                    <h3>To'lov kutilmoqda</h3>
                    <p>Buyurtma yaratildi, lekin hozirda sotuvchidan yashirilgan. Buyurtmani moliyalashtiring va sotuvchi ishga kirishishi uchun buyurtma talablarini yuboring</p>
                </div>
                <Button
                    type="primary"
                    
                    style={{ backgroundColor: '#00a44f', borderColor: '#00a44f', padding: "16px 28px" }}
                >
                    To'lash
                </Button>
            </div>
        </div>
    )
}

export default OrderMain