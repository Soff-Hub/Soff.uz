import Repository, { baseUrl, baseUrlAuth } from '~/repositories/Repository';
import { safeLocalStorage } from '../utilities/safe-local-storage';

export default function useAuth() {
    const registerUser = (url, e) => {
        let user = Repository.post(baseUrlAuth + url, e)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
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
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };

    const verifyCode = (e) => {
        const endPoint = 'auth/verify/';
        let user = Repository.post(baseUrlAuth + endPoint, {
            ...e,
            user: safeLocalStorage.getItem('token'),
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };

    const NewVerifyCode = (e) => {
        const endPoint = 'auth/reset-password-verify/';
        let config = {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('qayta_token')} `,
            },
        };
        let user = Repository.post(baseUrlAuth + endPoint, e, config)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };

    const qaytaKodYuborish = (data) => {
        let endPoint = 'auth/get-new-code/';
        // let endPoint = 'auth/get-new-code/';
        let config = {
            Authorization: `Bearer ${safeLocalStorage.getItem('token')} `,
        };
        let user = Repository({
            url: baseUrlAuth + endPoint,
            method: 'POST',
            headers: config,
            data: data,
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };
    const qaytaKodYuborishParol = (data) => {
        let endPoint = 'auth/get-new-code/';
        // let endPoint = 'auth/get-new-code/';
        let config = {
            Authorization: `Bearer ${safeLocalStorage.getItem('qayta_token')} `,
        };
        let user = Repository({
            url: baseUrlAuth + endPoint,
            method: 'POST',
            headers: config,
            data: data,
        })
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };

    const qaytaRaqamYuborishAuth = (e) => {
        let endPoint = 'auth/reset-password/';

        let user = Repository.post(baseUrlAuth + endPoint, e)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };

    const qaytaParolYuborishAuth = (e) => {
        let endPoint = 'auth/reset-password-confirm/';
        let config = {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('qayta_token')} `,
            },
        };
        let user = Repository.post(baseUrlAuth + endPoint, e, config)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });

        return user;
    };
    const logOutAuth = (e) => {
        let endPoint = 'auth/logout/';
        let config = {
            headers: {
                Authorization: `Bearer ${safeLocalStorage.getItem('token')} `,
            },
        };
        let user = Repository.post(baseUrlAuth + endPoint, e, config)
            .then((ress) => {
                return ress;
            })
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
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
                if (error.response) {
                    return error.response;
                }
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
    };
}
