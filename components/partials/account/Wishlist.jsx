import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import ProductRepository from '~/repositories/ProductRepository';

const Wishlist = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();
    const [wishlist, setWishlist] = useState([]);

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
        console.log(  '../',product, ecomerce.cartItems );
    }

      async  function handleRemoveWishlistItem(e, item) {
        e.preventDefault();
        removeItem(item, ecomerce.wishlistItems, 'wishlist');
    
            const responseData = await ProductRepository.WishlistDataDelete(item.id);
            if (responseData) {
                setWishlist(responseData);
                console.log('shopitems/ del', responseData);
            }
    }

    async function getCategoryData() {
        const responseData = await ProductRepository.getWishlistData();
        if (responseData) {
            setWishlist(responseData);
            // console.log('shopitems/', responseData[0].document);
        }
    }



    useEffect(() => {
        getCategoryData();
        if (ecomerce.wishlistItems) {
            getProducts(ecomerce.wishlistItems);
        }
    }, [ecomerce]);

    // views
    let wishlistItemsView;
    if (wishlist && wishlist.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Hujjat nomi</th>
                            <th>Narxi</th>
                            <th className='d-flex justify-content-center '>Qo'shish</th>
                            {/* <th></th> */}
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((product) => (
                            <tr key={product?.document.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleRemoveWishlistItem(
                                                e,
                                                product.document
                                            )
                                        }>
                                        <i className="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <ProductCart product={product.document} />
                                </td>
                                <td className="price d-flex justify-content-center">
                                    {product?.document.price}so'm
                                </td>
                                {/* <td>{product.vendor}</td> */}
                                <td style={{margin: "0 auto"}} >
                                    <a
                                        className="ps-btn d-inline-block"
                                        href=""
                                        onClick={(e) =>
                                            handleAddItemToCart(
                                                e,
                                                product.document
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
    } else {
        if (!loading) {
            wishlistItemsView = (
                <div className="alert alert-danger" role="alert">
                     Tanlaganlar yo'q!
                </div>
            );
        }
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
