import { Card, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

export default function MarketingDashboardHeader() {
    const { profile } = useSelector(state => state.ecomerce)
    const { push, query } = useRouter()
    const month = query?.month || new Date().getMonth() > 9 ? query?.month || new Date().getMonth() + 1 : `0${query?.month || new Date().getMonth() + 1}`

    const onChangeYear = (date) => {
        if (date) {
            push({ query: { ...query, year: date.$y } })
        } else {
            push({ query: {} })
        }
    };

    const onChangeMonth = (date) => {
        if (date) {
            if (date.$M + 1 > 9) {
                push({ query: { ...query, month: date.$M + 1 } })
            } else push({ query: { ...query, month: `0${date.$M + 1}` } })
        } else {
            push({ query: {} })
        }
    };


    return (
        <div className='d-flex gap-2 bg-white justify-content-between p-3'>
            <div className='d-flex gap-2'>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {profile?.fields ?
                        profile.fields.map(el => (
                            <div key={el?.id}>
                                <Card
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'inline-block',
                                        fontSize: '16px'
                                    }}
                                    className={`px-3 py-1 text-center`}
                                >
                                    {el?.field}
                                </Card>
                            </div>
                        ))
                        : ''
                    }
                </div>

                <button
                    className='ps-btn text-white py-1'
                    onClick={() => push('/account/marketing/select-category')}
                >
                    <i className="fa-regular fa-pen-to-square"></i>
                </button>
            </div>

            <div className='d-flex gap-2'>
                <DatePicker
                    value={dayjs(`${query?.year || new Date().getFullYear()}-01-01`, 'YYYY-MM-DD')}
                    onChange={onChangeYear}
                    picker="year"
                    placeholder="Yil bo'yicha"
                />
                <DatePicker
                    value={dayjs(`${query?.year || new Date().getFullYear()}-${month}-01`, 'YYYY-MM-DD')}
                    onChange={onChangeMonth}
                    picker="month"
                    placeholder="Oy bo'yicha"
                />
            </div>
        </div>
    )
}
