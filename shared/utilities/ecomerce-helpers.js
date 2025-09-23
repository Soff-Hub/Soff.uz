/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from 'react';
import cookies from 'js-cookie';
import { getProductsByIds } from '~/repositories/ProductRepository';

export function getCartItemsFromCookies() {
    const cartItems = cookies.get('cart');
    if (cartItems) {
        return JSON.parse(cartItems);
    } else {
        return null;
    }
}

export function updateCartToCookies(payload) {
    cookies.set('cart', payload, { path: '/', expires: 24 * 7 });
}

export function addItemToCartHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        // const existItem = cart.items.find((item) => item.id === product.id);
        // if (existItem) {
        //     existItem.quantity += product.quantity;
        // } else {
        /* if (!product.quantity) {
                product.quantity = 1;
            }*/
        cart?.items.push(product);
        // }
    } else {
        cart = {
            items: [],
        };
        cart.items.push(product);
    }
    updateCartToCookies(cart);
    return cart;
}

// export function increaseQtyCartItemHelper(product) {
//     let cart;
//     let cookieCart = getCartItemsFromCookies();
//     if (cookieCart) {
//         cart = cookieCart;
//         const selectedItem = cart.items.find((item) => item.id === product.id);

//         if (selectedItem) {
//             selectedItem.quantity = selectedItem.quantity + 1;
//         }
//         updateCartToCookies(cart);
//         return cart;
//     }
// }

// export function decreaseQtyCartItemHelper(product) {
//     let cart;
//     let cookieCart = getCartItemsFromCookies();
//     if (cookieCart) {
//         cart = cookieCart;
//         const selectedItem = cart.items.find((item) => item.id === product.id);

//         if (selectedItem) {
//             selectedItem.quantity = selectedItem.quantity - 1;
//         }
//         updateCartToCookies(cart);
//         return cart;
//     }
// }

export function removeCartItemHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const index = cart.items.findIndex((item) => item.id === product.id);
        cart.items.splice(index, 1);
        updateCartToCookies(cart);
        return cart;
    }
}

// new

export function calculateAmount(obj) {
    return Object.values(obj).reduce((acc, item) => {
        if (!item) return acc;
        const price = item.discount_price ?? item.price ?? 0;
        return acc + Number(price);
    }, 0);
}
// .toFixed(2);
//     let price = [];
//     let discount_Price = [];
//     obj?.map((item) => {
//         if (item.discount > 0) {
//             discount_Price.push(item);
//         } else {
//             price.push(item);
//         }
//     });
//     console.log('hisob', price, discount_Price);

//     let PriceSum = Object.values(price).reduce(
//         (acc, { price }) => acc + Number(price),
//         0
//     );

//     let DiscountPriceSum = Object.values(discount_Price).reduce(
//         (acc, { discount_price }) => acc + Number(discount_price),
//         0
//     );
// console.log('price = ', PriceSum, 'discount-price = ', DiscountPriceSum);
//     return PriceSum + DiscountPriceSum


export function formatCreditCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\s/g, '');

    var formattedNumber = '';
    for (var i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedNumber += ' '; // probel qo'shish
        }
        formattedNumber += cardNumber[i];
    }

    return formattedNumber;
}

export function formatExpiryDate(expiryDate) {
    // Yaroqlik muddatini kiritish formatini tekshirish
    var dateRegex = /^(0[1-9]|1[0-2])(\d{2})$/;
    if (!dateRegex.test(expiryDate)) {
        return expiryDate
    }

    // Formatlangan yaroqlik muddatini qaytarish
    return expiryDate.replace(/^(\d{2})(\d{2})$/, "$1/$2");
}
