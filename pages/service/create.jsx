import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import CreateServiceForm from '~/components/services/create/CreateServiceForm'

const Create = ({ childCategory }) => {
  return (
    <PageContainer>
      <div className='container my-5'>
        <CreateServiceForm childCategory={childCategory}/>
      </div>
    </PageContainer>
  )
}

export default Create


export const getServerSideProps = async (context) => {
  const { query } = context;
  const { category } = query;

  const fetchJson = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return res.json();
  };

  const [childCategory] = await Promise.all([
    fetchJson(`http://176.96.241.219:8005/api/v1/categories/categories/children/?parent_category_id=${category}`),
  ]);

  return {
    props: {
      childCategory: childCategory || null
    },
  };
}