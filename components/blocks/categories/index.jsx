import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '~/context/ProductsContext'

const data = [
    {
        name: "Fayl",
        slug: '',
        icon: 'fa fa-folder-open',
    }, {
        name: "Video",
        slug: 'video',
        icon: 'fa fa-video',
    }, {
        name: "Audio",
        slug: 'audio',
        icon: 'fa fa-music',
    }, {
        name: "Shablon",
        slug: 'template',
        icon: 'fa fa-grip-vertical',
    },
]

export default function CategoryTabs({ category, tab }) {
    const [activeTab, setActiveTab] = useState(tab || '')

    const { getHomeProducts, homeCategories, getHomeProductsByCategory } = useContext(ProductContext)
    const { push } = useRouter()

    async function handleTab(type) {
        push(`/?tab=${type}`)
        setActiveTab(type)
        getHomeProducts(`type=${type}`)
    }

    function handleCategory(type) {
        push(`/new-home?tab=${activeTab}&category=${type}`)
        getHomeProductsByCategory(`type=${activeTab}&category=${type}`)
    }

    useEffect(() => {
        getHomeProducts(`type=${tab || ''}&category=${category || ''}`)
    }, [])

    return (
        <div className='category'>
            <div className="container">
                <div className="category-inner">
                    <div className='category-tabs'>
                        {
                            data.map(el => (
                                <div
                                    key={el.slug}
                                    className={`category-tab-item ${el.slug === activeTab ? 'tab-active' : ''}`}
                                    onClick={() => handleTab(el.slug)}
                                >
                                    <i className={el.icon}></i>
                                    <span>{el.name}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className='sub-category-tabs'>
                        {
                            homeCategories.map((el, i) => (
                                <div
                                    key={el.id}
                                    className={`sub-category-tab-item ${el.id === Number(category) ? 'tab-active' : ''}`}
                                    onClick={() => handleCategory(el.id)}
                                >
                                    {el.name} ({el?.doc_count})
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const { query } = context;

    return {
        props: {
            tab: query?.tab || null,
            category: query?.category || null,
        },
    };
}
