import { Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import React from 'react'

const ServicesFilterSection = ({count}) => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <p className='fs-3'>{count || 0}ta xizmatlar</p>
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Input style={{height: '32px'}} suffix={<SearchOutlined style={{ color: '#aaa' }} />} placeholder='Xizmatlarni izlash' className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select placeholder='Kategoriya' className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select placeholder='Budjet' className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select placeholder='Yetkazib berish vaqti' className='w-100' />
                </div>
                <div className='col-6 col-md-4 col-lg-2 mb-3'>
                    <Select placeholder='Reytingi yuqori' className='w-100' />
                </div>
            </div>
        </div>

    )
}

export default ServicesFilterSection