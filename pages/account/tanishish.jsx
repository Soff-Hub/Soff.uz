import Link from 'next/link';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Page404 from '../page/page-404';

const Tanishish = () => {
  const breadCrumb = [
    {
        text: 'Asosiy sahifa',
        url: '/main',
    },
    {
        text: 'Ro\'yxatdan o\'tish',
        url: '/account/register'
    },
    {
      text : 'Shartlar bilan tanishish'
    }
];
const { user } = useSelector(state => state.auth)
    return (
      user?.access  ?
      <Page404/> :
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
