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

const Search_Results = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true); // Initially true\

    const servicesData = [
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
        // all: (
        //     <>
        //         <Search_Results_Specialists />
        //         <Search_Results_Services />
        //         <Search_Results_Products />
        //     </>
        // ),
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
                <meta name='robots' content='index, follow' />
                <meta
                    name='description'
                    content="Soff.uz qidiruv tizimi orqali o'zingizga kerakli bo'lgan istalgan turdagi intellektual mulklaringizni toping"
                />
            </Head>
            <nav className='global_navbar'>
                <div className='container d-flex align-items-center'>
                    <div className='d-flex align-items-center gap-5 width_full_screen'>
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
                        <form
                            className='ps-form--quick-search'
                            method='get'
                            action='/'
                            // onSubmit={handleSubmit}
                        >
                            <div
                                className={
                                    keyword === ''
                                        ? 'ps-form__input'
                                        : 'ps-form__input active_search_input'
                                }>
                                <input
                                    ref={inputEl}
                                    autoFocus
                                    className={
                                        keyword === ''
                                            ? 'form-control input2'
                                            : 'input1 form-control active_search_input'
                                    }
                                    type='text'
                                    defaultValue={keyword}
                                    placeholder='Izlayotgan mahsulotingizni toping...'
                                    onInput={e => {
                                        const value = e.target.value.trim();
                                        setKeyword(value);
                                    }}
                                />
                                {clearTextView}
                                {loadingView}
                            </div>
                        </form>
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
