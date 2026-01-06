import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAffiliateId } from '~/store/affiliate/slice';

const AffiliateListener = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { affiliate } = router.query;
    const isRouterReady = router.isReady;

    useEffect(() => {
        if (affiliate && isRouterReady) {
            dispatch(setAffiliateId(affiliate));
        }
    }, [isRouterReady, affiliate]);

    return null;
};

export default AffiliateListener;
