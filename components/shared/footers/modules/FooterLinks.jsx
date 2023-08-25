import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
const Links = {
    consumerElectric: [
        {
            text: 'Air Conditioners',
            url: '/shop',
        },
        {
            text: 'Audios & Theaters',
            url: '/shop',
        },
        {
            text: 'Car Electronics',
            url: '/shop',
        },
        {
            text: 'Office Electronics',
            url: '/shop',
        },
        {
            text: 'TV Televisions',
            url: '/shop',
        },
        {
            text: 'Washing Machines',
            url: '/shop',
        },
    ],
    clothingAndApparel: [
        {
            text: 'Printers',
            url: '/shop',
        },
        {
            text: 'Projectors',
            url: '/shop',
        },
        {
            text: 'Scanners',
            url: '/shop',
        },
        {
            text: 'Store & Business',
            url: '/shop',
        },
        {
            text: '4K Ultra HD TVs',
            url: '/shop',
        },
        {
            text: 'LED TVs',
            url: '/shop',
        },
        {
            text: 'OLED TVs',
            url: '/shop',
        },
    ],
    gardenAndKitchen: [
        {
            text: 'Cookware',
            url: '/shop',
        },
        {
            text: 'Decoration',
            url: '/shop',
        },
        {
            text: 'Furniture',
            url: '/shop',
        },
        {
            text: 'Garden Tools',
            url: '/shop',
        },
        {
            text: 'Garden Equipments',
            url: '/shop',
        },
        {
            text: 'Powers And Hand Tools',
            url: '/shop',
        },
        {
            text: 'Utensil & Gadget',
            url: '/shop',
        },
    ],
    healthAndBeauty: [
        {
            text: 'Hair Care',
            url: '/shop',
        },
        {
            text: 'Decoration',
            url: '/shop',
        },
        {
            text: 'Makeup',
            url: '/shop',
        },
        {
            text: 'Body Shower',
            url: '/shop',
        },
        {
            text: 'Skin Care',
            url: '/shop',
        },
        {
            text: 'Cologine',
            url: '/shop',
        },
        {
            text: 'Perfume',
            url: '/shop',
        },
    ],
    jewelryAndWatch: [
        {
            text: 'Necklace',
            url: '/shop',
        },
        {
            text: 'Pendant',
            url: '/shop',
        },
        {
            text: 'Diamond Ring',
            url: '/shop',
        },
        {
            text: 'Sliver Earing',
            url: '/shop',
        },
        {
            text: 'Leather Watcher',
            url: '/shop',
        },
        {
            text: 'Gucci',
            url: '/shop',
        },
    ],
    computerAndTechnology: [
        {
            text: 'Desktop PC',
            url: '/shop',
        },
        {
            text: 'Laptop',
            url: '/shop',
        },
        {
            text: 'Smartphones',
            url: '/shop',
        },
        {
            text: 'Tablet',
            url: '/shop',
        },
        {
            text: 'Game Controller',
            url: '/shop',
        },
        {
            text: 'Audio & Video',
            url: '/shop',
        },
        {
            text: 'Wireless Speaker',
            url: '/shop',
        },
    ],
};

const FooterLinks = () => {
    const [data, setData] = useState([]);

    const getDataFunc = async () => {
        const respons = await ProductRepository.getRecords();
        if (respons?.results) {
            setData(respons?.results);
        }
    };
    // console.log('data', data);
    useEffect(() => {
        getDataFunc();
    }, []);

    return (
        <div className="ps-footer__links">
            {data?.length > 0 ??
                data.map((item, i) => {
                    return (
                     <>
                     {
                        // item?.promotional_sliders?.length > 0 ?
                        <p key={i}>
                        <strong>{item.name}</strong>
                        { item.promotional_sliders?.length > 0 && item.promotional_sliders?.map((item) => (
                            <Link href={item.title} key={item.title}>
                                <a>{item.title}</a>
                            </Link>
                        ))}
                    </p>
                    // :
                    // <>Loading</>
                     }
                     </>
                    )
                })
               
                }
            {/* <p>
            <strong>Clothing &amp; Apparel:</strong>
            {Links.clothingAndApparel.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>
        <p>
            <strong>Home, Garden &amp; Kitchen:</strong>
            {Links.gardenAndKitchen.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>
        <p>
            <strong>Health &amp; Beauty:</strong>
            {Links.healthAndBeauty.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>
        <p>
            <strong>Jewelry &amp; Watches:</strong>
            {Links.jewelryAndWatch.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p>
        <p>
            <strong>Computer &amp; Technologies:</strong>
            {Links.computerAndTechnology.map((item) => (
                <Link href={item.url} key={item.text}>
                    <a>{item.text}</a>
                </Link>
            ))}
        </p> */}
        </div>
    );
};

export default FooterLinks;
