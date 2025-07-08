import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Input } from 'antd';
import { freelanceApi } from '~/service/freelanceApi';

const { TextArea } = Input;
const options = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const AcceptFreelanceInviteModal = () => {
    const [descValue, setDescValue] = useState('');
    const [valueSelect, setValueSelect] = useState([]);
    const [valueOption, setValueOption] = useState([]);
    const [error, setError] = useState(false);
    const [token, setToken] = useState(null); // token uchun state

    function getCookie (name) {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const t = getCookie('token');
            setToken(t);
        }
    }, []);

    console.log('getData', getCookie('token'));

    const handleChange = values => {
        setValueSelect(values);
    };

    async function getData () {
        await freelanceApi
            .get('/categories/{category_id}')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSubmit = () => {
        if (valueSelect.length === 0) {
            setError(true);
            return;
        }

        console.log('token:', token);
        console.log('Authorization header:', `Bearer ${getCookie('token')}`);
        console.log('Yuborilayotgan body:', {
            description: descValue,
            Category: valueSelect,
        });

        fetch('http://176.96.241.219:8006/auth/start-freelancing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                description: descValue,
                Category: valueSelect,
                Authorization: `Bearer ${token}`,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Serverdan xato javob keldi');
                }
                return response.json();
            })
            .then(data => {
                console.log('Javob:', data);
            })
            .catch(error => {
                console.error('Xatolik:', error);
            });
    };

    useEffect(() => {
        fetch(`http://176.96.241.219:8006/auth/start-freelancing/`)
            .then(res => res.json())
            .then(data => {
                setValueOption(data);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
            })
            .finally(() => {});
    }, []);
    console.log('valueOption', valueOption);

    useEffect(() => {
        getData();
    }, []);

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
                // value={value}
                onChange={e => setDescValue(e.target.value)}
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
