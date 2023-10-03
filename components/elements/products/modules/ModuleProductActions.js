import React, { useState } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';

const ModuleProductActions = ({ product, ecomerce }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const { setCartOneItem } = useCart()
    const { addSavedItem, wishlist } = useWishlist()

    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product.id)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni savatga qo'shdingiz`,
        });
        modal.update;
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id)
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: `Siz hujjatni saqlanganlarga qo'shdingiz`,
        });
        modal.update;
    }

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true);
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false);
    };

    return (
        <ul className="ps-product__actions">
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Savatga qo'shish"
                    onClick={handleAddItemToCart}>
                    <i className="icon-bag2"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Ko'proq ko'rish"
                    onClick={handleShowQuickView}>
                    <i className="icon-eye"></i>
                </a>
            </li>
            <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tanlanganlarga qo'shish"
                    onClick={handleAddItemToWishlist}>
                    <i className={`icon-heart   ${wishlist?.some(item => Number(item.id) === Number(product?.id)) ? 'text-danger' : ''} `}></i>
                </a>
            </li>
            <Modal
                centeredwishlist
                footer={null}
                width={1024}
                onCancel={(e) => handleHideQuickView(e)}
                open={isQuickView}
                closeIcon={<i className="icon icon-cross2"></i>}>
                <h3>Tezkor ko'rish</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default connect((state) => state)(ModuleProductActions);
