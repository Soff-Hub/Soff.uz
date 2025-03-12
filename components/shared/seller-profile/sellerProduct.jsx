import React, { useState } from 'react';
import ScientificResources from '../seller-products-types/scientific-resources';
import ModelAndDesign from '../seller-products-types/model-and-design';
import DesignDevelopment from '../seller-products-types/design-development';
import WebSites from '../seller-products-types/webSites';
import Templates from '../seller-products-types/templates';
import VideoLessons from '../seller-products-types/video-lessons';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import DontWork from './dontWork';

export default function SellerProduct () {
    const [selectedOption, setSelectedOption] = useState('All');

    const renderComponent = () => {
        switch (selectedOption) {
            case 'All':
                return (
                    <>
                        <ScientificResources />
                        <ModelAndDesign />
                        <DesignDevelopment />
                        <WebSites />
                        <Templates />
                        <VideoLessons />
                    </>
                );
            case 'ScientificResources':
                return <ScientificResources />;
            case 'ModelAndDesign':
                return <ModelAndDesign />;
            case 'DesignDevelopment':
                return <DesignDevelopment />;
            case 'WebSites':
                return <WebSites />;
            case 'Templates':
                return <Templates />;
            case 'VideoLessons':
                return <VideoLessons />;
            case 'ServiceIsUnavailable':
                return <ServiceIsUnavailable />;
            case 'DontWork':
                return <DontWork />;

            default:
                return null;
        }
    };
    const menuItems = [
        {
            title: 'Barchasi',
            path: 'All',
        },
        {
            title: 'Ilmiy ishlar',
            path: 'ScientificResources',
        },
        {
            title: '3D moddellar va Interier dizaynlar',
            path: 'ModelAndDesign',
        },
        {
            title: 'Dizayn shablonlari',
            path: 'DesignDevelopment',
        },
        {
            title: 'Veb saytlar',
            path: 'WebSites',
        },
        {
            title: 'Tayyor shablonlar',
            path: 'Templates',
        },
        {
            title: 'Video darsliklar',
            path: 'VideoLessons',
        },
        {
            title: 'Xizmat mavjud emas',
            path: 'ServiceIsUnavailable',
        },
        {
            title: 'DontWork',
            path: 'DontWork',
        },
    ];
    return (
        <div className='SellerProduct'>
            <form action='' className='SellerProductForm'>
                <div className='SellerProductInputBox '>
                    <input
                        type='text'
                        placeholder='Xizmat turini izlang'
                        name=''
                        id=''
                        className='SellerProductInput'
                    />
                    <img src='/static/img/searchIcon.png' alt='' />
                </div>
                <select
                    className='SellerProductSelect '
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    name=''
                    id=''>
                    <option value='' selected hidden>
                        Xizmat turlari
                    </option>
                    {menuItems.map((item, index) => (
                        <option value={item.path} key={index}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <select className='SellerProductSelect ' name='' id=''>
                    <option value='' selected hidden>
                        Xizmat turlari
                    </option>
                </select>
            </form>
            <div className=''>{renderComponent()}</div>
        </div>
    );
}
