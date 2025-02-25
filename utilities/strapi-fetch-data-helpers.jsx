
import ProductRepository from '~/repositories/ProductRepository';
import GetRepository from '~/reositoriy-admin/GetRepository';

export async function getProductsByCollectionHelper(
    collectionSlug,
    pid,
    pageSize = 12
) {
    let products;
    if (collectionSlug) {

        products = await GetRepository.getCategoryData(
            collectionSlug
        );
    } else {
        const queries = {
            _limit: pageSize,
        };
        products = await ProductRepository.getRecords(queries);
    }

    if (products) {

        return products.results;
    } else {
        return null;
    }
}

export async function getProductsByCategoriesHelper(slug, pageSize = 12) {
    let products;
    if (slug) {
        products = await GetRepository.getProductsByCategorySlug(slug);
    } else {
        const queries = {
            _limit: pageSize,
        };
        products = await ProductRepository.getRecords(queries);
    }

    if (products) {
        return products;
    } else {
        return null;
    }
}
