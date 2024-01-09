import React, { useState } from 'react';
import Link from 'next/link';
import { connect, useSelector } from 'react-redux';
import ProductRepository from '~/repositories/ProductRepository';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ModulePaymentOrderSummaryOne = ({  shipping }) => {
    const Router = useRouter()
    const {id} =  Router.query
    const [data, setData] = useState(null)

    const getOneProductData = async () => {
        const res = await ProductRepository.postCartData([id])
        setData(res?.data?.data?.[0])
    }

    console.log('logg', id);

    useEffect(() => {
        getOneProductData()
    }, [id])

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
    const hisob = addPeriodToThousands(data?.discount_price);

    // view
    let listItemsView, shippingView;
    if (data ) {
        
        listItemsView = 
            <Link href={`/product/${data?.slug}`} >
                <a>
                    <strong>
                      {1}.  {data.title}
                    </strong>
                    <small>{hisob} so'm </small>
                </a>
            </Link>
        
    } else {
        listItemsView = <p>Mahsulot yo'q.</p>;
    }
    if (true) {
        shippingView = (
            <figure className="ps-block__total">
                <h3>
                Umumiy hisob: 
                    <strong>{hisob}.00 so'm</strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Mahsulot</strong>
                        <strong>narx</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Jami narx:</strong>
                        <small>{hisob} so'm </small>
                    </figcaption>
                </figure>
                {shippingView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummaryOne);
