import React, { useEffect, useState } from 'react'
import MarketingCategoryAnalyzeChart from './MarketingCategoryAnalitcsChart'
import MarketingSelledProducts from './MarketingSelledProducts'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { useRouter } from 'next/router'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons';


export default function MarketingCategoryAnalyzeBox() {

    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()

    const [data, setData] = useState([])
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState([])

    const getData = async () => {
        setLoading(true)
        try {
            const resp = await Axios.get(orginalUrl + `seller/marketing/top-documents/`, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                },
                params: { ...query }
            })
            setData(resp.data?.slice(0, 4));
        } catch (err) {
            console.log(err);
        }
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
            getData(),
            getHistory()
        ])
    }, [query])



    return (
        <div className='mt-5 d-flex gap-5 justify-content-between'>
            <div className='py-5 bg-white w-50 px-5 d-flex flex-column'>
                <div>
                    <h3 className='fw-medium mb-3'>Sohaning daromad grafigi</h3>
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
                    ) : <MarketingCategoryAnalyzeChart series={history.map(el => Math.ceil(el.percentage))} labels={history.map(el => el.month)} />}
                </div>
            </div>
            <div className='py-5 bg-white w-50 px-5 d-flex flex-column' >
                <div>
                    <h3 className='fw-medium mb-3'>Soha bo'yicha eng ko'p sotilgan mahsulotlar</h3>
                </div>
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
                ) : <MarketingSelledProducts data={data} />}
            </div>
        </div>
    )
}
