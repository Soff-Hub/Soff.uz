import Axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { orginalUrl } from '~/reositoriy-admin/Repository'

export default function CategoryTabs() {
    const [activeTab, setActiveTab] = useState('')
    const [categories, setCategories] = useState([])

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

    const getCategories = async (type) => {
        const resp = await Axios.get(orginalUrl + `customer/categories/?type=${type}`)
        setCategories(resp.data?.results);
    }

    function handleTab(type) {
        setActiveTab(type)
        getCategories(type)
    }

    useEffect(() => {
        getCategories()
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
                            categories.map((el, i) => (
                                <div
                                    key={el.id}
                                    className={`sub-category-tab-item ${el.id === activeTab ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab(el.id)}
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
