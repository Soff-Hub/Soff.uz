import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

export default function SellerServices ({ pid }) {
    const [isLoading, setIsLoading] = useState(false);
    const [serviseProduct, setServiseProduct] = useState('');

    useEffect(() => {
        if (!pid) return;

        setIsLoading(true);

        fetch(`http://176.96.241.219:8005/api/v1/services/my/?user_id=${pid}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setServiseProduct(data);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [pid]);

    return (
        <div>
            <div className='servicesSection '>
                <div className='servicesSectionInfoCardWrap'>
                    <div className='servicesSectionInfoCard'>
                        <img
                            src='/static/img/Buyurtma_bering.svg '
                            alt=''
                            className='servicesSectionInfoCardImg'
                        />
                        <p className='servicesSectionInfoCardTitle'>
                            Buyurtma bering
                        </p>
                        <p className='servicesSectionInfoCardDescription'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <img src='/static/img/ArrowRight.svg' alt='' />
                    <div className='servicesSectionInfoCard'>
                        <img
                            src='/static/img/To’lov_qiling.svg '
                            alt=''
                            className='servicesSectionInfoCardImg'
                        />
                        <p className='servicesSectionInfoCardTitle'>
                            To’lov qiling
                        </p>
                        <p className='servicesSectionInfoCardDescription'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <img src='/static/img/ArrowRight.svg' alt='' />
                    <div className='servicesSectionInfoCard'>
                        <img
                            src='/static/img/Yuklab_oling.svg  '
                            alt=''
                            className='servicesSectionInfoCardImg'
                        />
                        <p className='servicesSectionInfoCardTitle'>
                            {' '}
                            Yuklab oling
                        </p>
                        <p className='servicesSectionInfoCardDescription'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
                <form action='' className='servicesSectionForm'>
                    <div className='servicesSectionInputBox '>
                        <input
                            type='text'
                            placeholder='Xizmat turini izlang'
                            name=''
                            id=''
                            className='servicesSectionInput'
                        />
                        <img src='/static/img/searchIcon.png' alt='' />
                    </div>
                    <select className='servicesSectionSelect ' name='' id=''>
                        <option value='' selected hidden>
                            Xizmat turlari
                        </option>
                    </select>
                    <select className='servicesSectionSelect ' name='' id=''>
                        <option value='' selected hidden>
                            Xizmat turlari
                        </option>
                    </select>
                    <div className='servicesSectionBtn'>
                        <a className='servicesSectionBtnTitle' href=''>
                            Buyurtma berish
                        </a>
                        <img src='/static/img/RocketLaunch.svg' alt='' />
                    </div>
                </form>

                <div className='servicesSectionWrap'>
                    {isLoading && (
                        <>
                            {Array(16)
                                .fill(0)
                                .map((d, i) => (
                                    <Skeleton.Image
                                        key={i}
                                        active
                                        className='servicesSectionCardSkeleton '
                                    />
                                ))}
                        </>
                    )}
                    {Array.isArray(serviseProduct) &&
                        serviseProduct?.map((item, index) => (
                            <div className='servicesSectionCard' key={index}>
                                <div className='servicesSectionCardImg'>
                                    <img src={item?.file} alt={item?.title} />
                                </div>
                                <div className='servicesSectionCardbody'>
                                    <p className='servicesSectionCardTitle'>
                                        {item?.title}{' '}
                                    </p>
                                    <div className='servicesSectionCardRating'>
                                        <img src={item?.ratingImg} alt='' />
                                        <p>{item?.rating}</p>
                                        <span>({item?.countComment})</span>
                                    </div>
                                    <div className='servicesSectionCardPrice'>
                                        <p>{item?.price} so’m</p>
                                        <a href={item?.path}>Tafsilotlar</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className='showMoreBox'>
                    <p className='showMore'> Yana ko’rsatish</p>
                </div>
            </div>
        </div>
    );
}
