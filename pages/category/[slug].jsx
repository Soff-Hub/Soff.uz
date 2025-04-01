// pages/category/[slug].js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CategoryPage = ({ slug }) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new URL
    router.push(`/scientific-resources/${slug}?parentCategory=${slug}`);
  }, [slug, router]);

  return null; // This page will redirect immediately
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Pass the slug to the component as a prop
  return { props: { slug } };
}

export default CategoryPage;
