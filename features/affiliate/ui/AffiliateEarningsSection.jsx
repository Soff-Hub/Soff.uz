import { Card, Button, message } from 'antd';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { FaWallet } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa6';

export default function AffiliateEarningsSection() {
    const [earnings, setEarnings] = useState(0);
    const getWalletValue = async () => {
        try {
            const response = await Axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user-affiliate-wallet/`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            setEarnings(response.data || 0);
        } catch (error) {
            console.error('Error fetching earnings:', error);
        }
    };

    useEffect(() => {
        getWalletValue();
    }, []);

    return (
        <Card className="rounded-lg money_card shadow-md border">
            <div className="d-flex justify-content-center py-1 align-items-center flex-wrap gap-5">
                {/* 1. Hamyoncha + daromad */}
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-opacity-10 text-success rounded-circle p-3 d-flex justify-content-center align-items-center">
                        {/* <WalletOutlined style={{ fontSize: 28 }} /> */}
                        <FaWallet
                            style={{ fontSize: 28 }}
                            className="text-success"
                        />
                    </div>
                    <div>
                        <div className="text-muted fw-medium">
                            {earnings.affiliate_count} ta havola orqali daromad:{' '}
                            <span className="fw-bold text-black">
                                {formatCurrencyWithSpace(
                                    earnings.affiliate_wallet
                                )}{' '}
                                so'm
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => {
                        message.info(
                            "Pulni yechib olish uchun hamyonda kamida 35.000 so'm bo'lishi kerak.",
                            5
                        );
                    }}
                    type="primary"
                    icon={<FaMoneyBillWave />}
                    size="large"
                    className="d-flex justify-content-center">
                    Pulni yechib olish
                </Button>
            </div>
        </Card>
    );
}
