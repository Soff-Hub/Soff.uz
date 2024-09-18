import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart';

const MarketingMyTopProducts = () => {
    const config = {
        title: 'Mahsulotlar',
        series: [56, 78, 103],
        labels: [
            '0 - 10,000 UZS',
            '10,000 - 15,000 UZS',
            '15,000 - 20,000 UZS',
        ]
    }

    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState([])

    const getData = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/top-documents/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setData(resp.data?.slice(0, 3));
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='mt-5'>
            <div className='d-flex gap-5'>
                <div className='p-5 bg-white w-50' style={{ border: '1px solid gold' }}>
                    <div>
                        <h3 className='fw-medium mb-5'>Mahsulotingiz sotuvi oshishi uchun Soff.uz taklifi</h3>
                    </div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={false}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                // extra={
                                //     <Link href={`/product/${item.slug}`}>
                                //         <img
                                //             width={200}
                                //             style={{ cursor: 'pointer' }}
                                //             alt="logo"
                                //             src={item?.poster_url}
                                //         />
                                //     </Link>
                                // }
                                className='px-0'
                            >
                                <List.Item.Meta
                                    className='mb-3'
                                    avatar={<Avatar style={{ border: '1px solid gray', padding: '5px' }} src={'/static/img/soff logo.png'} />}
                                    title={<Link href={`/product/${item.slug}`}>{item.title}</Link>}
                                    description="Bu mahsulotingiz ko'p marta xaridorlar tomonidan ko'rilgan lekin sotuvlar soni nisbatan kam, bunga narxning balandligi sabab bo'lishi mumkin"
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
                <div className='w-50 p-5 bg-white'>
                    <div>
                        <h3 className='fw-medium mb-5'>Sotilgan Mahsulotlarning o'rtacha narxi</h3>
                    </div>
                    <MarketingSellingHistoryChart config={config} />
                </div>
            </div>
        </div>
    )
}
export default MarketingMyTopProducts;