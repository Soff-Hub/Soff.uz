import React from 'react'

const benefits = [
    {
        title: "Tejamkorlik",
        description: "Shaxsiy yoki biznes loyihalaringiz uchun moslashtirilgan xizmatlar orqali vaqt, pul va asablaringizni tejang.",
        image: "/static/img/affiliate_program/icon-crown.svg"
    },
    {
        title: "Ommaboplik",
        description: "IKEA, Leroy Merlin, Norgold kabi yirik kompaniyalar ham shunga o‘xshash xizmatlardan foydalanadi.",
        image: "/static/img/affiliate_program/icon-stars.svg"
    },
    {
        title: "Xavfsizlik",
        description: "To‘lovlar xavfsiz, kafolatlangan va kerak bo‘lsa, pulingiz qaytariladi.",
        image: "/static/img/affiliate_program/icon-strongbox.svg"
    },
    {
        title: "Qulay narxlar",
        description: "Xizmatlar atigi $10 dan boshlanadi.",
        image: "/static/img/affiliate_program/icon-sale.svg"
    },
    {
        title: "Qulaylik",
        description: "Mobil ilova, kompyuter va telefon uchun sayt orqali har doim xizmatlaringizni boshqaring.",
        image: "/static/img/affiliate_program/icon-responsive.svg"
    },
    {
        title: "Keng qamrov",
        description: "Soff.uz 200+ xizmat kategoriyasi va 500,000+ xizmatlarni o‘z ichiga oladi.",
        image: "/static/img/affiliate_program/icon-tap.svg"
    }
]

const WithSoffYouGet = () => {
    return (
        <div className='affiliate_soff_with_wrapper py-5'>
            <div className="container">
                <h2 className="text-center mb-5">Soff bilan siz quyidagilarga ega bo‘lasiz:</h2>
                <div className="row">
                    {benefits.map((item, index) => (
                        <div key={index} className="col-md-6 col-lg-4 mb-4">
                            <div className="soff_card p-4 h-100 rounded-4 shadow-sm bg-white text-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ height: '50px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px', width: '50px' }}
                                />
                                <h5 className='fw-semibold mb-2'>{item.title}</h5>
                                <p className='text-muted'>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WithSoffYouGet
