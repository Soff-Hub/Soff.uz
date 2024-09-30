import React from 'react';
import Repository, { baseUrl, baseUrlAuth } from '~/repositories/Repository';

export default function useAuth() {
    const registerUser = (url, e) => {
        let user = Repository.post(baseUrlAuth + url, e)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };
    const registerGoogleUser = (url, e) => {
        let user = Repository.get(baseUrlAuth + `auth/social/login/seller?seller_page=true`)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const loginUser = (e) => {
        let endPoint = 'auth/login/';

        let user = Repository.post(baseUrlAuth + endPoint, e)
            .then((ress) => {
                return ress;
            })

            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const verifyCode = (e) => {
        const endPoint = 'auth/verify/';

        let user = Repository.post(baseUrlAuth + endPoint, {
            ...e,
            user: localStorage.getItem('verify_user'),
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const NewVerifyCode = (e) => {
        const endPoint = 'auth/reset-password-verify/';
        let user = Repository.post(baseUrlAuth + endPoint, {
            ...e,
            user: localStorage.getItem('verify_user'),
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const qaytaKodYuborish = (data) => {
        let endPoint = 'auth/get-new-code/';
        let user = Repository({
            url: baseUrlAuth + endPoint,
            method: 'POST',
            data: {
                ...data,
                user: localStorage.getItem('verify_user'),
            },
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };
    const qaytaKodYuborishParol = (data) => {
        let endPoint = 'auth/get-new-code/';
        let user = Repository({
            url: baseUrlAuth + endPoint,
            method: 'POST',
            data: {
                ...data,
                user: localStorage.getItem('verify_user'),
            },
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const qaytaRaqamYuborishAuth = (e) => {
        let endPoint = 'auth/reset-password/';

        let user = Repository.post(baseUrlAuth + endPoint, {
            ...e,
            user: localStorage.getItem('verify_user'),
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const qaytaParolYuborishAuth = (e) => {
        let endPoint = 'auth/reset-password-confirm/';
        let user = Repository.post(baseUrlAuth + endPoint, e)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };
    const logOutAuth = (e) => {
        let endPoint = 'auth/logout/';
        let config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')} `,
            },
        };
        let user = Repository.post(baseUrlAuth + endPoint, e, config)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    const feedbackPost = (e) => {
        let endPoint = 'customer/feedback-create/';

        let user = Repository.post(baseUrl + endPoint, e)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response) {
                    return error.response;
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return user;
    };

    return {
        registerUser,
        loginUser,
        verifyCode,
        qaytaKodYuborish,
        qaytaRaqamYuborishAuth,
        NewVerifyCode,
        qaytaParolYuborishAuth,
        logOutAuth,
        qaytaKodYuborishParol,
        feedbackPost,
        registerGoogleUser,
    };
}
