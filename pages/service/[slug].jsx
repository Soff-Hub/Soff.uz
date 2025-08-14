import React, { useState } from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import ServiceDetail from '~/components/freeleance/services/service-deatail/ServiceDetail'
import axiosInstance from '~/components/freeleance/api/freeleanceApi'

const ServiceDetailPage = ({ data }) => {
    return (
        <PageContainer>
            <ServiceDetail data={data} />
        </PageContainer>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params
    const axios = axiosInstance()

    const { data } = await axios.get(`http://176.96.241.219:8005/api/v1/customer/${slug}/`)

    return {
        props: {
            data
        }
    }
}

export default ServiceDetailPage