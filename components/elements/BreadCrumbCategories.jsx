import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import { Skeleton } from 'antd';

const BreadCrumbCategories = ({ breacrumb, count, loading }) => {
    console.log('log=>', breacrumb);
    const router = useRouter();
    const { slug } = router.query;
    const subCategoryItem =
        breacrumb.find(item => {
            return item.slug == slug;
        }) || null;

    return (
        <div className='bg--white p-4 my-2  border  border-secondary-subtle rounded-2'>
            {subCategoryItem && !loading ? (
                <>
                    <div className='ps-breadcrumb-2 py-3'>
                        <ul className='breadcrumb-2'>
                            <li>{subCategoryItem.name} (<span>{formatCurrencyWithSpace(count)}+</span>)</li>
                            {subCategoryItem.child.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            href='/scientific-resources/[slug]'
                                            as={`/scientific-resources/${item.slug}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <Skeleton.Node
                    active
                    className={`skeletion-card small-full-card`}
                />
            )}
        </div>
    );
};

export default BreadCrumbCategories;
