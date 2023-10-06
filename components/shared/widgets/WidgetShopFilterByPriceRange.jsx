import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';

const WidgetShopFilterByPriceRange = ({ setFilteredData }) => {
    const Router = useRouter();
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    const { slug } = Router.query;
    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState(null);

    const [defVal, setDefVal] = useState(null);

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData?.length > 0) {
            if (responseData?.every((cat) => Number(cat.id) !== Number(slug))) {
                setchaildId(slug);
            } else {
                setParentId(slug);
            }
        }
    }

    const filterByPrice = async (minPriceVal, maxPriceVal) => {
        if (chaildId !== null) {
            const respons = await ProductRepository.getFilderProduct(
                1,
                chaildId,
                null,
                minPriceVal,
                maxPriceVal,
                null,
                null,
                null,
                null
            );
            if (respons && setFilteredData) {
                setFilteredData(respons?.results);
            }
        } else if (parentId !== null) {
            const respons = await ProductRepository.getFilderPrice(
                1,
                null,
                parentId,
                minPriceVal,
                maxPriceVal,
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
                minPriceVal,
                maxPriceVal,
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
        filterByPrice(value[0], value[1]);
        setDefVal(value)
    }

    const chaildPrice = async (id) => {
        const respons = await ProductRepository.getFilderPrice(
            1,
            id,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
        if (respons) {
            setDefVal([respons?.data?.min_price, respons?.data?.max_price])
            setMax(respons?.data?.max_price);
            setMin(respons?.data?.min_price);
        }
        setParentId(null)
    }


    const parentPrice = async (id) => {
        const respons = await ProductRepository.getFilderPrice(
            1,
            null,
            id,
            null,
            null,
            null,
            null,
            null,
            null
        );
        if (respons) {
            setDefVal([respons?.data?.min_price, respons?.data?.max_price])
            setMax(respons?.data?.max_price);
            setMin(respons?.data?.min_price);
        }
        setchaildId(null)
    }
    

    
    useEffect(() => {
        getCategry();
    }, [ slug])

    useEffect(() => {
        getCategry();
        if(parentId){
            parentPrice(parentId)
        }
        if (chaildId) {
            chaildPrice(chaildId)
        }
    }, [parentId, chaildId])

    

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
                    value={[defVal?.[0] || 0, defVal?.[1]] || 0}
                    max={max}
                    min={min}
                    onAfterChange={(e) => handleChangeRange(e)}
                    onChange={(e) => setDefVal(e)}
                />
                <p>
                    Narx: { min === undefined || min === null ? 0 : addPeriodToThousands(min)} so'm - { max === undefined || max === null ? 0 : addPeriodToThousands(max)} so'm
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
