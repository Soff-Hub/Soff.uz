import Link from 'next/link';
import React from 'react';
import Swiper_Pages from '~/components/blocks/categoryHighlights/swipper/swiper';
import Comments from '~/components/details-components/comment-component/comments';
import ServiseDetailAbout from '~/components/details-components/seller-detail/file-images-scroll';
import SellerRating from '~/components/details-components/seller-detail/seller-service-rating-component';
import ServiceDetailOrder from '~/components/details-components/seller-detail/serviceDetailOrder';
import SimilarServices from '~/components/details-components/seller-detail/similar-services';
import PageContainer from '~/components/layouts/PageContainer';
import PortfoilioCard from '~/components/shared/seller-profile/portfoilioCard';

export default function ServiseDetail () {
    const defaultProducts = null;

    const data = {
        id: 274737,
        poster_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',
        title: 'Daewoo Nexia 2',
        price: 10000,
        discount_price: 10000,
        discount: 0,
        file_type: '.zip',
        file_url: false,
        slug: 'obekt-daewoo-nexia-2',
        category_services: 'Ilmiy va akademik xizmatlar',
        description:
            'Saytingizning CMS 1C-Bitrix va/yoki Bitrix24 platformasidagi funksiyalarini takomillashtirish va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin saytning zaxira nusxasini (backup) yarataman, shuningdek uni test serverga ko‘chirib ish olib boraman — asosiy loyihangiz xavfsizligi uchun. Yakunlangach, siz barcha o‘zgartirishlar bilan tanishishingiz uchun test muhiti taqdim etiladi.',
        ListOfServices: [
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
        ],
        reviews: {
            ratings: {
                speed: 4.9,
                quality: 5.0,
                communication: 5.0,
            },
            averageRating: 4.97,
            totalReviews: 1,
            items: [
                {
                    id: 1,
                    author: 'Ivan Petrov',
                    date: '2025-07-09',
                    comment:
                        'Ishdan juda mamnunman! Hammasi tez va sifatli bajarildi. Muloqot darajasi a’lo darajada.',
                    ratings: {
                        speed: 4.9,
                        quality: 5.0,
                        communication: 5.0,
                    },
                },
            ],
        },
    };

    const portfoiloData = [
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/02.jpg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/95011.535d357cc979a.jpeg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/%D0%A0%D0%B0%D0%B4%D0%B8%D0%B0%D1%82%D0%BE%D1%80_2.jpg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/02.jpg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/95011.535d357cc979a.jpeg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/%D0%A0%D0%B0%D0%B4%D0%B8%D0%B0%D1%82%D0%BE%D1%80_2.jpg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/02.jpg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/95011.535d357cc979a.jpeg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/%D0%A0%D0%B0%D0%B4%D0%B8%D0%B0%D1%82%D0%BE%D1%80_2.jpg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/02.jpg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,

            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',

            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            ratings: 4.9,
            file_type: '.zip',
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/95011.535d357cc979a.jpeg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
        {
            id: 274737,
            poster_url:
                'https://d2co7bxjtnp5o.cloudfront.net/media/poster/%D0%A0%D0%B0%D0%B4%D0%B8%D0%B0%D1%82%D0%BE%D1%80_2.jpg',
            title: 'Daewoo Nexia 2',
            price: 10000,
            discount_price: 10000,
            discount: 0,
            file_type: '.zip',
            ratings: 4.9,
            file_url: false,
            slug: 'obekt-daewoo-nexia-2',
            category_services: 'Ilmiy va akademik xizmatlar',
            description:
                'Sizning saytingiz yoki Bitrix24 platformasidagi portal uchun funksionallikni yaxshilash va rivojlantirish. Bitrix API metodlari bilan ishlash. Har qanday ishni bajarishdan oldin sayt/portalning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib, xavfsiz muhitda ishlashni ta’minlayman. Ish yakunida siz test muhitidagi o‘zgarishlar bilan tanishishingiz mumkin.',
            ListOfServices: [
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
                { service: 'Bitrix/Bitrix24 o‘rnatish va sozlash' },
            ],
        },
    ];

    const kworkData = {
        poster_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/poster/101576.538a17b83724a.jpeg',
        title: '1C-Bitrix / Bitrix24 saytini takomillashtirish',
        description: `Saytingizning CMS 1C-Bitrix va/yoki Bitrix24 platformasidagi funksiyalarini takomillashtirish va rivojlantirish. Bitrix API metodlari bilan ishlash.
Har qanday ishni bajarishdan oldin saytning zaxira nusxasini yarataman, shuningdek, uni test serverga ko‘chirib xavfsiz sharoitda ishlayman.
Siz ishlar yakunlanmasidan oldin ham test muhitida o‘zgarishlar bilan tanishishingiz mumkin.`,

        includedServices: [
            'Bitrix/Bitrix24 o‘rnatish va sozlash',
            'Tayyor echimlarni o‘rnatish va sozlash',
            'Boshqa tayyor modullarni o‘rnatish va sozlash',
            'Modullarni o‘rnatish va sozlash',
            'HTML/CSS bo‘yicha ishlanmalar',
            '1C-Bitrix va Bitrix24 platformasida PHP skriptlar ishlab chiqish/yaxshilash',
            'Zaxira nusxa (backup) yaratish',
            'Saytni boshqa hosting yoki domenga ko‘chirish',
            'Sayt bilan bog‘liq mahsulotlar, echimlar va biznes jarayonlar bo‘yicha maslahatlar',
        ],

        requirements: [
            'Texnik topshiriq (TT) yoki qisqacha izoh yuborish',
            'Bajariladigan ish hajmi haqida kelishib olish',
            'FTP/SSH ma’lumotlarini taqdim etish',
            'Admin panelga kirish ma’lumotlarini yuborish',
            'Hostingga kirish ma’lumotlarini taqdim etish',
        ],

        techStack: {
            CMS: '1C-Bitrix',
            language: 'PHP',
            phpFramework: 'Frameworksiz',
            jsInterface: 'Yo‘q',
            cssUsed: true,
            cssFrameworks: [
                'Frameworksiz',
                'Bootstrap',
                'Material UI',
                'UIKit',
            ],
            database: true,
            databaseType: 'MySQL',
        },

        experience: '1C-Bitrix va Bitrix24 bilan 4 yildan ortiq tajriba',
        offerVolume: 'Loyiha doirasida 1 soatlik ishni bajarish',
    };

    const breadBreadcrumbItem = [
        {
            title: 'home',
            path: '#',
        },
        {
            title: 'Sercices',
            path: '#',
        },
        {
            title: `${data?.slug}`,
            path: `${data?.slug}`,
        },
    ];

    return (
        <PageContainer
            title={defaultProducts ? defaultProducts?.title : `${data.slug}`}
            boxed={true}>
            <div className='container mt-5 '>
                <h1 className='SwipperTitlE '>
                    1C-Bitrix va Bitrix24 platformasida takomillashtirish
                    ishlari
                </h1>
                <div className='d-flex '>
                    <Link
                        // href={`/service-detail/${product?.category?.slug}?childCategory=${product?.category?.slug}`}
                        href={`/service-detail/${data?.category_services}`}>
                        <a className='m-0 fs-3 '>
                            <p className='m-0 fs-3 p-0'>
                                {data?.category_services || (
                                    <span className='invisible-text'>
                                        Kategoriya nomi
                                    </span>
                                )}
                            </p>{' '}
                        </a>
                    </Link>
                    <p className='m-0 fs-3' style={{ padding: '0 5px' }}>
                        {' '}
                        |{' '}
                    </p>

                    <Link
                        // href={`/service-detail/${product?.category?.slug}?childCategory=${product?.category?.slug}`}
                        href={`/service-detail/${data?.slug}`}>
                        <a>
                            <p className='m-0 fs-3'>
                                {data?.title || (
                                    <span className='invisible-text'>
                                        Kategoriya nomi
                                    </span>
                                )}
                            </p>
                        </a>
                    </Link>
                </div>
                <div className=' ServiseDetail'>
                    <div className='ServiseDetail_aboutService'>
                        <ServiseDetailAbout product={kworkData} />
                    </div>
                    <div className='ServiseDetail_sideBar'>
                        <ServiceDetailOrder product={data} />
                    </div>
                </div>{' '}
                <div className='mt-5'>
                    {Array.isArray(portfoiloData) && portfoiloData.length > 0 && (
                        <div className='categoryHighlightsSwipper'>
                            <div className='SwipperTitlewrap'>
                                <h2 className='SwipperTitle mt-md-5 mt-xl-0 mt-lg-0 mt-5 w-75'>
                                    Muallifning boshqa xizmatlari{' '}
                                </h2>
                            </div>
                            {portfoiloData ? (
                                <Swiper_Pages categoryName type='template'>
                                    {portfoiloData?.map((item, index) => (
                                        <div>
                                            <PortfoilioCard
                                                item={item}
                                                key={index}
                                            />
                                        </div>
                                    ))}
                                </Swiper_Pages>
                            ) : null}
                        </div>
                    )}
                </div>
                <div className='mt-5 border rounded-5 p-5 bg-white'>
                    <div className='mb-5'>
                        {' '}
                        <h1 className='mb-4 fs-1'>Xizmat bo‘yicha izohlar</h1>
                        <SellerRating data={data} />
                    </div>
                    <Comments />
                </div>
                <div className='mt-5'>
                    <SimilarServices portfoiloData={portfoiloData} />
                </div>
            </div>
        </PageContainer>
    );
}
