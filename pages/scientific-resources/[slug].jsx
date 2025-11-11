import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { getTitleFromSlug } from '~/components/elements/ScientificResourcesFilterSection';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import styles from '~/widgets/home/catalog/style.module.scss';
import Image from 'next/image';
import ProductFilterSection from '~/components/elements/product-filter-section/ProductFilterSection';
import GrayCard from '~/widgets/gray-card';

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
}) {
    const router = useRouter();

    const handlePageChange = (newPage) => {
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
        <PageContainer>
            <Meta
                title={fullTitle}
                description={
                    fullTitle +
                    ' bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!'
                }
                image="https://soff.uz/static/img/ilmiy-ishlar-2.png"
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

            <ProductFilterSection
                isFile
                child={childCategoryData?.results}
                parent={fourChildData?.results}
                path={'/scientific-resources/'}
            />
            <div className="ps-page--shop container p-lg-1 my-5">
                <ProductsByCategory
                    data={productsData}
                    page={page}
                    handlePagination={(number) => {
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
                                src={'/static/img/star.svg'}
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
                    <GrayCard
                        title="Kerakli mahsulotni topa olmadingizmi? Buyurtma
                                berishingiz mumkin."
                        btn="Buyurtmar berish"
                        link="/orders?direction=scientific_work"
                    />
                </div>
            </div>
            {/* <div className="servicesSpace" /> */}
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
        category = '',
        content_extensions = [],
        price_from = '',
        price_to = '',
        from_page = '',
        to_page = '',
    } = context.query;

    const queryParams = new URLSearchParams({
        direction: 'file',
        page,
        page_size: 50,
        search,
    });

    if (category) queryParams.append('category', category);
    if (content_extensions && content_extensions.length) {
        const exts = Array.isArray(content_extensions)
            ? content_extensions
            : [content_extensions];

        exts.forEach((ext) => {
            queryParams.append('content_extensions', ext);
        });
    }

    if (price_from) queryParams.append('price_from', price_from);
    if (price_to) queryParams.append('price_to', price_to);
    if (from_page) queryParams.append('from_page', from_page);
    if (to_page) queryParams.append('to_page', to_page);

    const fetchJson = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const categoryParam = childCategory ? childCategory : parentCategory;

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}&category=${categoryParam}`;
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
