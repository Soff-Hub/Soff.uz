import { Rate } from 'antd'
import React from 'react'
import SwiperPages from '~/components/details-components/swiper/swiper-page'
import PageContainer from '~/components/layouts/PageContainer'
import ServiceComments from '~/components/services/details/serviceComments'
import ServiceDescription from '~/components/services/details/serviceDescription'
import ServiceImgCorusel from '~/components/services/details/serviceImgCorusel'
import ServicePackagesAccordion from '~/components/services/details/servicePackagesAccordion'
import ServicePortfolio from '~/components/services/details/servicePortfolio'
import ServiceSellerProfile from '~/components/services/details/serviceSellerProfile'
import ServiceCard from '~/components/services/ServiceCard'

const ServiceDetail = ({ data }) => {
    const { service, similar_services } = data
    console.log(data)
    return (
        <PageContainer>
            <div className='container my-5'>
                <h1 className='fs-1'>{service?.title}</h1>
                <div className='d-flex align-items-center gap-3 mb-4'>
                    <Rate disabled value={4} allowHalf style={{ color: 'orange', fontSize: '16px' }} />
                    <p className='m-0'>5.0 ({service?.comments?.length} sharh)</p>
                </div>
                <div className='row'>
                    <div className='col-7'>
                        <ServiceImgCorusel
                            images={service?.gallery}
                        />
                    </div>
                    <div className='col-5'>
                        <ServicePackagesAccordion />
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-7'>
                        <ServiceDescription description={service?.description} />
                    </div>
                    <div className='col-5'>
                        <ServiceSellerProfile />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-7'>
                        <ServicePortfolio portfolios={service?.portfolio} />
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-7'>
                        <ServiceComments comments={service?.comments}/>
                    </div>
                </div>
                <div>
                    <h3>O'xshash xizmatlar</h3>
                    <SwiperPages type={'file'}>
                        {similar_services?.map(p => (
                            <ServiceCard product={p} />
                        ))}
                    </SwiperPages>
                </div>
            </div>
        </PageContainer>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params

    const res = await fetch(`http://176.96.241.219:8005/api/v1/services/${slug}/`)
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}

export default ServiceDetail