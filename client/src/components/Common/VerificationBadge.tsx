import { BadgeCheck } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@/components/ui/popover";

export const VerificationBadge = ({ isVerified }: { isVerified: boolean }) => {
    if (!isVerified) return null;

    return (
        <Popover className="">
            <PopoverTrigger className="w-max ml-auto inline-flex items-center justify-end gap-1 bg-green-300 text-green-900 px-3 py-1 text-sm rounded-full font-medium" >
                <BadgeCheck className="w-4 h-4" />
                Verified Response
            </PopoverTrigger>
            <PopoverContent>
                This is a verified response from a verified Ed-Cred user. Verified users are checked to make sure there responses are valuable to the community. <br/>
                <p className="text-sm mt-2 font-medium">To learn more about the verification process visit <a className="underline underline-offset-4" href="/wiki/verification-process">here</a>.</p>
            </PopoverContent>
        </Popover>
    );
};
