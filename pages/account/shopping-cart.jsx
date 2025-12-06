import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import { connect } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import ShoppingCart from '~/components/account/shopping-cart';

const ShoppingCartScreen = () => {
    return (
        <PageContainer>
            <Meta
                title={'Xarid savati'}
                description={
                    'Xarid savatingizdagi mahsulot va xizmatlarni ko‘rib chiqing, narxlarni solishtiring va to‘lovni amalga oshiring. Soff.uz — ishonchli onlayn marketplace va frilans platformasi.'
                }
            />
            <ShoppingCart />
        </PageContainer>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
