import React from 'react';
import FileImagesScroll from '../details-actions/file-images-scroll';
import FileActions from '../details-actions/file-actions';
import SellerProfile from '../details-seller-profile/seller-profile';
import Description from '../details-actions/description';
import Tags from '../details-actions/tags';
import Link from 'next/link';
import { CommentList } from '../comment-section/commentList';
import CommentFormWrapper from '../comment-section/commentWrapper';

function FileProductsDetails({ product }) {
    return (
        <div className="seller_container_products_details">
            <div className="ps-container p-0">
                <div className="ps-product--detail_seller">
                    <div>
                        <h1 className="titleh3">
                            {product?.title || (
                                <span className="invisible-text">
                                    Mahsulot nomi
                                </span>
                            )}
                        </h1>
                        <Link
                            href={`/scientific-resources/${product?.category?.slug}?childCategory=${product?.category?.slug}`}>
                            <a>
                                <span className="m-0 fs-3">
                                    {product?.category?.name || (
                                        <span className="invisible-text">
                                            Kategoriya nomi
                                        </span>
                                    )}
                                </span>
                            </a>
                        </Link>
                    </div>
                    <div className="ps-product__header_seller ">
                        <FileImagesScroll product={product} />
                        <div className="seller_products_right_section">
                            <div
                                className="seller_products_actions_container"
                                style={{
                                    height:
                                        !(product?.tag.length > 0) && '100%',
                                }}>
                                <FileActions product={product} />
                                <Tags tag={product?.tag} />
                            </div>
                        </div>
                    </div>

                    <div className="ps-product__header_seller_secound">
                        <Description description={product?.description} />

                        <SellerProfile product={product} />
                    </div>
                    <div>
                        <CommentFormWrapper
                            id={product.id}
                            slug={product.slug}
                        />
                        <CommentList slug={product.slug} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileProductsDetails;
