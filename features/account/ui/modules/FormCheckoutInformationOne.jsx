import React from 'react';
import { useRouter } from 'next/router';
import CreditCard2 from '../CreditCard2';
import { useTranslation, Trans } from 'next-i18next';
import Link from 'next/link';

function FormCheckoutInformationOne() {
    const router = useRouter();
    const { t } = useTranslation('account');

    const { id, type } = router.query;

    if (!router.isReady) return null;

    let arr = [];
    if (id) {
        arr.push(id);
    }

    return (
        <div className="tolov-usullari">
            <div style={{ padding: '0 15px' }}>
                <h3
                    className="tolov-usullari-h3"
                    style={{ fontWeight: '600', margin: '0', padding: '0' }}>
                    {t('checkout.selectPaymentType')}
                </h3>
                <p>
                    <Trans i18nKey="checkout.oneItemNote" ns="account">
                        Mahsulotni sotib olganingizdan so'ng, shaxsiy
                        kabinetingizdagi <br />
                        <Link href="/account/sellerproducts">
                            <a className="text-success">
                                <strong>Sotib olinganlar</strong>
                            </a>
                        </Link>
                        sahifasidan yoki mahsulot to'liq sahifasiga <br />
                        qayta kirib yuklab olishingiz mumkin bo'ladi !
                    </Trans>
                </p>
            </div>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={arr} type={type} />
            </div>
        </div>
    );
}

export default FormCheckoutInformationOne;
