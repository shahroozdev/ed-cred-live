"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate, useQuery } from "@/hooks/generalHooks";

const UpdateThroughSelect = ({user, type}: { user: Record<string, any>; type: "role" | "category";}) => {
  const { data } = useQuery({ url: "/category", key: "categories" });
  const { MutateFunc } = useMutate();
  const updateUser = async (userId: number, id: string) => {
    const urls ={role:"/auth/users/role", category:"/auth/category/update/"}
    const response = await MutateFunc({
      url: urls[type],
      method: "POST",
      body: {
        userId: userId,
        [type === "role" ? "userRole" : "categoryId"]: id,
      },
      tags:'usersList'
    });
  };
  const placeholder = { role: user.role, category: user?.category?.name };
  return (
    <Select onValueChange={(id) => updateUser(user.id.toString(), id)}>
      <SelectTrigger className="w-md">
        <SelectValue placeholder={placeholder[type] ?? ""} />
      </SelectTrigger>
      {type === "role" ? (
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="moderator">Moderator</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      ) : (
        <SelectContent>
          {data?.categories &&
            data?.categories.map((category: any) => (
              <SelectItem
                value={category.id ? category.id.toString() : "0"}
                key={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
        </SelectContent>
      )}
    </Select>
  );
};

export default UpdateThroughSelect;
