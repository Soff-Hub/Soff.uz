import React from 'react';
import Chat from '~/features/freelancers/chat/Chat';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ChatPage = () => {
    const { t } = useTranslation('chat');
    return (
        <div>
            <Meta title={t('title')} description={t('meta.description')} />
            <PageContainer title={t('title')} withFooter={false}>
                <Chat />
            </PageContainer>
        </div>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'order-create',
                'chat',
                'modals',
            ])),
        },
    };
}

export default ChatPage;
