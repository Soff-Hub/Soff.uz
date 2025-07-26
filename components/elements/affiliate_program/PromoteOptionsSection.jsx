import React from 'react'

const PromoteOptionsSection = () => {
    return (
        <div className='container py-5'>
            <div className='promote_options_section'>
                <div className='promote_text'>
                    <h2>Qanday xizmatlarni targ‘ib qila olasiz?</h2>
                    <p>Siz Soff.uz dagi turli xil raqamli mahsulotlarni reklama qilib, har bir xariddan daromad olishingiz mumkin.</p>
                    <ul>
                        <li>3D modellari</li>
                        <li>UI/UX dizayn shablonlari</li>
                        <li>Veb-sayt shablonlari va loyihalar</li>
                        <li>Video montaj uchun elementlar</li>
                        <li>PDF hujjatlar va digital fayllar</li>
                        <li>Yoki o‘z mahsulotlaringiz!</li>
                    </ul>
                </div>
                <div className='promote_image'>
                    {/* Rasm joyi: sen quyidagiga o‘z rasmingni qo‘yasan */}
                    <img src="/static/img/affiliate_program/promote-en.png" alt="What you can promote" />
                </div>
            </div>
        </div>
    )
}

export default PromoteOptionsSection
