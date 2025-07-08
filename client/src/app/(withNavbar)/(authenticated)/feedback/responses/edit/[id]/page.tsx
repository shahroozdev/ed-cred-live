import { getServerSideDataWithFeatures } from '@/actions/serverActions'
import { TitleWrapper } from '@/components/atoms'
import FeedbackFormReview from '@/components/pages/common/review/feedbackFormReview'
// import FeedbackFormReview from '@/components/pages/common/review/feedbackForm'

import React from 'react'

const ResponseEditPage = async({params}:{params:Promise<{id:string}>}) => {
    const{id} = await params
    const data = await getServerSideDataWithFeatures({url:`/feedback-responses/response/${id}`, key:'responses'})
  return (
    <TitleWrapper title={"Feedback Response Edit"}>
      <FeedbackFormReview feedback={data?.feedbackForm} defaultValues={data}/>

    </TitleWrapper>
  )
}

export default ResponseEditPage