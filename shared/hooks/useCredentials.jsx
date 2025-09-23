import { useSelector } from 'react-redux'

export default function useCredentials() {
    const { user } = useSelector((state) => state.auth);
    return { token: user?.access }
}
