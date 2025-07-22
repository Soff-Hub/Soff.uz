import React from 'react'
import { DownOutlined } from '@ant-design/icons';

const ServiceSellerProfile = () => {
  return (
    <div>
        <div className='d-flex bg-white p-5 rounded-4 gap-3 align-items-center'>
            <img style={{width: '131px', height: '131px'}} src="/static/img/services_images/garant.png" alt="kafolat" />
            <div >
                <h3>Pulni qaytarish kafolat</h3>
                <p className='fs-4'>Agar buyurtmangiz siz kutgandek bo‘lmasa, pulingizni to‘liq qaytaramiz.</p>
                <p style={{cursor: 'pointer', color: '#00A44F'}} className='fs-4'>Bu qanday ishlaydi? <DownOutlined /></p>
            </div>
        </div>
        <div>
            <img src=""/>
        </div>
    </div>
  )
}

export default ServiceSellerProfile