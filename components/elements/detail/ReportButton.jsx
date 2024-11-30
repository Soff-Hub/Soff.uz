import Router from 'next/router';
import React from 'react';

export default function ReportButton({ productId }) {
    return (
        <div>
            <p className="d-flex align-items-center gap-2">
                <div
                    style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgb(245, 246, 247)',
                        fontSize: '12px',
                    }}>
                    <i class="fa-solid fa-check"></i>
                </div>
                <span>Mualliflik huquqi buzilgan holatda</span>
                <span
                    onClick={() => {
                        Router.push(`/report/${productId}`);
                    }}
                    style={{
                        borderBottom: '1px solid black',
                        fontWeight: '600',
                        cursor: 'pointer',
                        lineHeight: '18px',
                    }}>
                    shikoyat qiling
                </span>
            </p>
        </div>
    );
}
