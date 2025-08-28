import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import ServiceCard from '~/components/freeleance/services/ServiceCard';
import { apiForFreelance } from '~/repositories/api';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import LastOpenedCard from '~/components/freeleance/home/ui/LastOpenedCard';

export default function SellerServices({ pid }) {
    const { data, isLoading } = useQuery({
        queryKey: ['getSellerServices'],
        queryFn: async () => {
            const response = await apiForFreelance.get(
                `/customer/services/${pid}`
            );

            return response.data;
        },
        enabled: !!pid,
    });

    if (data?.length == 0) {
        return <ServiceIsUnavailable type="service" />;
    }

    return (
        <div className="servicesSection ">
            <div className="servicesSectionWrap m-0">
                {isLoading && (
                    <>
                        {Array(16)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className="servicesSectionCardSkeleton "
                                />
                            ))}
                    </>
                )}
                {Array.isArray(data) && (
                    <div className="row row-gap-4">
                        {data?.map((item, index) => (
                            <div className="col-6 col-md-4 px-2">
                                <LastOpenedCard
                                    title={item.title}
                                    image={item.poster}
                                    author={item.user.full_name}
                                    price={item.price}
                                    slug={item.slug}
                                    userImage={item.user.photo_url}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
