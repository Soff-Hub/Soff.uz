import React from 'react'

export default function DashboardStatsCard({ icon, colorClass, title, value }) {

    return (
        <div style={{ borderRadius: '8px', width: '100%' }} className="bg-white stats-card-inner">
            <div className="card-body d-flex align-items-center">
                <div className={`p-3 rounded-circle text-${colorClass} bg-${colorClass}-light me-4`}>
                    <i className={`${icon} fs-2`}></i>
                </div>
                <div>
                    <p className="mb-0 h2 stats-price">{value}</p>
                    <p className="mb-1 text-muted">{title}</p>
                </div>
            </div>
        </div>
    )
}
