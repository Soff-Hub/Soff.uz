import React, { useState } from 'react'

export default function CategoryTabs() {
    const [activeTab, setActiveTab] = useState('file')

    const data = [
        {
            name: "Fayl",
            slug: 'file',
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
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    <i className={el.icon}></i>
                                    <span>{el.name}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className='sub-category-tabs'>
                        {
                            data.map((el, i) => (
                                <div
                                    key={el.slug}
                                    className={`sub-category-tab-item ${el.slug === activeTab ? 'tab-active' : ''}`}
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    {el.name} ({i + 1})
                                </div>
                            ))
                        }
                        {
                            data.map((el, i) => (
                                <div
                                    key={el.slug}
                                    className={`sub-category-tab-item ${el.slug === activeTab ? '' : ''}`}
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    {el.name} ({i + 1})
                                </div>
                            ))
                        }
                        {
                            data.map((el, i) => (
                                <div
                                    key={el.slug}
                                    className={`sub-category-tab-item ${el.slug === activeTab ? '' : ''}`}
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    {el.name} ({i + 1})
                                </div>
                            ))
                        }
                        {
                            data.map((el, i) => (
                                <div
                                    key={el.slug}
                                    className={`sub-category-tab-item ${el.slug === activeTab ? '' : ''}`}
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    {el.name} ({i + 1})
                                </div>
                            ))
                        }
                        {
                            data.map((el, i) => (
                                <div
                                    key={el.slug}
                                    className={`sub-category-tab-item ${el.slug === activeTab ? '' : ''}`}
                                    onClick={() => setActiveTab(el.slug)}
                                >
                                    {el.name} ({i + 1})
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
