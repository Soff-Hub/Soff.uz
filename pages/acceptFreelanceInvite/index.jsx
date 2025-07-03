'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import SellersPage from '../_seller/[pid]';
import { useGet } from '~/repositories/https';
import AcceptFreelanceInviteModal from './modalto';

export default function AcceptFreelanceInvite () {
    const router = useRouter();
    const { productId } = router.query;

    const [isOpen, setIsOpen] = useState(true);


    // Log productId on change
    useEffect(() => {
        if (productId) {
            console.log('Product ID:', productId);
        }
    }, [productId]);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <PageContainer>
            <SellersPage />
            <div className='AcceptFreelanceInvite_modal'>
                <div className='AcceptFreelanceInvite_modal_inner'>
                    <h3 className='text-center text-muted'>
                        Freelancer sifatida profilingizni to‘ldiring
                    </h3>
                    <AcceptFreelanceInviteModal />
                </div>
            </div>
        </PageContainer>
    );
}
