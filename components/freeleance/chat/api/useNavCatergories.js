import { useQuery } from "@tanstack/react-query";
import { apiForFreelance } from "~/repositories/api";

const useNavCategories = () => {
  return useQuery({
    queryKey: ['navbarItems'],
    queryFn: async () => {
      const response = await apiForFreelance.get(
        'categories/categories-with-directions'
      );
      return response.data
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 10,
  });
}

export default useNavCategories