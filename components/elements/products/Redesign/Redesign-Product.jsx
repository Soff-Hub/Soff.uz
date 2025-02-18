import Link from 'next/link';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import useProduct from '~/hooks/useProduct';
import useWishlist from '~/hooks/useWishlist';
import { useState } from 'react';
import useCart from '~/hooks/useCart';

const RedesignProduct = ({ product }) => {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const { setCartOneItem } = useCart();

    const showModal = () => {
        setOpen(true);
    };

    function handleAddItemToWishlist (e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

    function handleAddItemToCart (e) {
        showModal();
        e.preventDefault();
        setCartOneItem(product.id);
    }

    return (
        <div className='scientific-resources-card pointer '>
            <Link href='/product/[pid]' as={`/product/${product.slug}`}>
                <div className='scientific-resources-card-img'>
                    <img
                        src={product.poster_url}
                        alt=''
                        style={{
                            maxWidth: '132px',
                            maxHeight: '186px',
                        }}
                    />
                </div>
            </Link>
            <a
                className='scientific-resources-card-heard'
                href='#'
                data-toggle='tooltip'
                data-placement='top'
                title="Tanlanganlarga qo'shish"
                onClick={handleAddItemToWishlist}>
                <img
                    src={`${
                        wishlist?.some(
                            item => Number(item.id) === Number(product?.id)
                        )
                            ? '/static/img/onclickHeard.png'
                            : '/static/img/heard.png'
                    } `}
                    alt=''
                />
            </a>
            <div className='w-100 d-flex flex-column gap-3'>
                <Link
                    href='/product/[pid]'
                    className='p-0'
                    as={`/product/${product.slug}`}>
                    <p className='p-0 m-0  scientific-resources-card-title'>
                        {product.title.slice(0, 35)}
                    </p>
                </Link>
                <div className='scientific-resources-card-btn'>
                    <div className='ps-product__content card-narx-box'>
                        {+product.discount_price === 0 ? (
                            <p className='free-product-text'>Bepul</p>
                        ) : product.discount === 0 ? (
                            <p>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(product.price)} so'm
                                </del>
                                <p>
                                    {addPeriodToThousands(
                                        product.discount_price
                                    )}
                                    so'm
                                </p>
                            </>
                        )}
                    </div>{' '}
                    <a
                        href='#'
                        data-toggle='tooltip'
                        data-placement='top'
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <img src='/static/img/buyIcon.png' alt='' />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RedesignProduct;
