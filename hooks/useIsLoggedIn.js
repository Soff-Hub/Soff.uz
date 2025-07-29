import { useSelector } from 'react-redux';

export const useIsLoggedIn = () => {
    return useSelector(state => state.auth.isLoggedIn);
};
