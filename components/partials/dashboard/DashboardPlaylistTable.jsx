import { Table } from 'antd'
import React from 'react'

export default function DashboardPlaylistTable({ role }) {
    const columnsOrders = []
    const columnsOrdersSeller = []
    // sold-plyalists/?page=${page}
    const dataPlayLists = []
    return (
        <div>
            <Table
                scroll={{ x: role == 'admin' ? 1450 : 1000 }}
                dataSource={dataPlayLists}
                columns={role == 'admin' ? columnsOrders : columnsOrdersSeller}
                className="pb-5"
                pagination={false}
                // loading={dataLoadingPlay}
            />
        </div>
    )
}
