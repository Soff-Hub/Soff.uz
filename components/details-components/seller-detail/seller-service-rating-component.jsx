import React from 'react';
import { Rate } from 'antd';

export default function SellerRating({ data }) {
    return (
        <div className="mt-2">
            <p className="fs-3">Mezonlar bo‘yicha reytinglar</p>

            {data?.reviews?.ratings?.speed !== 0 && (
                <div className="d-flex gap-2 align-items-center">
                    <p className="p-0 m-0 fs-4">Tezlik:</p>
                    <Rate
                        disabled
                        allowHalf
                        value={data?.reviews?.ratings?.speed}
                        style={{ fontSize: 20 }}
                    />
                </div>
            )}

            {data?.reviews?.ratings?.quality !== 0 && (
                <div className="d-flex gap-2 align-items-center">
                    <p className="p-0 m-0 fs-4">Sifat:</p>
                    <Rate
                        disabled
                        allowHalf
                        value={data?.reviews?.ratings?.quality}
                        style={{ fontSize: 20 }}
                    />
                </div>
            )}

            {data?.reviews?.ratings?.communication !== 0 && (
                <div className="d-flex gap-2 align-items-center">
                    <p className="p-0 m-0 fs-4">Muloqot (aloqa sifati):</p>
                    <Rate
                        disabled
                        allowHalf
                        value={data?.reviews?.ratings?.communication}
                        style={{ fontSize: 20 }}
                    />
                </div>
            )}
        </div>
    );
}
