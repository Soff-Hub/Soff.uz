import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart';
import { formatCurrency } from '~/utilities/product-helper';
import { useRouter } from 'next/router';

const MarketingMyTopProducts = () => {
    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()

    const [data, setData] = useState([])
    const [price, setPrice] = useState({
        title: 'Mahsulotlar',
        series: [],
        labels: []
    })

    const getData = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/?limit=3`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setData(resp.data?.results);
    }

    const getPrice = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/price-chart/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            },
            params: { ...query }
        })
        let series = resp.data?.map(el => Math.floor(el.percentage))
        let labels = resp.data?.map(el => `${formatCurrency(el?.min_price)}${el?.max_price >= 1000000 ? ' va undan yuqori' : ' - ' + formatCurrency(el?.max_price)}`)
        setPrice({
            title: price.title,
            series,
            labels
        });
    }

    useEffect(() => {
        getData()
        getPrice()
    }, [query])

    return (
        <div className='mt-5'>
            <div className='d-flex gap-5'>
                <div className='p-5 bg-white w-50' style={{ border: '1px solid gold' }}>
                    <div>
                        <h3 className='fw-medium mb-5'>Mahsulotingiz sotuvi oshishi uchun Soff.uz taklifi</h3>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={false}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    className='px-0'
                                    style={{ position: 'relative' }}
                                >
                                    <List.Item.Meta
                                        className='mb-3 p-4'
                                        avatar={<Avatar style={{ border: '1px solid gray', padding: '5px' }} src={'/static/img/soff logo.png'} />}
                                        title={<Link href={`/product/${item.slug}`}>{item.title}</Link>}
                                        description="Bu mahsulotingiz ko'p marta xaridorlar tomonidan ko'rilgan lekin sotuvlar soni nisbatan kam, bunga narxning balandligi sabab bo'lishi mumkin"
                                        // style={{ border: '1px solid #f1f1f1', borderRadius: '8px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderBlockEnd: 'none' }}
                                        style={{ backgroundColor: '#F8EDE3', border: 'none', borderBlock: 'none' }}
                                    />
                                    <span className='offer-close' style={{ position: 'absolute', top: 20, right: 7 }}>
                                        <i class="fa-solid fa-xmark fs-3"></i>
                                    </span>
                                    {item.content}
                                </List.Item>
                            )}
                        />
                        {data?.length ? '' : <div className='chart-blur'>
                            <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
                        </div>}
                    </div>
                </div>
                <div className='w-50 p-5 bg-white d-flex flex-column'>
                    <div>
                        <h3 className='fw-medium mb-5'>Sotilgan Mahsulotlarning o'rtacha narxi</h3>
                    </div>
                    <MarketingSellingHistoryChart config={price} />
                </div>
            </div>
        </div>
    )
}
export default MarketingMyTopProducts;