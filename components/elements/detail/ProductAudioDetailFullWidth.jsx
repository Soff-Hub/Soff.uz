import React from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Router from 'next/router';
import DefaultAudio from './thumbnail/DefaultAudio';
import ModuleAudioDetailTopInformation from './modules/ModuleAudioDetailTopInformation';
import ModuleAudioDetailShoppingActions from './modules/ModuleAudioDetailShoppingActions';
import Link from 'next/link';



const ProductAudioDetailFullWidth = ({
    product,
    views,
    admin,
    ActiveTag,
}) => {





    return (
        <>

            <div className="ps-product--detail ">
                <div className="row">
                    <div className="col-12">
                        <DefaultAudio product={product} />
                        <ModuleAudioDetailTopInformation
                            product={product}
                            views={views}
                            admin={false}
                        />
                    </div>
                </div>
                <div className="price_and_tag">
                    <ModuleAudioDetailShoppingActions
                        product={product}
                        admin={admin}
                    />

                    <>
                        {admin && ActiveTag}
                        {product?.tag?.length > 0 && (
                            <div className="">
                                <p>Tezkor teglar</p>
                                <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                    {product?.tag?.length > 0 &&
                                        product?.tag.map((item, i) => (
                                            <div
                                                key={i}
                                                className="m-2 tag-product">
                                                <Link href={`/search-page?keyword=${item?.name?.replace(/^#/, '')}`}>
                                                    <a
                                                    >
                                                        {' '}
                                                        {item.name}{' '}
                                                    </a>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </>
                </div>

                <DefaultDescription product={product} />

            </div>
        </>
    );
};

export default ProductAudioDetailFullWidth;
