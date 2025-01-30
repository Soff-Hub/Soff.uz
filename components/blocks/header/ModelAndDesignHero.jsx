import React from 'react';

export default function ModelAndDesignHero () {
    return (
        <div className='d-flex my-2 py-5 justify-content-center gap-5 '>
            <div className='ModelsAndInteriorDesignModels d-flex align-items-center gap-5 w-25 border border-1  rounded-5 p-3'>
                <img
                    src='https://picsum.photos/30/30'
                    width={80}
                    height={80}
                    alt=''
                />
                <div className='title'>
                    <h4>3D modellar</h4>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Saepe id dignissimos fugit omnis voluptatum soluta
                        eius, nemo animi in recusandae?
                    </p>
                </div>
            </div>

            <div className='ModelsAndInteriorDesignModels d-flex align-items-center gap-5 w-25 border border-1  rounded-5 p-3'>
                <img
                    src='https://picsum.photos/30/30'
                    width={80}
                    height={80}
                    alt=''
                />
                <div className='title'>
                    <h4>Interyer dizaynlar</h4>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Saepe id dignissimos fugit omnis voluptatum soluta
                        eius, nemo animi in recusandae?
                    </p>
                </div>
            </div>
        </div>
    );
}
