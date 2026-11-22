import { useDispatch, useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import {
    setCartDataItems,
    setCartItemDataItems,
    setPlaylistCartDataItems,
    setPlaylistCartItemDataItems,
} from '~/store/ecomerce/slice';
import { safeLocalStorage } from '../utilities/safe-local-storage';

export default function useCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.ecomerce.cartDataItems);
    const playlistCartItems = useSelector((state) => state.ecomerce.playlistCartDataItems); // Access playlists

    return {
        cartItems,
        playlistCartItems, // Return playlists
        setAllCartItem: async () => {
            const data = JSON.parse(safeLocalStorage.getItem('cart'));
            if (data?.length > 0) {
                const resp = await ProductRepository.postCartData(data);
                if (resp?.data) {
                    dispatch(setCartDataItems(resp.data.data));
                }
            }
        },

        setCartOneItem: async (newItem) => {
            const resp = await ProductRepository.postCartData([newItem]);
            if (resp?.data) {
                if (cartItems.every((el) => el.id !== newItem)) {
                    dispatch(setCartItemDataItems(resp.data.data));
                }
            }
        },

        removeCartOneItem: (newItem) => {
            const filtered = cartItems.filter((el) => el.id !== newItem);
            dispatch(setCartDataItems(filtered));
        },

        // Playlist functions
        setPlaylistCartOneItem: (playlist) => {
            if (playlistCartItems.every((el) => el.id !== playlist.id)) {
                dispatch(setPlaylistCartItemDataItems(playlist));
            }
        },

        removePlaylistCartOneItem: (playlistId) => {
            const filtered = playlistCartItems.filter((el) => el.id !== playlistId);
            dispatch(setPlaylistCartDataItems(filtered));
        },

        removeAll: () => {
            dispatch(setCartDataItems([]));
            dispatch(setPlaylistCartDataItems([]));
        },

        removeItems: () => { },
    };
}
