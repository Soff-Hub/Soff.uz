import React, { useEffect, useState } from 'react'
import MarketingCategoryAnalyzeChart from './MarketingCategoryAnalitcsChart'
import MarketingSelledProducts from './MarketingSelledProducts'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { orginalUrl } from '~/reositoriy-admin/Repository'

export default function MarketingCategoryAnalyzeBox() {

    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState([])
    const [history, setHistory] = useState([])

    const getData = async () => {
        try {
            const resp = await Axios.get(orginalUrl + `seller/marketing/top-documents/`, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                }
            })
            setData(resp.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getHistory = async () => {
        try {
            const resp = await Axios.get(orginalUrl + `seller/marketing/area-chart/`, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                }
            })
            setHistory(resp.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        getHistory()
    }, [])



    return (
        <div className='mt-5 d-flex gap-5 justify-content-between'>
            <div className='py-5 bg-white w-50'>
                <div>
                    <h3 className='fw-medium mb-3 text-center'>Sohaning daromad grafigi</h3>
                </div>

                <div>
                    <MarketingCategoryAnalyzeChart series={history.map(el => Math.ceil(el.percentage))} labels={history.map(el => el.month)} />
                </div>
            </div>
            <div className='py-5 bg-white w-50 px-5'>
                <div>
                    <h3 className='fw-medium mb-5 text-center'>Soha bo'yicha eng ko'p sotilgan mahsulotlar</h3>
                </div>
                <MarketingSelledProducts data={data} />
            </div>
        </div>
    )
}
