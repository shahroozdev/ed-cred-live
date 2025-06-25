import DynamicView from '@/components/atoms/uploadFiles/dynamicView'
import React from 'react'

const Attachments = ({attachments}:{attachments?:string}) => {
    const files = attachments?.replace(/{|}/g, "").split('"')?.filter(key=> key !=="")
  return (
    <>
    <h3 className="font-bold text-xl">Attachments:</h3>
    <div className="my-4 space-y-4 text-sm grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {files?.map((file, i)=>(<DynamicView key={i} url={file}/>))}
    </div>
    </>
  )
}

export default Attachments