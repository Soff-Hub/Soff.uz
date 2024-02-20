import React, { useEffect, useState } from 'react';
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
    const { removeAll } = useCart();
    const [buttonOk, setButtonOk] = useState(false);
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

    async function handleClickCardPosts(e) {
        e.preventDefault();
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
            setResData(ItemsData);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.expire_date
                    ? ' Karta amal qilish muddatini kiriting'
                    : ItemsData?.data?.card_number
                    ? "Karta raqamini to'g'ri kiriting"
                    : ItemsData?.data?.msg,
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
        setButtonOk(true);
        const dataNews = await PostRepository.postClickCode(
            cart,
            code,
            user?.access
        );
        if (dataNews) {
            setResDataCode(dataNews);
            setButtonOk(false);
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
            if (user?.role === 'seller') {
                Router.push('/account/sellerproducts');
            } else {
                Router.push('/account/myproducts');
            }
            if (document?.length > 1) {
                removeAll();
            }
        }
    }
    useEffect(() => {
        if (resData?.status === 201) {
            setTime(120);
            const timerID = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerID);
                        setResData(null);
                        setOpen(false);
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

    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');

    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' '; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }

        numberTyper(inputValue);
        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = (e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Raqam va probilni olib tashlash
        let formattedValue = '';

        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/'; // Raqamlarni probil bilan ajratish
                }
                formattedValue += inputValue[i];
            }
        }
        setCardDate(inputValue);
        setNumberDate(formattedValue);
    };
    console.log('carddata', numberCardVal, 'date', cardDate);
    return (
        <div className="row   mx-auto m-0">
            <div className=" px-4 rounded click-b">
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
                    <form
                        onSubmit={handleClickCardPosts}
                        className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
                        <div className="col-md-8 col-sm-8 click-form-item">
                            <span style={{ display: 'block' }}>
                                Karta raqam
                            </span>
                            <label htmlFor="ccn">
                                <i class="fa-regular fa-credit-card i"></i>
                                <input
                                    required
                                    id="ccn"
                                    type="tel"
                                    className="form-control rounded-3 card__number "
                                    inputMode="numeric"
                                    pattern="[0-9\s]{13,19}"
                                    autoComplete="cc-number"
                                    maxLength="19"
                                    placeholder="0000 0000 0000 0000"
                                    value={formattedCardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </label>
                        </div>
                        <div className="col-md-4 col-sm-4 click-form-item">
                            <label>
                                <i class="fa-regular fa-calendar-days"></i>
                                <input
                                    required
                                    id="ccn"
                                    className="form-control rounded-3 card__number"
                                    inputMode="numeric"
                                    autoComplete="cc-number"
                                    maxLength="5"
                                    placeholder="MM/YY"
                                    value={numberDate}
                                    onChange={handleCardNumberDate}
                                />
                            </label>
                        </div>
                        <div className="col-12 p-0 px-4 my-3">
                            {message ? (
                                <button
                                    type="submit"
                                    className="ps-btn w-100 text-center btn_color">
                                    Davom etish
                                </button>
                            ) : (
                                <button className="ps-btn ps-btn--fullwidth w-100 text-center">
                                    <BeatLoader color="#fff" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                width={500}
                title={'Kodni kiriting!'}
                centered
                open={open}
                onOk={handleSubmitCode}
                onCancel={handleCancale}
                okButtonProps={{
                    style: { backgroundColor: 'green', color: 'white' },
                }}
                okText={
                    buttonOk ? <BeatLoader color="#fff" /> : "To'lov qilish"
                }
                cancelText="Orqaga">
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
