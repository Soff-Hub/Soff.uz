import React, { useEffect, useState } from 'react'
import ModalDeletePostEdit from '../account/ModalPostEdit'
import { useSelector } from 'react-redux'
import { useUpdateProductPriceMutation } from '~/rtk-store/products/api';
import { Modal } from 'antd';

export default function SellerProductPrice() {
    const { approvedProductData: product, detailLoader } = useSelector(state => state.products)
    const [ViewPriceDiscount, setViewPriceDiscount] = useState({
        price: 0,
        discount: 0,
    });
    const [updatePrice] = useUpdateProductPriceMutation()

    const finalPrice =
        ViewPriceDiscount?.price -
        (ViewPriceDiscount?.discount * ViewPriceDiscount?.price) / 100;

    const handleSubmit = async () => {
        const formData = new FormData()

        formData.append('price', ViewPriceDiscount.price)
        formData.append('discount', ViewPriceDiscount.discount)

        const resp = await updatePrice({
            id: product?.id,
            data: formData
        })

        if (resp.data) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: 'Mahsulotingiz narxi yangilandi',
            });
            modal.update
        }
    }

    useEffect(() => {
        if (product) {
            setViewPriceDiscount({
                price: product?.price,
                discount: product?.discount,
            })
        }
    }, [product])

    return (
        <div>
            <ModalDeletePostEdit
                dataBsTarget="exampleModalMyProductsPrice"
                // onSubmited={handleItemsEditProductsPosts}
                onSubmited={handleSubmit}
                formID="products-edit_price">
                {detailLoader ? (
                    <div
                        className=" "
                        style={{
                            height: '200px',
                            display: 'grid',
                            placeContent: 'center',
                        }}>
                        <div
                            className="spinner-border "
                            role="status"
                            style={{ width: '150px', height: '150px' }}>
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <label htmlFor="priceCount" className="form-label">
                            Hujjatingizni chegirmasi
                            <input
                                id="priceCount"
                                onChange={(e) =>
                                    setViewPriceDiscount((prev) => ({
                                        ...prev,
                                        discount: e.target.value,
                                    }))
                                }
                                defaultValue={product?.discount}
                                type="number"
                                className="form-control rounded-3"
                                placeholder="Hujjatingizni chegirmasi"
                            />
                        </label>
                        <label htmlFor="discount" className="form-label">
                            Hujjatingizni narxi
                            <input
                                id="discount"
                                onChange={(e) =>
                                    setViewPriceDiscount((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                defaultValue={product?.price}
                                type="number"
                                className="form-control rounded-3"
                                placeholder="Hujjatingizni narxi"
                            />
                        </label>
                        <label htmlFor="discount" className="form-label">
                            Sotuvdagi narxi:{' '}
                            <span
                                className={
                                    finalPrice < 1000 ||
                                        product?.discount_pric < 1000
                                        ? 'text-danger'
                                        : 'text-primary'
                                }>
                                {' '}
                                {JSON.stringify(finalPrice)}
                            </span>
                        </label>
                    </>
                )}
            </ModalDeletePostEdit>
        </div>
    )
}
