import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAffiliateId } from '~/store/affiliate/slice';

const AffiliateListener = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.isReady) {
            const affiliateId = router.query.affiliate;
            if (affiliateId) {
                dispatch(setAffiliateId(affiliateId));
            }
        }
    }, [router.isReady, router.query.affiliate, dispatch]);

    return null;
};

export default AffiliateListener;
