import React from 'react';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import Link from 'next/link';

// Helper function to validate slug
const isValidSlug = slug => {
    return (
        slug &&
        typeof slug === 'string' &&
        slug.trim().length > 0 &&
        slug !== 'undefined' &&
        slug !== 'null'
    );
};

const LastAddedServiceCard = ({ service }) => {
    // Don't render if service or slug is invalid
    if (!service || !isValidSlug(service?.slug)) {
        console.warn(
            'LastAddedServiceCard: Invalid service data or slug',
            service
        );
        return null;
    }

    return (
        <Link href={`/service/${service.slug}`}>
            <a>
                <div
                    style={{
                        display: 'flex',
                        gap: '6px',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0',
                        borderRadius: '12px',
                        padding: '12px',
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: '0 0 6px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                    }}
                    onMouseEnter={e =>
                        (e.currentTarget.style.boxShadow =
                            '0 4px 12px rgba(0,0,0,0.1)')
                    }
                    onMouseLeave={e =>
                        (e.currentTarget.style.boxShadow =
                            '0 0 6px rgba(0, 0, 0, 0.05)')
                    }>
                    <p
                        style={{
                            color: '#111',
                            fontSize: '16px',
                            fontWeight: '600',
                            overflowWrap: 'anywhere',
                        }}
                        className="m-0">
                        {service?.title}
                    </p>
                    <p className="m-0">
                        Narxi:{' '}
                        <span style={{ fontWeight: 600, color: '#00a44f' }}>
                            {formatCurrencyWithSpace(service?.price)} so'm
                        </span>
                    </p>
                </div>
            </a>
        </Link>
    );
};

export default LastAddedServiceCard;
