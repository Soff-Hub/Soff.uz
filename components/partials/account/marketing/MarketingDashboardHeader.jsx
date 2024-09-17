import { Card } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

export default function MarketingDashboardHeader() {
    const { profile } = useSelector(state => state.ecomerce)
    const { push } = useRouter()

    return (
        <div className='d-flex justify-content-between gap-2'>
            <div style={{ display: 'flex', gap: '5px' }}>
                {profile?.fields ?
                    profile.fields.map(el => (
                        <div key={el?.id}>
                            <Card
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block',
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
                onClick={() => push('/account/marketing')}
            >
                O'zgartirish
            </button>
        </div>
    )
}
