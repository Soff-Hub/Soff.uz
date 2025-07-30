import React from 'react'
import ServicePackages from './servicePackages'

const ServiceDescription = ({description, openModal, packages}) => {
  return (
    <div className='p-5 bg-white rounded-4'>
        <h2 className='detail_h2'>Paketni tanlang</h2>
        <ServicePackages packages={packages} openModal={openModal}/>
        <h2 className='detail_h2 mt-5 mb-4'>Xizmat tavsifi</h2>
        <p>{description}</p>
    </div>
  )
}

export default ServiceDescription