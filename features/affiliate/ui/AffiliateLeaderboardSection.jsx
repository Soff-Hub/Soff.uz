import React, { useState } from 'react';
import Axios from 'axios';
import { Avatar, Segmented, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { baseURL } from '~/repositories/api';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import styles from './AffiliateLeaderboardSection.module.scss';

const PERIODS = [
    { label: 'Oxirgi 30 kun', value: 'days_30', params: { days: 30 } },
    { label: 'Barcha vaqt', value: 'all', params: { all: true } },
];

const TOP = 10;

const MEDAL_CLASS = { 1: styles.gold, 2: styles.silver, 3: styles.bronze };

// Public endpoint — sent without a token on purpose.
const fetchLeaderboard = async (params) => {
    const { data } = await Axios.get(`${baseURL}seller/affiliate/leaderboard/`, {
        params: { ...params, top: TOP },
    });
    return data?.results || [];
};

const AffiliateLeaderboardSection = () => {
    const [period, setPeriod] = useState(PERIODS[0].value);
    const { params } = PERIODS.find((item) => item.value === period);

    const { data: results = [], isLoading, isError } = useQuery({
        queryKey: ['affiliate-leaderboard', period],
        queryFn: () => fetchLeaderboard(params),
        staleTime: 5 * 60 * 1000,
        keepPreviousData: true,
    });

    const renderBody = () => {
        if (isLoading) {
            return (
                <div className={styles.list}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div className={styles.row} key={i}>
                            <Skeleton avatar={{ size: 44 }} title={{ width: '40%' }} paragraph={false} active />
                        </div>
                    ))}
                </div>
            );
        }

        if (isError) {
            return <p className={styles.empty}>Reytingni yuklab bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.</p>;
        }

        if (!results.length) {
            return (
                <p className={styles.empty}>
                    Bu davrda hali hech kim daromad qilmagan — birinchi bo‘ling!
                </p>
            );
        }

        return (
            <ol className={styles.list}>
                {results.map((item) => (
                    <li className={styles.row} key={item.rank}>
                        <span className={`${styles.rank} ${MEDAL_CLASS[item.rank] || ''}`}>{item.rank}</span>
                        <Avatar size={44} src={item.image || undefined} icon={<UserOutlined />} className={styles.avatar} />
                        <div className={styles.info}>
                            <span className={styles.name}>{item.name}</span>
                            <span className={styles.sales}>{item.sales} ta sotuv</span>
                        </div>
                        <span className={styles.earned}>{formatCurrencyWithSpace(item.earned)} so‘m</span>
                    </li>
                ))}
            </ol>
        );
    };

    return (
        <section className="container py-5">
            <div className={styles.section}>
                <h2>Eng faol hamkorlar</h2>
                <p className={styles.subtitle}>
                    Taklif havolalari orqali eng ko‘p daromad qilgan hamkorlar
                </p>
                <Segmented
                    className={styles.periods}
                    options={PERIODS.map(({ label, value }) => ({ label, value }))}
                    value={period}
                    onChange={setPeriod}
                />
                <div className={styles.card}>{renderBody()}</div>
            </div>
        </section>
    );
};

export default AffiliateLeaderboardSection;
