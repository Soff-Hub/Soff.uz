import { Skeleton } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import ProductMainCard from '~/components/product/ProductMainCard'
import { ProductContext } from '~/context/ProductsContext'

export default function HomeProducts({ tab }) {
    const { homeProdutcs, homeLoading } = useContext(ProductContext)

    return (
        <div className='products'>
            <div className="container">
                {
                    homeLoading ? (
                        <div className={`product-list ${tab}`}>
                            {
                                Array(12).fill(0).map((d, i) => <Skeleton.Image
                                    key={i}
                                    active
                                    className={`skeletion-card ${tab}`}
                                />)
                            }
                        </div>
                    ) : ''
                }
                {
                    !homeLoading && homeProdutcs.length ? (
                        <div className={`product-list ${tab}`}>
                            {
                                homeProdutcs.map((el, i) => <ProductMainCard tab={tab} key={i} item={el} />)
                            }
                        </div>
                    ) : ''
                }

                <div className='view-all-products'>
                    <Link href={`/category/${tab}`}>
                        <a className='view-all-products-link'>
                            Barcha mahsulotlarni ko'rish
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
