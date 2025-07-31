import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import CreateServiceForm from '~/components/services/create/CreateServiceForm'

const Create = () => {
  return (
    <PageContainer>
      <div className='container my-5'>
        <CreateServiceForm/>
      </div>
    </PageContainer>
  )
}

export default Create