import React from 'react';
import { useSelector } from 'react-redux';
import PageContainer from '~/components/layouts/PageContainer';
import SiteDonateForm from '~/components/partials/seller/SiteDonateForm';
import Page404 from '../page/page-404';
import Selection from './selection';

const Donat = () => {
    const { user } = useSelector(state => state.auth)


    return <PageContainer>
        <div className="container my-5 ">
            <h2 className="text-center mb-5">
                Loyiha  rivoji uchun o'z hissangizni qo'shing
            </h2>

            <SiteDonateForm />

        </div>
    </PageContainer>
};

export default Donat;
