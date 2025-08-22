import React from 'react'
import ImageCarousel from './ui/ImageCarousel'
import styles from "./styles/detail.module.scss"
import PriceBox from './ui/PriceBox'
import MoneyBack from './ui/MoneyBack'
import UserBox from './ui/UserBox'
import ServiceDescription from './ui/ServiceDescription'
import FaqSection from './ui/FaqSection'
import PortfolioSection from './ui/PortfolioSection'
import SwiperPages from '~/components/details-components/swiper/swiper-page'
import ServiceCard from '../ServiceCard'
import { useRouter } from 'next/router'
import CommentSection from './ui/CommentSection'

const ServiceDetail = ({ data }) => {
    const { push } = useRouter()
    const { service, seller_portfolio, similar_services, faqs, order_requirements, user, service_items } = data 
    
    const pushUser = () => push(`/_seller/${data?.user[0]?.soff_seller_id}#about_author`)
    const priceBox = {
        days: service?.delivery_days,
        price: service?.price,
        revisions: service?.right_to_change,
        id: service?.id,
        title: service?.title,
        user: user
    }
    const { full_name, photo_url } = user[0]
    const description = {
        description: service?.description,
        requirements: order_requirements[0]?.order_requirement_description,
        file: order_requirements[0]?.order_requirement_file,
        serviceItems: service_items
    } 
 

    return (
        <div style={{ maxWidth: "1400px" }} className='container my-5'>
            <div className='row'>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px" }} className='col-12 col-md-8'>
                    <h1 className={styles.title}>{service?.title}</h1>
                    <div className={styles.userBox}>
                        <img
                            className={styles.avatar}
                            src={photo_url || "/static/img/ozodbek.png"}
                            alt={service?.user?.full_name || "User"}
                            style={{cursor: "pointer"}}
                            onClick={pushUser}
                        />
                        <span style={{cursor: "pointer"}} onClick={pushUser} className={styles.username}>{full_name || "No Name"}</span>
                    </div>
                    <ImageCarousel images={service?.poster} />
                    <ServiceDescription priceBox={priceBox} description={description} />
                </div>
                <div className='col-12 col-md-4'>
                    <PriceBox priceBox={priceBox} />
                    <MoneyBack />
                    <UserBox priceBox={priceBox} pushUser={pushUser} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-8 p-0'>
                    <FaqSection faqs={faqs} />
                    <PortfolioSection portfolios={seller_portfolio} />
                </div>
            </div>
       
            <CommentSection type={"service_id"} id={service?.id} />
            
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