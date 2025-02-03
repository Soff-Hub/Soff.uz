import React, { useEffect } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import BuyBtnScroll from './BuyBtnScroll';
import ReportButton from './ReportButton';
import Script from 'next/script';

const ProductDetailFullwidth = ({ product, views }) => {

    useEffect(() => {
        if (window.yaContextCb) {
            window.yaContextCb.push(() => {
                Ya.Context.AdvManager.render({
                    blockId: "R-A-13331140-1",
                    renderTo: "yandex_rtb_R-A-13331140-1"
                });
            });
        }
    }, []);

    return (
        <>
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="row">
                    <div className='col-lg-7 col-md-6 col-12'>
                        <ThumbnailDefault
                            product={product}
                            views={views?.view_count}
                        />
                    </div>
                    <div className="col-lg-5 col-md-6 col-12" id="get-buy">
                        <ReportButton productId={product?.slug} />
                        <ModuleDetailTopInformation product={product} />
                        <ModuleProductDetailDescription
                            product={product}
                            views={views}
                        />
                        <ModuleDetailShoppingActions product={product} />

                        {/* Yandex reklama kodi */}
                        <div id="yandex_rtb_R-A-13331140-1"></div>

                        {/* Yandex scriptni yuklash */}
                        <Script
                            src="https://yandex.ru/ads/system/context.js"
                            strategy="lazyOnload"
                            onLoad={() => {
                                if (window.yaContextCb) {
                                    window.yaContextCb.push(() => {
                                        Ya.Context.AdvManager.render({
                                            blockId: "R-A-13331140-1",
                                            renderTo: "yandex_rtb_R-A-13331140-1"
                                        });
                                    });
                                }
                            }}
                        />

                        <p className="mt-3">Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {product?.tag?.length > 0 &&
                                product?.tag.slice(0, 15).map((item, i) => (
                                    <div
                                        key={i}
                                        className="m-2 "
                                        style={{
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            border: '1px solid #999',
                                            fontSize: '15px',
                                        }}>
                                        <Link
                                            href={`/search-page?keyword=${item?.name?.replace(
                                                /^#/,
                                                ''
                                            )}`}>
                                            <a> {item.name} </a>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <DefaultDescription product={product} />

                <BuyBtnScroll />
            </div>
        </>
    );
};

export default ProductDetailFullwidth;
