'use client'
import { usePRouter } from '@/hooks/useRouter'
import { CircleCheckIcon } from 'lucide-react'
import React from 'react'

const PackageCard = ({plan}:{plan:Record<string, any>}) => {
    const router = usePRouter();
  return (
    <div className={`p-6 rounded-4xl flex flex-col shadow-md bg-white text-black ${plan.title==="Pro" ? "lg:scale-115" : ""}`}>
            <div className="text-2xl font-semibold">{plan.title}</div>
            <div className="text-base font-normal mb-4">{plan.description}</div>
            <div className="text-6xl font-semibold flex items-start gap-2">
                ${plan.price}
                <span className="text-lg font-normal">/month</span>
            </div>
            <div className="w-full h-0.5 bg-black/40 rounded-full my-4"/>
            <div className="flex flex-col gap-1 text-lg font-normal mb-8">
                {
                    plan?.features?.map((feature:string, i:number) => (<div className="flex gap-2 items-center" key={`${plan?.title}-feature-${i}`}>
                        <CircleCheckIcon fill="oklch(0.627 0.194 149.214)" stroke="white" className='!min-w-5 !min-h-5 w-5 h-5'/>
                        <p className='lg:text-base text-sm'>{feature}</p>
                    </div>))
                }
            </div>
            <button className="w-full mt-auto rounded-2xl bg-green-600 text-white py-3 hover:shadow-md hover:opacity-90 cursor-pointer" onClick={()=>router.push(`/purchase/${plan?.id}`)}>Buy Now</button>
        </div>
  )
}

export default PackageCard