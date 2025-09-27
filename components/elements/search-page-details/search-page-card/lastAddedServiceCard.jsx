import { useRouter } from 'next/router'
import React from 'react'
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper'

const LastAddedServiceCard = ({ service }) => {
    const { push } = useRouter()
    return (
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
                flexDirection: "column"
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.05)')
            }

            onClick={() => push(`/service/${service?.slug}`)}
        >
            <p
                style={{
                    color: '#111',
                    fontSize: "16px",
                    fontWeight: "600"
                }}
                className='m-0'>
                {service?.title}
            </p>
            <p className='m-0'>
                Narxi:{' '}
                <span style={{ fontWeight: 600, color: '#00a44f' }}>
                    {formatCurrencyWithSpace(service?.price)} so'm
                </span>
            </p>
        </div>
    )
}

export default LastAddedServiceCard