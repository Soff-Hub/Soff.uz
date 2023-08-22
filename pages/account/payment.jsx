import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Payment from '~/components/partials/account/Payment';
import { connect } from 'react-redux';

import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const PaymentPage = () => {

    return (
        <>
            <div title="Payment">
                    <Payment />
            </div>
        </>
    );
};

export default connect()(PaymentPage);
