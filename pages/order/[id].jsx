import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import OrderDetailMain from '~/features/freelancers/myorders/order-detail/OrderDetailMain';
import BreadCrumb from '~/shared/ui/breadcrumb';
import { useSafeBack } from '~/shared/hooks/useSafeBack';

const OrderDatail = ({ orderData }) => {
    const safeBack = useSafeBack();

    const breadCrumbItems = [
        {
            url: '/',
            text: 'Oldingi sahifa',
            action: safeBack,
        },
        {
            key: 'current',
            text: 'Mening buyurtmalarim',
        },
    ];

    return (
        <PageLayout>
            {/* NOTE: IF ssr is needed we can uncomment */}
            {/* <Head>
                <title>
                    #{orderData?.id} {orderData?.title}
                </title>
                <meta name="description" content={orderData} />
                <meta name="robots" content="noindex, nofollow" />
            </Head> */}
            <BreadCrumb
                breacrumb={breadCrumbItems}
                layout="fullwidth"
                fixedToHeader
            />
            <div className="container">
                <OrderDetailMain orderData={orderData} />
            </div>
        </PageLayout>
    );
};

// NOTE: Uncomment this function if you want to use server-side rendering to fetch order data
// EXPLANATION: As long as it is private page, it is better to fetch data on client side after checking user authentication
// export async function getServerSideProps(context) {
//     const { id } = context.params;

//     const orderPath = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/order/${id}`;
//     const token = context.req.cookies['token'] || null;

//     const fetchJson = async (url) => {
//         try {
//             const res = await fetch(url, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!res.ok) return null;
//             return await res.json();
//         } catch {
//             return null;
//         }
//     };

//     const [orderData] = await Promise.all([fetchJson(orderPath)]);

//     if (!orderData) {
//         return {
//             notFound: true,
//         };
//     }

//     return {
//         props: {
//             orderData: orderData,
//         },
//     };
// }

export default OrderDatail;
