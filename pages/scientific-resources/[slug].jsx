import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import ScientificResourcesFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/ScientificResourcesFilterSection';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import AISoffiaPresentation from '~/components/elements/AISoffiaPresentation';
import CategorySearchSection from '~/components/elements/CategorySearchSection';
import styles from '../../components/blocks/catalogsSection/catalogs.module.scss';

import { serialize } from 'cookie';
import Image from 'next/image';
import GrayMentionCard from '~/components/blocks/cards/GrayMentionCard';

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
    search,
    productsUrl,
}) {
    const router = useRouter();

    const handlePageChange = newPage => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage },
        });
    };

    const title = getTitleFromSlug(fourChildData?.results, parentCategory);
    const subTitle = getTitleFromSlug(
        childCategoryData?.results,
        childCategory
    );

    const fullTitle =
        title && subTitle
            ? `${title} - ${subTitle}`
            : title
            ? title
            : 'Ilmiy ishlar kategoriyasi';

    return (
        <PageContainer title={fullTitle} boxed={true}>
            <Meta
                title={fullTitle}
                description={
                    fullTitle +
                    ' bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!'
                }
                image="/static/img/ilmiy-ishlar-2.png"
                keywords={[
                    { name: 'Biznes rejalar' },
                    { name: 'Taqdimotlar' },
                    { name: 'Kurs ishlari' },
                    { name: 'Diplom ishlari' },
                    { name: 'Referatlar' },
                    { name: 'Mustaqil ishlar' },
                    { name: 'Labaratoriya Ishlari' },
                    { name: 'Dissertatsiya ishlari' },
                    { name: 'Testlar' },
                    { name: "O'quv qo'llanmalar" },
                    { name: 'MustDars ishlanmalaraqil' },
                    { name: 'Tarqatma materiallar' },
                    { name: 'Amaliy ishlar' },
                    { name: 'Blankalar' },
                    { name: 'Ijodiy Ishlar' },
                    { name: 'Loyihalar' },
                    { name: 'Plakatlar' },
                    { name: 'Elektron kitoblar' },
                    { name: 'Dasturlash tillari' },
                ]}
                author="Soff.uz"
            />

            <div className="ps-page--shop container p-lg-1 my-5">
                <div className="mb-4">
                    <AISoffiaPresentation />
                </div>
                <CategorySearchSection />
                <ScientificResourcesFilterSection
                    breacrumb={fourChildData}
                    count={productsData?.count}
                    isLoading={false}
                    childCategoryData={childCategoryData}
                />
                <ProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={false}
                />
            </div>
            <div className={styles.catalogSectionBlock}>
                <div className="container mx-auto px-5">
                    <section className={styles.howItWorksSection}>
                        <div className="d-flex justify-content-center my-5">
                            <Image
                                width={30}
                                height={30}
                                src={'/static/img/star.png'}
                                alt="starts"
                            />
                        </div>
                        <h2>
                            Tayyor mahsulotlardan foydalanish qanday ishlaydi?
                        </h2>
                        <div className={styles.steps}>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogMenu.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Qidiring va tanlang</h3>
                                    <p>
                                        Katalogdan yoki qidiruv orqali sizga
                                        kerakli tayyor mahsulotni toping.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogCoin.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Sotib oling</h3>
                                    <p>
                                        Xavfsiz to‘lov tizimi orqali mahsulotni
                                        sotib oling — narx va shartlar oldindan
                                        ko‘rinadi.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogSecure.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>Yuklab oling va foydalaning</h3>
                                    <p>
                                        Mahsulotni darhol yuklab oling va
                                        ishlatishni boshlang.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div>
                        <GrayMentionCard
                            title="Kerakli mahsulotni topa olmadingizmi? Buyurtma
                                berishingiz mumkin."
                            btn="Buyurtmar berish"
                            link="/orders?direction=scientific_work"
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const {
        slug,
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
    } = context.query;

    const fetchJson = async url => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=48&search=${search}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=file`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);
    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory,
            childCategory,
            page,
            search,
            productsUrl,
        },
    };
}
