import { getServerSideDataWithFeatures } from '@/actions/serverActions'
import React, { ReactNode } from 'react'

const DashboardLayout = async({ children, admin, user }: { children: ReactNode, admin:ReactNode, user:ReactNode }) => {
      const userData = await getServerSideDataWithFeatures({url:'/auth/profile', key:'profile'})
  return (
    <div>{userData?.role==="admin"?admin:user}
    {children}
    </div>
  )
}

export default DashboardLayout