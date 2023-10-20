import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import PostRepository from '~/repositories/PostRepository';
import ClickRepository from '~/repositories/ClickRepository';
import { BeatLoader } from 'react-spinners';
import  Router  from 'next/router';
import useCart from '~/hooks/useCart';
import Image from 'next/image';


function FormCheckoutInformation() {
    const select = useSelector((state) => state.auth.user?.access);
    const cartData = useSelector((state) => state.ecomerce.cartDataItems);
    const [card, setCard] = useState([]);
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('click');
    const [message, setMessage] = useState(true);
    const {removeAll} = useCart()

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const GetCard = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${select} `,
            },
        };
        const respons = await PostRepository.getCartData(config);
        setTimeout(() => {
            setCard(respons?.results?.[0]?.documents);
        }, 1000);
    };


    useEffect(() => {
        select && GetCard()
        setData(cartData);
    }, [cartData]);

    function extractIds(data) {
        const ids = [];
        for (const item of data) {
            ids.push(Number(item.id));
        }
        return ids;
    }
    const ids = extractIds(data);

    const ProductToApi = async () => {
        setMessage(false);
        removeAll()
        const data = {
            documents: ids,
        };
        const token = {
            headers: {
                Authorization: `Bearer ${select} `,
            },
        };
        const respons = await ClickRepository.postClick(data, token);
        if (respons) {
            window.open(`${respons?.data?.url}`, '_blank');
            setMessage(true);
        }
        // else {
        //     Router.push('/account/register-user');
        //     setMessage(true);
        //     const modal = Modal.error({
        //         centered: true,
        //         title: 'Xatolik!',
        //         content: 'Siz sotuvchisiz , foydalanuvchi bo\'lib ro\'yxatdan o\'tishingiz zarur' ,
        //     });
        //     modal.update;
        
        // }
       
        // const responsClick = await ClickRepository.postClick( token)
    };

    return (
        <div className="tolov-usullari">
            <div className="payme-logo">
                <div className="d-flex aligin-content-center border rounded-5 p-3">
                    <label className="mt-3 me-2">
                        <input
                            type="radio"
                            value="option1"
                            checked={selectedValue === 'click'}
                            onChange={handleRadioChange}
                        />
                    </label>
                    <Image
                        src="/static/img/click.png"
                        alt="payme"
                        width="100%"
                        height="40px"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
            {message ? (
                <p
                    style={{ display: 'inline-block' }}
                    className="ps-btn"
                    onClick={() => ProductToApi()}>
                    <i className="fa-solid fa-angles-left fa-fade me-2"></i> To'lov
                    qilish
                </p>
            ) : (
                <p>
                    <button
                        type="submit"
                        className="ps-btn ps-btn--fullwidth mb-5">
                        <BeatLoader color="#fff" />
                    </button>
                </p>
            )}
        </div>
    );
}

export default FormCheckoutInformation;
