import React from 'react';
import { Skeleton } from 'antd';

const SkeletonProductDetail = () => {
    return (
        <div className="ps-skeleton ps-skeleton-product-detail">
            <div className="row">
                <div className="col-12">
                    <div className="mb-5">
                        <Skeleton.Input active={true} size={50} className="w-100" />
                    </div>
                </div>
                <div className="col-md-7 col-12">
                    <Skeleton.Input active={true} className='w-100' size={400} />
                    <div className="mt-5">
                        <Skeleton active={true} size={20} paragraph={{ rows: 5, title: false }} />
                    </div>
                </div>
                <div className="col-md-5 col-12">
                    <Skeleton.Input active={true} className='w-100' size={400} />
                    <div className="mt-5">
                        <Skeleton.Input active={true} className='w-100' size={250} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonProductDetail;
