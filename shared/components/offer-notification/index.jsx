import React from 'react';
import { notification, Button, Typography, Space, Row, Col } from 'antd';
import OptimizedImage from '~/shared/components/OptimizedImage';
import { ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const MOCK_OFFERS = [
    {
        id: 1,
        title: 'Premium Web Dizayn Xizmati',
        price: '2 500 000 UZS',
        image: '/static/img/soff/logo-dark.png', // Using existing static asset as placeholder
        type: 'service',
        description: 'Bizning yangi xizmatimiz bilan tanishing',
    },
    {
        id: 2,
        title: 'Soff CRM Tizimi',
        price: '1 200 000 UZS',
        image: '/static/img/soff/logo-dark.png',
        type: 'product',
        description: 'Biznesingiz uchun mukammal yechim',
    },
];

const OfferCard = ({ item }) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
                marginBottom: '8px',
            }}>
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid #eee',
                }}>
                <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                <Text
                    strong
                    style={{ fontSize: '14px', lineHeight: '1.2' }}
                    ellipsis>
                    {item.title}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    {item.price}
                </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    type="primary"
                    shape="circle"
                    size="small"
                    icon={<ArrowRightOutlined />}
                    onClick={() => console.log('Navigate to', item.id)}
                />
            </div>
        </div>
    );
};

export const showOfferNotification = (offers = MOCK_OFFERS) => {
    const key = `open${Date.now()}`;

    notification.open({
        message: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCartOutlined style={{ color: '#00a44f' }} />
                <span>Qidiruvingiz natijasiz bo'ldimi?</span>
            </div>
        ),
        description: (
            <div>
                <Text
                    type="secondary"
                    style={{
                        fontSize: '12px',
                        display: 'block',
                        marginBottom: '10px',
                    }}>
                    Sizga qiziq bo‘lishi mumkin bo‘lgan yangi takliflar:
                </Text>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} item={offer} />
                    ))}
                </div>
                <Button
                    type="link"
                    block
                    size="small"
                    style={{ padding: 0, textAlign: 'right' }}>
                    Barcha takliflarni ko'rish
                </Button>
            </div>
        ),
        key,
        duration: 8, // Closes after 8 seconds
        style: {
            width: 380,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        className: 'custom-offer-notification',
    });
};

export default showOfferNotification;
