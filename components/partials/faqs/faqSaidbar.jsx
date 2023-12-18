import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function FaqSaidbar() {
    const Router = useRouter();
    const query = Router.route;

    return (
      <div className="faqs-sidebar ">
          <ul >
            <li>
                <Link href="/page/about-us" as="/page/about-us">
                    <a
                        className={`${
                            query === '/page/about-us' ? 'active-faq' : ''
                        }`}>
                       Soff.uz nima?
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/vedio-list" as="/page/vedio-list">
                    <a
                        className={`${
                            query === '/page/vedio-list' ? 'active-faq' : ''
                        }`}>
                            Vedio qo'llanma
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/become-a-seller" as="/page/become-a-seller">
                    <a
                        className={`${
                            query === '/page/become-a-seller' ? 'active-faq' : ''
                        }`}>
                       Sotuvchiga aylaning
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/questions" as="/page/questions">
                    <a
                        className={`${
                            query === '/page/questions' ? 'active-faq' : ''
                        }`}>
                        Savol-javoblar
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/form" as="/page/form">
                    <a
                        className={`${
                            query === '/page/form' ? 'active-faq' : ''
                        }`}>
                       Savollaringiz bormi?
                    </a>
                </Link>
            </li>
        </ul>
      </div>
    );
}
