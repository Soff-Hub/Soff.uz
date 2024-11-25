import React from 'react'
import { addPeriodToThousands } from '../account/ProductsLists'
import { statusMap } from './SellerProductsTable'
import { Button, Dropdown, Tooltip } from 'antd'
import SellerProductActions from './SellerProductActions';
import SellerProductView from './SellerProductView';
import ModalDelete from '../account/Modal';
import SellerProductPrice from './SellerProductPrice';
import { useDeleteProductMutation } from '~/rtk-store/products/api';
import { useSelector } from 'react-redux';

export default function SellerProductsList({ data }) {
  const [deleteFunction] = useDeleteProductMutation()
  const { deleteId } = useSelector(state => state.products)

  return (
    <div>
      <div className='d-flex flex-column gap-2'>
        {
          data.map((el, i) => (
            <div className='product-card' key={i} style={{
              borderRadius: 14,
              backgroundColor: 'white',
              overflow: 'hidden',
              minHeight: 120,
              display: 'flex',
              gap: '5px',
              alignItems: 'stretch'
            }}>
              <div style={{
                minWidth: '85px',
                width: '85px',
                height: '120px',
                objectFit: 'contain',
                padding: '8px',
                paddingRight: 0
              }}>
                <div className='h-100' style={{
                  backgroundColor: '#f1f1f1',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                  <img
                    src={el?.image?.poster_url}
                    alt=""
                  />
                </div>
              </div>
              <div className='d-flex flex-column' style={{ height: '100% !important', padding: '10px 5px', marginRight: 'auto' }}>
                <h5 className='fw-medium fs-5 m-0 mb-1' style={{ maxHeight: '45px', overflow: 'hidden' }}>{el?.name?.title}</h5>

                <p className='m-0 mb-1 fs-6' >
                  {el?.category?.name}
                </p>

                <span style={{ fontSize: '10px' }}>
                  <i className="fa-solid fa-coins text-warning"></i>{' '}
                  {el?.discount_price == 0 ? 'Bepul' : addPeriodToThousands(el?.discount_price)} so'm
                </span>


                <div className='d-flex align-items-end gap-2' style={{ flex: 1 }}>
                  <span className='text-center fs-6 d-flex align-items-center gap-1'>
                    <i className="fa-solid fa-eye"></i>{' '}
                    {el?.view_count} ta
                  </span>
                  <div style={{ fontSize: '10px' }}>
                    <Tooltip title={el?.data_status?.reason}>
                      <span className='d-flex align-items-center gap-1'>
                        <i className={statusMap[el?.status].iconClass}></i> {statusMap[el?.status].text}
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: '1',
                        label: <SellerProductActions src={el} />,
                      }
                    ],
                    // onClick: (c) => console.log(c.key)
                  }}
                  placement="bottomRight"
                >
                  <Button type='link' style={{ borderRadius: '12px' }} className='pe-3'>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </Button>
                </Dropdown>
              </div>
            </div>
          ))
        }
      </div>
      <SellerProductView />

      <ModalDelete onSuccess={() => deleteFunction(deleteId)} />
      <SellerProductPrice />
    </div>
  )
}
