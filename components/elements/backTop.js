import Link from 'next/link';
export default function Backtop({ setBackground , backtop }) {

    return (
        <>
            <div className="ps-btn--container">
                <div className="ps-btn--backtop" onClick={() => ( setBackground(!backtop))}>
                    <i
                        style={{ color: '#fff' }}
                        className={
                            !backtop
                                ? 'fa-regular fa-newspaper icon'
                                : 'fa-solid fa-xmark fa-lg'
                        }></i>
                    <span className="ps-btn--backtop--border1"></span>
                    <span className="ps-btn--backtop--border2"></span>
                </div>
                <ul
                    className={
                        backtop ? 'backtop__ul--true ' : 'backtop__ul--false'
                    }>
                    <li onClick={() => setBackground(!backtop)} >
                        <Link
                            href="/account/donat">
                            <a>
                            <i class="fa-solid fa-hand-holding-hand"></i>
                            </a>
                        </Link>
                    </li>
                    <li onClick={() => setBackground(!backtop)}>
                        <Link href="https://t.me/soff_uz">
                            <a target="_blank">
                                <i className="fa-regular fa-paper-plane"></i>
                            </a>
                        </Link>
                    </li>
                    <li onClick={() => setBackground(!backtop)}>
                        <Link href="/page/about-us">
                            <a>
                                <i className="fa-solid fa-question fa-lg"></i>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
