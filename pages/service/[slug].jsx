import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageContainer from '~/widgets/layouts/PageContainer';
import ServiceDetail from '~/features/freelancers/services/service-deatail/ServiceDetail';
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

        const { locale } = context;
        return {
            props: {
                data,
                status,
                ...(await serverSideTranslations(locale, [
                    'orders',
                    'header',
                    'footer',
                    'common',
                    'modals',
                ])),
            },
        };
    } catch (error) {
        const errStatus = error.response?.status;

        if ([400, 404, 500].includes(errStatus)) {
            return { notFound: true };
        }

        const { locale } = context;
        return {
            props: {
                data: null,
                status: errStatus || 500,
                ...(await serverSideTranslations(locale, [
                    'orders',
                    'header',
                    'footer',
                    'common',
                    'modals',
                ])),
            },
        };
    }
}

export default ServiceDetailPage;
