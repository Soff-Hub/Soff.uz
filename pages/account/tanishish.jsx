import Link from 'next/link';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';

const Tanishish = () => {
  const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/',
    },
    {
        text: 'Ro\'yxatdan o\'tish',
        url: '/account/register'
    },
    {
      text : 'Shartlar bilan tanishish'
    }
];
    return (
      <PageContainer>
         <BreadCrumb breacrumb={breadCrumb} />
          <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-form--account d-flex justify-content-around">
                   Tanishuv shartlari...
                   <br /> <br /> 
                   Biz bilan o'z biznesingizni boshlang!!!
                </div>
            </div>
        </div>
      </PageContainer>
    );
};

export default Tanishish;
