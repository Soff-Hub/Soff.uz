import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { api } from '~/repositories/api';
import { Input } from 'antd';
import { testApi } from '~/service/testApi';

const { TextArea } = Input;
const options = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const AcceptFreelanceInviteModal = () => {
    const [value, setValue] = useState('');
    const [valueSelect, setValueSelect] = useState([]);
    const [error, setError] = useState(false);

    const handleChange = value => {
        setValueSelect(value);
        if (value.length > 0) {
            setError(false); // agar to‘g‘ri tanlasa, xatolik yo‘qoladi
        }
    };
    async function getData () {
        await testApi
            .get('/categories/{category_id}')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = () => {};

    return (
        <div>
            <p className='text-start w-100 text-muted'>
                Freelance faoliyatingiz yo‘nalishlarini tanlang
            </p>
            <Select
                mode='multiple'
                value={valueSelect}
                onChange={handleChange}
                placeholder={
                    error
                        ? 'Iltimos, kamida bitta yo‘nalish tanlang!'
                        : 'Yo‘nalish tanlang'
                }
                options={options}
                style={{
                    width: '100%',
                    zIndex: 1001,
                    borderColor: error ? 'red' : undefined,
                    boxShadow: error
                        ? '0 0 0 2px rgba(255, 0, 0, 0.2)'
                        : undefined,
                    borderRadius: error ? '5px' : undefined,
                }}
            />
            {error && (
                <p
                    style={{
                        color: 'red',
                        fontSize: '1.2rem',
                        marginTop: '4px',
                    }}>
                    Iltimos, kamida bitta yo‘nalish tanlang!
                </p>
            )}
            <div style={{ margin: '24px 0' }} />
            <p className='text-start w-100 text-muted'>
                Mutaxassis sifatida o‘zingiz haqingizda yozing
            </p>
            <TextArea
                className='d-flex justify-content-center align-items-center'
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Malakangiz, tajribangiz va qanday xizmatlar ko‘rsatishingiz haqida yozing.'
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className='h-100 d-flex justify-content-end align-items-end'>
                <button
                    onClick={handleSubmit}
                    type='button'
                    className='AcceptFreelanceInviteModalBtn'>
                    Tasdiqlash
                </button>
            </div>
        </div>
    );
};
export default AcceptFreelanceInviteModal;
