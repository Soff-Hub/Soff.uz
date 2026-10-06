import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setAffiliateId } from '~/store/affiliate/slice';
import { loadAffiliate, saveAffiliate } from '~/shared/utilities/affiliate';

const AffiliateListener = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { affiliate } = router.query;
    const isRouterReady = router.isReady;

    useEffect(() => {
        if (!isRouterReady) return;
        // A new link replaces the saved code (last click wins).
        if (typeof affiliate === 'string' && affiliate) {
            saveAffiliate(affiliate);
            dispatch(setAffiliateId(affiliate));
            return;
        }
        const saved = loadAffiliate();
        if (saved) dispatch(setAffiliateId(saved));
    }, [isRouterReady, affiliate]);

    return null;
};

export default AffiliateListener;
