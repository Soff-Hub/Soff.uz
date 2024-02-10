import React, { useEffect, useState } from 'react';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { Modal } from 'antd';
import ClickCard from './clickCard';

const CreditCard2 = () => {
    const { user } = useSelector((state) => state.auth);
    const [number, SetNumber] = useState('●●●● ●●●● ●●●● ●●●●');
    const [numberCard, SetNumberCard] = useState(null);
    const [numberCardVal, SetNumberCardVal] = useState(null);
    const [profileCard, setProfileCard] = useState([]);
    const [message, setMessage] = useState(true);
    const [cardDate, setCardDate] = useState("")

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
        const ItemsData = await PostsRepository.CardPostsCredit(
            { credit_card: numberCardVal },
            user?.access
        );
        if (ItemsData.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ItemsData?.data?.msg,
            });
            modal.update;
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Muvaffaqqiyatli!',
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

    return (
        <div className="row g-3  mx-auto overflow-x-auto m-0">
            {/* <h3 style={{ fontWeight: 600 }}>Yangi karta qo'shish</h3> */}
            <div
                className=" border p-4 rounded mt-5"
                style={{ width: '450px' }}>
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
                        <h5 className="cardText cardColorHumo colCard colCard2">
                            {number}
                        </h5>
                    </div>
                </div>
                <ClickCard setCardDate={setCardDate} onChange={(value) => numberTyper(value)} />
                {message ? (
                    <p
                        style={{ display: 'inline-block', width: '450px' }}
                        className="ps-btn w-100 text-center"
                        onClick={() => handleClickCardPosts()}>
                        <i className="fa-solid fa-angles-left fa-fade me-2"></i>{' '}
                        To'lov qilish
                    </p>
                ) : (
                    <p>
                        <button
                            style={{ width: '450px' }}
                            type="submit"
                            className="ps-btn ps-btn--fullwidth mb-5">
                            <BeatLoader color="#fff" />
                        </button>
                    </p>
                )}
            </div>

        </div>
    );
};
export default CreditCard2;
