import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freleance/api/axiosInstance';


const useGetServiceById = (id) => {
    const { user } = useSelector(state => state.auth)

    return useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const axios = axiosInstance(user?.access)
            const response = await axios.get(`seller-services/${id}`)
            return response.data
        },
        enabled: !!user?.access
    })
}

export default useGetServiceById