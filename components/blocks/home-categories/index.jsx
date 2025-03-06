import React from 'react'
import ParentCategories from '../categories/ParentCategories'
import ItServicesCategories from './ItServicesCategories'

export default function HomeCategories() {

    return (
        <div className='products my-5'>
            <div className="container  p-xl-0">
                <div className={`product-list`}>
                    <ParentCategories />
                </div>
            </div>
        </div>
    )
}
