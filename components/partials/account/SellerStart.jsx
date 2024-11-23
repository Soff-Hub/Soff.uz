import React, { useContext } from 'react';
import { SidebarContext } from '~/hooks/SidebarContext';
import Router from 'next/router';

export const productTypeItems = [
    {
        path: '/account/myproducts/posts',
        img: '/static/img/file-i.webp',
        title: 'Ishlanmalar'
    },
    {
        path: '/account/myproducts/upload-video',
        img: '/static/img/video-i.jpg',
        title: 'Videolar'
    },
    {
        path: '/account/myproducts/audio-posts',
        img: '/static/img/audio-i.jpg',
        title: 'Audiolar'
    },
    {
        path: '/account/upload/template/create',
        img: '/static/img/template-i.jpg',
        title: 'Shablonlar'
    }
]

const SellerStart = () => {
    const { collapse } = useContext(SidebarContext)

    const items = [
        {
            path: '/account/myproducts/upload-video',
            img: '/static/img/video-i.jpg',
            title: 'Videolar'
        },
        {
            path: '/account/myproducts/audio-posts',
            img: '/static/img/audio-i.jpg',
            title: 'Audiolar'
        },
        {
            path: '/account/myproducts/posts',
            img: '/static/img/file-i.webp',
            title: 'Ishlanmalar'
        },
        {
            path: '/account/upload/template/create',
            img: '/static/img/template-i.jpg',
            title: 'Shablonlar'
        }
    ]

    return (
        <div className='py-3'>
            <div className="ps-page--my-account">
                <h3 className="new-card-title">
                    Hoziroq mahsulot yuklang va daromad qilishni boshlang!
                </h3>
                <div className="d-flex flex-wrap justify-content-evenly">
                    {
                        items.map(el => (
                            <div className={`new-card-container ${collapse ? '' : 'w-25'}`}>
                                <div className="new-card" onClick={() => Router.push(el.path)}>
                                    <div className="ilustration">
                                        <img src={el.img} alt="" />
                                    </div>
                                    <h3>{el.title}</h3>
                                    <button>
                                        <span>Yuklash</span>
                                        <i className='fa-solid fa-plus'></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default SellerStart;
