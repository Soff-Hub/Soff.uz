import React, { forwardRef } from 'react';
import ServiceCard from '~/entities/service/service-card';
import { useFGet } from '~/shared/hooks/useFApi';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Search_Results_NotFound = forwardRef(({ isSearchPage = true }, ref) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { data, isLoading } = useFGet(
        'top-services',
        'customer/popular-services?limit=6'
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
            <div className="Search_Results_not_found" ref={ref}>
                <img
                    src="/static/img/searchNotFound.png"
                    alt=""
                    className="Search_Results_not_found_img"
                />
                <p className="Search_Results_not_found_title">
                    {isSearchPage
                        ? 'Afsuski, izlagan narsangiz topilmadi. Ammo siz uni buyurtma qilishingiz mumkin.👇'
                        : 'Afsuski, izlagan xizmatingiz topilmadi. Ammo siz uni buyurtma qilishingiz mumkin.👇'}
                </p>
                <p className="Search_Results_not_found_subtitle">
                    <span
                        className="Search_Results_not_found_btn"
                        onClick={handleRedirect}>
                        Buyurtma yaratish
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

export default Search_Results_NotFound;
