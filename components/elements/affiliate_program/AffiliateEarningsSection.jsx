import { Card, Button } from "antd";
import { WalletOutlined } from "@ant-design/icons"; // yoki FontAwesome orqali

export default function AffiliateEarningsSection() {
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
                        <div className="text-muted fw-medium">Affiliate orqali daromad</div>
                        <div className="fw-bold fs-4 text-success">120 000 so‘m</div>
                    </div>
                </div>

                {/* 2. Pulni yechish tugmasi */}
                <Button
                    type="primary"
                    size="large"
                    className="bg-green-500 hover:bg-green-600 text-white fw-semibold"
                >
                    Pulni yechib olish
                </Button>
            </div>
        </Card>
    );
}
