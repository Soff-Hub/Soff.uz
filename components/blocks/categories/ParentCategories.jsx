import Link from 'next/link'
import React from 'react'
import FreeBtn from '~/components/elements/FreeBtn'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

const parentCategoriesData = [
    {
        title: 'Ilmiy ishlar',
        imgUrl: '/static/img/ilmiy ishlar.png',
        bgColor: '#ff7641',
        path: '/scientific-resources/all'
    },
    {
        title: '3D moddellar va Interier dizaynlar',
        imgUrl: '/static/img/3D moddellar.png',
        bgColor: '#4d1727',
        path: '#'
    },
    {
        title: 'Dizayn shablonlari',
        imgUrl: '/static/img/Dizayn shablonlari.png',
        bgColor: '#697200',
        path: '#'
    },
    {
        title: 'Veb saytlar',
        imgUrl: '/static/img/Veb saytlar.png',
        bgColor: '#02732f',
        path: '/websites/all'
    },
    {
        title: 'Video darsliklar',
        imgUrl: '/static/img/Video darsliklar.png',
        bgColor: '#421300',
        path: '#'
    }
]

export default function ParentCategories() {

    return (
        parentCategoriesData.map((item, index) => {
            return (

                <Link href={item.path}>
                    <a>
                        <div className="file-card" style={{ backgroundColor: item.bgColor }}>
                            <h3 className='file-card-title p-md-4 p-3'>
                                {item.title}
                            </h3>
                            <div className="file-card-img">
                                <img
                                    src={item.imgUrl}
                                    className='file-card-imge'
                                    alt={item.title}
                                />
                            </div>
                        </div>
                    </a>
                </Link>
            )
        })
    )
}
