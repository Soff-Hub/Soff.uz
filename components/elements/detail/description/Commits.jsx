import { Rate } from 'antd';
import React, { useState, useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';

import Replied from './Replied';
import { useRouter } from 'next/router';

const Commits = ({ data, countToggle, setPageMore, pageMore, setDataCount, product }) => {
    const [userID, setUserID] = useState(null);
    const [dataProdcts, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const { query } = useRouter();

    function handleChange(params) {
        setUserID(params);
    }

    async function getProducts() {
        setLoading(true)
        const ItemsData = await GetRepository.getSellerCommitListsFilter(query?.pid, 1, userID);
        if (ItemsData?.results) {
            setData(ItemsData?.results);
        }
        setLoading(false)

    }

    useEffect(() => (
        getProducts()
    ), [query?.pid, userID]);


    return (
        <div className="mt-5">
            <h4 className="fw-medium border-bottom pb-4 border-success ">
                Hamma sharhlar, {data?.length !== 0 ? data?.length : ''} sharh
            </h4>
            {data.map((item) => (
                <div
                    key={item?.id}
                    className=" border-bottom  border-success  p-3  mb-3 ">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <img
                            src={item?.user?.image_url}
                            width={30}
                            height={30}
                            style={{ borderRadius: '50%' }}
                        />
                        <h5 className="fw-normal mb-0 ">
                            {item?.user?.first_name} {item?.user?.last_name}
                        </h5>
                    </div>
                    {item?.rating !== 0 && (
                        <div className="d-flex gap-3 align-items-center mb-3">

                            <Rate
                                allowHalf
                                disabled
                                className="fs-4"
                                value={item?.rating}
                            />
                            <span className="text-secondary">
                                {item?.reviewed_at}
                            </span>
                        </div>
                    )}

                    {item?.text && (
                        <p className='m-0'>{item?.text}</p>
                    )}

                    <Replied
                        setDataCount={setDataCount}
                        product={product}
                        onsSuccess={() => handleChange(item?.id)}
                        userID={userID}
                        dataProducts={dataProdcts}
                        count={item?.replied_count}
                        loading={loading}
                    />

                </div>
            ))}
            {countToggle && (
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => setPageMore(pageMore + 1)}
                        className="btn btn-success fs-5 px-4">
                        Yana
                    </button>
                </div>
            )}
        </div>
    );
};

export default Commits;
