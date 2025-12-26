import { CompletedFilesCase, PendingFilesCase } from './type';

export const getOrderPendingFilesSize = (size: PendingFilesCase['size']) => {
    switch (size) {
        case 'small':
            return {
                titleFontSize: '14px',
                subtitleFontSize: '11px',
                textFontSize: '11px',
                spacing: '8px',
                buttonPadding: '4px 8px',
                buttonFontSize: '11px',
                skeletonHeight: '60px',
                marginBottom: '8px',
                alertPadding: '6px 8px',
                alertIconSize: '14px',
                alertTitleFontSize: '11px',
                alertDescriptionFontSize: '10px',
            };
        case 'middle':
            return {
                titleFontSize: '16px',
                subtitleFontSize: '13px',
                textFontSize: '13px',
                spacing: '12px',
                buttonPadding: '6px 12px',
                buttonFontSize: '13px',
                skeletonHeight: '70px',
                marginBottom: '10px',
                alertPadding: '8px 12px',
                alertIconSize: '16px',
                alertTitleFontSize: '13px',
                alertDescriptionFontSize: '12px',
            };
        default: // large
            return {
                titleFontSize: '18px',
                subtitleFontSize: '14px',
                textFontSize: '14px',
                spacing: '16px',
                buttonPadding: '8px 16px',
                buttonFontSize: '14px',
                skeletonHeight: '80px',
                marginBottom: '10px',
                alertPadding: '12px 16px',
                alertIconSize: '18px',
                alertTitleFontSize: '14px',
                alertDescriptionFontSize: '14px',
            };
    }
};

export const getOrderCompletedFilesSize = (
    size: CompletedFilesCase['size']
) => {
    switch (size) {
        case 'small':
            return {
                titleFontSize: '14px',
                spacing: '8px',
                skeletonHeight: '60px',
            };
        case 'middle':
            return {
                titleFontSize: '16px',
                spacing: '12px',
                skeletonHeight: '70px',
            };
        default: // large
            return {
                titleFontSize: '18px',
                spacing: '16px',
                skeletonHeight: '80px',
            };
    }
};
