import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import DevelopmentAndItProductsByCategory from '~/components/partials/ItServicesCategory/DevelopmentAndItProductsByCategory';
import DevelopmentAndItFilterSecion from '~/components/elements/ItServicesCategoriesFilter/DevelopmentAndItFilterSecion';

export default function DevelopmentAndIt () {
    const router = useRouter();
    const { slug, page, parentCategory, childCategory } = router.query;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://176.96.241.219:8005/api/v1/users/sellers`)
            .then(res => res.json())
            .then(data => {
                setData(data?.results);
                console.log('data=>>>><', data);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    console.log('Data', data);

    // Pagination tugmalari uchun funksiya
    const handlePageChange = newPage => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }, // URL'ga yangi page qo'shish
        });
    };

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Ilmiy ishlar kategoriyasi'}
            boxed={true}>
            <Meta
                title={`${'Ilmiy ishlar kategoriyasi'}`}
                description={`Ilmiy ishlar kategoriyasi: Audio materiallar Biznes rejalar Video materiallar Taqdimotlar Tayyor shablonlar Kurs ishlari Diplom ishlari Referatlar Mustaqil ishlar Labaratoriya Ishlari Dissertatsiya ishlari Testlar O'quv qo'llanmalar Dars ishlanmalar Tarqatma materiallar Amaliy ishlar Blankalar Ijodiy Ishlar Loyihalar Plakatlar Maqola Ixtiro patenti Namunaviy hujjatlar Statistika Elektron kitoblar Dasturlash tillari `}
            />

            <div className='ps-page--shop container p-lg-1'>
                {data?.length === 0 ? (
                    <div className='DevelopmentAndItCategory_DontWork'>
                        <img
                            src='/static/img/DevelopmentAndItCategory_DontWorkImg.png'
                            alt=''
                        />
                        <p className='DevelopmentAndItCategory_DontWorkTitle'>
                            Yangi imkoniyatlar tez orada siz bilan!
                        </p>
                        <p className='DevelopmentAndItCategory_DontWorkDescription'>
                            Hozircha bu yerda xizmatlar yo‘q. Xaridor sifatida
                            siz yaqin orada yangi xizmatlarni topishingiz
                            mumkin. Sotuvchi sifatida esa hoziroq birinchi
                            bo‘lib o‘z xizmatlaringizni qo‘shib, bozorda
                            yetakchi bo‘lishingiz mumkin!
                        </p>
                        <a className='DevelopmentAndItCategory_DontWorkBtn'>
                            Bosh sahifa
                        </a>
                    </div>
                ) : (
                    <>
                        <DevelopmentAndItFilterSecion
                            breacrumb={data}
                            count={data?.count}
                            // isLoading={isFourChildLoading}
                            // childCategoryData={childCategoryData}
                        />
                        <DevelopmentAndItProductsByCategory
                            data={data}
                            page={page}
                            handlePagination={handlePageChange}
                            isLoading={isLoading}
                        />
                    </>
                )}
            </div>

            <FooterComponents />
        </PageContainer>
    );
}
