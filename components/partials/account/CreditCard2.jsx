import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal, Tabs } from 'antd';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import Router from 'next/router';
import useCart from '~/hooks/useCart';

const CreditCard2 = ({ document }) => {
    const { user } = useSelector((state) => state.auth);
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [message, setMessage] = useState(true);
    const [cardDate, setCardDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(120);
    const [code, setCode] = useState(null);
    const [resData, setResData] = useState(null);
    const [cart, setCart] = useState(0);
    const [resDataCode, setResDataCode] = useState(null);
    const { removeAll } = useCart();
    const [buttonOk, setButtonOk] = useState(false);
    const [tab, setTab] = useState(false);

    const numberTyper = (value) => {
        SetNumberCardVal(value);
        if (!value == 0) {
            let numberPlaceholder = '';
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) {
                    numberPlaceholder += ' ';
                }
                numberPlaceholder += value[i] || '●';
            }
        }

    };

    async function handleClickCardPostsclick(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCardNumber(
            document,
            'click',
            user?.access
        );
        if (ItemsData?.status === 201) {
            setMessage(true);
            Router.push(ItemsData?.data?.url);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }

    }
    async function handleClickCardPostsPayme(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCardNumber(
            document,
            'payme',
            user?.access
        );
        if (ItemsData?.status === 201) {
            setMessage(true);
            Router.push(ItemsData?.data?.url);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli emas',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        }

    }

    async function handleClickCardPosts(e) {
        e.preventDefault();
        setMessage(false);
        const ItemsData = await PostRepository.postClickCard(
            document,
            numberCardVal,
            cardDate,
            user?.access
        );
        if (ItemsData?.status === 201) {
            setMessage(true);
            setOpen(true);
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

    }

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
            if (dataNews?.data?.file_url) {
                handleButtonClick(dataNews?.data?.file_url)
            }
        }
    }

  

    const handleButtonClick = async (fileContent) => {
        try {
            const response = await axios.get(fileContent, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                "Audio" +
                '.' +
                fileContent?.split('.')[
                fileContent?.split('.').length - 1
                ];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading file: ', error);
    
        }
    };



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

    const onChange = (key) => {
        setTab(key);
    };
    const items = [
        {
            key: '1',
            label: (
                <div className="click">
                    <img src="/static/img/uzcard_humo.png" alt="" />
                </div>
            ),
            children: (
                <div className="row   mx-auto m-0">
                    <div className=" px-4 rounded click-b">
                        <div>
                            <form
                                onSubmit={handleClickCardPosts}
                                className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
                                <div className="col-md-8 col-sm-8 click-form-item">
                                    <span style={{ display: 'block' }}>
                                        Karta raqam
                                    </span>
                                    <label htmlFor="ccn">
                                        <i className="fa-regular fa-credit-card i"></i>
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
                                        <i className="fa-regular fa-calendar-days"></i>
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
                            buttonOk ? (
                                <BeatLoader color="#fff" />
                            ) : (
                                "To'lov qilish"
                            )
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
                            <strong className="text-danger">
                                {formattedTime}
                            </strong>
                            <p className="text-danger">
                                {resDataCode?.data?.msg?.[0] == 'Parol xato' &&
                                    resDataCode?.data?.msg}
                            </p>
                        </>
                    </Modal>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="click">
                    <img src="/static/img/click.png" alt="" />
                </div>
            ),
            children: (
                <div className="row   mx-auto m-0">
                    <div className=" px-4 rounded click-b">
                        <form
                            onSubmit={handleClickCardPostsclick}
                            className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
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
            ),
        },

        {
            key: '3',
            label: (
                <div className="click">
                    <img src="/static/img/soff/paymee-r.png" alt="" />
                </div>
            ),
            children: (
                <div className="row   mx-auto m-0">
                    <div className=" px-4 rounded click-b">
                        <form
                            onSubmit={handleClickCardPostsPayme}
                            className=" pt-3 pb-3 d-flex align-items-end justify-content-between row gap-xxs-0 gap-xs-0 gap-lg-0 gap-md-0 gap-3">
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
            ),
        },
    ];

    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
export default CreditCard2;
