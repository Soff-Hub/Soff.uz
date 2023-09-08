import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';

const WidgetShopFilterByPriceRange = ({ setFilteredData }) => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500000); // price_lt: value[1], setMax(value[1]);

    const filterByPrice = async (nimPrice, maxPrice) => {
        const respons = await ProductRepository.getFilderProduct(
            1,
            null,
            null,
            nimPrice,
            maxPrice
        );
        if (respons && setFilteredData) {
            setFilteredData(respons?.results);
        }
    };

    function handleChangeRange(value) {
        setMin(value[0]);
        setMax(value[1]);

        filterByPrice(value[0], value[1]);
    }

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">Narx </h4>
                <Slider
                    range
                    defaultValue={[0, 500000]}
                    max={500000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Narx: {min} so'm - {max} so'm
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
