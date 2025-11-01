import React from 'react';
import PageLayout from './PageLayout';

const PageContainer = ({ children, title }) => {
    return <PageLayout title={title}>{children}</PageLayout>;
};

export default PageContainer;
