import { d_base_url } from '~/shared/api/base-url';
import { PRODUCT_SEARCH } from '~/shared/api/end-points';
import fetchJson from '~/shared/api/fetch-json';

export async function GetProducts({ keyword, page }) {
    const url = `${d_base_url}/api/v1/${PRODUCT_SEARCH}?keyword=Evermotion Archmodels Vol.14`;
    return fetchJson(url);
}
