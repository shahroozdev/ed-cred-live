"use client";

import { useEffect, useState } from "react";
import { getUsers, formatDate, changeUserCategory, changeUserRole, User, verifyUser } from "@/api/manage-users";
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { 
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { BadgeAlertIcon, BadgeCheckIcon, CircleCheckIcon, CircleEllipsisIcon, EyeIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export const UsersTable = () => {

    const [users, setUsers] = useState<User[]>([]);
    const { categories } = useCategories();

    useEffect(() => {
        getUsers().then(users => setUsers(users));
    }, []);

    return (
        <Table>
            <TableCaption>Manage Ed-Cred users. Change roles and categories.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Email</TableHead>
                    <TableHead className="">Verification Status</TableHead>
                    <TableHead className="">Joined on</TableHead>
                    <TableHead className="">Category</TableHead>
                    <TableHead className="">Role</TableHead>
                    <TableHead className="">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="flex gap-2 items-center">
                            <Image
                                src={`/uploads/categoryIcons/${user.category ? user.category.name.toLowerCase() : "default"}.png`}
                                width={200} height={200} alt={user.username} className="w-8 h-auto object-cover" />

                            {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><VerificationStatus isVerified={user.isVerified} isVerifying={user.isVerifying}/></TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell>
                            <Select onValueChange={value => changeUserCategory(user.id, value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={user.category ? user.category.name : "no category"}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories && categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id ? category.id.toString() : "0"}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <Select onValueChange={value => changeUserRole(user.id, value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={user.role}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {["admin", "user"].map((role, i) => (
                                        <SelectItem key={`role-${i}`} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell className="flex gap-x-2">
                            <Button variant={'destructive'} onClick={() => verifyUser(user.id, "reject")}>
                                <Trash2Icon />
                            </Button>
                            {
                                !user.isVerified &&
                                <Button onClick={() => verifyUser(user.id, "approve")}>
                                    <CircleCheckIcon />
                                </Button>
                            }
                            {
                                user.verificationDocumentUrl &&
                                <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"secondary"}>
                                                <EyeIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <img src={`${user.verificationDocumentUrl}`} width={400} height={400} />
                                        </PopoverContent>
                                    </Popover>
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const VerificationStatus = ({isVerified, isVerifying} : {isVerified: boolean, isVerifying: boolean}) => (
    <>
        {
            isVerifying ? 
                <div className="flex gap-2"><CircleEllipsisIcon stroke="orange" /> Under Process</div>
                :
                isVerified ? 
                    <div className="flex gap-2"><BadgeCheckIcon stroke="green"/> Verified</div>
                    :

                    <div className="flex gap-2"><BadgeAlertIcon stroke="red"/> Not Verified</div>
        }
    </>
)
