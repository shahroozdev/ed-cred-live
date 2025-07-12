import { UploadProfilePic } from "@/components/atoms";
import { BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfileComponent = ({ user }: { user: Record<string, any> }) => {
  const userDetails = [
    {
      title: "Username",
      dynamic: user?.name,
    },
    {
      title: "Email",
      dynamic: user?.email,
    },
    {
      title: "Subscription Plan",
      dynamic: user?.userPackage?.package?.title|| 'Free',
    },
    {
      title: "Package",
      dynamic: user?.userPackage?.package?.title|| 'None',
    },
    {
      title: "Package Expire at",
      dynamic: user?.userPackage?.expireAt || 'None',
    },
    {
      title: "Category",
      dynamic: user?.category?.name,
    },
  ];

  return (
    <div className="flex md:flex-row flex-col w-full pb-5 gap-2">
      <div className="border-2 border-muted border-solid rounded-md p-4 md:w-max w-full">
        <div className="font-semibold text-4xl flex flex-col items-center gap-4">
          <UploadProfilePic>
            {user.profilePictureUrl ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={process.env.BASE_URL + user?.profilePictureUrl}
                  alt={`{user.username} | ED-Cred`}
                  width={500}
                  height={500}
                  className={"w-full h-full"}
                />
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

      <div className="border-2 border-muted border-solid rounded-md p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userDetails.map(({ title, dynamic }, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-base text-muted-foreground">{title}</span>
              <div className="text-base">{dynamic}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
