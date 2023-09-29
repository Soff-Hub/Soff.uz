import React, { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
    setCompareItems,
    setWishlistTtems,
    setCartItems,
} from '~/store/ecomerce/action';
export default function useEcomerce() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart', 'wishlist']);
    const [products, setProducts] = useState(null);
    return {
        loading,
        cartItemsOnCookie,
        products,
        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (true) {
                let queries = '';
                payload?.forEach((item) => {
                    queries = `${item.id}`;
                });
                const responseData = await ProductRepository.getProductsByIds(
                    queries
                );
                if (responseData) {
                    if (group === 'cart' || group === 'wishlist') {
                        let cartItems = payload;
                        cartItems?.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
                            if (existItem) {
                                existItem.quantity = item.quantity;
                            }
                        });

                        // setProducts(cartItems);
                        setProducts(payload);
                    } else {
                        setProducts(payload);
                    }
                    setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
                }
            } else {
                setLoading(false);
                setProducts(payload);
            }
        },

        addItem: (newItem, items, group) => {
            if (
                group === 'wishlist' &&
                (cookies?.wishlist
                    ? cookies?.wishlist?.every((el) => el.id !== newItem.id)
                    : true)
            ) {
                let newItems = cookies?.wishlist ? cookies?.wishlist : [];
                newItems.push(newItem);
                setCookie('wishlist', newItems, { path: '/' });
                dispatch(setWishlistTtems(newItems));
            }

            if (
                group === 'cart' &&
                (cookies?.cart
                    ? cookies?.cart?.every((el) => el.id !== newItem.id)
                    : true)
            ) {
                let newItems = cookies?.cart ? cookies.cart : [];
                newItems.push(newItem);
                setCookie('cart', newItems, { path: '/' });
                dispatch(setCartItems(newItems));
            }

            return items;
        },

        removeItem: (selectedItem, items, group) => {

            if (group === 'cart') {
                let currentItems = cookies?.cart;
                if (currentItems?.length > 0) {
                    const index = currentItems.findIndex(
                        (item) => item.id === selectedItem.id
                    );
                    currentItems.splice(index, 1);
                }
                setCookie('cart', currentItems, { path: '/' });
                dispatch(setCartItems(currentItems));
            }

            if (group === 'wishlist') {
                let currentItems = cookies?.wishlist;
                if (currentItems?.length > 0) {
                    const index = currentItems.findIndex(
                        (item) => item.id === selectedItem.id
                    );
                    currentItems.splice(index, 1);
                }

                setCookie('wishlist', currentItems, { path: '/' });
                dispatch(setWishlistTtems(currentItems));
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },
    };
}
