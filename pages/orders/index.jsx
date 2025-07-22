import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ServicesFilterSection from '~/components/services/ServicesFilterSection';
import ServicesCardSection from '~/components/services/ServicesCardSection';




export default function SoffFreelancerPage({ servicesData }) {
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
        <ServicesFilterSection count={servicesData.count} />


        <ServicesCardSection services={servicesData} />
      </div>



    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const {
    direction,
  } = context.query

  const fetchJson = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return res.json();
  };

  const servicesUrl = `http://176.96.241.219:8005/api/v1/users/sellers/service?direction=${direction}`

  const [servicesData] = await Promise.all([
    fetchJson(servicesUrl)
  ])

  return {
    props: {
      servicesData: servicesData || null
    }
  }
}