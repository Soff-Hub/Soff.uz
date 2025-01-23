import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BreadCrumbCategories = ({ breacrumb }) => {
    console.log('log=>', breacrumb);
    const router = useRouter();
    const { slug } = router.query;
    const subCategoryItem =
        breacrumb.find(item => {
            return item.slug == slug;
        }) || null;

    console.log('subCategoryItem -> ', subCategoryItem);

    return (
        <div className='ps-breadcrumb py-3'>
            <div>
                <div className='container'>
                    {subCategoryItem && (
                        <ul className='breadcrumb'>
                            <li>{subCategoryItem.name}</li>
                            {subCategoryItem.child.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <Link href="/scientific-resources/[slug]" as={`/scientific-resources/${item.slug}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbCategories;
