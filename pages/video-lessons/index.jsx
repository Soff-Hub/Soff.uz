import Link from 'next/link'
import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'

export default function VideoLessonsPage() {
  return (
      <PageContainer footer={<FooterDefault />} title="Sahifa topilmadi">
          <div className="ps-page-status">
              <div className="container">
                  <div className="ps-section__content">
                      <img src="/static/img/building-features.svg" alt="Tamirlash olib borilmoqda" />
                      <h3>Video Darsliklar – Yangilanmoqda 🚧</h3>
                      <p>
                        Bu sahifa har qanday sohada bilim olishni istaganlar uchun. Bu yerda zamonaviy kasblar, an’anaviy fanlar, shaxsiy rivojlanish va ta’limga oid turli video darsliklarni topish mumkin. Hozircha ushbu kategoriyaga oid mahsulotlarni <Link href="/scientific-resources/video?parentCategory=video"><strong>"Ilmiy ishlar" bo‘limining "Video materiallar" bo‘limida</strong></Link> topishingiz mumkin. Tez orada ular tartibga solinib, ushbu bo‘limga joylashtiriladi. Yangi tuzilma yanada qulay va tushunarli bo‘ladi! 🚀
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
