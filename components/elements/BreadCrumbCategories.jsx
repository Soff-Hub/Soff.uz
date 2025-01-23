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
                    <h4>{subCategoryItem.name}</h4>
                    <p>
                        <span>{formatCurrencyWithSpace(count)}+</span> ilmiy
                        resurslar topildi! O‘zingizga kerakli materiallarni
                        topish uchun filterlardan foydalaning. Har bir
                        materialni o‘rganish, tahlil qilish yoki ilmiy
                        ishlaringizda qo‘llash uchun sotib olishingiz mumkin.
                        Bepul materiallar ham mavjud bo‘lib, ular darhol yuklab
                        olinishi mumkin. Ushbu resurslar mahalliy mutaxassislar
                        tomonidan tayyorlangan va sizga yuqori sifatli,
                        ishonchli materiallarni taqdim etadi. Ilmiy va amaliy
                        ehtiyojlaringizga mos materiallarni topish uchun
                        filterlardan foydalaning va o‘zingizga kerakli
                        resurslarni toping!
                    </p>
                    <div className='ps-breadcrumb py-3'>
                        <ul className='breadcrumb'>
                            <li>{subCategoryItem.name}</li>
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
