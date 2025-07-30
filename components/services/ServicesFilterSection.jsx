// ServicesFilterSection.jsx
import { Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React from 'react'

const ServicesFilterSection = ({ count }) => {
  const router = useRouter();
  const { query } = router;

  const updateQuery = (key, value) => {
    const newQuery = { ...query, [key]: value };

    // null, undefined yoki bo‘sh string bo‘lsa querydan olib tashlaymiz
    if (!value) {
      delete newQuery[key];
    }

    router.push({
      pathname: router.pathname,
      query: newQuery
    }, undefined, { shallow: false }); // SSR qaytadan bo‘ladi
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <p className='fs-3'>{count || 0}ta xizmatlar</p>
        </div>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <Input
            style={{ height: '32px' }}
            suffix={<SearchOutlined style={{ color: '#aaa' }} />}
            placeholder='Xizmatlarni izlash'
            defaultValue={query.search || ''}
            onPressEnter={(e) => updateQuery('search', e.target.value)}
            allowClear
          />
        </div>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <Select
            placeholder='Kategoriya'
            className='w-100'
            defaultValue={query.category}
            onChange={val => updateQuery('category_id', val)}
            allowClear
          >
            {/* Optionlarni backenddan yoki frontendda qattiq belgilab berish mumkin */}
            <Select.Option value="1">Design</Select.Option>
            <Select.Option value="2">Video</Select.Option>
          </Select>
        </div>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <Select placeholder='Budjet' className='w-100' defaultValue={query.budget} onChange={val => updateQuery('budget', val)} allowClear>
            <Select.Option value="low">Past</Select.Option>
            <Select.Option value="medium">O‘rtacha</Select.Option>
            <Select.Option value="high">Yuqori</Select.Option>
          </Select>
        </div>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <Select placeholder='Yetkazish vaqti' className='w-100' defaultValue={query.delivery_time} onChange={val => updateQuery('delivary_day', val)} allowClear>
            <Select.Option value="1">1 kun</Select.Option>
            <Select.Option value="3">3 kun</Select.Option>
            <Select.Option value="7">7 kun</Select.Option>
          </Select>
        </div>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
          <Select placeholder='Reyting' className='w-100' defaultValue={query.rating} onChange={val => updateQuery('rating', val)} allowClear>
            <Select.Option value="5">5 yulduz</Select.Option>
            <Select.Option value="4">4+ yulduz</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default ServicesFilterSection
