import React, { memo, useMemo } from 'react'
import { Collapse } from 'antd'
import { cn } from '~/shared/utilities/cn'
import styles from "./style.module.scss"
import UserInfo from '../user-info'
import UserPortfolios from '../user-portfolios'
import UserServices from '../user-services'
import UserProducts from '../user-products'
import UserCommentsTabs from '../user-comments-tabs'

const { Panel } = Collapse

const UserAccordians = ({ seller }) => {
    const items = useMemo(() => [
        { key: "about", label: "Muallif haqida", content: <UserInfo seller={seller} /> },
        { key: "portfolio", label: "Portfolio", content: <UserPortfolios /> },
        { key: "services", label: "Xizmatlar", content: <UserServices /> },
        { key: "products", label: "Mahsulotlar", content: <UserProducts id={seller?.id} /> },
        { key: "comments", label: "Izohlar", content: <UserCommentsTabs id={seller?.id}/> },
    ], [seller])

    const panelStyle = {
        marginBottom: 10,
        background: 'rgba(254, 254, 254, 1)',
        borderRadius: 10,
        border: 'none',
        boxShadow: '5px 10px 30px 0px rgba(0, 0, 0, 0.05)',
    }

    return (
        <div className={cn("mt-4")}>
            <Collapse
                className={styles.customCollapse}
                accordion
                bordered={false}
                expandIconPosition="end"
                defaultActiveKey={['about']}
                expandIcon={({ isActive }) => (
                    <img
                        src="/static/img/star.svg"
                        alt="badge"
                        className={`${styles.custom_expand_icon} ${isActive ? styles.active : ''}`}
                    />
                )}
                destroyOnHidden
            >
                {items.map((item) => (
                    <Panel
                        style={panelStyle}
                        key={item.key}
                        header={<span className="font-semibold text-base text-gray-800">{item.label}</span>}
                        className={styles.customPanel}
                    >
                        <div className="p-3">{item.content}</div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default memo(UserAccordians)
