import React from 'react'
import UserDashboardsChart from './UserDashboardsChart'

export default function AdminStats() {
    return (
        <div className='d-flex my-3 gap-3'>
            <div className='d-flex justify-content-center bg-white rounded w-100'>
                <UserDashboardsChart />
            </div>
            <div className='d-flex justify-content-center bg-white rounded w-100'>
                <UserDashboardsChart />
            </div>
        </div>
    )
}
