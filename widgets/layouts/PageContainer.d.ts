import React, { ReactNode } from 'react';

interface PageContainerProps {
    children?: ReactNode;
    title?: string;
    withFooter?: boolean;
}

declare const PageContainer: React.FC<PageContainerProps>;
export default PageContainer;
