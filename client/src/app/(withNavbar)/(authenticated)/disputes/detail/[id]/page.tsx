import { getServerSideDataWithFeatures } from '@/actions/serverActions'
import { TitleWrapper } from '@/components/atoms'
import DisputeDetail from '@/components/pages/dispute/detail'
import React from 'react'

const DisputeDetailPage = async({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params
  const data = await getServerSideDataWithFeatures({
    url: `/disputes/${id}`,
    key: 'disputeDetail'
  })
  return (
    <TitleWrapper title={"Dispute Detail"} notBackBtn>
        <DisputeDetail data={data}/>
    </TitleWrapper>
  )
}

export default DisputeDetailPage