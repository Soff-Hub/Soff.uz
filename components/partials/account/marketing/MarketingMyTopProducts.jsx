import React from 'react';
import { Avatar, List } from 'antd';
import Link from 'next/link';
const data = Array.from({
    length: 4,
}).map((_) => ({
    href: '/product/marketing-shablonlari-ajoyib-kvadrat-shakldagi-reklama-banneri',
    title: `Kvadrat banneri ijtimoiy media post shabloni-1`,
    avatar: `/static/img/soff logo.png`,
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


const MarketingMyTopProducts = () => {

    return (
        <div className='mt-5 bg-white py-5'>
            <div>
                <h3 className='fw-medium mb-3 text-center'>Mahsulotlar sotuvini oshirish uchun takliflar</h3>
            </div>

            <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                dataSource={data}
                footer={<div className='px-5'>Agar takliflarimiz ni qabul qilsangiz mahsulotlaringiz sotuvi va daromadingiz oshishi ehtimoli katta</div>}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <Link href={item.href}>
                                <img
                                    width={200}
                                    style={{ cursor: 'pointer' }}
                                    alt="logo"
                                    src="https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/Images/BIZNES_MUZOKARALAR_STRATEGIYASIJjd.pptx_page-1_generate.jpg"
                                />
                            </Link>
                        }
                    >
                        <List.Item.Meta
                            className='mb-3'
                            avatar={<Avatar style={{ border: '1px solid gray', padding: '5px' }} src={item.avatar} />}
                            title={<Link href={item.href}>{item.title}</Link>}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}
export default MarketingMyTopProducts;