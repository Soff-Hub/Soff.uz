import React from 'react';
import { DollarOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';


const IconText = ({ icon, text }) => (
    <Space className='view-count'>
        {React.createElement(icon)}
        {text}
    </Space>
);
const MarketingSelledProducts = ({ data }) => (
    <div style={{ position: 'relative', height: '100%' }}>
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
                    className='px-3 pb-3 mb-3'
                    style={{ border: '1px solid #f1f1f1', borderRadius: '5px', fontSize: '16px' }}
                >
                    <Link href={`https://soff.uz/product/${item?.slug}`}>
                        <a target='black'>
                            {item.title}
                        </a>
                    </Link>
                </List.Item>
            )}
        />
        {data?.length ? '' : <div className='chart-blur'>
            <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
        </div>}
    </div>
);
export default MarketingSelledProducts;