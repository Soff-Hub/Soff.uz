import React from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import ProfilePage from '~/features/account/ui/profile/ProfilePage';

const Profile = () => {
    const breadCrumb = [
        { text: 'Bosh sahifa', url: '/' },
        { text: 'Profil' },
    ];
    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Meta
                    title={'Profil'}
                    description={
                        'Soff.uz profil sahifasida shaxsiy maʼlumotlaringizni koʻring va telefon raqamingizni yangilang.'
                    }
                />
                <ProfilePage />
            </div>
        </PageContainer>
    );
};

export default Profile;
