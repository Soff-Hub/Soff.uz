import React from 'react';
import { DollarOutlined, EyeOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
const data = Array.from({
    length: 3,
}).map(() => ({
    title:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
}));
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const MarketingSelledProducts = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={data}
        renderItem={(item) => (
            <List.Item
                actions={[
                    <IconText icon={EyeOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={DollarOutlined} text={`15,000 UZS`} key="list-vertical-like-o" />,
                ]}

            >
                {item.title}
            </List.Item>
        )}
    />
);
export default MarketingSelledProducts;