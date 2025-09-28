import cookies from 'js-cookie';

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
        cart?.items.push(product);
    } else {
        cart = {
            items: [],
        };
        cart.items.push(product);
    }
    updateCartToCookies(cart);
    return cart;
}

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



export function calculateAmount(obj) {
    return Object.values(obj).reduce((acc, item) => {
        if (!item) return acc;
        const price = item.discount_price ?? item.price ?? 0;
        return acc + Number(price);
    }, 0);
}

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
    var dateRegex = /^(0[1-9]|1[0-2])(\d{2})$/;
    if (!dateRegex.test(expiryDate)) {
        return expiryDate
    }

    return expiryDate.replace(/^(\d{2})(\d{2})$/, "$1/$2");
}
