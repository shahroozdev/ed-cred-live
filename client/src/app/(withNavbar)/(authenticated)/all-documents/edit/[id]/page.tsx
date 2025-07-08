import { TitleWrapper } from '@/components/atoms'
import CreateEditDocument from '@/components/pages/admin/documents/create'
import React from 'react'

const EditDocument = () => {
  return (
     <TitleWrapper title={"Edit Document"} desc="Here you can edit document">
      <CreateEditDocument />
    </TitleWrapper>
  )
}

export default EditDocument
