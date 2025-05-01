import React from 'react';
import { Collapse } from 'antd';
import SellerInfo from './sellerInfo';
import SellerServices from './sellerServices';
import SellerComments from './sellerComments';
import SellerProduct from './sellerProduct';
import SellerPortfolio from './sellerPortfolio';

const items = [
    {
        key: '1',
        label: 'Muallif Haqida',
        children: <SellerInfo />,
    },
    {
        key: '2',
        label: 'Portfolio',
        children: <SellerPortfolio />,
    },
    {
        key: '3',
        label: 'Xizmatlar',
        children: <SellerServices />,
    },
    {
        key: '4',
        label: 'Mahsulotlar',
        children: <SellerProduct />,
    },
    {
        key: '5',
        label: 'Kamentariyalar',
        children: <SellerComments />,
    },
];

const SellerCollapseMenu = () => {
    return (
        <Collapse
            className='mt-5 bg-white m-0'
            items={items}
            bordered={false}
            activeKey
            onChange={keys => setActiveKey(keys)}
            style={{ padding: '0px' }}
        />
    );
};

export default SellerCollapseMenu;
