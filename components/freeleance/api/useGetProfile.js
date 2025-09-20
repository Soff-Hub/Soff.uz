import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const useGetProfile = () => {
    const { user } = useSelector(state => state.auth);

    return useQuery({
        queryKey: ['new_profile'],
        queryFn: async () => {
            const { data } = await Axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-profile/`,
                {
                    headers: {
                        Authorization: `Bearer ${user?.access}`
                    },
                }
            );
            return data;
        },
        enabled: !!user?.access,
    });
};

export default useGetProfile;
