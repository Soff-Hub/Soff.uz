// Google Analytics 4 (gtag) event helper
export function trackEvent(name, params = {}) {
    if (typeof window === 'undefined') return;

    if (process.env.NODE_ENV !== 'production') {
        console.debug('[GA event]', name, params);
    }

    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params);
    }
}

export function getProductPrice(product, discountPercent = 0) {
    const price = Number(product?.price) || 0;
    if (discountPercent > 0) {
        return Math.round(price * (1 - discountPercent / 100));
    }
    return Number(product?.discount_price ?? price) || 0;
}

// GA4 ecommerce formatidagi mahsulot eventi
export function trackProductEvent(name, product, discountPercent = 0) {
    const price = getProductPrice(product, discountPercent);
    trackEvent(name, {
        currency: 'UZS',
        value: price,
        items: [
            {
                item_id: String(product?.id),
                item_name: product?.title,
                price,
                quantity: 1,
            },
        ],
    });
}
