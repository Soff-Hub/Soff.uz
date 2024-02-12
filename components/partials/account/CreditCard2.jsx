import React, { useEffect, useState } from 'react';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal } from 'antd';
import ClickCard from './clickCard';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import Router from 'next/router';
import useCart from '~/hooks/useCart';

const CreditCard2 = ({ document }) => {
    const { user } = useSelector((state) => state.auth);
    const [number, SetNumber] = useState('●●●● ●●●● ●●●● ●●●●');
    const [numberCard, SetNumberCard] = useState(null);
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [profileCard, setProfileCard] = useState([]);
    const [message, setMessage] = useState(true);
    const [cardDate, setCardDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [phone, setPhone] = useState('');
    const [cart, setCart] = useState(0);
    const [resDataCode, setResDataCode] = useState(null);
    const { removeAll } = useCart()
    profileCard.forEach((item) => {
        item.credit_card = String(item.credit_card).replace(
            /(\d{4})(?=\d)/g,
            '$1 '
        );
    });

    const numberTyper = (value) => {
        SetNumberCardVal(value);
        const firstFourNumbers = value.slice(0, 4);
        SetNumberCard(Number(firstFourNumbers));
        if (!value == 0) {
            let numberPlaceholder = '';
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) {
                    numberPlaceholder += ' ';
                }
                numberPlaceholder += value[i] || '●';
            }
            return SetNumber(numberPlaceholder);
        }

        SetNumber('●●●● ●●●● ●●●● ●●●●');
    };

    async function handleClickCardPosts() {
        setMessage(false);
        const ItemsData = await PostRepository.postClickCard(
            document,
            numberCardVal,
            cardDate,
            user?.access
        );
        console.log(ItemsData);
        if (ItemsData?.status === 201) {
            setMessage(true);
            setOpen(true);
            setPhone(ItemsData.data.phone);
            setCart(ItemsData.data.cart);
            setResData(ItemsData)
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }

        getItemsSellerCardList();
    }

    async function getItemsSellerCardList() {
        const Items = await GetRepository.getProfileArizaCardLists(
            user?.access
        );
        if (Items?.results) {
            setProfileCard(Items?.results);
        }
    }

    useEffect(() => {
        getItemsSellerCardList();
    }, []);

    async function handleSubmitCode() {
        const dataNews = await PostRepository.postClickCode(
            cart,
            code,
            user?.access
        );
        if (dataNews) {
            setResDataCode(dataNews);
        }
        if (
            dataNews?.status !== 200 &&
            dataNews?.data?.msg?.[0] !== 'Parol xato'
        ) {
            setOpen(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${dataNews?.data?.msg}`,
            });

            setTimeout(() => {
                setResData(null);
            }, 2000);
        }
        if (dataNews?.status === 200) {
            
            setOpen(false);
            const modal = Modal.success({
                centered: true,
                title: 'Muffaqiyatli!',
                content: `${dataNews?.data?.msg}`,
            });
            if (user?.role === "seller") {
                Router.push('/account/sellerproducts')
            }else{
                Router.push('/account/myproducts')
            }
            if (document?.length > 1) {
                removeAll()
            }
        }
    }
console.log('==', user);
    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120);
            const timerID = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerID);
                        setResData(null);
                        setOpen(false)
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        }
    }, [resData]);

    function handleCancale() {
        setOpen(false);
        setResData(null);
    }

    const formattedTime = new Date(time * 1000).toISOString().substr(14, 5);
    console.log('data', document, number, cardDate);
    console.log('time', time);
    return (
        <div className="row g-3  mx-auto overflow-x-auto m-0">
            <div
                className=" border p-4 rounded click-b">
                <div
                    id="Card2"
                    className={
                        numberCard === 9860
                            ? 'BackImg'
                            : numberCard === 8600
                            ? 'BackImg2'
                            : numberCard === 5614
                            ? 'BackImg2'
                            : numberCard === 5555
                            ? 'BackImg4 '
                            : numberCard === 6262
                            ? 'BackImg2'
                            : numberCard === 4545
                            ? 'BackImg3'
                            : numberCard === 6565
                            ? 'BackImg3'
                            : 'BackImg1'
                    }>
                    <div className=" px-5">
                        <h5 className="cardText cardColorHumo  colCard2">
                            {number}
                        </h5>
                    </div>
                </div>
                <div>
                    <ClickCard
                        setCardDate={setCardDate}
                        onChange={(value) => numberTyper(value)}
                    />
                </div>

                <div className="col-12 p-0">
                    {message ? (
                        <button
                            type="submit"
                            onClick={() => handleClickCardPosts()}
                            className="ps-btn w-100 text-center">
                            {/* <i className="fa-solid fa-angles-left fa-fade me-2"></i>{' '} */}
                            Sotib olish
                        </button>
                    ) : (
                        <button className="ps-btn ps-btn--fullwidth w-100 text-center">
                            <BeatLoader color="#fff" />
                        </button>
                    )}
                </div>
            </div>

            <Modal
                width={500}
                title={'Kodni kiriting!'}
                centered
                open={open}
                onOk={handleSubmitCode}
                onCancel={handleCancale}>
                <>
                    <p>
                        Kod quyidagi raqamga yuborildi:
                        {resData?.data?.phone_number}
                    </p>
                    <input
                        onChange={(e) => setCode(e.target.value)}
                        type="tel"
                        placeholder="000000"
                        maxLength={6}
                        className="form-control text-center rounded-3 fs-3"
                    />
                    <strong className="text-danger">{formattedTime}</strong>
                    <p className="text-danger">
                        {resDataCode?.data?.msg?.[0] == 'Parol xato' &&
                            resDataCode?.data?.msg}
                    </p>
                </>
            </Modal>
        </div>
    );
};
export default CreditCard2;
