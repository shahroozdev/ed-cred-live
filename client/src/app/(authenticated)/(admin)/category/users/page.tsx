import { Header } from "@/components/ManageUsers/Header";
import { UsersTable } from "@/components/ManageUsers/UsersTable";

export default function ManageUsersPage() {
    return (
        <main className="w-full min-h-screen">
            <Header title="Manage Users" description="users appaer in the descending order them join."/>
            <div className="w-full mx-auto px-10 mt-10">
                <UsersTable />
            </div>
        </main>
    )
}
