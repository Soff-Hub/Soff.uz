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
    console.log('cookie', cookies);
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
                if (responseData) {
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

        addItem: (newItem, items, group) => {
            if (
                group === 'cart' && ( cookies.cart ?  cookies?.cart?.every((el) => el.id !== newItem.id) : true)
               
            ) {
                console.log('add');
                
                let newItems = cookies?.cart ? cookies.cart : [];
                newItems.push(newItem);
                setCookie('cart', newItems, { path: '/' });
                dispatch(setCartItems(newItems));
            }
            if (
                group === 'wishlist' &&
               (cookies.wishlist ?  cookies?.wishlist?.every((el) => el.id !== newItem.id) : true)
            ) {
                let newItems = cookies?.wishlist ? cookies.wishlist : [];
                newItems.push(newItem);
                setCookie('wishlist', newItems, { path: '/' });

                dispatch(setWishlistTtems(newItems));
            }

            return items;
        },

        removeItem: (selectedItem, items, group) => {
            // console.log('rw', selectedItem);

            if (group === 'cart') {
                let currentItems = cookies.cart;
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
                let currentItems = cookies.wishlist;
                if (currentItems?.length > 0) {
                    const index = currentItems.findIndex(
                        (item) => item.id === selectedItem.id
                    );
                    currentItems.splice(index, 1);
                }

                // console.log('wshshsh',currentItems);
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
