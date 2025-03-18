import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Spin } from 'antd';
import Link from 'next/link';
import NextImageCard from '~/components/nextImagecard';
import Head from 'next/head';
import Search_Results_Products from '~/components/elements/search-page-details/products';
import Search_Results_Specialists from '~/components/elements/search-page-details/specialists';
import Search_Results_Services from '~/components/elements/search-page-details/services';
import Search_Results_NotFound from '~/components/elements/search-page-details/notFound';
import SearchAllProducts from '~/components/elements/search-page-details/searchAllProducts';

const Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true); // Initially true\

    const servicesData = [
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: ' Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
        {
            img: 'https://picsum.photos/400',
            avatar: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            title: 'Graphic, Logo, Packaging and brand design',
            price: '898 520',
        },
    ];
    const specialistsData = [
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
        {
            img: 'https://picsum.photos/400',
            isName: 'Alexander Makedonskiy',
            status: 'Ritsar',
            statusImg:
                'https://s3-alpha-sig.figma.com/img/4afd/de33/020ffdd05cc1f2b999be91e49f1e9b82?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QPOylFO6C1gyn3byU2rQFE3UFxzzG~aF3V~8XHK1TKxJYUV8e~SKKEXmtFqYk8PLMvEY6WBl2HCKB3oZjQhYibKRWrgaRC4etFSQk40VZctVcF5q0e08tpx5eSaRzbERdEIrwfO3prpy7Ol1B4r3amWycuQt0sWxjIOruIaDQdAR5GwaG2-L4NEXmrTgrd-oH2lrA-Ui2F8y2lHftva3Wp-9g717Cgj7gssN2jmoDjaSRVLDYkWVFbPGW0SqlRabmF~Xxk4bh4D3ufKMjzmUFgk0AEkdcley4-9K6vHhtdZkHz7N9DRM9ZiKoHe5VBHOriRyWtwxGm4A6Kq24DyqHA__',
            job: 'Grafik dizayner',
        },
    ];
    const productsData = [
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
        {
            title: 'Korxona bizneslari uchun light va dark mode bosh sahifasi',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            price: '13 500',
            type: 'figma',
            img: 'https://picsum.photos/id/237/500/300',
        },
    ];

    // Views
    let clearTextView, loadingView;
    if (!loading) {
        clearTextView = (
            <span className='ps-form__action'>
                <p className='ps-form__action_search_btn'>izlash</p>
            </span>
        );
    } else {
        loadingView = (
            <span className='ps-form__action'>
                <Spin size='small' />
            </span>
        );
    }

    const { asPath } = useRouter();
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const sellerTabItems = {
        all: (
            <SearchAllProducts
                data={{ specialistsData, servicesData, productsData }}
            />
        ),
        specialists: <Search_Results_Specialists data={specialistsData} />,
        services: <Search_Results_Services data={servicesData} />,
        products: <Search_Results_Products data={productsData} />,
        notFound: <Search_Results_NotFound />,
    };

    const menuItems = [
        {
            title: 'Barchasi',
            path: 'all',
        },
        {
            title: 'Mahsulotlar',
            path: 'products',
        },
        {
            title: 'Mutaxasislar',
            path: 'specialists',
        },
        {
            title: 'Xizmatlar',
            path: 'services',
        },
        // {
        //     title: "Don't found",
        //     path: 'notFound',
        // },
    ];

    return (
        <div className='global_search_results'>
            <Head>
                <title>Soff.uz - Qidiruv natijalar</title>
                <meta name='robots' content='index, follow'/>
                <meta
                    name='description'
                    content="Soff.uz qidiruv tizimi orqali o'zingizga kerakli bo'lgan istalgan turdagi intellektual mulklaringizni toping"
                />
            </Head>
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 justify-content-between width_full_screen'>
                        <Link href='/'>
                            <a className='ps-logo'>
                                <NextImageCard
                                    url='/static/img/soff/logo-dark.png'
                                    className='logoo'
                                    width='120px'
                                    height='50px'
                                />
                            </a>
                        </Link>
                        <form action='' className='global_search_results_form'>
                            <div className='global_search_results_inputBox'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='17'
                                    height='18'
                                    viewBox='0 0 17 18'
                                    fill='none'>
                                    <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M12.7795 11.8966C13.5588 10.7671 14.0152 9.39769 14.0152 7.92164C14.0152 4.05146 10.8778 0.914062 7.00758 0.914062C3.1374 0.914062 0 4.05146 0 7.92164C0 11.7918 3.1374 14.9292 7.00758 14.9292C8.75091 14.9292 10.3456 14.2926 11.5717 13.2392L15.6276 16.9766C15.7956 17.1313 16.0571 17.1206 16.2118 16.9527L16.8752 16.2328C17.0299 16.0649 17.0192 15.8034 16.8513 15.6487L12.7795 11.8966ZM7.00758 13.452C3.95326 13.452 1.47724 10.976 1.47724 7.92164C1.47724 4.86732 3.95326 2.39131 7.00758 2.39131C10.0619 2.39131 12.5379 4.86732 12.5379 7.92164C12.5379 10.976 10.0619 13.452 7.00758 13.452Z'
                                        fill='#989898'
                                        fill-opacity='0.9'
                                    />
                                </svg>
                                <input
                                    className='global_search_results_input'
                                    placeholder='Izlayotgan mahsulotingizni toping...'
                                    type='text'
                                />
                            </div>
                        </form>

                        <div className='global_search_results_SignInBtn'>
                            Kirish
                        </div>
                    </div>
                </div>
            </nav>

            <div className=''>
                <div className='Search_Results'>
                    <div className='Search_Results_container container'>
                        <ul className='Search_ResultsMenu'>
                            {menuItems.map((item, index) => (
                                <Link href={`#${item.path}`} key={index}>
                                    <li
                                        className={`activeTab ${
                                            activeIndex === item.path
                                                ? 'active_type'
                                                : ''
                                        }`}>
                                        {item.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='container'>{sellerTabItems[activeIndex]}</div>
            </div>
        </div>
    );
};

export default Search_Results;
