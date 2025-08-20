import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import ServiceCard from '~/components/freeleance/services/ServiceCard';
import { apiForFreelance } from '~/repositories/api';

export default function SellerServices({ pid }) {
    const [isLoading, setIsLoading] = useState(false);

    const { data, isLoading: getDetailsLoading } = useQuery({
        queryKey: ['getSellerServices'],
        queryFn: async () => {
            //
            const response = await apiForFreelance.get(
                `/customer/services/${pid}`
            );

            return response.data;
        },
        enabled: !!pid,
    });

    return (
        <div className="servicesSection ">
            {/* <form action="" className="servicesSectionForm">
                <div className="servicesSectionInputBox ">
                    <input
                        type="text"
                        placeholder="Xizmat turini izlang"
                        name=""
                        id=""
                        className="servicesSectionInput"
                    />
                    <img src="/static/img/searchIcon.png" alt="" />
                </div>
                <select className="servicesSectionSelect " name="" id="">
                    <option value="" selected hidden>
                        Xizmat turlari
                    </option>
                </select>
                <select className="servicesSectionSelect " name="" id="">
                    <option value="" selected hidden>
                        Xizmat turlari
                    </option>
                </select>
                <div className="servicesSectionBtn">
                    <a className="servicesSectionBtnTitle" href="">
                        Buyurtma berish
                    </a>
                    <img src="/static/img/RocketLaunch.svg" alt="" />
                </div>
            </form> */}
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
            {/* <div className="showMoreBox">
                <p className="showMore"> Yana ko'rsatish</p>
            </div> */}
        </div>
    );
}
