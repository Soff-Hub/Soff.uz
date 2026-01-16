import { useTranslation } from 'next-i18next';

export default function SearchResultsSpecialists_Filter({ total }) {
    const { t } = useTranslation('search');
    return (
        <p className="countSpecialist">
            {total > 0
                ? t('filter.specialistCount', { count: total })
                : t('filter.noSpecialists')}{' '}
        </p>
    );
}
