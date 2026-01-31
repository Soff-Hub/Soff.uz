import { useDispatch, useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { setSaved, setSavedItem } from '~/store/ecomerce/slice';
import { safeLocalStorage } from '../utilities/safe-local-storage';
export default function useWishlist() {
    const dispatch = useDispatch();
    const { ecomerce } = useSelector((state) => state);
    const wishlist = ecomerce?.wishlist || [];
    const cartItems = ecomerce?.cartDataItems || [];

    return {
        wishlist,
        setAllSaved: async () => {
            const data = JSON.parse(safeLocalStorage.getItem('wishlist'));
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
            return cartItems.some((el) => el.id === itemId);
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
