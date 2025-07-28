import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { baseURL } from '~/repositories/api';
import Cookies from 'js-cookie';

const CreateLinkSection = () => {
    const [userLink, setUserLink] = useState(''); // Initialize with empty string
    const [loading, setLoading] = useState(false);
    const token = Cookies.get('token');

    const generateAndCopy = async () => {
        if (!userLink) {
            message.warning('Iltimos, havolani kiriting!');
            return;
        }

        setLoading(true);
        try {
            const response = await Axios.post(
                `${baseURL}seller/affiliate-create/`,
                { link: userLink },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newLink = response?.data;

            if (newLink) {
                setUserLink(newLink); // Update input with new link
                await navigator.clipboard.writeText(newLink); // Copy to clipboard
                message.success('Havola yaratildi va nusxalandi!');
            } else {
                message.error('Havola yaratilmadi.');
            }
        } catch (error) {
            console.error(error);
            message.error('Xatolik yuz berdi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container py-5'>
            <div className='create_link_section'>
                <h2>Hamkorlik havolangizni yarating</h2>
                <div className='link_box d-flex gap-3 align-items-center'>
                    <Input
                        onChange={(e) => setUserLink(e.target.value)}
                        value={userLink}
                        placeholder='https://soff.uz/username'
                        size="large"
                    />
                    <Button
                        type="primary"
                        icon={<LinkOutlined />}
                        onClick={generateAndCopy}
                        loading={loading}
                        size="large"
                    >
                        Yaratish
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateLinkSection;