import React from 'react';
import PageLayout from './PageLayout';

const PageContainer = ({ children, title, withFooter } = {}) => {
    return (
        <PageLayout title={title} withFooter={withFooter}>
            {children}
        </PageLayout>
    );
};

export default PageContainer;
