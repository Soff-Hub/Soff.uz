import React, { useEffect, useState } from 'react'
import { Button, Input, Radio, Select } from 'antd'
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetProductParams, setOpenFilter, updateProductParams } from '~/rtk-store/products/slice';
import GetRepository from '~/reositoriy-admin/GetRepository';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';


export default function AdminProductsFilter() {
  const { productParams, openFilter } = useSelector((state) => state.products);
  const dispatch = useDispatch()
  let timeoutId;
  const [categories, setCategories] = useState([])

  const setOpen = (v) => {
    dispatch(setOpenFilter(v))
  }

  const debounceFunction = (search, clbckSearch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      clbckSearch?.(search)
    }, 800);
  }

  const handleSearch = (v) => handleFilter('search', v)

  const handleFilter = (key, value) => {
    dispatch(updateProductParams({ [key]: value }))
  }

  const clearFilter = () => {
    dispatch(resetProductParams())
  }

  const searchCategory = async (value) => {
    const ItemsData = await GetRepository.getAllCategoryListsGlobal(value);
    setCategories([{ label: "Barcha kategoriyalar", value: '' }, ...ItemsData.map(el => ({ label: el.name, value: el.id }))])
  }

  const handleDateChange = (dates) => {
    if (dates?.[0]) {

      let date_range_after = dates[0].format('YYYY-MM-DD')
      let date_range_before = dates[1].format('YYYY-MM-DD')

      dispatch(updateProductParams({
        date_range_after,
        date_range_before
      }))
    } else {
      dispatch(updateProductParams({
        date_range_after: '',
        date_range_before: ''
      }))
    }
  }

  useEffect(() => {
    searchCategory('')
  }, [])

  return (
    <div>
      <form className='d-flex gap-2' onSubmit={e => e.preventDefault()}>
        <Input placeholder='Qidirish...' onChange={(e) => debounceFunction(e.target.value, handleSearch)} />
        <Button color='primary' type={openFilter ? 'primary' : 'default'} className='px-3' onClick={() => setOpen(!openFilter)}>
          <i class="fa-solid fa-sliders"></i>
          Filter
        </Button>
      </form>

      <div className={`row m-0 p-0 w-100 ${openFilter ? 'open-filter mt-4' : 'close-filter'}`}>
        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <Radio.Group
            value={productParams?.sort}
            color="success"
            className='w-100'
            onChange={e => handleFilter('sort', e.target.value)}
          >
            <Radio.Button className='w-50 text-center' value="">Barchasi</Radio.Button>
            <Radio.Button className='w-50 text-center px-1' value="view_count">Eng ko'p  ko'rilgan</Radio.Button>
          </Radio.Group>
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <Select
            placeholder="Barcha kategoriyalar"
            optionFilterProp="label"
            showSearch
            className='w-100'
            value={productParams?.category || ''}
            onSearch={(e) => debounceFunction(e, (v) => searchCategory(v))}
            onChange={(e) => handleFilter('category', e)}
            options={categories}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <Select
            value={productParams?.status}
            className='w-100'
            onChange={e => handleFilter('status', e)}
          >
            <Option key={''}>
              <i className="fa-solid fa-list mr-2"></i>
              Barcha holatlar
            </Option>
            <Option key={"moderation"}>
              <i className='text-primary-emphasis fa-solid fa-circle-info mr-2'></i>
              Moderatsiya
            </Option>
            <Option key={"cancelled"}>
              <i className='mr-2 fa-solid fa-circle-question text-danger'></i>
              Bekor qilingan
            </Option>
            <Option key={"approved"}>
              <i className='fa-solid text-success fa-circle-check mr-2'></i>
              Tasdiqlangan
            </Option>
            <Option key={"deleted"}>
              <i className='fa-solid fa-inbox text-danger mr-2'></i>
              Arxivlangan
            </Option>
          </Select>
        </div>


        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <RangePicker
            onChange={handleDateChange}
            value={productParams?.date_range_after && productParams?.date_range_before ? [dayjs(productParams?.date_range_after, 'YYYY-MM-DD'), dayjs('2024-11-25', productParams?.date_range_before)] : []}
            placeholder={['Boshlanish sanasi', 'Tugash sanasi']}
            className='w-100'
          />
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <Select
            className='w-100'
            value={productParams?.document__content_type}
            onChange={e => handleFilter('document__content_type', e)}
          >
            <Option key={''}>
              <i className="fa-solid fa-list mr-2"></i>
              Barcha turlar
            </Option>
            <Option key={"file"}>
              <i className='text-success fa-solid fa-file mr-2 '></i>
              Fayl
            </Option>
            <Option key={"audio"}>
              <i className='mr-2 fa-solid fa-music text-success'></i>
              Audio
            </Option>
            <Option key={"template"}>
              <i className='fa-solid text-success fa-file-lines mr-2'></i>
              Shablon
            </Option>
            <Option key={"video"}>
              <i className='fa-solid text-success fa-video mr-2'></i>
              Video
            </Option>
          </Select>
        </div>

        <div className="col-12 col-md-6 col-lg-4 p-1 mb-2">
          <div className='d-flex align-items-center gap-3'>
            <Input
              size='middle'
              type='number'
              defaultValue={productParams?.discount_price_after}
              onChange={(v) => debounceFunction(v.target.value, (cv) => handleFilter('discount_price_after', cv))}
              placeholder='Quyi narx'
            />
            <Input
              defaultValue={productParams?.discount_price_before}
              onChange={(v) => debounceFunction(v.target.value, (cv) => handleFilter('discount_price_before', cv))}
              size='middle'
              type='number'
              placeholder='Yuqori narx'
            />
          </div>
        </div>

        {Object.keys(productParams).filter(el => el !== 'page' && el !== 'page_size').some(item => productParams[item] !== '') ? <div className="col-12 p-1">
          <Button type='dashed' className='w-100 text-danger' onClick={clearFilter}>
            <i class="fa-solid fa-xmark"></i>
            Barcha filterlarni tozalash
          </Button>
        </div> : ''}
      </div>
    </div>
  )
}
