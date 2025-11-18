import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import ProductCart from '~/components/elements/products/ProductCart';

import { Modal } from 'antd';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { audioDownloaderSale } from '~/shared/utilities/common-helpers';
import { addPeriodToThousands } from './price-formatter';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';

const Wishlist = ({ ecomerce }) => {
    const { removeSavedItem } = useWishlist();
    const { setCartOneItem } = useCart();
    const [loading, setLoading] = useState(false);

    const { wishlist } = useSelector(state => state.ecomerce);
    const { setAllSaved } = useWishlist();

    useEffect(() => {
        if (wishlist.length !== JSON.parse(localStorage.getItem('wishlist'))) {
            setAllSaved();
        }
    }, []);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        setCartOneItem(product.id);

        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz mahsulotni savatga qo'shdingiz`,
        });
        modal.update;
    }

    async function handleRemoveWishlistItem(e, item) {
        e.preventDefault();
        removeSavedItem(item.id);
    }

    // views
    let wishlistItemsView;
    if (wishlist?.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist table-sm table-md table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mahsulot nomi</th>
                            <th>Narxi</th>
                            <th className="d-flex justify-content-center ">
                                Amallar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist?.length > 0 &&
                            wishlist?.map(product => (
                                <tr key={product?.id}>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={e =>
                                                handleRemoveWishlistItem(
                                                    e,
                                                    product
                                                )
                                            }>
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <ProductCart product={product} />
                                    </td>
                                    <td>
                                        <span>
                                            {+product.discount_price === 0 ? (
                                                <p className="free-product-text">
                                                    Bepul
                                                </p>
                                            ) : product?.discount === 0 ? (
                                                <p>
                                                    {addPeriodToThousands(
                                                        product.discount_price
                                                    )}
                                                </p>
                                            ) : (
                                                <>
                                                    <del>
                                                        {addPeriodToThousands(
                                                            product.price
                                                        )}
                                                        so'm
                                                    </del>
                                                    <p>
                                                        {addPeriodToThousands(
                                                            product.discount_price
                                                        )}
                                                        so'm
                                                    </p>
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td style={{ margin: '0 auto' }}>
                                        {+product.discount_price > 0 ? (
                                            <a
                                                className="ps-btn d-inline-block"
                                                href=""
                                                onClick={e =>
                                                    handleAddItemToCart(
                                                        e,
                                                        product
                                                    )
                                                }>
                                                Savatga qo'shish
                                            </a>
                                        ) : (
                                            <a
                                                style={{
                                                    cursor: loading
                                                        ? 'not-allowed'
                                                        : 'pointer',
                                                    minWidth: '172px',
                                                }}
                                                className="ps-btn d-inline-block"
                                                href=""
                                                onClick={async e => {
                                                    e.preventDefault();
                                                    setLoading(true);
                                                    try {
                                                        await audioDownloaderSale(
                                                            product,
                                                            product
                                                        );
                                                    } catch (error) {
                                                        console.error(
                                                            'Error in audioDownloaderSale:',
                                                            error
                                                        );
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}>
                                                {!loading ? (
                                                    'Bepul yuklab olish'
                                                ) : (
                                                    <div>
                                                        <div
                                                            className="spinner-border"
                                                            role="status">
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    } else if (wishlist?.length <= 0) {
        // if (loading) {
        wishlistItemsView = (
            <div className="alert alert-danger" role="alert">
                Tanlaganlar yo'q!
            </div>
        );

        // }
    }
    return (
        <div className="ps-whishlist">
            <div className="container my-5">
                <h1 className="page-title">Tanlanganlar</h1>
                <SidebarLayout>
                    <div className="ps-section__content">
                        {wishlistItemsView}
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
};
export default connect(state => state)(Wishlist);
