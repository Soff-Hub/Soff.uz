export const getAccountLinks = (t: (key: string) => string) => [
    {
        text: t('purchasedItems'),
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: t('myOrders'),
        url: '/order/my-orders',
        icon: 'fas fa-truck',
    },
];
