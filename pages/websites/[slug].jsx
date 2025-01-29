import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeaderTitle from '~/components/blocks/header/HeaderTitle';
import Product from '~/components/elements/products/Product';
import PageContainer from '~/components/layouts/PageContainer';
import WebsitesProductsByCategory from '~/components/partials/category/WebsitesProductsByCategory';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
const baseUrl = 'https://api.soff.uz/api/v1/';

export default function WebsiteProducts () {
    const [data, setData] = useState([]);

    async function getProducts () {
        const endPoint = 'customer/products/?page_size=48';
        Axios.get(baseUrl + endPoint)
            .then(res => {
                console.log('success => ', res);
                setData(res.data);
            })
            .catch(err => {
                console.log('err -> ', err);
            });            
    }
    

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${'asdf'}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />
            <HeaderTitle
                title={'Veb saytga oid elektron mahsulotlardan foydalaning'}
                description={
                    "Bu yerda mahalliy mutahasisslar qilgan ishlari yi'gilgan bo'lib, siz ularni pulga yoki bepulga olib ishlatishingiz mumkin."
                }
            />
            <WebsitesProductsByCategory data={data} />
        </PageContainer>
    );
}
