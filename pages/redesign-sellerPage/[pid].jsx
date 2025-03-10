import React from 'react';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import SellerDetail from '~/components/blocks/seller/sellerDetail';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

export default function SellersPage () {
    return (
        <div>
            <PageContainer
                footer={<FooterDefault />}
                title={'Ilmiy ishlar kategoriyasi'}
                boxed={true}>
                <div className='container'>
                    <div className='d-flex gap-5'>
                        <div className='bg-info w-25 h-100 p-4'>
                            <SellerDetail />
                        </div>
                        <div className='bg-danger w-75 h-100 p-4'>
                            <div></div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Quas iusto harum fugit
                                corporis facere ex fuga distinctio, dolores
                                vitae totam! Perspiciatis ut modi omnis,
                                possimus accusantium magnam alias nostrum
                                tempora quia. Vitae minus animi blanditiis
                                eligendi, ad nesciunt vero nemo aliquam quae
                                culpa ratione veniam aliquid ipsum id mollitia.
                                Reiciendis rerum suscipit ratione minima natus
                                ut error fuga hic esse. Rem excepturi doloremque
                                autem ut iure quas perspiciatis distinctio, in,
                                pariatur accusamus ratione illum odio iusto
                                ipsam tempore. Reiciendis est odio tempore
                                illum, similique aliquid quaerat quis id
                                assumenda magni alias molestias amet dolores
                                obcaecati dolorum voluptate culpa aut
                                voluptates! Eveniet, aperiam ducimus
                                voluptatibus necessitatibus aliquam quod dolores
                                quasi hic et dicta repellat commodi soluta
                                nesciunt repellendus corrupti nihil recusandae
                                earum sunt, numquam natus voluptates beatae
                                nemo. Nostrum quibusdam maiores nihil, eveniet,
                                praesentium magni sequi, ullam animi distinctio
                                repellat accusantium. Quas perferendis fugit
                                autem, obcaecati recusandae deserunt at eius,
                                alias facilis excepturi architecto possimus
                                dolores odit, numquam minus exercitationem
                                reiciendis magnam soluta voluptas? Magnam
                                perferendis deserunt excepturi nisi blanditiis!
                                Iusto quisquam expedita quos libero, fuga neque
                                laudantium aliquam ipsam laboriosam facere
                                laborum enim officiis repudiandae. Ipsa
                                reprehenderit tempore enim commodi repudiandae
                                est quod sint cum voluptatum, officia inventore,
                                rem sit maiores repellendus ea consequuntur!
                                Pariatur vero consequuntur, enim aperiam iure
                                quos, alias quisquam est, quasi asperiores
                                ratione commodi laborum perspiciatis tenetur
                                ipsa aliquam unde fuga dicta dolores totam
                                vitae. Illo vero est in esse consequatur nulla
                                ipsum, fugit laudantium blanditiis, voluptatum
                                minima delectus architecto explicabo sit dolor
                                voluptates, ab assumenda officiis? Explicabo
                                provident error numquam, optio corporis labore
                                laboriosam sed totam eos. Cum iste omnis
                                perspiciatis, est error repellendus atque
                                temporibus quidem dignissimos inventore numquam
                                voluptatum alias neque repudiandae quam nisi
                                tempora officiis id. Optio eius nulla est
                                provident quia molestiae autem quis eligendi
                                deleniti voluptates aliquam voluptatum id eaque
                                repudiandae, saepe blanditiis maiores! Nihil
                                atque velit consequuntur, dolorum aut
                                praesentium, a quia minima sunt laboriosam vitae
                                consequatur facilis quibusdam architecto
                                laudantium rerum libero, illum impedit. Vitae
                                quaerat rem perferendis necessitatibus nemo,
                                quisquam voluptatum, nobis illo repudiandae
                                possimus ipsam tempore ducimus deserunt
                                mollitia. Doloribus exercitationem, adipisci
                                iusto necessitatibus fugit ex. Nemo corporis
                                sint voluptatem possimus tenetur molestias,
                                laboriosam debitis, necessitatibus at fugit
                                quia. Et doloribus, perspiciatis expedita
                                molestiae temporibus nemo excepturi? Laboriosam
                                impedit magni fuga illo enim officiis in soluta
                                culpa est libero assumenda tempora molestiae,
                                aperiam corporis. Assumenda impedit velit earum
                                voluptas fuga, repudiandae nobis, harum facilis
                                aut asperiores quae, et doloribus ullam ratione
                                aspernatur molestiae explicabo error? Error
                                harum corrupti asperiores impedit consequatur
                                accusamus sequi mollitia provident veniam
                                exercitationem natus in quibusdam nobis
                                assumenda, atque, ducimus nisi corporis fugit
                                explicabo. Ex laboriosam fugiat labore quas qui
                                amet maiores ad ipsam suscipit quibusdam ducimus
                                quam perferendis incidunt atque deleniti quis,
                                laudantium aut explicabo id perspiciatis
                                consequuntur obcaecati. Eligendi laboriosam
                                natus ex obcaecati, illo commodi vitae
                                dignissimos voluptate. Expedita provident ipsam
                                aperiam vitae ratione natus debitis tempore
                                minus repudiandae optio ea alias nobis culpa,
                                ducimus dolorem quasi libero consequuntur
                                aliquam voluptates animi impedit necessitatibus.
                                Minus qui sequi provident corporis dolorum.
                            </p>
                        </div>
                    </div>
                </div>
                <FooterComponents />
            </PageContainer>
        </div>
    );
}
