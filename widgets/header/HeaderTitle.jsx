import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function HeaderTitle() {
    const { t } = useTranslation('header');
    
    return (
        <div className="w-md-50 text-center py-4 mt-0 headerTitle">
            <h2 className="mx-auto fw-normal">
                {t('headerTitle')}
            </h2>
            <p className="mx-auto py-3">
                {t('headerDescription')}
            </p>
            <Link href="/order/create">
                <a className="px-5 py-4 bg-success btn btn-success rounded-5 text-white font-weight-bold fs-4 text-xl hover-overlay ">
                    {t('createOrderButton')}
                </a>
            </Link>
        </div>
    );
}
