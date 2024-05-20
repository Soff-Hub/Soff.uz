import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';

const ModuleCartSummary = ({ source }) => {
    const [percentage, setPercentage] = useState(0);

    async function getPercentage() {
        const responseData = await ProductRepository.getOrderPercentage();
        if (responseData) {
            setPercentage(responseData?.data?.percentage);
        }
    }

    useEffect(() => {
        getPercentage();
    }, []);

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );
        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const amount = calculateAmount(source);
    const hisob = addPeriodToThousands(amount);
    const hisobPercentage = addPeriodToThousands(amount * percentage);
    const allPercentage = addPeriodToThousands(amount + amount * percentage);

    // View
    let productItemsView;
    if (source && source?.length > 0) {
        productItemsView = source?.map((item, i) => (
            <li key={item.id}>
                <div
                    className="ps-block__estimate "
                    style={{
                        display: 'flex',
                        aliginContent: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Link
                        style={{ width: '70%' }}
                        href="/product/[pid]"
                        as={`/product/${item.slug}`}>
                        <a className="ps-product__title">
                            {i + 1}. {item.title}
                        </a>
                    </Link>
                   <Link href="/product/[pid]" as={`/product/${item.slug}`}>
                        <a className="ps-product__price">
                            {addPeriodToThousands(item?.price)} so'm
                        </a>
                    </Link>
                   
                </div> {" "}
                <div className='d-flex justify-content-between' >
                    <span>Sayt xizmati uchun</span>
                    <span> {addPeriodToThousands(item?.price * percentage)} so'm</span>
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
                    <p>
                        Sayt xizmati uchun{' '}
                        <span>
                            {' '}
                            {hisobPercentage} so`m {`(${percentage * 100} %)`}{' '}
                        </span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3>
                        Jami: <span>{allPercentage} so'm</span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
