import { message } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { formatCurrency } from '~/utilities/product-helper'

export default function ProductShoppingActions({ product }) {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const { cartDataItems } = useSelector((state) => state.ecomerce);

    const handleWishlistToggle = async () => {
        if (wishlist?.some((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
            message.info("Mahsulot sevimlilardan o'chirildi")
        } else {
            await addSavedItem(product.id);
            message.success("Mahsulot sevimlilarga saqlandi")
        }
    };

    const handleAddItemToCart = async () => {
        if (cartDataItems.some(el => el.id == product?.id)) {
            await removeCartOneItem(product?.id)
            message.info("Mahsulot savatdan o'chirildi")
            return
        }
        await setCartOneItem(product.id);
        message.success("Mahsulot savatga qo'shildi")
    };

    let priceView;
    if (product?.is_sale) {
        priceView = (
            <>
                {+product?.discount_price === 0 ? "Bepul" :
                    product?.discount === 0 ? addPeriodToThousands(product?.discount_price) + " so'm" :
                        (
                            <>
                                <>
                                    {addPeriodToThousands(product?.discount_price) + " so'm"}
                                </>
                                <del>{addPeriodToThousands(product?.price)}</del>
                            </>
                        )}
            </>
        );
    } else {
        priceView = (
            <>
                {+product?.discount_price === 0 ? "Bepul" :
                    product?.discount === 0 ? addPeriodToThousands(product?.discount_price) + " so'm" : (
                        <div className='d-flex gap-3 align-items-center' style={{ flexWrap: 'nowrap' }}>
                            <del className='text-danger'>{addPeriodToThousands(product?.price)}</del>
                            <span>{addPeriodToThousands(product?.discount_price) + " so'm"}</span>
                        </div>
                    )}
            </>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <p className='m-0 fs-2 py-1 px-4 text-black mr-auto' style={{ borderRadius: '20px', cursor: 'pointer', backgroundColor: '#F6F5F2', }}>{priceView}</p>
                <div onClick={handleWishlistToggle} className='d-flex align-items-center justify-content-center' style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F5F2', width: '35px', height: '35px' }}>
                    <i className={wishlist?.some((item) => item.id === product?.id)
                        ? 'fa-solid fa-heart text-success fs-3'
                        : 'icon-heart fs-3'}></i>
                </div>
                <div onClick={handleAddItemToCart} className='d-flex align-items-center justify-content-center' style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F5F2', width: '35px', height: '35px' }}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z"
                            fill={cartDataItems.some(el => el.id == product?.id) ? 'green' : "black"}
                        />
                        <path
                            d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z"
                            fill={cartDataItems.some(el => el.id == product?.id) ? 'green' : "black"}
                        />
                    </svg>

                </div>
            </div>
        </div>
    )
}
