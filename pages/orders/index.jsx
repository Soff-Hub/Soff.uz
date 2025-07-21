// import { useState } from "react";
// import { Input, Button, Card, Select, message, Modal, Alert } from "antd";
// import { EditOutlined, CopyOutlined, FileTextOutlined, FilePptOutlined, FileWordOutlined, FilePdfOutlined, ScheduleOutlined, ReadOutlined, SolutionOutlined, ProfileOutlined, FileDoneOutlined, SnippetsOutlined, ProjectOutlined, PictureOutlined, ContainerOutlined, BulbOutlined, FileProtectOutlined, FileUnknownOutlined, CodeOutlined, SketchOutlined, GlobalOutlined } from "@ant-design/icons";
// import PageContainer from "~/components/layouts/PageContainer";
// import Meta from "~/components/shared/headers/Meta";
// import FooterDefault from "~/components/shared/footers/FooterDefault";
// import FooterComponents from "~/components/blocks/footer/FooterComponents";

// const categories = [    
//     { name: "Taqdimot", icon: <FilePptOutlined /> },
//     { name: "Kurs ishi", icon: <FileWordOutlined /> },
//     { name: "Diplom ishi", icon: <FileTextOutlined /> },
//     { name: "Referat", icon: <FilePdfOutlined /> },
//     { name: "Mustaqil ish", icon: <ProfileOutlined /> },
//     { name: "Labaratoriya ishi", icon: <ScheduleOutlined /> },
//     { name: "Dissertatsiya ishi", icon: <ReadOutlined /> },
//     { name: "Test", icon: <SolutionOutlined /> },
//     { name: "O'quv qo'llanma", icon: <ProfileOutlined /> },
//     { name: "Dars ishlanma", icon: <FileDoneOutlined /> },
//     { name: "Tarqatma material", icon: <SnippetsOutlined /> },
//     { name: "Amaliy ish", icon: <ProjectOutlined /> },
//     { name: "Blanka", icon: <ContainerOutlined /> },
//     { name: "Loyiha", icon: <BulbOutlined /> },
//     { name: "Plakat", icon: <PictureOutlined /> },
//     { name: "Maqola", icon: <FileTextOutlined /> },
//     { name: "Ixtiro patenti", icon: <FileProtectOutlined /> },
//     { name: "Namunaviy hujjat", icon: <FileUnknownOutlined /> },
//     { name: "Biznes reja", icon: <FileWordOutlined /> },
//     { name: "3D Dizayn va Vizualizatsiya", icon: <SketchOutlined /> },
//     { name: "Veb Dasturlash va IT Xizmatlari", icon: <CodeOutlined /> },
//     { name: "Grafik Dizayn va Shablonlar", icon: <SketchOutlined /> },
//     { name: "Hujjatlar va Professional Shablonlar", icon: <PictureOutlined /> },
// ];

// const MODERATOR_TELEGRAM = "https://t.me/soff_moderator";

// export default function OrderForm() {
//     const [orderDetails, setOrderDetails] = useState({
//         category: "",
//         description: "",
//         budget: "",
//         deadline: "",
//     });
//     const [copied, setCopied] = useState(false);
//     const [isBlocked, setIsBlocked] = useState(false);

//     const handleChange = (name, value) => {
//         setOrderDetails({ ...orderDetails, [name]: value });
//     };

//     const formatBudget = (value) => {
//         return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so‘m";
//     };

//     const handleBudgetChange = (e) => {
//         setOrderDetails({ ...orderDetails, budget: formatBudget(e.target.value) });
//     };

//     const formattedText = `📌 Yangi buyurtma:\n🔹 Kategoriya: ${orderDetails.category}\n🔹 Tavsif: ${orderDetails.description}\n🔹 Byudjet: ${orderDetails.budget}\n🔹 Muddati: ${orderDetails.deadline}`;

//     const handleCopy = () => {
//         navigator?.clipboard.writeText(formattedText);
//         setCopied(true);
//         message.success("Buyurtma nusxalandi! Endi Telegram moderatoriga yuborishingiz mumkin.");

//         setTimeout(() => {
//             setCopied(false);
//             const newWindow = window.open(MODERATOR_TELEGRAM, "_blank");

