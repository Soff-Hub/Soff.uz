import React from 'react'
import { useSelector } from 'react-redux'
import Repository from '~/reositoriy-admin/Repository'

const Token = () => {
    const { user } = useSelector(state => state.auth)
    const data =user?.access
  return (
    <div>
     <Repository props= {data} />
    </div>
  )
}

export default Token
