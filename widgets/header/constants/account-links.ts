import { FaBagShopping } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa6';

export const getAccountLinks = (t: (key: string) => string) => [
    {
        text: t('purchasedItems'),
        url: '/account/sellerproducts',
        icon: FaBagShopping,
    },
    {
        text: t('myOrders'),
        url: '/order/my-orders',
        icon: FaTruck,
    },
];
