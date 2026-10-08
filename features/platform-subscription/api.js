import Axios from 'axios';
import { api, baseURL } from '~/repositories/api';

const BASE = 'customer/platform-sub/';

// Public endpoint — sent without a token on purpose.
export const fetchTiers = async () => {
    const { data } = await Axios.get(`${baseURL}${BASE}tiers/`);
    return data || [];
};

export const fetchMySubscription = async () => {
    const { data } = await api.get(`${BASE}my/`);
    return data?.subscription || null;
};

export const fetchClaims = async ({ limit, offset }) => {
    const { data } = await api.get(`${BASE}claims/`, { params: { limit, offset } });
    return data;
};

export const subscribe = (body) => api.post(`${BASE}subscribe/`, body).then((res) => res.data);
export const verifySubscription = (body) => api.post(`${BASE}verify/`, body).then((res) => res.data);
export const cancelSubscription = () => api.post(`${BASE}cancel/`).then((res) => res.data);
export const resumeSubscription = () => api.post(`${BASE}resume/`).then((res) => res.data);
export const changeTier = (tier) => api.post(`${BASE}change-tier/`, { tier }).then((res) => res.data);
// Upgrade right away: charged from the saved card, the new tier starts now.
export const upgradeNow = (tier) => api.post(`${BASE}upgrade/`, { tier }).then((res) => res.data);
export const soffxLogin = (redirect) =>
    api.post(`${BASE}soffx-login/`, redirect ? { redirect } : {}).then((res) => res.data);
// Saved cards. POST cards/ {card_number, expire_date} → {request_id, phone_number, msg};
// POST cards/verify/ {request_id, code}. The list and card fields are read defensively.
export const fetchCards = async () => {
    const { data } = await api.get(`${BASE}cards/`);
    if (Array.isArray(data)) return data;
    return data?.results || data?.cards || [];
};
export const addCard = (body) => api.post(`${BASE}cards/`, body).then((res) => res.data);
export const verifyCard = (body) => api.post(`${BASE}cards/verify/`, body).then((res) => res.data);
export const deleteCard = (id) => api.delete(`${BASE}cards/${id}/`).then((res) => res.data);
export const setSubscriptionCard = (id) =>
    api.patch(`${BASE}cards/${id}/`, { is_default: true }).then((res) => res.data);

export const claimDocument = (documentId) => api.post(`${BASE}claim/${documentId}/`).then((res) => res.data);

// `msg` can be a string or (on subscribe/verify validation errors) an array.
export const getErrorMessage = (error, fallback = 'Xatolik yuz berdi') => {
    const data = error?.response?.data;
    const msg = data?.msg ?? data?.detail;
    if (Array.isArray(msg)) return msg[0] || fallback;
    if (typeof msg === 'string' && msg) return msg;
    if (data && typeof data === 'object') {
        const first = Object.values(data).find((value) => Array.isArray(value) && value.length);
        if (first) return first[0];
    }
    return fallback;
};

export const getErrorCode = (error) => error?.response?.data?.code;
