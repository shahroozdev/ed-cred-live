import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import ChangePassword from './changePassword'
import ProfileForm from './profileForm'

const ProfileUpdateForms = ({user}:{user:Record<string,any>}) => {

  return (
        <Tabs defaultValue="account" className="gap-6">
      <div
        data-slot="dashboard-header"
        className="flex items-center justify-between"
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="account" className="grid gap-6">
        <ProfileForm user={user}/>
      </TabsContent>
      <TabsContent
        value="security"
        className="grid gap-6 @3xl/page:grid-cols-2"
      >
        <ChangePassword/>
      </TabsContent>
      </Tabs>
  )
}

export default ProfileUpdateForms