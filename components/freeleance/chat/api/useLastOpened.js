import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/freeleanceApi';

const useLastOpened = () => {
  const { user } = useSelector(state => state.auth);
  const axios = axiosInstance(user?.access);

  return useQuery({
    queryKey: ["lastOpened"],
    queryFn: async () => {
      const { data } = await axios.get(`customer/last`);
      return data;
    }, 
    refetchOnWindowFocus: true
  });
};

export default useLastOpened;
