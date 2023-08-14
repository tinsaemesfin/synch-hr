import React from 'react'
import NewTenantForm from './components/newTenantForm'

const NewTenantPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6"> 
        <NewTenantForm />
      </div>
    </div>
  )
}

export default NewTenantPage