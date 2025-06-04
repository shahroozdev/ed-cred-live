import { UploadProfilePic } from '@/components/atoms'
import { BadgeCheckIcon, BadgeMinusIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProfileComponent = ({user}:{user:Record<string, any>}) => {
  return (
       <div className="flex w-full">
      <div className="border-2 border-muted rounded-md p-4 w-max">
        <div className="font-semibold text-4xl flex flex-col items-center gap-4">
          <UploadProfilePic>
            {user.profilePictureUrl ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image src={process.env.BASE_URL+user.profilePictureUrl} alt={`{user.username} | ED-Cred`} width={500} height={500} className={'w-full h-full'}/>
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-foreground flex items-center justify-center text-background">
                {user?.name?.slice(0, 2)}
              </div>
            )}
          </UploadProfilePic>
          <div className="flex flex-col">
            <div className="flex gap-4 items-center justify-center">
              <div className="capitalize">{user?.name}</div>
              {user?.isVerified ? (
                <BadgeCheckIcon stroke="green" />
              ) : (
                <BadgeMinusIcon stroke="red" />
              )}
            </div>
            <p className="text-base text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="border-2 border-muted rounded-md p-4 w-full">
        <h2 className="text-2xl font-bold underline mb-4">User Detail</h2>
        <div className="text-base flex gap-4">
          Username:
          <div>{user?.name}</div>
        </div>
        <div className="text-base flex gap-4">
          Email:
          <div>{user?.email}</div>
        </div>
        <div className="text-base flex gap-4">
          Subscription Plan:
          <div>{user?.subscription?.status}</div>
        </div>
        <div className="text-base flex gap-4">
          Package:
          <div className='capitalize'>{user?.subscription?.plan}</div>
        </div>
        <div className="text-base flex gap-4">
          Role:
          <div>{user.role}</div>
        </div>
        <div className="text-base flex gap-4">
          Category:
          <div>{user?.category?.name}</div>
        </div>
      </div>
      </div>
  )
}

export default ProfileComponent