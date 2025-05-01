import Link from 'next/link'
import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Meta from '~/components/shared/headers/Meta'

export default function WebsitesPage() {
  return (
      <PageContainer footer={<FooterDefault />} title="Veb-sayt Shablonlari">
        <Meta
            title="Veb-sayt Shablonlari" 
            image="/static/img/veb-saytlar-2.png" 
            description="Bu sahifa veb dasturchilar, dizaynerlar va startap egalari uchun. Bu yerda tayyor veb-sayt shablonlari, UI dizaynlar va kodlarni topish mumkin." 
            keywords={[{name: "veb dasturchilar"}, {name:"dizaynerlar"}, {name: "startap egalari"}, {name: "tayyor veb-sayt shablonlari"}, {name: "UI dizaynlar"}, {name: "kodlar"}]} 
            author="Soff.uz"
        />
          <div className="ps-page-status">
              <div className="container">
                  <div className="ps-section__content">
                      <img src="/static/img/building-features.svg" alt="Tamirlash olib borilmoqda" />
                      <h3>Veb-sayt Shablonlari – Yangilanmoqda 🚧</h3>
                      <p>
                        Bu sahifa veb dasturchilar, dizaynerlar va startap egalari uchun. Bu yerda tayyor veb-sayt shablonlari, UI dizaynlar va kodlarni topish mumkin. Hozircha ushbu kategoriyaga oid mahsulotlarni <Link href="/scientific-resources/template?parentCategory=template"><strong>"Ilmiy ishlar" bo‘limining "Tayyor shablonlar" bo‘limida</strong></Link> topishingiz mumkin. Tez orada ular tartibga solinib, ushbu bo‘limga joylashtiriladi. Yangi tuzilma yanada qulay va tushunarli bo‘ladi! 🚀
                      </p>
                      <p>
                          <Link href="/">
                              <a> Bosh sahifa</a>
                          </Link>
                      </p>
                  </div>
              </div>
          </div>
      </PageContainer>
  )
}
