import React from 'react';
import Link from 'next/link';
import PageContainer from '~/components/layouts/PageContainer';

const Foydalanuvchi = () => {
    return (
      <PageContainer>
          <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-form--account d-flex justify-content-around">
                    <Link className="ps-btn ps-btn--fullwidth " href='/account/register-user'>
                       <a className='register-choose-button' > Foydalanuvchi</a>
                    </Link>
                    <Link className="ps-btn ps-btn--fullwidth register-choose-button" href="/account/register">
                        <a className='register-choose-button' > Sotuvchi</a>
                    </Link>
                </div>
            </div>
        </div>
      </PageContainer>
    );
};

export default Foydalanuvchi;
