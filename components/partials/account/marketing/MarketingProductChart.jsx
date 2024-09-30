import React, { useEffect, useState } from 'react'
import MarketingChartProduct from './MarketingChartAll'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { Card, Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import useResponsive from '~/utilities/useResponsive'


export default function MarketingProductChart() {
    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [labels, setLabels] = useState([])
    const colors = ['#624E88', '#CB80AB', '#E6D9A2', '#FFB200', '#EB5B00', '#B60071', '#610C9F', '#1230AE', '#C68FE6', '#6A9C89', '#CCC8AA', '#77E4C8', '#E5D9F2', '#0F0F0F', '#FF885B', '#FF4191']
    const { isMobile } = useResponsive()


    const getData = async () => {
        setLoading(true)
        const resp = await axios.get(orginalUrl + `seller/marketing/chart/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            },
            params: { ...query }
        })
        let result = []
        const names = [{
            title: "Mahsulotlar",
            description: "Saytdagi barcha mahsulotlar quyidagi sohalarga ajratilgan va mahsulotlar soni foizlarda (%) berilgan"
        }, {
            title: "Ko'rishlar",
            description: "Saytdagi barcha mahsulotlar quyidagi sohalarga ajratilgan va mahsulotlarning ko'rishlar soni foizlarda (%) berilgan"
        }, {
            title: "Sotuvlar",
            description: "Saytdagi barcha mahsulotlar quyidagi sohalarga ajratilgan va mahsulotlarning sotuvlar soni foizlarda (%) berilgan"
        }]
        for (let i = 0; i < 3; i++) {
            let series = []
            let labels = []
            for (let j = 0; j < resp?.data.length; j++) {
                labels.push(resp?.data[j]?.category)
                if (i === 0) {
                    series.push(resp?.data[j]?.doc_percentage)
                } else if (i === 1) {
                    series.push(resp?.data[j]?.sale_percentage)
                } else {
                    series.push(resp?.data[j]?.views_percentage)
                }
            }

            result.push({
                title: names[i],
                series,
                labels
            })
        }
        setLabels(result[0]?.labels)
        setData(result)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [query])

    return (
        <div className=''>
            <div className={`d-flex justify-content-${isMobile ? 'center' : 'between'} flex-wrap`}>
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
                        </div>
                    )) : ''
                }
                {
                    !loading ? data.map((el, i) => <MarketingChartProduct key={i} config={el} colors={colors} />) : ''
                }
            </div>

            <div className='d-flex flex-wrap gap-1 justify-content-center mt-5'>
                {labels && labels.length ? (
                    labels.map((value, index) => (
                        <Card
                            key={index}
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'inline-block'
                            }}
                            className={`px-3 py-1 text-center`}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <div style={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: colors[index] }}></div>
                                <div>{value}</div>
                            </div>
                        </Card>
                    ))
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
