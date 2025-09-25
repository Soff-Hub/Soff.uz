import React, { useState } from 'react';
import ServiceCard from '~/entities/cards/service-card';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import { useFGet } from '~/shared/hooks/useFApi';

export default function Search_Results_NotFound() {
    const [ open, setOpen ] = useState(false)
    // const { data, isLoading } = useFGet('top-services', 'customer/top-services')


    const handleRedirect = () => {
        setOpen(true)
    };

    return (
        <>
            <div className='Search_Results_not_found'>
                <img
                    src='/static/img/searchNotFound.png'
                    alt=''
                    className='Search_Results_not_found_img'
                />
                <p className='Search_Results_not_found_title'>
                    Afsuski, izlagan narsangiz topilmadi. Ammo siz uni buyurtma qilishingiz mumkin.👇
                </p>
                <p className='Search_Results_not_found_subtitle'>
                    <span
                        className='Search_Results_not_found_btn'
                        onClick={handleRedirect}
                    >
                        Buyurtma yaratish
                    </span>
                </p>
            </div>
            {/* <div>
                {data?.map(service => 
                    <ServiceCard service={service}/>
                )}
            </div> */}

            <CreateOrderModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
