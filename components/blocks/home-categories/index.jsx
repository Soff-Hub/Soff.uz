import { Skeleton } from 'antd'
import Link from 'next/link'
import React from 'react'
import ProductMainCard from '~/components/product/ProductMainCard'
import ParentCategories from '../categories/ParentCategories'

export default function HomeCategories() {

    return (
        <div className='products my-5'>
            <div className="container">
                <div className={`product-list`}>
                    <ParentCategories />
                </div>
            </div>
        </div>
    )
}
