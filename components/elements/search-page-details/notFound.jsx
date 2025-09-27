import React, { useState } from 'react';
import ServiceCard from '~/entities/cards/service-card';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import { useFGet } from '~/shared/hooks/useFApi';
import { Skeleton } from 'antd';

export default function Search_Results_NotFound() {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useFGet(
        'top-services',
        'customer/popular-services?limit=6'
    );

    const handleRedirect = () => {
        setOpen(true);
    };

    return (
        <>
            <div className="Search_Results_not_found">
                <img
                    src="/static/img/searchNotFound.png"
                    alt=""
                    className="Search_Results_not_found_img"
                />
                <p className="Search_Results_not_found_title">
                    Afsuski, izlagan narsangiz topilmadi. Ammo siz uni buyurtma
                    qilishingiz mumkin.👇
                </p>
                <p className="Search_Results_not_found_subtitle">
                    <span
                        className="Search_Results_not_found_btn"
                        onClick={handleRedirect}
                    >
                        Buyurtma yaratish
                    </span>
                </p>
            </div>

            <div className="row row-gap-2 mt-4">
                {isLoading ? (
                    // ✅ Skeleton loaderlar (9 dona card loader)
                    Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="col-6 col-sm-6 col-md-4 px-1"
                        >
                            <Skeleton.Input
                                active
                                block
                                style={{ height: 200, borderRadius: 12 }}
                            />
                        </div>
                    ))
                ) : (
                    data?.items?.map((service) => (
                        <div
                            key={service.id}
                            className="col-6 col-sm-6 col-md-4 px-1"
                        >
                            <ServiceCard service={service} />
                        </div>
                    ))
                )}
            </div>

            <CreateOrderModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
