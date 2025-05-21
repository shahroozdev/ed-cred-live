import { Separator } from "@/components/ui/separator";
import React from "react";
import VerifyUserCard from "./components/verifyUserCard";
import UpdateThroughSelect from "./components/updateThroughSelect";

const UsersPageComponent = ({users}:{users:any}) => {

  return (
    <div>
      {" "}
      {users?.map((user: any, i: number) => (
        <div key={i} className="p-4 rounded-md border-2 border-muted">
          <div className="text-2xl font-semibold capitalize flex gap-2 items-baseline">
            {user.username}
            <span className="text-muted-foreground text-xl">
              ({user?.category?.name ?? ""})
            </span>
            <div
              className={`ml-auto px-2 py-0.1 text-sm font-normal rounded-full ${
                user.isVerified ? "bg-green-800" : "bg-red-800"
              } text-white lowercase`}
            >
              {user.isVerified ? "verfied" : "not verified"}
            </div>
          </div>
          <div className="text-base">{user.email}</div>
          <div className="text-base flex gap-2 text-muted-foreground">
            <span>joined on</span>
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(user.createdAt ?? ""))}
          </div>
          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="text-base mb-1 font-semibold">Change Role</div>
              <UpdateThroughSelect user={user} type="role"/>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-base mb-1 font-semibold">
                Change Category
              </div>
              <UpdateThroughSelect user={user} type="category"/>
            </div>
          </div>
          <VerifyUserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default UsersPageComponent;
