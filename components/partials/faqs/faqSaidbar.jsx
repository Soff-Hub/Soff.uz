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
                <Link href="/page/form" as="/page/form">
                    <a
                        className={`${
                            query === '/page/form' ? 'active-faq' : ''
                        }`}>
                        Aloqa
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/questions" as="/page/questions">
                    <a
                        className={`${
                            query === '/page/questions' ? 'active-faq' : ''
                        }`}>
                        Savollar
                    </a>
                </Link>
            </li>
            <li>
                <Link href="/page/about-us" as="/page/about-us">
                    <a
                        className={`${
                            query === '/page/about-us' ? 'active-faq' : ''
                        }`}>
                        Biz haqimizda
                    </a>
                </Link>
            </li>
        </ul>
      </div>
    );
}
