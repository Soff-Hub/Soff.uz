import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const useOrdersStatus = () => {
  const { user } = useSelector(state => state.auth);
  const axios = axiosInstance(user?.access);

  return useQuery({
    queryKey: ["ordersStatus"],
    queryFn: async () => {
      const { data } = await axios.get(`order/order-status-doing/`);
      return data;
    },
    enabled: !!user?.access, 
    refetchOnWindowFocus: true,
  });
};

export default useOrdersStatus;