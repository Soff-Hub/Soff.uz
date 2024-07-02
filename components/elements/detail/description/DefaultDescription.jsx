import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import RateCommit from './RateCommit';
import Commits from './Commits';
import { useDispatch, useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { baseUrl } from '~/repositories/Repository';
const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
    const { user } = useSelector((state) => state.auth);
    const [countToggle, setCountToggle] = useState(true);
    const [pageMore, setPageMore] = useState(10);
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(true);
    const { query } = useRouter();
    const [reviews, setReviews] = useState(null);



    async function GetItemsProductsProgress() {
        const ItemsData = await GetRepository.getSellerCommitLists(query?.pid, pageMore, user?.access);
        if (ItemsData?.results) {
            setData(ItemsData.results);
            if (ItemsData.results.length === ItemsData.count) {
                setCountToggle(false);
            }
        }

    }

    async function getProductTokenAdd() {
        try {
            const token = user?.access;
            const response = await Axios.get(
                baseUrl + `customer/can-review/${query?.pid}`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );
            setReviews(response?.data)
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    useEffect(() => {
        if (query?.pid && user?.access) {
            getProductTokenAdd()
        }
    }, [user?.access, query?.id, dataCount]);


    useEffect(() => {
        if (query?.pid) {
            GetItemsProductsProgress()
        }
    }, [query?.pid, pageMore, user?.access, dataCount]);


    return (
        <>
            <div className="ps-product__content ps-tab-root">
                <Tabs defaultActiveKey="2" className='marginAntd' >
                    {
                        product?.description &&
                        <TabPane tab={`${product?.document?.content_type === "file" ? "Hujjatning" :
                            product?.document?.content_type === "template" ? "Shablonning" :
                                product?.document?.content_type === "audio" ? "Audioning" :
                                    product?.document?.content_type === "video" ? 'Videoning' : "Mahsulotning"

                            } to’liq tavsifi`} key="1" >
                            <PartialDescription product={product} />
                        </TabPane>
                    }
                    {(reviews?.can_review || data?.length > 0) &&

                        <TabPane tab={`Sharhlar (${data?.length})`} key="2">
                            <div className='row '>

                                {
                                    data?.length > 0 &&
                                    <div className='col-md-12'>
                                        <Commits data={data}
                                            countToggle={countToggle}
                                            setPageMore={setPageMore}
                                            pageMore={pageMore}
                                            setDataCount={setDataCount}
                                            product={product}
                                            reviews={reviews}

                                        />
                                    </div>
                                }

                                {
                                    (user?.access && reviews?.can_review) &&
                                    <div className='col-md-12'>

                                        <RateCommit product={product} setDataCount={setDataCount} reviews={reviews} />
                                    </div>
                                }
                            </div>
                        </TabPane>

                    }

                </Tabs>
            </div >
        </>
    );
};

export default DefaultDescription;
