import React from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { useCookies } from 'react-cookie';
import ProductRepository from '~/repositories/ProductRepository';
import { useState } from 'react';
import { useEffect } from 'react';

const ModuleCartSummary = ({ source }) => {
    const [cookies, setCookie] = useCookies(['cart']);
    const [cartItems, setCartItems] = useState([])


    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const postData = async () => {
        const respons = await ProductRepository.postCartData(cookies?.cart)
        if (respons) {
            setCartItems(respons?.data?.data)
        }
    }


    useEffect(() => {
        postData()
    }, []);

    console.log('cart', cartItems);


    const amount = calculateAmount(cartItems);
    const hisob = addPeriodToThousands(amount);


    // View
    let productItemsView;
    if (cartItems && cartItems?.length > 0) {
        productItemsView =cartItems?.map((item, i) => (
            <li key={item.id}>
                <div
                    className="ps-block__estimate "
                    style={{
                        display: 'flex',
                        aliginContent: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Link style={{width:'70%'}} href="/product/[pid]" as={`/product/${item.slug}`}>
                        <a className="ps-product__title">
                            {i + 1}. {item.title}
                        </a>
                    </Link>
                    <Link href="/product/[pid]" as={`/product/${item.slug}`}>
                        <a className="ps-product__price">
                            {addPeriodToThousands(item?.price)} so'm
                        </a>
                    </Link>
                </div>
            </li>
        ));
    }

    return (
        <>
            <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                    <p>
                        Umumiy hisob <span> {hisob} so'm </span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3>
                        Jami: <span>{hisob} so'm</span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
