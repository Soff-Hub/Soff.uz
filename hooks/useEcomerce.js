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
    const [cookies, setCookie] = useCookies(['cart']);
    const [products, setProducts] = useState(null);
    return {
        loading,
        cartItemsOnCookie,
        products,
        getProducts: async (payload, group = '') => {
            setLoading(true);
            if (true) {
                let queries = '';
                payload.forEach((item) => {
                    // if (queries === '') {
                        queries = `${item.id}`;
                    // } else {
                    //     queries = queries + `&id_in=${item.id}`;
                    // }
                });
                const responseData = await ProductRepository.getProductsByIds(
                    queries
                );
                // console.log(responseData,'ll');
                if (responseData ) {
                    if (group === 'cart') {
                        let cartItems = payload;
                        cartItems.forEach((item) => {
                            let existItem = cartItems.find(
                                (val) => val.id === item.id
                            );
                            if (existItem) {
                                existItem.quantity = item.quantity;
                            }
                        });

                        setProducts(responseData);
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
            // setProducts(payload)
        },

        // increaseQty: (payload, currentCart) => {
        //     let cart = [];
        //     if (currentCart) {
        //         cart = currentCart;
        //         const existItem = cart.find((item) => item.id === payload.id);
        //         if (existItem) {
        //             existItem.quantity = existItem.quantity + 1;
        //         }
        //         setCookie('cart', cart, { path: '/' });
        //         dispatch(setCartItems(cart));
        //     }
        //     return cart;
        // },

        // decreaseQty: (payload, currentCart) => {
        //     let cart = [];
        //     if (currentCart) {
        //         cart = currentCart;
        //         const existItem = cart.find((item) => item.id === payload.id);
        //         if (existItem) {
        //             if (existItem.quantity > 1) {
        //                 existItem.quantity = existItem.quantity - 1;
        //             }
        //         }
        //         setCookie('cart', cart, { path: '/' });
        //         dispatch(setCartItems(cart));
        //     }
        //     return cart;
        // },

        addItem: (newItem, items, group) => {
            let newItems = [];
            newItems.push(items)
            if (group === 'cart') {
                // setCookie('cart', newItems, { path: '/' });
                dispatch(setCartItems(newItems));
            }
            if (group === 'wishlist') {
                localStorage.setItem('wishlist', newItems);
                dispatch(setWishlistTtems(newItems));
            }

            return items;
        },

        removeItem: (selectedItem, items, group) => {
            let currentItems = items;
            if (currentItems.length > 0) {
                const index = currentItems.findIndex(
                    (item) => item.id === selectedItem.id
                );
                currentItems.splice(index, 1);
            }
            if (group === 'cart') {
                setCookie('cart', currentItems, { path: '/' });

                dispatch(setCartItems(currentItems));
            }

            if (group === 'wishlist') {
                setCookie('wishlist', currentItems, { path: '/' });
                dispatch(setWishlistTtems(currentItems));
            }

            if (group === 'compare') {
                setCookie('compare', currentItems, { path: '/' });
            }
        },

        removeItems: (group) => {
            if (group === 'wishlist') {
                setCookie('wishlist', [], { path: '/' });
                dispatch(setWishlistTtems([]));
            }
            if (group === 'compare') {
                setCookie('compare', [], { path: '/' });
                dispatch(setCompareItems([]));
            }
            if (group === 'cart') {
                setCookie('cart', [], { path: '/' });
                dispatch(setCartItems([]));
            }
        },
    };
}
