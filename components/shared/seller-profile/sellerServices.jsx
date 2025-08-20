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
            <div className="servicesSectionWrap">
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
                {Array.isArray(data) &&
                    data?.map((item, index) => <ServiceCard product={item} />)}
                {/* <div className="servicesSectionCard" key={index}>
                            <div className="servicesSectionCardImg">
                                <img src={item?.poster} alt={item?.title} />
                            </div>
                            <div className="servicesSectionCardbody">
                                <p className="servicesSectionCardTitle">
                                    {item?.title}{' '}
                                </p>
                                <div className="servicesSectionCardPrice">
                                    <p>{item?.price} so'm</p>
                                    <a href={item?.path}>Tafsilotlar</a>
                                </div>
                            </div>
                        </div> */}
            </div>
            {/* <div className="showMoreBox">
                <p className="showMore"> Yana ko'rsatish</p>
            </div> */}
        </div>
    );
}
