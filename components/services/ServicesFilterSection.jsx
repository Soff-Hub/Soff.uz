import { Select } from 'antd'
import React from 'react'

const ServicesFilterSection = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <p>2335ta xizmatlar</p>
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select className='w-100' />
                </div>
            </div>
        </div>

    )
}

export default ServicesFilterSection