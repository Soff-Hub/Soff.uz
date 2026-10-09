import { FaBagShopping } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { MdWorkspacePremium } from 'react-icons/md';

export const accountLinks = [
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
    {
        text: 'Mening obunam',
        url: '/account/subscription',
        icon: MdWorkspacePremium,
    },
    {
        text: 'Profil',
        url: '/account/profile',
        icon: FaUser,
    },
];
