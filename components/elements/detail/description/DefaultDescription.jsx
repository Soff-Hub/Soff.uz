import React from 'react';

import { Tabs } from 'antd';
import PartialDescription from '~/components/elements/detail/description/PartialDescription';
const { TabPane } = Tabs;

const DefaultDescription = ({ product }) => {
    return (
        <div className="ps-product__content ps-tab-root">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Izoh" key="1">
                    <PartialDescription product={product} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default DefaultDescription;
