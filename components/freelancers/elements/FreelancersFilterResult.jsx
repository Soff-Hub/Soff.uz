import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SearchSellerCard from '~/entities/seller/search-seller-card';
import FreelancerHorizontalCard from './FreelancerHorizontalCard';
import AuthModal from '~/components/AuthModal';
import { useSelector } from 'react-redux';
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat';
import styles from '../styles/freelancers.module.scss';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import useResponsive from '~/shared/utilities/useResponsive';

function FreelancersFilterResult({ data, collapsed, viewType }) {
    const router = useRouter();
    const { isDesktop } = useResponsive();
    const { startTimeout } = useTimeManager();
    const { isLoggedIn } = useSelector((state) => state?.auth);
    const [selectedSellerId, setSelectedSellerId] = useState(null);
    const { mutate: createChat } = useCreateChat();
    const [authModal, setAuthModal] = useState(false);
    const limit = collapsed ? 21 : 20;
    const offset = Number(router.query.offset) || 0;
    const currentPage = offset / limit + 1;

    const handlePageChange = (page) => {
        const newOffset = (page - 1) * limit;
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: newOffset || undefined,
                limit,
            },
        });
    };

    const handleSuccessAuth = () => {
        if (selectedSellerId) {
            startTimeout(() => {
                createChat(selectedSellerId);
            }, 1000);
        }
    };

    const handleCreateChat = (id) => {
        if (isLoggedIn) {
            createChat(id);
        } else {
            setAuthModal(true);
            setSelectedSellerId(id);
        }
    };

    useEffect(() => {
        router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    limit,
                },
            },
            undefined,
            { shallow: viewType === 'horizontal' }
        );
    }, [collapsed, viewType]);

    return (
        <div
            className={
                collapsed && isDesktop
                    ? styles.freelancersFilterResultContent
                    : styles.freelancersFilterResultCollapsedContent
            }>
            {data?.count > 0 ? (
                <>
                    {viewType === 'grid' ? (
                        <div
                            className={`row row-gap-4 row-cols-2 row-cols-sm-2 row-cols-md-3 ${
                                collapsed ? 'row-cols-lg-3' : 'row-cols-lg-4'
                            } `}>
                            {data?.results?.map((item) => (
                                <div key={item.id}>
                                    <SearchSellerCard
                                        seller={{
                                            ...item,
                                            total_feedbacks_count:
                                                item?.feedbacks_count,
                                            soff_seller_id: item.seller_id,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {data?.results?.map((s) => (
                                <FreelancerHorizontalCard
                                    key={s.id}
                                    seller={s}
                                    onCreateChat={handleCreateChat}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="Search_Results_not_found">
                    <img
                        src="/static/img/searchNotFound.png"
                        alt=""
                        className="Search_Results_not_found_img"
                    />
                    <p
                        className="Search_Results_not_found_title"
                        style={{ marginTop: 20, marginBottom: 0 }}>
                        Afsuski, bu yo'nalishda frilanserlar topilmadi.
                    </p>
                </div>
            )}
            {data?.count > limit && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '20px 0px',
                    }}>
                    <Pagination
                        pageSize={limit}
                        current={currentPage}
                        total={data?.count}
                        size="medium"
                        showSizeChanger={false}
                        onChange={handlePageChange}
                    />
                </div>
            )}
            <AuthModal
                open={authModal}
                onClose={() => setAuthModal(false)}
                onSuccess={handleSuccessAuth}
            />
        </div>
    );
}

export default FreelancersFilterResult;
