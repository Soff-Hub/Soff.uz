// pages/category/[slug].js
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const CategoryPage = () => {
//   const router = useRouter();
//   const { slug } = router.query;

//   useEffect(() => {
//     // Redirect to the new URL
//     router.push(`/scientific-resources/${slug}?parentCategory=${slug}`);
//   }, [slug, router]);

//   return null; // This page will redirect immediately
// };

// export default CategoryPage;


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

export default function ProductCategoryScreen({
  productsData,
  fourChildData,
  childCategoryData,
  slug, // <- parentCategory o‘rniga
  childCategory,
  page,
}) {
  const router = useRouter();

  const handlePageChange = newPage => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const title = getTitleFromSlug(fourChildData?.results, slug); // <- o‘zgarish
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
        image='/static/img/ilmiy-ishlar-2.png'
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
        author='Soff.uz'
      />

      <div className='ps-page--shop container p-lg-1'>
        <AISoffiaPresentation />
        <ScientificResourcesFilterSection
          breacrumb={fourChildData}
          count={productsData?.count}
          isLoading={false}
          childCategoryData={childCategoryData}
        />
        <ProductsByCategory
          data={productsData}
          page={page}
          handlePagination={handlePageChange}
          isLoading={false}
        />
      </div>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const {
    slug,
    page = 1,
    childCategory = '',
  } = context.query;

  const fetchJson = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return res.json();
  };

  const categoryParam = childCategory || slug;

  const productsUrl = `${baseUrlUseApi}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=48`;
  const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=file`;
  const childCategoryUrl = `${baseUrlUseApi}customer/four-child?direction=file&parent__slug=${slug}`;

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
      slug,
      childCategory,
      page,
    },
  };
}

