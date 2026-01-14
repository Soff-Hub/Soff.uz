import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { baseURL } from '~/repositories/api';
import Cookies from 'js-cookie';
import AuthModal from '~/features/auth/ui/auth-modal';
import { useIsLoggedIn } from '~/shared/hooks/useIsLoggedIn';
import AffiliateEarningsSection from './AffiliateEarningsSection';
import { useTranslation } from 'next-i18next';

const CreateLinkSection = () => {
    const { t } = useTranslation('affiliate');
    const [userLink, setUserLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [inputError, setInputError] = useState('');
    const [copied, setCopied] = useState(false);

    const token = Cookies.get('token');
    const isLoggedIn = useIsLoggedIn();

    const generateAndCopy = async () => {
        setInputError('');
        if (!userLink) {
            message.warning(t('createLink.enterLink'));
            return;
        }
        if (!isLoggedIn) {
            setAuthModalOpen(true);
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

            if (newLink?.link) {
                setUserLink(newLink.link); // 🔧 Faqat link qiymatini yoz
                setCopied(true);
                await navigator.clipboard.writeText(newLink.link); // 📋 Avto nusxalash
                message.success(t('createLink.linkCreated'));
            } else {
                setInputError(t('createLink.linkNotCreated'));
            }
        } catch (error) {
            console.error(error);
            if (error?.response?.data && typeof error.response.data === 'object') {
                const messages = Object.values(error.response.data).join(' ');
                setInputError(messages || t('createLink.error'));
            } else {
                setInputError(error?.response?.data?.message || error?.message || t('createLink.error'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (userLink) {
            await navigator.clipboard.writeText(userLink);
            message.success(t('createLink.linkCopied'));
        }
    };

    return (
        <div className='container py-5'>
            <div style={{maxWidth: !isLoggedIn && "700px"}} className='create_link_section'>
                <h2>{t('createLink.title')}</h2>
                <div className={`${isLoggedIn && "row d-flex align-items-center justify-content-between" }`}>
                    <div className={`link_box ${isLoggedIn && "col-12 col-md-6"} `}>
                        <Input
                            onChange={(e) => {
                                setUserLink(e.target.value);
                                setInputError('');
                                setCopied(false);
                            }}
                            value={userLink}
                            placeholder={t('createLink.placeholder')}
                            size="large"
                            status={inputError ? 'error' : ''}
                        />
                        <Button
                            type="primary"
                            icon={copied ? <CopyOutlined /> : <LinkOutlined />}
                            onClick={copied ? handleCopy : generateAndCopy}
                            loading={loading}
                            size="large"
                        >
                            {copied ? t('createLink.copy') : t('createLink.create')}
                        </Button>
                    </div>
                    {isLoggedIn && 
                        <div className='col-12 col-md-6'>
                            <AffiliateEarningsSection />
                        </div>
                    }
                </div>

                {inputError && (
                    <p style={{ color: 'red', marginTop: '4px', fontSize: '13px', textAlign: "left", marginLeft: "60px" }}>
                        {inputError}
                    </p>
                )}

                {copied && (
                    <p style={{ marginTop: '5px', marginLeft: '55px', fontSize: '15px', textAlign: "left" }}>
                        <a href={userLink} target="_blank" rel="noopener noreferrer">
                            {userLink}
                        </a>
                    </p>
                )}
            </div>

            {/* Auth Modal */}
            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </div>
    );
};

export default CreateLinkSection;
