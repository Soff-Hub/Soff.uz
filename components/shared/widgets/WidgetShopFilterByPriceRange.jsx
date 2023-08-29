import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';

const WidgetShopFilterByPriceRange = ({ data, setFilteredData }) => {
    const Router = useRouter();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500000);

    function handleChangeRange(value) {
        setMin(value[0]);
        price_lt: value[1], setMax(value[1]);
    }

    const filterByPrice = () => {
        let price = data.filter((item) => {
            return item.price > min && item.price < max;
        });
        return price
    };


    useEffect(() => {
        setFilteredData(filterByPrice());
    }, [min, max]);

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
