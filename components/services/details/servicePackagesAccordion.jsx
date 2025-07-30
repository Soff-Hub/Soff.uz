import React from 'react';
import {
    ArrowRightOutlined,
    ClockCircleOutlined,
    RightOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { Button, Collapse, theme } from 'antd';


const ServicePackagesAccordion = ({openModal, packages}) => {
    const { token } = theme.useToken();
    console.log("packages", packages);

    const panelStyle = {
        marginBottom: 16,
        background: 'white',
        borderRadius: token.borderRadiusLG,
        border: 'none',
        boxShadow: '0px 0px 4.4px 0px #00000026'
    };

    const items = packages.map(pkg => ({
        key: pkg.id,
        label: (
            <div className='d-flex  justify-content-between accordian_package'>
                <h4>{pkg.price}</h4>
                <h3>{pkg.package_type}</h3>
                <div></div>
            </div>
        ),
        children: (
            <div className='d-flex flex-column gap-3 px-1 pb-1  accordian_package'>
                <div className='d-flex align-items-center gap-3 text-secondary mb-4'>
                    <ClockCircleOutlined />
                    <p>{pkg.delivery_days} kunda yetkazish</p>
                    <SyncOutlined />
                    <p>{pkg.right_to_change} ta o'zgartirish huquqi</p>
                </div>

                <ul className='list-unstyled d-flex flex-column gap-2'>
                    {pkg?.options?.map((option, i) => (
                        <li key={i} className='d-flex align-items-center gap-3 mb-3 text-success'>
                            <img src="/static/img/services_images/Vector.png" alt="check img" />
                            <span className='text-dark'>{option?.option?.name}</span>
                        </li>
                    ))}
                </ul>

                <Button onClick={openModal} type='primary' block className='bg-success border-success'>
                    Buyurma berish <ArrowRightOutlined />
                </Button>
            </div>
        ) ,
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
