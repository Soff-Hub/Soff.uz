import React, { useEffect, useMemo } from 'react';
import ImageCarousel from './ui/ImageCarousel';
import styles from './styles/detail.module.scss';
import PriceBox from './ui/PriceBox';
import MoneyBack from './ui/MoneyBack';
import UserBox from './ui/UserBox';
import ServiceDescription from './ui/ServiceDescription';
import FaqSection from './ui/FaqSection';
import PortfolioSection from './ui/PortfolioSection';
import { useRouter } from 'next/router';
import CommentSection from './ui/CommentSection';
import { Breadcrumb } from 'antd';
import Meta from '~/components/shared/meta';
import ServiceCard from '../../../../entities/cards/service-card';
import StickyBox from './ui/sticky-box';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';

const ServiceDetail = ({ data }) => {
    const { push, back } = useRouter();
    const dispatch = useDispatch() 
    const {
        service,
        seller_portfolio,
        similar_services,
        faqs,
        order_requirements,
        user,
        service_items,
    } = data;
    const { isDesktop } = useResponsive()

    const pushUser = () =>
        push(`/seller/${data?.user[0]?.soff_seller_id}`);
    const priceBox = {
        days: service?.delivery_days,
        price: service?.price,
        revisions: service?.right_to_change,
        id: service?.id,
        title: service?.title,
        user: user,
    };
    const { full_name, photo_url } = user[0];
    const description = {
        description: service?.description,
        requirements: order_requirements[0]?.order_requirement_description,
        file: order_requirements[0]?.order_requirement_file,
        serviceItems: service_items,
    };

    const breadcrumbItems = useMemo(
        () => [
            {
                title: 'Buyurtmalar',
                href: '/orders',
            },
            {
                title: <span>{service?.title}</span>,
            },
        ],
        [data]
    );

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch])

    return (
        <div className="container my-5 navTabsPadding">
            <Meta title={service?.title} image={service?.poster} description={service?.description} author={full_name} />
            <div className="row">
                <div className="col-12 col-lg-8">
                    {/* <Breadcrumb
                        className="mb-3 d-flex align-items-center"
                        items={breadcrumbItems}
                    /> */}
                    <div
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                        }}
                        className="w-100">
                        <h1 className={styles.title}>{service?.title}</h1>
                        {/* <div className={styles.userMainBox}>
                            <img
                                className={styles.avatar}
                                src={photo_url || '/static/img/ozodbek.png'}
                                alt={service?.user?.full_name || 'User'}
                                style={{ cursor: 'pointer' }}
                                onClick={pushUser}
                            />
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={pushUser}
                                className={styles.username}>
                                {full_name || 'No Name'}
                            </span>
                        </div> */}
                        <ImageCarousel images={service?.poster} />
                        <ServiceDescription
                            priceBox={priceBox}
                            description={description}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <PriceBox priceBox={priceBox} />
                    <MoneyBack />
                    <UserBox priceBox={priceBox} pushUser={pushUser} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    {faqs?.length !== 0 && <FaqSection faqs={faqs} />}
                    {seller_portfolio?.length !== 0 && (
                        <PortfolioSection portfolios={seller_portfolio} />
                    )}
                </div>
            </div>

            <CommentSection type={'service_id'} id={service?.id} />

            {similar_services.length > 0 && (
                <div>
                    <h3>O'xshash xizmatlar</h3>
                    <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-2 row-gap-md-5 row-gap-lg-3'>
                        {similar_services?.map(item => (
                            <div key={item?.title} className='col px-2'>
                                <ServiceCard service={item} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isDesktop &&
                <StickyBox data={priceBox} />
            }
        </div>
    );
};

export default ServiceDetail;
