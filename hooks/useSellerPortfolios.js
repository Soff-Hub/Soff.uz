import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useSellerPortfolios(pid, parentCategory, childCategory) {
  return useQuery({
    queryKey: ['portfolios', pid, parentCategory, childCategory],
    queryFn: async () => {
      const query = new URLSearchParams();
      query.append('soff_seller_id', pid);
      if (parentCategory !== 'all') query.append('category_id', parentCategory);
      if (childCategory !== 'all') query.append('subcategory_id', childCategory);
      const { data } = await axios.get(`http://176.96.241.219:8005/api/v1/categories/portfolio?${query}`);
      return data;
    },
    enabled: !!pid, // faqat pid bor bo‘lsa chaqirilsin
  });
}