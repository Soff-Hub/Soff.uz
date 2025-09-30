import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import ServiceDetail from '~/components/freeleance/services/service-deatail/ServiceDetail';
import axiosInstance from '~/shared/api/freeleanceApi';

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
        const errStatus = error.response?.status;

        if ([400, 404, 500].includes(errStatus)) {
            return { notFound: true };
        }

        return {
            props: {
                data: null,
                status: errStatus || 500,
            },
        };
    }
}

export default ServiceDetailPage;