//             if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
//                 setIsBlocked(true); // Agar bloklansa, modalni ochish
//             }
//         }, 2000);
//     };
//     return (
//         <PageContainer
//             footer={<FooterDefault />}
//             title={'Raqamli mahsulot buyurtma berish - Soff.uz'}
//             boxed={true}>
//             <Meta
//                 title={'Raqamli mahsulot buyurtma berish - Soff.uz'}
//                 description={'Soff.uz orqali raqamli mahsulotlarga buyurtma bering. Ishonchli sotuvchilar va sifatli kontent bilan tez va oson xizmatlardan foydalaning.'}
//                 image="/static/img/video-darsliklar-2.png" 
//                 keywords={[{name: "Biznes rejalar buyurtma berish"}, {name:"Taqdimotlar buyurtma berish"}, {name: "Kurs ishlari buyurtma berish"}, {name: "Diplom ishlari buyurtma berish"}, {name: "Referatlar buyurtma berish"}, {name: "Mustaqil ishlar buyurtma berish"}, {name: "Labaratoriya Ishlari buyurtma berish"}, {name: "Dissertatsiya ishlari buyurtma berish"}, {name: "Testlar buyurtma berish"}, {name: "O'quv qo'llanmalar buyurtma berish"}, {name: "MustDars ishlanmalaraqil buyurtma berish"}, {name: "Tarqatma materiallar buyurtma berish"}, {name: "Amaliy ishlar buyurtma berish"}, {name: "Blankalar buyurtma berish"}, {name: "Ijodiy Ishlar buyurtma berish"}, {name: "Loyihalar buyurtma berish"}, {name: "Plakatlar buyurtma berish"}, {name: "Elektron kitoblar buyurtma berish"}, {name: "Dasturlash tillari"}]} 
//                 author="Soff.uz"
//             />
//             <Modal
//                 title="Havolani oching!"
//                 open={isBlocked}
//                 onCancel={() => setIsBlocked(false)}
//                 footer={[
//                     <Button key="close" onClick={() => setIsBlocked(false)}>Yopish</Button>,
//                     <Button key="link" type="primary">
//                         <a href={MODERATOR_TELEGRAM} target="_blank" rel="noopener noreferrer">Havolani ochish</a>
//                     </Button>
//                 ]}
//             >
//                 <p>Brauzer xavfsizlik cheklovlari sababli Telegram havolasi avtomatik ochilmadi.</p>
//                 <p>Havolani qo‘lda ochish uchun quyidagi tugmani bosing:</p>
//             </Modal>
//             <Card 
//                 title={
//                     <span className="h4 p-0">
//                         <EditOutlined className="mr-2" /> Yangi Buyurtma Berish
//                     </span>
//                 } 
//                 className="p-4 max-w-md mx-auto"
//                 styles={{ header: { padding: 0 } }}>
//                 <Alert
//                         message="Diqqat!"
//                         description="Iltimos, buyurtma berishdan oldin platformamizda mavjud mahsulotlardan qidirib ko‘ring. Kerakli mahsulotni topa olmasangizgina, yangi buyurtma berishingiz mumkin."
//                         type="warning"
//                         showIcon
//                         closable
//                     />
//                 <Select
//                     placeholder="Kategoriya tanlang"
//                     className="mb-2 mt-3 w-100"
//                     onChange={(value) => handleChange("category", value)}
//                 >
//                     {categories.map((category) => (
//                         <Select.Option key={category.name} value={category.name}>
//                             {category.icon} {category.name}
//                         </Select.Option>
//                     ))}
//                 </Select>
//                 <Input.TextArea
//                     name="description"
//                     placeholder="Buyurtma tavsifi"
//                     rows={3}
//                     value={orderDetails.description}
//                     onChange={(e) => handleChange("description", e.target.value)}
//                     className="mb-2"
//                 />
//                 <Input
//                     name="budget"
//                     placeholder="Byudjet (so‘m)"
//                     value={orderDetails.budget}
//                     onChange={handleBudgetChange}
//                     className="mb-2"
//                 />
//                 <Input
//                     name="deadline"
//                     placeholder="Muddati (kunlar)"
//                     value={orderDetails.deadline}
//                     onChange={(e) => handleChange("deadline", e.target.value)}
//                     className="mb-2"
//                 />
//                 <Card className="p-3 bg-gray-100 mt-3">
//                     <pre className="whitespace-pre-wrap">{formattedText}</pre>
//                 </Card>
//                 <Button
//                     type="primary"
//                     icon={<CopyOutlined />}
//                     onClick={handleCopy}
//                     className="mt-3 w-full"
//                 >
//                     {copied ? "Nusxalandi!" : "Nusxalash va Telegramga yuborish"}
//                 </Button>
//             </Card>

//         </PageContainer>
//     );
// }




import React from 'react';
import { Button } from 'antd';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ServicesFilterSection from '~/components/services/ServicesFilterSection';
import ServicesCardSection from '~/components/services/ServicesCardSection';




