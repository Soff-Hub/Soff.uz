import React, { useState } from 'react';
import Link from 'next/link';
import { Empty, List, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchClaims } from '../api';
import { formatDate } from '../model';
import styles from './MySubscription.module.scss';

const PAGE_SIZE = 10;

// The claim payload may nest the document or flatten it; read both shapes.
const getClaimDocument = (claim) => (typeof claim.document === 'object' && claim.document) || claim;

const ClaimsList = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useQuery({
        queryKey: ['platform-sub-claims', page],
        queryFn: () => fetchClaims({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }),
        keepPreviousData: true,
        staleTime: 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className={styles.card}>
                <Skeleton active paragraph={{ rows: 4 }} />
            </div>
        );
    }

    if (!data?.results?.length) {
        return (
            <div className={styles.card}>
                <Empty description="Hali obuna orqali fayl olmagansiz" />
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <List
                dataSource={data.results}
                pagination={
                    data.count > PAGE_SIZE && {
                        current: page,
                        pageSize: PAGE_SIZE,
                        total: data.count,
                        onChange: setPage,
                        showSizeChanger: false,
                    }
                }
                renderItem={(claim) => {
                    const doc = getClaimDocument(claim);
                    const title = doc.title || claim.document_title || 'Fayl';
                    const slug = doc.slug || claim.slug;
                    const poster = doc.poster_url || doc.poster;
                    return (
                        <List.Item key={claim.id}>
                            <div className={styles.claimRow}>
                                {poster && <img className={styles.claimPoster} src={poster} alt={title} />}
                                <div>
                                    {slug ? (
                                        <Link href={`/product/${slug}`}>
                                            <a className={styles.claimTitle}>{title}</a>
                                        </Link>
                                    ) : (
                                        <span className={styles.claimTitle}>{title}</span>
                                    )}
                                    {(claim.claimed_at || claim.created_at) && (
                                        <p className={styles.muted}>
                                            Olingan sana: {formatDate(claim.claimed_at || claim.created_at)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};

export default ClaimsList;
