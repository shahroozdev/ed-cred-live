import { getServerSideDataWithFeatures } from '@/actions/serverActions'
import { TitleWrapper } from '@/components/atoms'
import FeedbackForm from '@/components/pages/common/review/FeedbackForm'
import React from 'react'

const ResponseEditPage = async({params}:{params:Promise<{id:string}>}) => {
    const{id} = await params
    const data = await getServerSideDataWithFeatures({url:`/feedback-responses/response/${id}`, key:'responses'})
    console.log(data)
  return (
    <TitleWrapper title={"Feedback Response Edit"}>
      <FeedbackForm feedback={data?.feedbackForm} defaultValues={data}/>
      <></>
    </TitleWrapper>
  )
}

export default ResponseEditPage