export default function SoffFreelancerPage({servicesData}) {
  console.log(servicesData)
  return (
    <PageContainer>
      <Meta
        title={'Raqamli mahsulot buyurtma berish - Soff.uz'}
        description={'Soff.uz orqali raqamli mahsulotlarga buyurtma bering. Ishonchli sotuvchilar va sifatli kontent bilan tez va oson xizmatlardan foydalaning.'}
        image="/static/img/video-darsliklar-2.png"
        keywords={[{ name: "Biznes rejalar buyurtma berish" }, { name: "Taqdimotlar buyurtma berish" }, { name: "Kurs ishlari buyurtma berish" }, { name: "Diplom ishlari buyurtma berish" }, { name: "Referatlar buyurtma berish" }, { name: "Mustaqil ishlar buyurtma berish" }, { name: "Labaratoriya Ishlari buyurtma berish" }, { name: "Dissertatsiya ishlari buyurtma berish" }, { name: "Testlar buyurtma berish" }, { name: "O'quv qo'llanmalar buyurtma berish" }, { name: "MustDars ishlanmalaraqil buyurtma berish" }, { name: "Tarqatma materiallar buyurtma berish" }, { name: "Amaliy ishlar buyurtma berish" }, { name: "Blankalar buyurtma berish" }, { name: "Ijodiy Ishlar buyurtma berish" }, { name: "Loyihalar buyurtma berish" }, { name: "Plakatlar buyurtma berish" }, { name: "Elektron kitoblar buyurtma berish" }, { name: "Dasturlash tillari" }]}
        author="Soff.uz"
      />

      <div className='ps-page--shop my-5 container p-xl-0 p-l-0'>
        <ServicesFilterSection />


        <ServicesCardSection services={servicesData} />
      </div>



    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const {
    direction,
  } = context.query

  const fetchJson = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return res.json();
  };

  const servicesUrl = `http://176.96.241.219:8005/api/v1/users/sellers/service?direction=${direction}`

  const [servicesData] = await Promise.all([
    fetchJson(servicesUrl)
  ])

  return {
    props: {
      servicesData: servicesData || null
    }
  }
}

// old design
// <div className="container py-5">
//   {/* Hero section */}
//   <div className="text-center mb-5" style={{
//     background: 'linear-gradient(135deg, rgb(0 164 79 / 32%), rgb(49 47 48 / 0%))',
//     borderRadius: '10px',
//     padding: '50px 20px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//     color: '#fff',
//   }}>
//   <h1 className="display-6 mb-4">
//   <strong>Soff Freelancer</strong> — Mutaxassislar sizga kerakli topshiriqlarni tez va sifatli bajarib beradi
//   </h1>
//   <p className="mb-4 mx-auto" style={{ maxWidth: '800px' }}>
//       O‘quv va ilmiy ishlari, hujjatlar yoki IT xizmatlar bo‘yicha topshiriqlaringiz bormi? Soha, muddat va talablaringizni yozing — mutaxassislar siz uchun sifatli bajarib berishadi. Telegram bot orqali tez, qulay va oson.
//   </p>
//     <a
//       href="https://t.me/soff_freelancing_bot"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Button
//         type="primary"
//         size="large"
//         className="btn btn-light btn-lg text-white rounded-3 px-5"
//         style={{
//           background: 'rgb(0, 164, 79)',
//           border: 'none',
//           fontSize: '16px',
//           letterSpacing: '1px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         Botni ishga tushurish
//       </Button>
//     </a>
//   </div>

//   {/* Steps section */}
//   <div className="row justify-content-center mb-5">
//     {steps.map((step, index) => (
//       <div className="col-md-6 col-lg-3 mb-4" key={index}>
//         <div
//           className="card shadow-lg border-0"
//           style={{
//             borderRadius: '20px',
//             padding: '30px 20px',
//             backgroundColor: '#f9f9f9',
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//             textAlign: 'center',
//           }}
//         >
//           <div style={{
//             color: '#fff',
//             borderRadius: '50%',
//             width: '50px',
//             height: '50px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 20px',
//           }}>
//             <span style={{ fontSize: '28px' }}>{step.emoji}</span>
//           </div>
//           <h4 style={{ color: 'rgb(0, 164, 79)', fontWeight: '600', fontSize: '18px' }}>
//             {step.title}
//           </h4>
//           <p style={{ color: '#312f30', fontSize: '14px', fontWeight: '400' }}>
//             {step.description}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* CTA */}
//   <div className="text-center">
//     <a
//       href="https://t.me/soff_freelancing_bot"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <Button
//           type="primary"
//           size="large"
//           className="btn btn-success btn-lg rounded-3 py-3 px-5"
//           style={{
//               backgroundColor: 'rgb(0, 164, 79)',
//               border: 'none',
//               fontSize: '16px',
//               letterSpacing: '1px',
//               transition: 'transform 0.3s ease-in-out',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           }}
//           onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
//           onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
//           >
//           Endi buyurtma berishni boshlang 🚀
//           </Button>
//     </a>
//   </div>
// </div>
//     const steps = [
//   {
//     emoji: "📲",
//     title: "Botni ishga tushiring",
//     description: "Telegram bot orqali tez va oson buyurtma berish jarayonini boshlang.",
//   },
//   {
//     emoji: "📝",
//     title: "Buyurtma yarating",
//     description: "Qanday ish kerakligini, sohani, byudjet va muddatni ko‘rsating.",
//   },
//   {
//     emoji: "👨‍💻",
//     title: "Mutaxassislardan birini tanlang",
//     description: "Tajribali ijodkor va mutaxassislar o'z takliflarini sizga yuboradi.",
//   },
//   {
//     emoji: "✅",
//     title: "Kelishuv va topshiriq bajarilishi",
//     description: "Ishning bajarilishini kuting va qabul qilib oling.",
//   },
// ];