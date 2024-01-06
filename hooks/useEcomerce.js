import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import {
    setCompareItems,
    setWishlistTtems,
    setCartItems,
} from '~/store/ecomerce/action';
export default function useEcomerce() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cartItemsOnCookie] = useState(null);
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    const { wishlistItems } = useSelector(state => state.ecomerce)
    return {
        loading,
        cartItemsOnCookie,
        products,
        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (true) {
                // let queries = '';
                // payload?.forEach((item) => {
                //     queries = `${item.id}`;
                // });

                if (true) {
                    if (group === 'cart' || group === 'wishlist') {
                        let cartItems = payload;
                        cartItems?.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
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

        addItem: async (newItem, group) => {
            if (group === 'wishlist') {
                const localData = JSON.parse(localStorage.getItem('wishlist')) || []
                if (localData.length > 0 && wishlistItems.length > 0) {
                    const data = []
                    for (let i = 0; i < localData.length; i++) {
                        for (let j = 0; j < wishlistItems.length; j++) {
                            // if (localData[i] !== wishlistItems[j]) {
                            //     data.push(localData[i])
                            // }
                            data.push(localData[i])
                        }
                    }
                    const resp = await ProductRepository.postCartData([newItem.id]);
                    if (resp?.data) {
                        dispatch(setWishlistTtems(resp?.data.data));
                    }
                }
                else {
                    localStorage.setItem('wishlist', JSON.stringify([newItem.id]))
                    const resp = await ProductRepository.postCartData([newItem.id]);
                    if (resp?.data) {
                        dispatch(setWishlistTtems(resp?.data.data));
                    }
                }
                // const resp = await ProductRepository.postCartData(data);
                // if (resp?.data) {
                //     dispatch(setWishlistTtems(wishlistItems));
                // }
            }

            if (
                group === 'cart' &&
                (cookies?.cart
                    ? cookies?.cart?.every((el) => el.id !== newItem.id)
                    : true)
            ) {
                let newItems = cookies?.cart ? cookies.cart : [];
                newItems.push(newItem.id);
                // localStorage.setItem('cart', JSON.stringify(newItems));
                setCookie('cart', newItems, { path: '/main' });
                // dispatch(setCartItems(newItems));
            }

            return newItem;
        },

        removeItem: (selectedItem, group) => {
            if (group === 'cart') {
                let currentItems = cookies?.cart;
                if (currentItems?.length > 0) {
                    const index = currentItems.findIndex(
                        (item) => item.id === selectedItem.id
                    );
                    currentItems.splice(index, 1);
                }

                setCookie('cart', currentItems, { path: '/main' });
                return currentItems
            }

            if (group === 'wishlist') {
                let currentItems = cookies?.wishlist;
                if (currentItems?.length > 0) {
                    const index = currentItems.findIndex(
                        (item) => item.id === selectedItem.id
                    );
                    currentItems.splice(index, 1);
                }

                setCookie('wishlist', currentItems, { path: '/main' });
                dispatch(setWishlistTtems(currentItems));
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/main' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/main' });
                // dispatch(setCartItems([]));
            }
        },
    };
}
