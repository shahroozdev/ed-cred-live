import { TitleWrapper } from '@/components/atoms'
import CreateEditDocument from '@/components/pages/admin/documents/create'
import React from 'react'

const CreateDocument = () => {
  return (
     <TitleWrapper title={"Create Document"} desc="Here you can create new document">
      <CreateEditDocument />
    </TitleWrapper>
  )
}

export default CreateDocument
