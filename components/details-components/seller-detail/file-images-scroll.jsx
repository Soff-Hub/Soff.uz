import React from 'react';

export default function ServiseDetailAbout ({ product }) {
    return (
        <div>
            {product && (
                <div className='ServiseDetailAbout'>
                    <img
                        className='ServiseDetailAbout_img'
                        src={product?.poster_url}
                        alt=''
                    />

                    <section className='ServiseDetailAbout_aboutService'>
                        <h2 className='ServiseDetailAboutTitles'>
                            Xizmat haqida
                        </h2>
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {product.description}
                        </p>
                    </section>

                    <section>
                        <h3 className='ServiseDetailAboutTitles'>
                            Ushbu xizmatga quyidagilar kiradi:
                        </h3>
                        <ol>
                            {product.includedServices.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                        </ol>
                    </section>

                    <section>
                        <h3 className='ServiseDetailAboutTitles'>
                            Buyurtma berish uchun kerak bo‘ladi:
                        </h3>
                        <ul>
                            {product.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className='ServiseDetailAboutTitles'>
                            Texnik ma’lumotlar:
                        </h3>
                        <ul>
                            <li>
                                <strong>CMS:</strong> {product.techStack.CMS}
                            </li>
                            <li>
                                <strong>Dasturlash tili:</strong>{' '}
                                {product.techStack.language}
                            </li>
                            <li>
                                <strong>PHP freymvork:</strong>{' '}
                                {product.techStack.phpFramework}
                            </li>
                            <li>
                                <strong>JavaScript interfeysi:</strong>{' '}
                                {product.techStack.jsInterface}
                            </li>
                            <li>
                                <strong>CSS ishlatilgan:</strong>{' '}
                                {product.techStack.cssUsed ? 'Ha' : 'Yo‘q'}
                            </li>
                            <li>
                                <strong>CSS freymvorklari:</strong>{' '}
                                {product.techStack.cssFrameworks.join(', ')}
                            </li>
                            <li>
                                <strong>Ma’lumotlar bazasi:</strong>{' '}
                                {product.techStack.database ? 'Mavjud' : 'Yo‘q'}
                            </li>
                            <li>
                                <strong>MB turi:</strong>{' '}
                                {product.techStack.databaseType}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <p>
                            <strong>Ish tajribasi:</strong> {product.experience}
                        </p>
                        <p>
                            <strong>Xizmat hajmi:</strong> {product.offerVolume}
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
}
