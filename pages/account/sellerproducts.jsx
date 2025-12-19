import React from 'react';
import MyProducts_listSeller from '~/features/account/ui/MyProducts_listSeller';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';

const SellerProducts = () => {
    return (
        <>
            <Meta
                title={'Sotib olinganlar'}
                description={
                    'Soff.uz’da sotib olingan mahsulot va xizmatlaringizni bu sahifada ko‘rib chiqing. Yuklab oling, qayta faollashtiring yoki tafsilotlarni boshqaring.'
                }
            />
            <PageContainer>
                <div className="ps-page--my-account">
                    <MyProducts_listSeller />
                </div>
            </PageContainer>
        </>
    );
};

export default SellerProducts;
