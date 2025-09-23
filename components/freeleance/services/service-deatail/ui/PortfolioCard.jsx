import React, { useState } from 'react'
import styles from "./styles/style.module.scss"
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import PortfolioDetailModal from './PortfolioDetailModal';



const PortfolioCard = ({ portfolio, disableClick = false }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={!disableClick ? () => setOpen(true) : undefined} className={styles.card} >
                <img src={portfolio?.portfolio_images[0]?.image || "/static/img/orqafon1.avif"} alt="Project" className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{truncateTitle(portfolio?.title, 12)}</h3>
                        <p className={styles.description}>{truncateTitle(portfolio?.description, 16)}</p>
                    </div>
                </div>
            </div>
            <PortfolioDetailModal
                open={open}
                onClose={() => setOpen(false)}
                portfolio={portfolio}
            />
        </>
    );
}

export default PortfolioCard