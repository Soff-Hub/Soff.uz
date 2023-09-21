import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';

const WidgetShopFilterByPriceRange = ({ setFilteredData }) => {
    const Router = useRouter();
    const [min, setMin] = useState('');
    const [max, setMax] = useState(''); // price_lt: value[1], setMax(value[1]);
    const { slug } = Router.query;
    const [chaildId, setchaildId] = useState('');
    const [parentId, setParentId] = useState('');

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            if (responseData?.every((cat) => Number(cat.id) !== Number(slug))) {
                setchaildId(slug);
            } else {
                setParentId(slug);
            }
        }
    }

    const filterByPrice = async (nimPrice, maxPrice) => {
        if (chaildId !== '') {
            const respons = await ProductRepository.getFilderProduct(
                1,
                chaildId,
                null,
                nimPrice,
                maxPrice,
                null,
                null,
                null,
                null
            );
            if (respons && setFilteredData) {
                setFilteredData(respons?.results);
            }
        } else if (parentId !== '') {
            const respons = await ProductRepository.getFilderPrice(
                1,
                null,
                parentId,
                nimPrice,
                maxPrice,
                null,
                null,
                null,
                null
            );
            if (respons && setFilteredData) {
                setFilteredData(respons?.data?.results);
            }
        } else {
            const respons = await ProductRepository.getFilderPrice(
                1,
                null,
                null,
                nimPrice,
                maxPrice,
                null,
                null,
                null,
                null
            );
            if (respons && setFilteredData) {
                setFilteredData(respons?.data?.results);
            }
        }
    };

    function handleChangeRange(value) {
        console.log('jhjhkjhkjhkhkhk', value);
        setMin(value[0]);
        setMax(value[1]);

        filterByPrice(value[0], value[1]);
    }

    const Price = async () => {
        const respons = await ProductRepository.getDefaultPrice();
        if (respons) {
            setMax(respons?.data?.max_price);
            setMin(respons?.data?.min_price);
        }
    };

    useEffect(() => {
        getCategry();
    }, [slug]);
    
    useEffect(() => {
        Price();
    }, [])

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

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">Narx </h4>
                <Slider
                    range
                    defaultValue={[min, 20000]}
                    max={20000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Narx: {addPeriodToThousands(min)} so'm - {addPeriodToThousands(max)} so'm
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
