import React, { useEffect, useState } from 'react';
import { Modal, Rate } from 'antd';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import { useSelector } from 'react-redux';
const desc = ['1 ball', '2 ball', '3 ball', '4 ball', ' 5 ball'];

const RateCommit = ({ product, setDataCount }) => {
    const [value, setValue] = useState(0);
    const [text, setRateDes] = useState('');
    const { user } = useSelector((state) => state.auth);

    async function postOrder() {
        const formData = new FormData();
        setDataCount(true);

        if (value) {
            formData.append('rating', value);
        } if (text) {
            formData.append('review', text);
        }
        const ItemsData = await PatchRepository.patchDealUpdateApplicaitonCommit(product?.id, formData, user?.access);

        if (ItemsData?.status === 201 || ItemsData?.status === 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Mahsulotga sharh qoldirdingiz`,
            });

        } else {
            const modal = Modal.warning({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.data?.msg + ' ' + ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setDataCount(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((prevCountdown) => {
                if (prevCountdown === 5) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return prevCountdown + 1;
                }
            });
        }, 300);

        return () => {
            clearInterval(interval);
        };

    }, []);


    return (
        <div className='border p-4 rounded-3 border-success mt-5'>

            <div className='d-flex justify-content-center mt-3 mb-4'>
                <Rate

                    style={{ fontSize: "30px" }}
                    tooltips={desc}
                    onChange={setValue}
                    value={value}
                />
            </div>
            <textarea
                onChange={(e) =>
                    setRateDes(e.target.value)
                }
                rows={4}
                placeholder="Mahsulot haqida fikringiz?"
                className="p-3 rounded-3 w-100 border my-2"></textarea>

            <div className="d-flex justify-content-end">
                <button disabled={!value && !text} onClick={postOrder} className='btn btn-success fs-4 py-2 px-5'>Yuborish</button>
            </div>

        </div>
    )

}

export default RateCommit
