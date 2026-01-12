import React, { FC } from 'react';
import PageLayout from './PageLayout';

type PageContainerProps = {
    children?: React.ReactNode;
    title?: string;
    withFooter?: boolean;
};

const PageContainer: FC<PageContainerProps> = ({
    children,
    title,
    withFooter,
}) => {
    return (
        <PageLayout title={title} withFooter={withFooter}>
            {children}
        </PageLayout>
    );
};

export default PageContainer;
