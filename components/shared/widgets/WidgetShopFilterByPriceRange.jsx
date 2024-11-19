import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import { useDispatch } from 'react-redux';
import { CategorySlug } from '~/store/auth/slice';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';

const WidgetShopFilterByPriceRange =
    ({
        setFilteredData,
        categoryData,
        setCount,
        defVal,
        min,
        max,
        setDefVal,
        setMax,
        setMin


    }) => {
        const Router = useRouter();
        const [chaildId, setchaildId] = useState(null);
        const [parentId, setParentId] = useState(null);
        const { slug } = Router.query;
        const dispatch = useDispatch();

        async function getCategry() {
            const responseData = await ProductRepository.getCategoryParent();
            if (responseData?.length > 0) {
                dispatch(CategorySlug(responseData?.data?.results));
            }
        }

        async function getFreeDocuments() {
            const responseData = await axios.get(`${baseUrl}customer/documents/?free_documents=0&page=${1}`)
            if (responseData) {
                setCount(responseData.data.count)
                setDefVal([responseData?.data?.min_price, responseData?.data?.max_price]);
                setMax(responseData?.data?.max_price);
                setMin(responseData?.data?.min_price);
                setFilteredData(responseData?.data?.results);
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
                    setCount(respons?.count)
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
                    setCount(respons?.data?.count)
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
                    setCount(respons?.data?.count)
                }
            }
        };

        function handleChangeRange(value) {
            filterByPrice(value[0], value[1]);
        }

        useEffect(() => {
            if (categoryData?.length === 0) {
                getCategry();
            }
            if (slug === "bepul-mahsulotlar") {
                getFreeDocuments()
            } else {
                if (categoryData?.every((cat) => cat.slug !== slug)) {
                    setchaildId(slug);
                    setParentId(null);
                } else {
                    setParentId(slug);
                    setchaildId(null);
                }
            }
        }, [slug]);

        
        return (
            <aside className="widget widget_shop">
                <figure>
                    <h4 className="widget-title">Narx </h4>
                    {
                        defVal &&
                        <Slider
                            range
                            defaultValue={defVal}
                            max={max}
                            min={min}
                            onChange={(e) => handleChangeRange(e)}
                        />
                    }
                    <p>
                        Narx:{' '}
                        {min === undefined || min === null
                            ? 0
                            : addPeriodToThousands(min)}{' '}
                        so'm -{' '}
                        {max === undefined || max === null
                            ? 0
                            : addPeriodToThousands(max)}{' '}
                        so'm
                    </p>
                </figure>
            </aside>
        );
    };

export default WidgetShopFilterByPriceRange;
