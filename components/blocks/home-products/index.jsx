import React from 'react'
import FileCard from '~/components/product/file/FileCard'

export default function HomeProducts() {
    return (
        <div className='products'>
            <div className="container">
                <div className="product-list">
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                    <FileCard />
                </div>
            </div>
        </div>
    )
}
