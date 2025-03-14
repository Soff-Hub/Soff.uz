import React from 'react';
import { Pagination } from 'antd';
import { Skeleton } from 'antd';
import DevelopmentAndItProduct from '~/components/elements/ItServicesCategoriesProduct/DevelopmentAndItProduct';
import Link from 'next/link';

export default function DevelopmentAndItProductsByCategory ({
    data = [],
    page,
    handlePagination,
    isLoading,
}) {
    return (
        <div id='products' className='container p-xl-0 p-lg-0 p-sm-0 p-0'>
            <div className='DevelopmentAndItCategory'>
                {isLoading && (
                    <>
                        {Array(25)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className={`DevelopmentAndItCategorySkeleton`}
                                />
                            ))}
                    </>
                )}
                {data?.results?.length > 0 &&
                    data?.results?.map((item, index) => (
                        <div key={index}>
                            <DevelopmentAndItProduct product={item} />
                        </div>
                    ))}
            </div>
            {data?.results?.length == 0 && (
                <div className='DevelopmentAndItCategory_DontWork'>
                    <img
                        src='/static/img/DevelopmentAndItCategory_DontWorkImg.png'
                        alt=''
                    />
                    <p className='DevelopmentAndItCategory_DontWorkTitle'>
                        Yangi imkoniyatlar tez orada siz bilan!
                    </p>
                    <p className='DevelopmentAndItCategory_DontWorkDescription'>
                        Hozircha bu yerda xizmatlar yo‘q. Xaridor sifatida siz
                        yaqin orada yangi xizmatlarni topishingiz mumkin.
                        Sotuvchi sifatida esa hoziroq birinchi bo‘lib o‘z
                        xizmatlaringizni qo‘shib, bozorda yetakchi bo‘lishingiz
                        mumkin!
                    </p>
                    <a className='DevelopmentAndItCategory_DontWorkBtn'>
                        Bosh sahifa
                    </a>
                </div>
            )}
            <div className='showMoreBox'>
                <p className='showMore'>Yana ko’rsatish 46</p>
            </div>
        </div>
    );
}
