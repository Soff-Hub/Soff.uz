import React from 'react';

import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
import Meta from '~/components/shared/headers/Meta';
const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
    return (
        <>
        <Meta title={product?.description} image={product?.iamges[0]?.image_url} />
        <div className="ps-product__content ps-tab-root">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Izoh" key="1">
                    <PartialDescription product={product} />
                </TabPane>
            </Tabs>
        </div>
        </>

    );
};

export default DefaultDescription;
