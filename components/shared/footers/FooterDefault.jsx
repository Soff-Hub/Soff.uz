import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterSecond from './FooterSecond';

const FooterDefault = () => (
    <footer className="ps-footer">
        <div className="container">
            <FooterWidgets />
            <FooterLinks />
            <FooterSecond />
        </div>
    </footer>
);

export default FooterDefault;
