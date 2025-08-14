import React from 'react'
import { DownOutlined } from '@ant-design/icons';

const ServiceSellerProfile = ({user}) => {
  return (
    <div className='service_seller_profile'>
        <div className='d-flex bg-white p-5 rounded-4 gap-3 align-items-center'>
            <img style={{width: '131px', height: '131px'}} src="/static/img/services_images/garant.png" alt="kafolat" />
            <div >
                <h3>Pulni qaytarish kafolat</h3>
                <p className='fs-4'>Agar buyurtmangiz siz kutgandek bo‘lmasa, pulingizni to‘liq qaytaramiz.</p>
                <p style={{cursor: 'pointer', color: '#00A44F'}} className='fs-4'>Bu qanday ishlaydi? <DownOutlined /></p>
            </div>
        </div>
        <div className='d-flex bg-white p-5 rounded-4 mt-5 gap-3  align-items-center'>
            <img style={{width: '69px', height: '69px', borderRadius: '100%'}} src={user?.photo_url || "/static/img/ozodbek.png"}/>
            <div>
              <h2>{user?.full_name}</h2>
              {/* <p className='status d-flex align-items-center gap-1'><div></div> Onlayn</p> */}
            </div>
        </div>
    </div>
  )
}

export default ServiceSellerProfile