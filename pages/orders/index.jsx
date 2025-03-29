import { useState } from "react";
import { Input, Button, Card, Select, message } from "antd";
import { EditOutlined, CopyOutlined, FileTextOutlined, FilePptOutlined, FileWordOutlined, FilePdfOutlined, ScheduleOutlined, ReadOutlined, SolutionOutlined, ProfileOutlined, FileDoneOutlined, SnippetsOutlined, ProjectOutlined, PictureOutlined, ContainerOutlined, BulbOutlined, FileProtectOutlined, FileUnknownOutlined, CodeOutlined, SketchOutlined, GlobalOutlined } from "@ant-design/icons";
import PageContainer from "~/components/layouts/PageContainer";
import Meta from "~/components/shared/headers/Meta";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import FooterComponents from "~/components/blocks/footer/FooterComponents";

const categories = [    
    { name: "Taqdimot", icon: <FilePptOutlined /> },
    { name: "Kurs ishi", icon: <FileWordOutlined /> },
    { name: "Diplom ishi", icon: <FileTextOutlined /> },
    { name: "Referat", icon: <FilePdfOutlined /> },
    { name: "Mustaqil ish", icon: <ProfileOutlined /> },
    { name: "Labaratoriya ishi", icon: <ScheduleOutlined /> },
    { name: "Dissertatsiya ishi", icon: <ReadOutlined /> },
    { name: "Test", icon: <SolutionOutlined /> },
    { name: "O'quv qo'llanma", icon: <ProfileOutlined /> },
    { name: "Dars ishlanma", icon: <FileDoneOutlined /> },
    { name: "Tarqatma material", icon: <SnippetsOutlined /> },
    { name: "Amaliy ish", icon: <ProjectOutlined /> },
    { name: "Blanka", icon: <ContainerOutlined /> },
    { name: "Loyiha", icon: <BulbOutlined /> },
    { name: "Plakat", icon: <PictureOutlined /> },
    { name: "Maqola", icon: <FileTextOutlined /> },
    { name: "Ixtiro patenti", icon: <FileProtectOutlined /> },
    { name: "Namunaviy hujjat", icon: <FileUnknownOutlined /> },
    { name: "Biznes reja", icon: <FileWordOutlined /> },
    { name: "3D model va Interier dizayn", icon: <SketchOutlined /> },
    { name: "Dasturlash", icon: <CodeOutlined /> },
    { name: "Dizayn", icon: <SketchOutlined /> },
    { name: "Veb sayt", icon: <GlobalOutlined /> },
];

const MODERATOR_TELEGRAM = "https://t.me/soff_moderator";

export default function OrderForm() {
    const [orderDetails, setOrderDetails] = useState({
        category: "",
        description: "",
        budget: "",
        deadline: "",
    });
    const [copied, setCopied] = useState(false);

    const handleChange = (name, value) => {
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const formatBudget = (value) => {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so‘m";
    };

    const handleBudgetChange = (e) => {
        setOrderDetails({ ...orderDetails, budget: formatBudget(e.target.value) });
    };

    const formattedText = `📌 Yangi buyurtma:\n🔹 Kategoriya: ${orderDetails.category}\n🔹 Tavsif: ${orderDetails.description}\n🔹 Byudjet: ${orderDetails.budget}\n🔹 Muddati: ${orderDetails.deadline}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedText);
        setCopied(true);
        message.success("Buyurtma nusxalandi! Endi Telegram moderatoriga yuborishingiz mumkin.");
        setTimeout(() => {
            setCopied(false);
            window.open(MODERATOR_TELEGRAM, "_blank");
        }, 2000);
    };

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Raqamli mahsulot buyurtma berish'}
            boxed={true}>
            <Meta
                title={'Raqamli mahsulot buyurtma berish'}
                description={'Raqamli mahsulot buyurtma berish bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!'}
            />
            <Card 
                title={
                    <span className="h4 p-0">
                        <EditOutlined className="mr-2" /> Yangi Buyurtma Berish
                    </span>
                } 
                className="p-4 max-w-md mx-auto"
                styles={{ header: { padding: 0 } }}>
                <Select
                    placeholder="Kategoriya tanlang"
                    className="mb-2 mt-3 w-100"
                    onChange={(value) => handleChange("category", value)}
                >
                    {categories.map((category) => (
                        <Select.Option key={category.name} value={category.name}>
                            {category.icon} {category.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input.TextArea
                    name="description"
                    placeholder="Buyurtma tavsifi"
                    rows={3}
                    value={orderDetails.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="mb-2"
                />
                <Input
                    name="budget"
                    placeholder="Byudjet (so‘m)"
                    value={orderDetails.budget}
                    onChange={handleBudgetChange}
                    className="mb-2"
                />
                <Input
                    name="deadline"
                    placeholder="Muddati (kunlar)"
                    value={orderDetails.deadline}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    className="mb-2"
                />
                <Card className="p-3 bg-gray-100 mt-3">
                    <pre className="whitespace-pre-wrap">{formattedText}</pre>
                </Card>
                <Button
                    type="primary"
                    icon={<CopyOutlined />}
                    onClick={handleCopy}
                    className="mt-3 w-full"
                >
                    {copied ? "Nusxalandi!" : "Nusxalash va Telegramga yuborish"}
                </Button>
            </Card>

            <FooterComponents/>
        </PageContainer>
    );
}
