import { useDispatch, useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { setSaved, setSavedItem } from '~/store/ecomerce/slice';
export default function useWishlist() {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.ecomerce);

    return {
        wishlist,
        setAllSaved: async () => {
            const data = JSON.parse(localStorage.getItem('wishlist'));
            if (data?.length > 0) {
                const resp = await ProductRepository.postCartData(data);
                if (resp?.data) {
                    dispatch(setSaved(resp.data.data));
                }
            }
        },

        addSavedItem: async (newItem) => {
            const resp = await ProductRepository.postCartData([newItem]);
            if (resp?.data) {
                if (wishlist.every((el) => el.id !== newItem)) {
                    dispatch(setSavedItem(resp.data.data));
                }
            }
        },

        isSavedItem: (itemId) => {
            return wishlist.some((el) => el.id === itemId);
        },

        removeSavedItem: (newItem) => {
            const filtered = wishlist.filter((el) => el.id !== newItem);
            dispatch(setSaved(filtered));
        },

        removeAllSaved: () => {
            dispatch(setSaved([]));
        },
    };
}
