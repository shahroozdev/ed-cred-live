"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/Common/Title";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { 
    Dialog, 
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    getAllRoles,
    createRole,
    updateRole,
    deleteRole,
    Role,
    Permissions
} from "@/api/role";
import { toast } from "sonner";

const defaultPermissions: Permissions = {
    teacher:    { create: false, view: false, update: false, delete: false },
    admin:      { create: false, view: false, update: false, delete: false },
    leadership: { create: false, view: false, update: false, delete: false },
    district:   { create: false, view: false, update: false, delete: false },
    parent:     { create: false, view: false, update: false, delete: false },
};

const Roles = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [roleName, setRoleName] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [permissions, setPermissions] = useState<Permissions>(defaultPermissions);

    //TODO: Seprate this out to a store
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const data = await getAllRoles();
            setRoles(data);
        } catch (error) {
            toast.error("Failed to fetch roles");
        }
    };

    const handleCreateRole = async () => {
        if (!roleName.trim()) {
            toast.warning("Role name cannot be empty");
            return;
        }

        try {
            await createRole({ name: roleName, permissions });
            setRoleName(""); 
            setPermissions(defaultPermissions);
            fetchRoles();
            toast.success("Role created successfully");
        } catch (error) {
            toast.error("Failed to create role");
        }
    };

    const handleDeleteRole = async (id: number) => {
        try {
            await deleteRole(id);
            fetchRoles();
            toast.success("Role deleted");
        } catch (error) {
            toast.error("Failed to delete role");
        }
    };

    const openPermissionDialog = (role: Role) => {
        setSelectedRole(role);
        setPermissions(role.permissions);
    };

    const togglePermission = (category: keyof Permissions, action: keyof Permissions["teacher"]) => {
        setPermissions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [action]: !prev[category][action],
            },
        }));
    };

    const savePermissions = async () => {
        if (!selectedRole) return;

        try {
            const response = await updateRole(selectedRole.id, permissions);
            console.log(response)
            fetchRoles();
            toast.success("Permissions updated");
            setSelectedRole(null);
        } catch (error) {
            toast.error("Failed to update permissions");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <Title title="Roles" desc="You can create and manage roles here" />

            {/* Create Role */}
            <div className="flex items-center gap-2 mt-5">
                <Input placeholder="Enter role name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                <Button onClick={handleCreateRole}>Create</Button>
            </div>

            {/* Role Listing */}
            <div className="mt-5 grid gap-4">
                {roles.map((role) => (
                    <Card key={role.id} className="p-4">
                        <CardHeader>
                            <CardTitle>{role.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                {Object.entries(role.permissions).map(([category, actions]) => (
                                    <div key={category} className="border p-3 rounded-md">
                                        <h3 className="font-semibold capitalize">{category}</h3>
                                        <div className="grid grid-cols-4 gap-2 mt-2">
                                            {Object.entries(actions).map(([action, allowed]) => (
                                                <span key={action} className={allowed ? "text-green-600" : "text-red-600"}>
                                                    {action}: {allowed ? "✅" : "❌"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => openPermissionDialog(role)}>
                                            Update Permissions
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Update Permissions for {selectedRole?.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                            {Object.keys(defaultPermissions).map((category) => (
                                                <div key={category} className="border p-3 rounded-md">
                                                    <h3 className="font-semibold capitalize">{category}</h3>
                                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                                        {["create", "view", "update", "delete"].map((action) => (
                                                            <label key={action} className="flex items-center gap-2">
                                                                <Checkbox
                                                                    checked={permissions[category as keyof Permissions][action as keyof Permissions["teacher"]]}
                                                                    onCheckedChange={() => togglePermission(category as keyof Permissions, action as keyof Permissions["teacher"])}
                                                                />
                                                                {action}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button onClick={savePermissions}>Save Changes</Button>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => handleDeleteRole(role.id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Roles;
