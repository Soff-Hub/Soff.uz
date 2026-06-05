import { FaBagShopping } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';

export const accountLinks = [
    {
        text: 'Profil',
        url: '/account/profile',
        icon: FaUser,
    },
    {
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: FaBagShopping,
    },
    {
        text: 'Buyurtmalarim',
        url: '/order/my-orders',
        icon: FaTruck,
    },
];
