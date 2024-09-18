import React from 'react';
import { DollarOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';


const IconText = ({ icon, text }) => (
    <Space className='view-count'>
        {React.createElement(icon)}
        {text}
    </Space>
);
const MarketingSelledProducts = ({ data }) => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                actions={[
                    <IconText icon={EyeOutlined} text={item?.view_count} key="list-vertical-star-o" />,
                    <IconText icon={DollarOutlined} text={`${formatCurrency(item?.discount_price)} UZS`} key="list-vertical-like-o" />,
                    <IconText icon={CheckCircleOutlined} text={`${item?.sold_count_last_month} marta sotilgan`} key="list-vertical-like-o" />,
                ]}
                className='px-3 py-3 mb-3'
                style={{ border: '1px solid #f1f1f1', borderRadius: '5px' }}
            >
                {item.title}
            </List.Item>
        )}
    />
);
export default MarketingSelledProducts;