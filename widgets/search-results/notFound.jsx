import React, { forwardRef } from 'react';
import ServiceCard from '~/entities/service/service-card';
import { useFGet } from '~/shared/hooks/useFApi';
import { Skeleton, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { IoDocumentsSharp } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

const Search_Results_NotFound = forwardRef(({ isSearchPage = true }, ref) => {
    const { t } = useTranslation('search');
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { data, isLoading } = useFGet(
        'top-services',
        'customer/popular-services?limit=6',
        { enabled: isSearchPage }
    );
    const { push } = useRouter();

    const handleRedirect = () => {
        if (isLoggedIn) {
            push('/order/create');
        } else {
            push(
                '/auth/login?returnUrl=' + encodeURIComponent('/order/create')
            );
        }
    };

    return (
        <div ref={ref}>
            <div className="Search_Results_not_found">
                <img
                    src="/static/img/searchNotFound.png"
                    alt=""
                    className="Search_Results_not_found_img"
                />
                <p className="Search_Results_not_found_title">
                    {isSearchPage
                        ? t('notFound.searchPage')
                        : t('notFound.ordersPage')}
                </p>
                <p className="Search_Results_not_found_subtitle">
                    <span
                        className="Search_Results_not_found_btn"
                        onClick={handleRedirect}>
                        {t('notFound.createOrder')}
                    </span>
                </p>
            </div>

            {isSearchPage && (
                <div className="row row-gap-2 mt-4">
                    {isLoading
                        ? Array.from({ length: 9 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="col-6 col-sm-6 col-md-4 px-1">
                                  <Skeleton.Input
                                      active
                                      block
                                      style={{
                                          height: 200,
                                          borderRadius: 12,
                                      }}
                                  />
                              </div>
                          ))
                        : data?.items?.map((service) => (
                              <div
                                  key={service.id}
                                  className="col-6 col-sm-6 col-md-4 px-1">
                                  <ServiceCard service={service} />
                              </div>
                          ))}
                </div>
            )}
        </div>
    );
});

export const SearchProductsNotFound = forwardRef((props, ref) => {
    const { t } = useTranslation('search');
    const router = useRouter();
    const handleLoadSimilarDocuments = () => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    similar_documents: true,
                },
            },
            undefined,
            { scroll: false }
        );
    };

    return (
        <div ref={ref}>
            <div
                className="Search_Results_not_found"
                style={{ marginBottom: '50px' }}>
                <img
                    src="/static/img/searchNotFound.png"
                    alt=""
                    className="Search_Results_not_found_img"
                />
                <p className="Search_Results_not_found_title">
                    {t('notFound.productsNotFound')}
                </p>
                <p className="Search_Results_not_found_subtitle">
                    <Button
                        icon={<IoDocumentsSharp />}
                        type="primary"
                        onClick={handleLoadSimilarDocuments}
                        style={{
                            position: 'relative',
                            right: '10px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}>
                        {t('notFound.similarProducts')}
                    </Button>
                </p>
            </div>
        </div>
    );
});

export default Search_Results_NotFound;
