import React from 'react';
import FileActions from '../actions/file-actions';
import Description from '../actions/description';
import SellerProfile from '../seller-profile/seller-profile';
import DefaultVideoContent from './default-video';
import { InfoCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CommentFormWrapper from '~/features/comments/ui/commentWrapper';
import CommentList from '~/features/comments/ui/commentList';
import { FaEye } from 'react-icons/fa';

function VideosProductsDetails({ product, isPlay, setIsPlay }) {
    const type = 'playlists';

    return (
        <div className="seller_container_products_details_videos">
            <div className="ps-container p-0">
                <div className="ps-product--detail_seller_videos">
                    <div>
                        <p
                            className="titleh3"
                            style={{
                                fontWeight: 600,
                                fontSize: '25px',
                                lineHeight: '37.5px',
                                color: '#312F30',
                                margin: 0,
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                            }}>
                            {product?.title}
                        </p>
                        <p className="m-0 fs-3">{product?.category?.name}</p>
                    </div>
                    <div className="ps-product__header_seller_videos ">
                        <div className="video_container product-short-view">
                            <DefaultVideoContent
                                product={product}
                                isPlay={isPlay}
                                setIsPlay={setIsPlay}
                            />
                            <div className="views">
                                <FaEye />{' '}
                                <span>{product?.view_count || 0}</span>
                            </div>
                            <div className="title_support">
                                <InfoCircleOutlined
                                    className="fs-2 "
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>Mualliflik huquqi buzilgan holatda</span>
                                <Link href={`/report/${product.slug}`}>
                                    <a rel="nofollow">
                                        <strong
                                            className="text-success"
                                            style={{ cursor: 'pointer' }}>
                                            shikoyat qiling!
                                        </strong>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <FileActions product={product} />
                    </div>

                    <div className="ps-product__header_seller_secound_videos">
                        <Description description={product?.description} />

                        <div
                            className="w-100 gap-5 d-flex flex-column"
                            style={{ maxWidth: '550px' }}>
                            {type !== 'playlists' ? (
                                <Description
                                    description={product?.description}
                                />
                            ) : (
                                <></>
                            )}
                            <SellerProfile product={product} />
                        </div>
                    </div>
                    <div>
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

export default VideosProductsDetails;
