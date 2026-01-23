import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React from 'react';
import { apiForFreelance } from '~/repositories/api';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import ServiceCard from '~/entities/service/service-card';

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
                        {data?.map((item) => (
                            <div key={item?.id} className="col-6 col-md-4 px-2">
                                <ServiceCard service={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
