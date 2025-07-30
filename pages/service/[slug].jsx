import { Modal, Rate } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AuthModal from '~/components/AuthModal'
import SwiperPages from '~/components/details-components/swiper/swiper-page'
import PageContainer from '~/components/layouts/PageContainer'
import LoginForm from '~/components/partials/account/auth/LoginForm'
import ServiceComments from '~/components/services/details/serviceComments'
import ServiceDescription from '~/components/services/details/serviceDescription'
import ServiceImgCorusel from '~/components/services/details/serviceImgCorusel'
import ServicePackagesAccordion from '~/components/services/details/servicePackagesAccordion'
import ServicePortfolio from '~/components/services/details/servicePortfolio'
import ServiceSellerProfile from '~/components/services/details/serviceSellerProfile'
import OrderCreateContent from '~/components/services/OrderCreateContent'
import ServiceCard from '~/components/services/ServiceCard'

const ServiceDetail = ({ data }) => {
    const { service, similar_services, seller_portfolio } = data
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [pkg, setPkg] = useState();
    const { isLoggedIn } = useSelector(state => state.auth)


    return (
        <PageContainer>
            <div className='container my-5'>
                <h1 className='fs-1'>{service?.title}</h1>
                <div className='d-flex align-items-center gap-3 mb-4'>
                    <img style={{ width: '27px', borderRadius: "50%" }} src={service?.user?.photo_url || "/static/img/ozodbek.png"} alt="user img" />
                    <p style={{ fontSize: '16px' }} className='m-0 text-black'>{service?.user?.full_name}</p>
                    <Rate disabled value={service?.rating} allowHalf style={{ color: 'orange', fontSize: '16px' }} />
                    <p className='m-0'>5.0 ({service?.comments?.length} sharh)</p>
                </div>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                        <ServiceImgCorusel
                            images={service?.gallery}
                        />
                    </div>
                    <div className='col-12 col-lg-5'>
                        <ServicePackagesAccordion packages={service?.packages}  setPkg={setPkg} openModal={isLoggedIn ? setOrderModalOpen : setAuthModalOpen} />
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-12 col-lg-7'>
                        <ServiceDescription setPkg={setPkg} packages={service?.packages} openModal={isLoggedIn ? setOrderModalOpen : setAuthModalOpen} description={service?.description} />
                    </div>
                    <div className='col-12 col-lg-5'>
                        <ServiceSellerProfile user={service?.user} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                        <ServicePortfolio portfolios={seller_portfolio} />
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col-12 col-lg-7'>
                        <ServiceComments comments={service?.comments} />
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
                <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                <Modal
                    open={orderModalOpen}
                    onCancel={() => setOrderModalOpen(false)}
                    width={750}
                    footer={null}
                >
                    <OrderCreateContent serviceName={service?.title} pkg={pkg} />
                </Modal>
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