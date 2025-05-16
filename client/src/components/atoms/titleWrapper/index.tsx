'use client'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

const TitleWrapper = ({title, desc, children, notBackBtn}:{title:string, desc?:string, children:ReactNode, notBackBtn?:boolean}) => {
      const router = useRouter();
      return(
          <div className='max-w-[1400px] w-full m-auto md:p-5 p-2'>
              {!notBackBtn&&<button onClick={() => router.push('/dashboard')} className="text-left text-blue-500 hover:underline mb-4">
                  ← Back to Dashboard
              </button>}
              <div className="text-3xl font-semibold">{title}</div>
              <div className="font-base text-muted-foreground mb-8">{desc}</div>
              {children}
          </div>
      )
}

export default TitleWrapper