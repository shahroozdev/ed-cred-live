import { TitleWrapper } from '@/components/atoms'
import CreateDispute from '@/components/pages/dispute/create'
import React from 'react'

const CreateDisputePage = () => {
  return (
    <TitleWrapper title="Create Dispute" notBackBtn>
      <CreateDispute/>
    </TitleWrapper>
  )
}

export default CreateDisputePage