import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import { buildSearchUrl, normalizeProducts, resolveCategoryId } from '~/shared/utilities/api-helpers';
import styles from '~/widgets/home/catalog/style.module.scss';
import Image from 'next/image';
import ProductFilterSection, {
    getTitleFromSlug,
} from '~/components/elements/product-filter-section/ProductFilterSection';
import GrayCard from '~/widgets/gray-card';
import fetchJson from '~/shared/api/fetch-json';

const metaProps = {
    image: 'https://soff.uz/static/img/ilmiy-ishlar-2.png',
    keywords: [
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
    ],
    author: 'Soff.uz',
};

const type = 'file';
const defaultTitle = 'Ilmiy ishlar kategoriyasi';

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
}) {
    const router = useRouter();
    // `/scientific-resources` and `/scientific-resources/all` serve the same listing;
    // point search engines at the `/all` URL that internal links use.
    const canonicalUrl = `https://soff.uz/scientific-resources/${router.query.slug || 'all'}`;

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

    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title;

    const finalTitle = fullTitle || defaultTitle;

    return (
        <PageContainer>
            <Meta
                canonicalUrl={canonicalUrl}
                title={finalTitle}
                description={
                    finalTitle +
                    ' bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!'
                }
                {...metaProps}
            />

            <ProductFilterSection
                isFile
                title={fullTitle}
                child={childCategoryData?.results}
                parent={fourChildData?.results}
                path={'/scientific-resources/'}
            />
            <div className="ps-page--shop container p-lg-10 p-l-0">
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
                <div className="container mx-auto">
                    <section className={styles.howItWorksSection}>
                        <div className="d-flex justify-content-center my-5">
                            <Image
                                width={30}
                                height={30}
                                src={'/static/img/star.svg'}
                                alt="starts"
                            />
                        </div>
                        <h2
                            style={{
                                marginBottom: '80px',
                            }}>
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
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const type = 'file';
    const {
        page = 1,
        parentCategory = '',
        childCategory = '',
        search = '',
        content_extensions = [],
        price_from = '',
        price_to = '',
        from_page = '',
        to_page = '',
    } = context.query;

    const productsUrl = buildSearchUrl(context.query, 'file', 50);
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsDataRaw, fourChildData, childCategoryData] = await Promise.all([
        null, // Initial fetch deferred until IDs are resolved
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl),
    ]);

    // Resolve numeric IDs from slugs
    const resolvedParentId = resolveCategoryId(parentCategory, fourChildData);
    const resolvedChildId = resolveCategoryId(childCategory, childCategoryData);

    // Build URL with numeric IDs
    const finalProductsUrl = buildSearchUrl({
        ...context.query,
        parentCategoryId: resolvedParentId,
        childCategoryId: resolvedChildId
    }, 'file', 50);

    const productsDataRawFinal = await fetchJson(finalProductsUrl);
    const productsData = normalizeProducts(productsDataRawFinal);

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
            content_extensions,
        },
    };
}
