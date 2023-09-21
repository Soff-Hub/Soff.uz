import React from 'react';
import Link from 'next/link';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
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
    // Views
    let priceView;

    if (product.is_sale) {
        priceView = (
            <div className="ps-product__price sale">
                {product.price === product.discount_price ? (
                   <p> {addPeriodToThousands(product.price)} so'm </p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product.discount_price)} so'm
                        </p>
                    </>
                )}  
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                {product.price === product.discount_price ? (
                   <h4> {addPeriodToThousands(product.price)} so'm </h4>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product.price)} so'm</del>
                        <h4>
                            {addPeriodToThousands(product.discount_price)} so'm
                        </h4>
                    </>
                )}  
            </h4>
        );
    }
    return (
        <header>
            <h1>{product.title}</h1>

            {/* <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product.vendor}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(1 review)</span>
                </div>
            </div> */}
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
