import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import BreadCrumb from '~/components/elements/BreadCrumb';
import SellerProducts from '~/components/partials/seller/SellerProducts';
import ProductRepository from '~/repositories/ProductRepository';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import Link from 'next/link';
import { router } from 'websocket';
import { useRouter } from 'next/router';

export default function ProductCategoryScreen ({ category2 }) {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },

        {
            text: ' Barcha Kategoriyalar',
        },
    ];

    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const {slug} = router.query

    console.log(slug);
    

    async function getProductsByCategoryName () {
        const responseData = await ProductRepository.getCustomerProducts(
            'file',
            '',
            page
        );
        responseData && setData(responseData);
    }

    const getCategories = async () => {
        const res = await ProductRepository.getMoreTopCategorys();
        res && setCategoryData(res.results);
    };

    useEffect(() => {
        getProductsByCategoryName();
    }, [page, slug]);

    useEffect(() => {
        getCategories();
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
            <div className='ps-page--shop container'>
                <div className='nav-menu-cards d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3'>
                    {categoryData.map(e => {
                        return (
                            <Link
                                href='/scientific-resources/[slug]'
                                as={`/scientific-resources/${e.slug}`}>
                                <a className='categoryMenuCard bg--white d-flex align-items-center gap-3 border  border-secondary-subtle rounded-2 p-2'>
                                    <img
                                        className=' rounded-2'
                                        src={e.image}
                                        alt={e.name}
                                        height={25}
                                    />
                                    <span className=''>{e.name}</span>
                                </a>
                            </Link>
                        );
                    })}
                </div>

                <div className='bg--white p-4 my-2  border  border-secondary-subtle rounded-2'>
                    <h4>Animals 3d models</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quasi nemo, ipsa harum amet, aliquid culpa alias optio
                        ipsam est pariatur doloremque. Omnis fugit quaerat
                        consequatur, dolores eum vel id itaque corporis aut
                        magnam error eaque provident corrupti deleniti, ab magni
                        architecto? Non, deleniti quaerat! Consequuntur
                        repellendus quos reiciendis voluptas vitae!
                    </p>

                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
            </div>
            <ProductsByCategory
                data={data}
                page={page}
                handlePagination={number => {
                    setPage(number);
                }}
            />
        </PageContainer>
    );
}
