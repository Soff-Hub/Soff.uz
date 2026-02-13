import React, { useMemo } from 'react';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    FileTextOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import UserCommentsTabs from './user-comments-tabs';
import UserShortItems from './user-short-items';
import styles from '../styles/user-info.module.scss';

const UserInfo = ({ seller, isOrderingClosed, commentRef, sectionRef }) => {
    const stats = useMemo(
        () => [
            {
                title: 'Jarayondagi ishlar',
                value: seller?.progress_jobs_count || 0,
                icon: (
                    <SyncOutlined className="text-info" />
                ),
            },
            {
                title: 'Muvaffaqiyatli ishlar',
                value: seller?.successful_jobs_count || 0,
                icon: (
                    <CheckCircleOutlined className="text-primary" />
                ),
            },
            {
                title: 'Muvaffaqiyatsiz ishlar',
                value: seller?.unsuccessful_jobs_count || 0,
                icon: (
                    <CloseCircleOutlined className="text-danger" />
                ),
            },
            {
                title: 'Yuklangan mahsulotlar',
                value: seller?.total_products_count || 0,
                icon: (
                    <FileTextOutlined className="text-purple" />
                ),
            },
            {
                title: 'Sotilgan mahsulotlar',
                value: seller?.total_sold_documents || 0,
                icon: (
                    <ShoppingOutlined className="text-warning" />
                ),
            },
        ],
        [seller]
    );

    return (
        <div className={styles.userInfoContainer}>
            {seller?.bio && (
                <div className={styles.bioCard}>
                    <h3 className={styles.bioTitle}>
                        Muallif haqida
                    </h3>
                    <p className={styles.bioText}>{seller?.bio}</p>
                </div>
            )}

            <div className={styles.statsWrapper}>
                {stats.map((stat, index) => (
                    <StatCard
                        stat={stat}
                        key={index}
                    />
                ))}
            </div>

            <UserShortItems
                isOrderingClosed={isOrderingClosed}
                sectionRef={sectionRef}
                type="service"
                id={seller.id}
                limit={4}
            />
            <UserShortItems
                sectionRef={sectionRef}
                type="product"
                direction={seller?.most_common_direction}
                id={seller.id}
                limit={4}
            />
            <UserShortItems
                sectionRef={sectionRef}
                type="portfolio"
                id={seller.id}
                limit={4}
            />

            <div ref={commentRef} style={{ scrollMarginTop: '120px' }}>
                <UserCommentsTabs id={seller?.id} />
            </div>
        </div>
    );
};

export default UserInfo;

const StatCard = ({ stat }) => {
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div>
                <p className={styles.statLabel}>
                    {stat.title}
                </p>
                <h3 className={styles.statValue}>
                    {stat.value}
                </h3>
            </div>
        </div>
    );
};

StatCard.displayName = 'StatCard';
