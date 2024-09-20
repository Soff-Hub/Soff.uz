import React, { useEffect, useState } from 'react'
import MarketingChartProduct from './MarketingChartAll'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'


export default function MarketingProductChart() {
    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const resp = await axios.get(orginalUrl + `seller/marketing/chart/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            },
            params: { ...query }
        })
        let result = []
        const names = ['Mahsulotlar', "Ko'rishlar", "Sotuvlar"]
        for (let i = 0; i < 3; i++) {
            let series = []
            let labels = []
            for (let j = 0; j < resp?.data.length; j++) {
                labels.push(resp?.data[j]?.category)
                if (i === 0) {
                    series.push(Math.floor(resp?.data[j]?.sale_percentage))
                } else if (i === 1) {
                    series.push(Math.floor(resp?.data[j]?.doc_percentage))
                } else {
                    series.push(Math.floor(resp?.data[j]?.view_percentage))
                }
            }

            result.push({
                title: names[i],
                series,
                labels
            })
        }
        setData(result)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [query])

    return (
        <div className='d-flex justify-content-between'>
            {
                loading ? [1, 2, 3].map(el => (
                    <div className='d-flex pt-2 justify-content-between' key={el}>
                        <div className='d-flex flex-column gap-4'>
                            <Skeleton.Input active={true} size='small' />
                            <Skeleton.Node
                                style={{ borderRadius: '50%', width: '180px', height: '180px' }}
                                active={true}>
                                <DotChartOutlined
                                    style={{
                                        fontSize: 40,
                                        color: '#bfbfbf',
                                    }}
                                />
                            </Skeleton.Node>
                        </div>
                        <div className='d-flex flex-column gap-3 ms-5 pt-5'>
                            <Skeleton.Input active={true} size='small' />
                            <Skeleton.Input active={true} size='small' />
                            <Skeleton.Input active={true} size='small' />
                        </div>
                    </div>
                )) : ''
            }
            {
                !loading ? data.map((el, i) => <MarketingChartProduct key={i} config={el} />) : ''
            }
        </div>
    )
}
