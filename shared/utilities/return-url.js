export const isReturnUrlEmpty = (returnUrl) => {
    return (
        !returnUrl ||
        returnUrl === 'undefined' ||
        returnUrl === 'null' ||
        returnUrl.trim() === '/' ||
        returnUrl.trim() === ''
    );
};
