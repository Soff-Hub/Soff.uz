import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetCustomBalance = () => {
  const { user } = useSelector(state => state.auth);
  const axios = axiosInstance(user?.access);

  return useQuery({
    queryKey: ["getCustomBalance"],
    queryFn: async () => {
      const { data } = await axios.get(`users/wallet`);
      return data;
    },
    retry: 1,
    enabled: !!user?.access,
    refetchOnWindowFocus: true,
  });
};

export default useGetCustomBalance;
