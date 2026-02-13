import React, { memo, useMemo } from 'react'
import { Collapse } from 'antd'
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
        { key: "comments", label: "Izohlar", content: <UserCommentsTabs id={seller?.id} /> },
    ], [seller])

    return (
        <div className={styles.accordionContainer}>
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
                        key={item.key}
                        header={<span className={styles.headerLabel}>{item.label}</span>}
                        className={styles.panelWrapper}
                    >
                        <div className="p-3">{item.content}</div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default memo(UserAccordians)
