import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import ProductRepository from '~/repositories/ProductRepository';
import { Modal, Table } from 'antd';
import { useCookies } from 'react-cookie';

const Wishlist = ({ ecomerce }) => {
    const [cookies, setCookie] = useCookies(['cart']);
    const { loading, products, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();

    const state = useSelector((state) => state);



    function handleAddItemToCart(e, product) {
        e.preventDefault();
        addItem(product, cookies.cart, 'cart');
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatga qo'shdingiz`,
        });
        modal.update;
    }

    async function handleRemoveWishlistItem(e, item) {
        e.preventDefault();
        removeItem(item, ecomerce.wishlistItems, 'wishlist');
    }

    useEffect(() => {
        // getCategoryData();
        if (ecomerce.wishlistItems) {
            getProducts(ecomerce.wishlistItems);
        }
    }, [ecomerce.wishlistItems]);
    // views
    let wishlistItemsView;
    if ( cookies?.wishlist?.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist table-sm table-md table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hujjat nomi</th>
                            <th>Narxi</th>
                            <th className='d-flex justify-content-center '>Qo'shish</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cookies.wishlist?.length > 0 &&  cookies.wishlist.map((product) => (

                            <tr key={product?.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleRemoveWishlistItem(
                                                e,
                                                product
                                            )
                                        }>
                                        <i className="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <ProductCart product={product} />
                                </td>
                                <td >
                                   <span> {product.price} so'm</span>

                                </td>
                                <td style={{margin: "0 auto"}} >
                                    <a
                                        className="ps-btn d-inline-block"
                                        href=""
                                        onClick={(e) =>
                                            handleAddItemToCart(
                                                e,
                                                product
                                            )
                                        }>
                                       Savatga qo'shish
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    } else if(cookies?.wishlist?.length <= 0) {
        // if (loading) {
        wishlistItemsView = (
            <div className="alert alert-danger" role="alert">
                Tanlaganlar yo'q!
            </div>
        );

        // }
    }
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Tanlanganlar</h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
