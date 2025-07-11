import { TitleWrapper } from '@/components/atoms'
import CreateUserComponent from '@/components/pages/admin/users/create/CreateUserComponent'
import React from 'react'

const CrateUserPage = () => {
  return (
        <TitleWrapper title="Create New User">
            <CreateUserComponent />
        </TitleWrapper>
  )
}

export default CrateUserPage