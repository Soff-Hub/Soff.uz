import { Card, Button, message } from "antd";
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function AffiliateEarningsSection() {
    const [earnings, setEarnings] = useState(0);
    const getWalletValue = async () => {
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user-affiliate-wallet/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }  
            });
            setEarnings(response.data.affiliate_wallet || 0);
        } catch (error) {
            console.error("Error fetching earnings:", error);
        }
    };
    useEffect(() => {
        getWalletValue();
    }, []);
    return (
        <Card className="p-4 mt-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                {/* 1. Hamyoncha + daromad */}
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-opacity-10 text-success rounded-circle p-3 d-flex justify-content-center align-items-center">
                        {/* <WalletOutlined style={{ fontSize: 28 }} /> */}
                         <i className="fas fa-wallet fa-2x text-success"></i>
                    </div>
                    <div>
                        <div className="text-muted fw-medium">Hamkorlik orqali daromad</div>
                        <div className="fw-bold fs-4 text-success">{earnings}</div>
                    </div>
                </div>

                {/* 2. Pulni yechish tugmasi */}
                <Button
                    onClick={() => {
                        message.info("Pulni yechish uchun hamyonda kamida 35.000 so'm bo'lishi kerak.");
                    }}
                    style={{ width: '200px' }}
                    icon={<i className="fas fa-money-bill-wave"></i>}
                    shape="round"
                    size="large"
                    type="primary"
                    className="bg-green-500 hover:bg-green-600 text-white fw-semibold"
                >
                    Pulni yechib olish
                </Button>
            </div>
        </Card>
    );
}
