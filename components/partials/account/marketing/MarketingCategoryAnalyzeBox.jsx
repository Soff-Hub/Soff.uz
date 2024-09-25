import React, { useEffect, useState } from 'react'
import MarketingCategoryAnalyzeChart from './MarketingCategoryAnalitcsChart'
import MarketingSelledProducts from './MarketingSelledProducts'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { useRouter } from 'next/router'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart'
import { formatCurrency } from '~/utilities/product-helper'


export default function MarketingCategoryAnalyzeBox() {

    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()

    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState({
        title: 'Mahsulotlar',
        series: [],
        labels: []
    })

    const getPrice = async () => {
        setLoading(true)
        const resp = await Axios.get(orginalUrl + `seller/marketing/price-chart/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            },
            params: { ...query }
        })
        let series = resp.data?.map(el => el.percentage)
        let labels = resp.data?.map(el => `${formatCurrency(el?.min_price)}${el?.max_price >= 1000000 ? ' va undan yuqori' : ' - ' + formatCurrency(el?.max_price)}`)
        setPrice({
            title: price.title,
            series,
            labels
        });
        setLoading(false)
    }

    const getHistory = async () => {
        try {
            const resp = await Axios.get(orginalUrl + `seller/marketing/area-chart/`, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                },
                params: { ...query, year: query?.year || new Date().getFullYear() }
            })
            if (query?.month) {
                return setHistory(resp.data?.map(el => ({ ...el, month: el?.day })));
            }
            setHistory(resp.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        Promise.all([
            getHistory(),
            getPrice()
        ])
    }, [query])



    return (
        <div className='mt-5 d-flex gap-5'>
            <div className='py-4 bg-white w-50 px-2 d-flex flex-column' style={{ width: '400px !important' }}>
                <div>
                    <h4 className='fw-medium mb-3 text-center'>Sohaning daromad grafigi</h4>
                </div>

                <div style={{ flex: 1 }}>
                    {loading ? (
                        <div className='d-flex flex-column gap-4 h-100'>
                            <Skeleton.Node
                                style={{ width: '100%', height: '340px' }}
                                className='mt-2'
                                active={true}>
                                <DotChartOutlined
                                    style={{
                                        fontSize: 40,
                                        color: '#bfbfbf',
                                    }}
                                />
                            </Skeleton.Node>
                        </div>
                    ) : <MarketingCategoryAnalyzeChart series={history.map(el => el.percentage)} labels={history.map(el => el.month)} />}
                </div>
            </div>
            <div className='py-4 bg-white w-50 px-2 d-flex flex-column' >
                <div>
                    <h4 className='fw-medium mb-2 text-center'>Sotilgan Mahsulotlarning o'rtacha narxi</h4>
                </div>
                <MarketingSellingHistoryChart config={price} />
            </div>
        </div>
    )
}
