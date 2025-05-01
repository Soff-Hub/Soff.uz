// pages/category/[slug].js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Redirect to the new URL
    router.push(`/scientific-resources/${slug}?parentCategory=${slug}`);
  }, [slug, router]);

  return null; // This page will redirect immediately
};

export default CategoryPage;
