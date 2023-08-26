import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import PostRepository from '~/repositories/PostRepository';


function FormCheckoutInformation() {
    const [cookies, setCookie] = useCookies(['cart']);
    const select = useSelector((state) => state.auth.user?.access);


    function extractIds(data) {
        const ids = [];
        for (const item of data) {
            ids.push(Number(item.id));
        }
        return ids;
    }

    const ids = extractIds(cookies?.cart ? cookies.cart : []);
console.log('to\'lov uchun berib yuborilgan id lar ', ids);
    const ProductToApi = async () => {

        const data = {
            documents: ids,
        };
        const token = {
            headers: {
                Authorization: `Bearer ${select} `,
            },
        };
        const respons = await PostRepository.postCartData(data, token);
        
        setCookie('cart', [], { path: '/' });
        console.log('ruyxatdan otgandagi card post', respons);
        if (respons?.documents) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz hujjatni savatga qo'shdingiz`,
            });
            modal.update;
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Nimadir xato!',
                content: `Sizning savatdagi hujjatlaringiz sotib olish uchun qo'shilmadi`,
            });
            modal.update;
        }

    };

    useEffect(() => {

    },[cookies])

    return (
        <div className="tolov-usullari">
            <div className="payme-logo">
                <img
                    src="/static/img/payme2.png"
                    alt="payme"
                    width="100%"
                    height="100%"
                />
                <p
                    style={{ display: 'inline-block' }}
                    className="ps-btn"
                    onClick={() => ProductToApi()}>
                    <i class="fa-solid fa-angles-left fa-fade me-2"></i> To'lov
                    qilish{' '}
                </p>

            </div>
        </div>
    );

}

export default FormCheckoutInformation;
