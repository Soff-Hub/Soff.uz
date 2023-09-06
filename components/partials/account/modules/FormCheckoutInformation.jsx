import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import PostRepository from '~/repositories/PostRepository';
import useEcomerce from '~/hooks/useEcomerce';
import ClickRepository from '~/repositories/ClickRepository';
import { BeatLoader } from 'react-spinners';

function FormCheckoutInformation() {
    const { increaseQty, decreaseQty, removeItem, removeItems } = useEcomerce();

    const [cookies, setCookie] = useCookies(['cart']);
    const select = useSelector((state) => state.auth.user?.access);
    const [card, setCard] = useState([]);
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('click');
    const [message, setMessage] = useState(true);

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

    console.log('cardd', card);

    useEffect(() => {
        // let cookeCard = cookies?.cart;
        select && GetCard();

        setData(cookies?.cart);

        // if (card?.length > 0) {
        //     // function Tekshirish(array1, array2) {
        //     //     const yangiData = [];

        //     //     for (let i = 0; i < array1.length; i++) {
        //     //       let isIdFound = false;

        //     //       for (let j = 0; j < array2.length; j++) {
        //     //         if (array1[i].id !== array2[j].id) {
        //     //             yangiData.push(array1[i]);
        //     //           break;
        //     //         }
        //     //       }

        //     //       if (!isIdFound) {
        //     //         yangiData.push(array1[i]);
        //     //       }
        //     //     }

        //     //     return yangiData;
        //     //   }

        //     function Tekshirish(array1, array2) {
        //         return array2.filter(
        //             (obj1) => !array1.some((obj2) => obj2.id !== obj1.id)
        //         );
        //     }

        //     setData(Tekshirish(cookeCard, card));
        //     console.log('tek', Tekshirish(cookeCard, card));
        // }else{
        //     setData(cookies?.cart)
        // }
    }, [cookies]);

    function extractIds(data) {
        const ids = [];
        for (const item of data) {
            ids.push(Number(item.id));
        }
        return ids;
    }
    const ids = extractIds(data);
    console.log("to'lov uchun berib yuborilgan id lar ", ids);

    const ProductToApi = async () => {
        setMessage(false);
        const data = {
            documents: ids,
        };
        const token = {
            headers: {
                Authorization: `Bearer ${select} `,
            },
        };
        const respons = await ClickRepository.postClick(data, token);

        if (respons?.status === 200 || respons?.status === 201) {
            setCookie('cart', [], { path: '/' });
            removeItems('cart');
            window.open(`${respons?.data?.url}`, '_blank');
            setMessage(true);
        } else {
            setMessage(true);
            const modal = Modal.error({
                centered: true,
                title: 'Nimadir xato!',
                content: `Sizning savatdagi hujjatlaringiz sotib olish uchun qo'shilmadi`,
            });
            modal.update;
        }

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
                    <img
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
                    <i class="fa-solid fa-angles-left fa-fade me-2"></i> To'lov
                    qilish{' '}
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
