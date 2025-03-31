import Link from 'next/link'
import React from 'react'
import FooterComponents from '~/components/blocks/footer/FooterComponents'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'

export default function ThreeDModelsAndInteriorDesigns() {
  return (
      <PageContainer footer={<FooterDefault />} title="Sahifa topilmadi">
          <div className="ps-page-status">
              <div className="container">
                  <div className="ps-section__content">
                      <img src="/static/img/building-features.svg" alt="Tamirlash olib borilmoqda" />
                      <h3>3D Modellar va Interyer Dizaynlari – Yangilanmoqda 🚧</h3>
                      <p>
                        Bu sahifa dizaynerlar, arxitektorlar va 3D model mutaxassislari uchun. Bu yerda 3D modellar, interyer dizaynlari va vizualizatsiyalarni topish mumkin. Hozircha ushbu kategoriyaga oid mahsulotlarni <Link href="/scientific-resources/template?parentCategory=template"><strong>"Ilmiy ishlar" bo‘limining "Tayyor shablonlar" bo‘limida</strong></Link> topishingiz mumkin. Tez orada ular tartibga solinib, ushbu bo‘limga joylashtiriladi. Yangi tuzilma yanada qulay va tushunarli bo‘ladi! 🚀
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
