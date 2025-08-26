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
  });
}

export default useNavCategories