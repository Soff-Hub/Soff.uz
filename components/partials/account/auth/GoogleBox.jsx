import React from 'react'

export default function GoogleBox({ loading }) {
    return (
        <div className="google_account d-flex align-items-center justify-content-center">
            {!loading ? (
                <div
                    // onClick={handleGoogleClick}
                    className="ps-btn ps-btn--fullwidth d-flex align-items-center justify-content-center pb-0">
                    Google orqali kirish
                </div>
            ) : (
                <button
                    disabled={true}
                    type="submit"
                    className="ps-btn ps-btn--fullwidth">
                    <BeatLoader color="#fff" />
                </button>
            )}
        </div>
    )
}
