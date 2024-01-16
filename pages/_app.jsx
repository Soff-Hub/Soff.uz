import React, { useEffect } from 'react';
import { wrapper } from '~/store/store';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/home-default.scss';
import '~/scss/electronic.scss';
import Head from 'next/head';
import NextProgress from 'next-progress';

function App({ Component, pageProps }) {
    
      
    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 0);
        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        // document.onkeydown = function (e) {
        //     if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86)) {
        //         e.preventDefault();
        //     }
        // };
  

        // document.onkeydown = function (e) {
        //     if (e.keyCode == 123) {
        //         e.preventDefault();
        //         return false;
        //     }
        // };
    });


    return (
        <>
            <Head>

                <title>Soff</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="author" content="nouthemes" />
                <meta
                    name="keywords"
                    content="Dars ishlanmalar, Diplom ishlar, Slaydlar (maktab darsliklari bo'yicha), Slaydlar, Referatlar, Kurs ishlari, Adabiyot, Algebra, Anatomiya, Arxitektura, Astronomiya, Biologiya, Biotexnologiya, Botanika, Chizmachilik, CHQBT, Davlat tilida ish yuritish, Dinshunoslik asoslari, Ekologiya, Energetika, Falsafa, Fizika, Fransuz tili, Geodeziya, Geografiya, Geologiya, Geometriya, Huquqshunoslik, Informatika va AT, Ingliz tili, Iqtisodiyot, Issiqlik texnikasi, Jismoniy tarbiya, Kimyo, Konchilik ishi, Madaniyatshunoslik, Maktabgacha va boshlang'ich ta'lim, Manaviyat asoslari, Mashinasozlik, Materialshunoslik, Mehnat, Melioratsiya, Metrologiya, Mexanika, Milliy istiqlol g'oyasi, Musiqa, Nemis tili, O'qish, Odam va uning salomatligi, Odobnoma, Oziq-ovqat texnologiyasi, Pedagogika, Prezident asarlari, Psixologiya, Psixologiya, Qishloq va o'rmon xo'jaligi, Radiotexnika, Rus tili va adabiyoti, San'at, Siyosatshunoslik, Sotsiologiya, Suv xo'jaligi, Tabiatshunoslik, Tarix, Tasviriy san'at, Texnika va texnologiya, Tibbiyot, Tilshunoslik, To'qimachilik, Transport, Valeologiya, Xayot faoliyati xavfsizligi, Zoologiya, Ko'chirib olish"
                />
                <meta
                    name="description"
                    content="Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling."
                />
            </Head>

            <NextProgress
                delay={300}
                options={{ showSpinner: false }}
                color='#00A44F'
            />
            <CookiesProvider>
                <MasterLayout>
                    <Component {...pageProps} />
                </MasterLayout>
            </CookiesProvider>
        </>
    );
}

export default wrapper.withRedux(App);
