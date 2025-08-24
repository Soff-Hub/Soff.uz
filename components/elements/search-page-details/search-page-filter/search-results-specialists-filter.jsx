import { Select } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Axios from 'axios';

export default function SearchResultsSpecialists_Filter({total}) {
    const [positions, setPositions] = useState([])
    const router = useRouter();

    useEffect(()=>{
        const fetchpositions = async () => {
            try {
                const res = await Axios.get(`${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/users/positions`)
                setPositions(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchpositions()
    }, [])

    const handleChange = (key, value) => {
        router.push({
            pathname: router.pathname,
            query: {...router.query, [key]: value  },
        });
    };


    return (
        <div className='Search_Results_Specialists_form_box'>
            <p className='countSpecialist'>{total > 0 ? `${total} ta mutaxassis` : "Mutaxasislar yo'q"} </p>
            <form action='' className='Search_Results_Specialists_form'>
                {/* <Select
                    className="select_specalist"
                    value={router.position}
                    placeholder="Kasbni tanlang"
                    onChange={(value) => handleChange('position', value)}
                    allowClear
                >
                    {positions?.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.title}
                        </Select.Option>
                    ))}
                </Select> */}

                {/* <Select
                    className="select_specalist"
                    value={router.position}
                    placeholder="Saralash"
                    onChange={(value) => handleChange('order', value)}
                >
                    <Select.Option value="">Reyting</Select.Option>
                    {positions.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                            {item}
                        </Select.Option>
                    ))}
                </Select> */}
            </form>
        </div>
    );
}