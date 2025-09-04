import React, { useState } from 'react';
import { Collapse } from 'antd';
import SellerInfo from './sellerInfo';
import SellerServices from './sellerServices';
import SellerComments from './sellerComments';
import SellerProduct from './sellerProduct';
import SellerPortfolio from './sellerPortfolio';

const SellerCollapseMenu = ({ pid, sellerInfo }) => {
    const [activeKey, setActiveKey] = useState(['1']);
    const items = [
        {
            key: '1',
            label: 'Muallif Haqida',
            children: (
                <SellerInfo
                    sellerInfo={sellerInfo}
                    pid={pid}
                    onChange={() => setActiveKey([3])}
                />
            ),
        },
        {
            key: '2',
            label: 'Portfolio',
            children: <SellerPortfolio pid={pid} />,
        },
        {
            key: '3',
            label: 'Xizmatlar',
            children: <SellerServices pid={pid} />,
        },
        {
            key: '4',
            label: 'Mahsulotlar',
            children: <SellerProduct pid={pid} />,
        },
        {
            key: '5',
            label: 'Izohlar',
            children: <SellerComments pid={pid} />,
        },
    ];
    // boshlang‘ich holat

    return (
        <Collapse
            accordion
            className="mt-5 bg-white m-0"
            items={items}
            bordered={false}
            activeKey={activeKey}
            onChange={keys => setActiveKey(keys)}
            style={{ padding: '0px' }}
        />
    );
};

export default SellerCollapseMenu;
