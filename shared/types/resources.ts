import common from '~/public/locales/uz/common.json';
import header from '~/public/locales/uz/header.json';
import footer from '~/public/locales/uz/footer.json';
import error from '~/public/locales/uz/error.json';
import index from '~/public/locales/uz/index.json';
import codeVerify from '~/public/locales/uz/code-verify.json';
import login from '~/public/locales/uz/login.json';
import orderCreate from '~/public/locales/uz/order-create.json';
import orders from '~/public/locales/uz/orders.json';
import productPages from '~/public/locales/uz/product-pages.json';
import aboutUs from '~/public/locales/uz/about-us.json';
import account from '~/public/locales/uz/account.json';
import affiliate from '~/public/locales/uz/affiliate.json';
import becomeASeller from '~/public/locales/uz/become-a-seller.json';
import chat from '~/public/locales/uz/chat.json';
import faq from '~/public/locales/uz/faq.json';
import form from '~/public/locales/uz/form.json';
import oferta from '~/public/locales/uz/oferta.json';
import page404 from '~/public/locales/uz/page-404.json';
import privacyPolicy from '~/public/locales/uz/privacy-policy.json';
import questions from '~/public/locales/uz/questions.json';
import report from '~/public/locales/uz/report.json';
import search from '~/public/locales/uz/search.json';
import seller from '~/public/locales/uz/seller.json';
import soffia from '~/public/locales/uz/soffia.json';
import userAgreement from '~/public/locales/uz/user-agreement.json';
import videoList from '~/public/locales/uz/video-list.json';
import modals from '~/public/locales/uz/modals.json';
import myOrders from '~/public/locales/uz/my-orders.json';

const resources = {
    common,
    header,
    footer,
    error,
    index,
    'code-verify': codeVerify,
    login,
    'order-create': orderCreate,
    orders,
    'product-pages': productPages,
    'about-us': aboutUs,
    account,
    affiliate,
    'become-a-seller': becomeASeller,
    chat,
    faq,
    form,
    oferta,
    'page-404': page404,
    'privacy-policy': privacyPolicy,
    questions,
    report,
    search,
    seller,
    soffia,
    'user-agreement': userAgreement,
    'video-list': videoList,
    modals,
    'my-orders': myOrders,
} as const;

export default resources;
