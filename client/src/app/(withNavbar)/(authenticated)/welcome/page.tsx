import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

export default async function WelcomePage() {
    const user = await getServerSideDataWithFeatures({
        url: "/auth/profile",
        key: "profile",
        noRedirect:true,
      });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                        Welcome, ${user?.username}! 🎉
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-gray-600 text-sm">
                        You’ve successfully joined Ed Cred. Start by exploring schools or leaving your first review!
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/dashboard" className="border-2">Explore Schools</Link>
                        <Link href="/review" className="border-2">
                            Leave a Review
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
