"use client";
import { postRequest, request } from "@/api/config";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Category } from "@/store/categoryStore";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ListingUser {
    username:   string;
    email:      string;
    role:       string;
    isVerified: boolean;
    category:   Category | null;
    createdAt:  Date;
    id:         number;
    verificationDocumentUrl: string | null;
}

const UsersPage = () => {

    const [users, setUsers] = useState<ListingUser[]>([]);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    const setup = async () => {
        const response = await request('auth/users');
        if (response.error) {
            setError(response.message);
            return;
        }
        setError("");
        setUsers(response);

        const categories = await request('category');
        setCategories(categories);
    }

    const updateUserRole = async(userId: number, newRole: string) => {
        const response = await postRequest('auth/users/role',
            JSON.stringify({ userId: userId, userRole: newRole }));
        toast.info(`User ${response.username} role updated to ${response.role}`);
    }

    useEffect(() => {
        setup();
    }, []);

    const setUserCategory = async (userId: string, categoryId: string)  => {
        const response = await postRequest(
            "auth/category/update/",
            JSON.stringify({ userId, categoryId }));
        if (response.error) {
            toast.error(response.message);
            return;
        }
        toast.info(`User with id ${userId} category has been updated to ${response.name}`);
    }

    const verifyUser = async(userId: number, action: "approve" | "reject") => {
        const res = await postRequest("auth/verify-user", JSON.stringify({ userId: userId, action: action }));
    }

    return (
        <div className="w-full h-full overflow-hidden bg-background text-foreground">
            <div className="w-2xl mx-auto flex flex-col gap-4 my-10">
                <div className="text-4xl font-semibold mb-4">Users Listing</div>
                {
                    error && <div className="text-destructive-foreground">{error}</div>
                }
                {
                    users.map((user, i) => (<div key={i} className="p-4 rounded-md border-2 border-muted">
                        <div className="text-2xl font-semibold capitalize flex gap-2 items-baseline">{user.username}
                            <span className="text-muted-foreground text-xl">({user.category?.name ?? ""})</span>
                            <div className={`ml-auto px-2 py-0.1 text-sm font-normal rounded-full ${user.isVerified ? "bg-green-800" : "bg-red-800"} text-white lowercase`}>
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
                                <Select onValueChange={(role) => updateUserRole(user.id, role)}>
                                    <SelectTrigger className="w-md">
                                        <SelectValue placeholder={user.role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className="text-base mb-1 font-semibold">Change Category</div>
                                <Select onValueChange={(categoryId) => setUserCategory(user.id.toString(), categoryId)}>
                                    <SelectTrigger className="w-md">
                                        <SelectValue placeholder={user.category?.name ?? ""} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories &&
                                            categories.map((category) => (
                                                <SelectItem value={category.id ? category.id.toString() : "0"} key={category.id}>
                                                    {category.name}
                                                </SelectItem>))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <VerifyUserCard user={user} verifyUser={verifyUser} />
                    </div>
                    ))
                }
            </div>
        </div>
    )
};

function VerifyUserCard({ user, verifyUser }: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {user.verificationDocumentUrl && !user.isVerified && (
                <>
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4 items-center">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <img
                                    src={user.verificationDocumentUrl}
                                    width={200}
                                    height={"auto"}
                                    alt="verification-document"
                                    className="cursor-pointer hover:opacity-80 transition"
                                    onClick={() => setOpen(true)}
                                />
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                                <DialogTitle>User Verification Document</DialogTitle>
                                <img
                                    src={user.verificationDocumentUrl}
                                    alt="verification-document-full"
                                    className="w-full h-auto rounded"
                                />

                                <div className="flex items-center gap-4 w-full">
                                    <Button onClick={() => verifyUser(user.id, "reject")} className="flex-grow" variant="destructive">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => verifyUser(user.id, "approve")} className="flex-grow">
                                        Verify
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <div className="flex items-center gap-4 w-full">
                            <Button onClick={() => verifyUser(user.id, "reject")} className="flex-grow" variant="destructive">
                                Cancel
                            </Button>
                            <Button onClick={() => verifyUser(user.id, "approve")} className="flex-grow">
                                Verify
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UsersPage;
