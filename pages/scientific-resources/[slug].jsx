import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { getTitleFromSlug } from '~/widgets/home/filters';
import { useRouter } from 'next/router';
import { baseUrlUseApi } from '~/repositories/useApi';
import styles from '~/widgets/home/catalog/style.module.scss';
import Image from 'next/image';
import ProductFilterSection from '~/components/elements/product-filter-section/ProductFilterSection';
import GrayCard from '~/widgets/gray-card';

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

export default function ProductCategoryScreen({
    productsData,
    fourChildData,
    childCategoryData,
    parentCategory,
    childCategory,
    page,
}) {
    const { t } = useTranslation('product-pages');
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

    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title;

    const defaultTitle = t('titles.scientificResources');
    const finalTitle = fullTitle || defaultTitle;

    return (
        <PageContainer>
            <Meta
                title={finalTitle}
                description={finalTitle + t('meta.scientificDescription')}
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
                            {t('howItWorks.title')}
                        </h2>
                        <div className={styles.steps}>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogMenu.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>
                                        {t('howItWorks.steps.search.title')}
                                    </h3>
                                    <p>
                                        {t(
                                            'howItWorks.steps.search.description'
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogCoin.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>
                                        {t('howItWorks.steps.purchase.title')}
                                    </h3>
                                    <p>
                                        {t(
                                            'howItWorks.steps.purchase.description'
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.stepItem}>
                                <img
                                    src={'/static/img/catalogSecure.png'}
                                    alt="starts"
                                />
                                <div>
                                    <h3>
                                        {t('howItWorks.steps.download.title')}
                                    </h3>
                                    <p>
                                        {t(
                                            'howItWorks.steps.download.description'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <GrayCard
                        title={t('grayCard.title')}
                        btn={t('grayCard.button')}
                        link="/orders?direction=scientific_work"
                    />
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { locale } = context;
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

    const queryParams = new URLSearchParams({
        direction: type,
        page,
        page_size: 50,
    });

    const categoryParam = childCategory ? childCategory : parentCategory;
    if (search) queryParams.append('search', search);
    if (categoryParam) queryParams.append('category', categoryParam);
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
    if (Number(from_page)) queryParams.append('from_page', from_page);
    if (Number(to_page) < 100) queryParams.append('to_page', to_page);

    const fetchJson = async (url) => {
        const res = await fetch(url, {
            headers: {
                'Accept-Language': locale,
            },
        });
        if (!res.ok) {
            return null;
        }
        return res.json();
    };

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;

    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        parentCategory ? fetchJson(childCategoryUrl) : null,
    ]);

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'product-pages',
                'card',
                'modals',
            ])),
            productsData: productsData,
            fourChildData: fourChildData,
            childCategoryData: childCategoryData,
            parentCategory,
            childCategory,
            page,
            search,
            productsUrl,
            content_extensions,
        },
    };
}
