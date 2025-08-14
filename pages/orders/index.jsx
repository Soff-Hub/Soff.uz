import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ServicesFilterSection from '~/components/freeleance/services/ServicesFilterSection';
import ServicesCardSection from '~/components/freeleance/services/ServicesCardSection';




export default function SoffFreelancerPage({ servicesData, parentCategory, childCategory }) {
    console.log(servicesData)
    return (
        <PageContainer>
            <Meta
                title={'Raqamli mahsulot buyurtma berish - Soff.uz'}
                description={'Soff.uz orqali raqamli mahsulotlarga buyurtma bering. Ishonchli sotuvchilar va sifatli kontent bilan tez va oson xizmatlardan foydalaning.'}
                image="/static/img/video-darsliklar-2.png"
                keywords={[{ name: "Biznes rejalar buyurtma berish" }, { name: "Taqdimotlar buyurtma berish" }, { name: "Kurs ishlari buyurtma berish" }, { name: "Diplom ishlari buyurtma berish" }, { name: "Referatlar buyurtma berish" }, { name: "Mustaqil ishlar buyurtma berish" }, { name: "Labaratoriya Ishlari buyurtma berish" }, { name: "Dissertatsiya ishlari buyurtma berish" }, { name: "Testlar buyurtma berish" }, { name: "O'quv qo'llanmalar buyurtma berish" }, { name: "MustDars ishlanmalaraqil buyurtma berish" }, { name: "Tarqatma materiallar buyurtma berish" }, { name: "Amaliy ishlar buyurtma berish" }, { name: "Blankalar buyurtma berish" }, { name: "Ijodiy Ishlar buyurtma berish" }, { name: "Loyihalar buyurtma berish" }, { name: "Plakatlar buyurtma berish" }, { name: "Elektron kitoblar buyurtma berish" }, { name: "Dasturlash tillari" }]}
                author="Soff.uz"
            />

            <div className='ps-page--shop my-5 container p-xl-0 p-l-0'>
                <ServicesFilterSection parentCategory={parentCategory} childCategory={childCategory} count={servicesData?.total_service} />


                <ServicesCardSection services={servicesData} />
            </div>



        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const {
        category_id = '',
        parent_category_id = '',
        search = '',
        direction = '',
        limit = 20,
        offset = 0
    } = query;

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(search && { search }),
        ...(direction && { direction }),
        limit,
        offset
    });

    const servicesUrl = `http://176.96.241.219:8005/api/v1/customer?${servicesQuery.toString()}`;
    const parentCategoryUrl = `http://176.96.241.219:8005/api/v1/categories/`;
    console.log(servicesUrl)

    const [servicesRes, parentCategoryRes] = await Promise.all([
        fetch(servicesUrl),
        fetch(parentCategoryUrl)
    ]);

    const servicesData = servicesRes.ok ? await servicesRes.json() : null;
    const parentCategory = parentCategoryRes.ok ? await parentCategoryRes.json() : null;

    let childCategory = [];
    if (parent_category_id) {
        const childCategoryRes = await fetch(
            `http://176.96.241.219:8005/api/v1/categories?parent_id=${parent_category_id}`
        );
        childCategory = childCategoryRes.ok ? await childCategoryRes.json() : [];
    }

    return {
        props: {
            servicesData,
            parentCategory,
            childCategory, 
        },
    };
}
