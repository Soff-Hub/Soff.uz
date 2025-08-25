import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import ServiceCard from '~/components/freeleance/services/ServiceCard';
import { apiForFreelance } from '~/repositories/api';
import ServiceIsUnavailable from './ServiceIsUnavailable';

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

    if(data?.length == 0){
        return (
            <ServiceIsUnavailable type='service'/>
        )
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
                    <div className="row">
                        {data?.map((item, index) => (
                            <div className="col-6 col-md-4">
                                <ServiceCard product={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
