import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import RateCommit from './RateCommit';
import Commits from './Commits';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useRouter } from 'next/router';
const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
    const { user } = useSelector((state) => state.auth);
    const [countToggle, setCountToggle] = useState(true);
    const [pageMore, setPageMore] = useState(1);
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(true);
    const { query } = useRouter();


    async function GetItemsProductsProgress() {
        const ItemsData = await GetRepository.getSellerCommitLists(query?.pid, pageMore);
        if (ItemsData?.results) {
            const newData = ItemsData.results;
            setData([...data, ...newData]);
            if ([...data, ...newData]?.length == ItemsData.count) {
                setCountToggle(false);
            }
        }

    }


    useEffect(() => {
        if (query?.pid) {
            GetItemsProductsProgress()
        }
    }, [query?.pid, pageMore, dataCount,])




    return (
        <>
            <div className="ps-product__content ps-tab-root">
                <Tabs defaultActiveKey="1" className='marginAntd' >
                    {
                        product?.description &&
                        <TabPane tab={`${product?.document?.content_type === "file" ? "Hujjat" :
                            product?.document?.content_type === "template" ? "Shablon" :
                                product?.document?.content_type === "audio" ? "Audio" :
                                    product?.document?.content_type === "video" ? 'Video' : "Mahsulot"

                            } to’liq tavsifi`} key="1" >
                            <PartialDescription product={product} />
                        </TabPane>
                    }
                    {(product?.can_review || data?.length > 0) &&
                        <TabPane TabPane tab={`Sharhlar ${data?.length !== 0 ? `(${data?.length})` : ''} `} key="2">
                            <div className='row '>
                                {
                                    data?.length > 0 &&
                                    <div className='col-md-12'>
                                        <Commits data={data}
                                            countToggle={countToggle}
                                            setPageMore={setPageMore}
                                            pageMore={pageMore} />
                                    </div>
                                }
                                {
                                    (user?.access && !product?.can_review) &&
                                    <div className='col-md-12'>
                                        <RateCommit product={product} setDataCount={setDataCount} setData={setData} />
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
