import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ImageCarousel from './ui/ImageCarousel';
import styles from './styles/detail.module.scss';
import PriceBox from './ui/PriceBox';
import MoneyBack from './ui/MoneyBack';
import UserBox from './ui/UserBox';
import ServiceDescription from './ui/ServiceDescription';
import { useRouter } from 'next/router';
import Meta from '~/shared/ui/meta';
import ServiceCard from '../../../../entities/service/service-card';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';

// Lazy load below-the-fold components
const FaqSection = dynamic(() => import('./ui/FaqSection'), {
    ssr: true, // Keep SSR for SEO
});

const PortfolioSection = dynamic(() => import('./ui/PortfolioSection'), {
    ssr: true, // Keep SSR for SEO
});

const CommentSection = dynamic(() => import('./ui/CommentSection'), {
    ssr: true, // Keep SSR for SEO
});

const StickyBox = dynamic(() => import('./ui/sticky-box'), {
    ssr: false, // No need for SSR, only shows on mobile
});

const ServiceDetail = ({ data }) => {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const {
        service,
        seller_portfolio,
        similar_services,
        faqs,
        order_requirements,
        user,
        service_items,
    } = data;
    const { isDesktop, isMobile } = useResponsive();

    const pushUser = () => push(`/seller/${data?.user[0]?.soff_seller_id}`);
    const priceBox = {
        days: service?.delivery_days,
        price: service?.price,
        revisions: service?.right_to_change,
        id: service?.id,
        title: service?.title,
        user: user,
        category: service?.category?.title,
    };
    const { full_name, photo_url } = user[0];
    const description = {
        description: service?.description,
        requirements: order_requirements[0]?.order_requirement_description,
        file: order_requirements[0]?.order_requirement_file,
        serviceItems: service_items,
    };

    const slider_images = [
        { id: 'poster-img', image_url: service?.poster },
        service?.video?.video_url
            ? {
                  type: 'video',
                  id: 'service-video',
                  video_url: service?.video?.video_url,
              }
            : null,
        ...seller_portfolio
            ?.map((portfolio) => [
                ...(portfolio?.portfolio_images?.map((elem, index) => ({
                    id: index,
                    image_url: elem?.image,
                })) || []),
                ...(portfolio?.videos?.map((vid, index) => ({
                    type: 'video',
                    id: `video-${index}`,
                    video_url: vid?.video_url,
                })) || []),
            ])
            .flatMap((i) => i),
    ].filter(Boolean);

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

    return (
        <div className="container my-5 navTabsPadding">
            <Meta
                title={service?.title}
                image={service?.poster}
                description={service?.description}
                author={full_name}
            />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                        }}
                        className="w-100">
                        <h1 className={styles.title}>{service?.title}</h1>
                        <ImageCarousel images={slider_images} />
                        <ServiceDescription
                            priceBox={priceBox}
                            description={description}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <PriceBox
                        priceBox={priceBox}
                        requirements={description.requirements}
                    />
                    <MoneyBack />
                    <UserBox
                        rating={service?.avg_rating}
                        feedbacks={service?.user?.total_feedbacks_count} // NOTE: check this
                        priceBox={priceBox}
                        pushUser={pushUser}
                    />
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
                    <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-2 row-gap-md-5 row-gap-lg-3">
                        {similar_services
                            ?.slice(0, isMobile ? 10 : 8)
                            ?.map((item) => (
                                <div key={item?.title} className="col px-2">
                                    <ServiceCard service={item} />
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {!isDesktop && <StickyBox data={priceBox} />}
        </div>
    );
};

export default ServiceDetail;
