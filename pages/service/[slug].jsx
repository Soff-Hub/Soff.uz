import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import ServiceDetail from '~/components/freeleance/services/service-deatail/ServiceDetail';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const ServiceDetailPage = ({ data, status }) => {
    return (
        <PageContainer>
            <ServiceDetail data={data} status={status} />
        </PageContainer>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const axios = axiosInstance();

    try {
        const { data, status } = await axios.get(
            `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/customer/${slug}/`
        );

        return {
            props: {
                data,
                status,
            },
        };
    } catch (error) {
        if (error.response?.status === 404) {
            return { notFound: true }; // Next.js avtomatik 404 page render qiladi
        }

        return {
            props: {
                data: null,
                status: error.response?.status || 500,
            },
        };
    }
}

export default ServiceDetailPage;
