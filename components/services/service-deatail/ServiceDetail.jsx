import React from 'react'
import ImageCarousel from './components/ImageCarousel'
import styles from "./styles/detail.module.scss"
import PriceBox from './components/PriceBox'
import MoneyBack from './components/MoneyBack'
import UserBox from './components/UserBox'
import ServiceDescription from './components/ServiceDescription'
import FaqSection from './components/FaqSection'
import PortfolioSection from './components/PortfolioSection'
import SwiperPages from '~/components/details-components/swiper/swiper-page'
import ServiceCard from '../ServiceCard'

const ServiceDetail = ({ data }) => {
    const { service, seller_portfolio, similar_services, faqs, order_requirements } = data
    const priceBox = {
        days: service?.delivery_days,
        price: service?.price,
        revisions: service?.right_to_change,
        id: service?.id
    }

    const description = {
        description: service?.description,
        requirements: order_requirements[0]?.order_requirement_description,
        file: order_requirements[0]?.order_requirement_file,
        serviceItems: service?.service_items
    }
    return (
        <div style={{ maxWidth: "1400px" }} className='container my-5'>
            <div className='row'>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px" }} className='col-12 col-md-8'>
                    <h1 className={styles.title}>{service?.title}</h1>
                    <div className={styles.userBox}>
                        <img className={styles.avatar} src={service?.user?.photo_url || "/static/img/ozodbek.png"} alt="user img" />
                        <span className={styles.username}>{service?.user?.full_name}</span>
                    </div>
                    <ImageCarousel images={service?.poster} />
                    <ServiceDescription priceBox={priceBox} description={description} />
                </div>
                <div className='col-12 col-md-4'>
                    <PriceBox priceBox={priceBox} />
                    <MoneyBack />
                    <UserBox user={service?.user} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-8 p-0'>
                    <FaqSection faqs={faqs} />
                    <PortfolioSection portfolios={seller_portfolio} />
                </div>
            </div>
            {
                similar_services.length > 0 &&
                <div>
                    <h3>O'xshash xizmatlar</h3>
                    <SwiperPages type={'file'}>
                        {similar_services?.map(p => (
                            <ServiceCard product={p} />
                        ))}
                    </SwiperPages>
                </div>
            }
        </div>
    )
}

export default ServiceDetail