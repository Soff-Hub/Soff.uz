import React from 'react';
import {
    ArrowRightOutlined,
    CaretRightOutlined,
    CheckCircleFilled,
    ClockCircleOutlined,
    RightOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { Button, Collapse, theme } from 'antd';

const packages = [
    {
        key: '1',
        title: 'Standart',
        price: '20 000 so’m',
        delivery: '3 kunda yetkazish',
        revisions: 'Cheksiz o\'zgartirish huquqi',
        features: ['2 ta logo', '3D mockup', 'Fayllar', 'Social Media Kit'],
        isActive: false,
    },
    {
        key: '2',
        title: 'Premium',
        price: '60 000 so’m',
        delivery: '3 kunda yetkazish',  
        revisions: 'Cheksiz o\'zgartirish huquqi',
        features: ['2 ta logo', '3D mockup', 'Fayllar', 'Social Media Kit'],
        isActive: true,
    },
    {
        key: '3',
        title: 'Gold',
        price: '120 000 so’m',
        delivery: '3 kunda yetkazish',
        revisions: 'Cheksiz o\'zgartirish huquqi',
        features: ['2 ta logo', '3D mockup', 'Fayllar', 'Social Media Kit'],
        isActive: false,
    },
];

const ServicePackagesAccordion = () => {
    const { token } = theme.useToken();

    const panelStyle = {
        marginBottom: 16,
        background: 'white',
        borderRadius: token.borderRadiusLG,
        border: 'none',
        boxShadow: '0px 0px 4.4px 0px #00000026'
    };

    const items = packages.map(pkg => ({
        key: pkg.key,
        label: (
            <div className='d-flex  justify-content-between accordian_package'>
                <h4>{pkg.price}</h4>
                <h3>{pkg.title}</h3>
                <div></div>
            </div>
        ),
        children: pkg.features.length > 0 ? (
            <div className='d-flex flex-column gap-3 px-1 pb-1  accordian_package'>
                <div className='d-flex align-items-center gap-3 text-secondary mb-4'>
                    <ClockCircleOutlined />
                    <p>{pkg.delivery}</p>
                    <SyncOutlined />
                    <p>{pkg.revisions}</p>
                </div>

                <ul className='list-unstyled d-flex flex-column gap-2'>
                    {pkg.features.map((feature, i) => (
                        <li key={i} className='d-flex align-items-center gap-3 mb-3 text-success'>
                            <img src="/static/img/services_images/Vector.png" alt="" />
                            <span className='text-dark'>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Button type='primary' block className='bg-success border-success'>
                    Buyurma berish <ArrowRightOutlined />
                </Button>
            </div>
        ) : null,
        style: panelStyle,
    }));

    return (
        <Collapse
            accordion
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition='end'
            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: '#f8f9fa' }}
            items={items}
        />
    );
};

export default ServicePackagesAccordion;
