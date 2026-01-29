import React from 'react';
import FileActions from '../actions/file-actions';
import Description from '../actions/description';
import SellerProfile from '../seller-profile/seller-profile';
import ImageCarousel from '../actions/imageScroll';
import Tags from '../actions/tags';
import CommentList from '~/features/comments/ui/commentList';
import CommentFormWrapper from '~/features/comments/ui/commentWrapper';

function ThreeDesignProductsDetails({ product, template }) {
    return (
        <div className="seller_container_products_details_three_design">
            <div className="ps-container p-0">
                <div className="ps-product--detail_seller_three_design">
                    <div>
                        <p
                            className="titleh3"
                            style={{
                                fontWeight: 600,
                                fontSize: '25px',
                                lineHeight: '37.5px',
                                color: '#312F30',
                                margin: 0,
                            }}>
                            {product?.title}
                        </p>
                        <span className="m-0 fs-3 title_cat">
                            {product?.category?.name}
                        </span>
                    </div>
                    <div className="ps-product__header_seller_three_design ">
                        <ImageCarousel
                            imageAlt={product?.title}
                            slug={product?.slug}
                            demo_link={product?.demo_link}
                            images={product?.document?.images}
                            views={product?.view_count}
                        />
                        <div className="seller_products_right_section ">
                            <div
                                className="seller_products_actions_container m-auto"
                                style={{ height: 'auto' }}>
                                <FileActions product={product} />
                                <Tags tag={product?.tag} />
                            </div>
                        </div>
                    </div>

                    <div className="ps-product__header_seller_secound_three_design">
                        <Description description={product?.description} />

                        <SellerProfile product={product} />
                    </div>
                    {/* comment section */}
                    <div style={{ marginBottom: '32px' }}>
                        <CommentFormWrapper
                            id={product.id}
                            slug={product.slug}
                        />
                        <CommentList slug={product.slug} id={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThreeDesignProductsDetails;
