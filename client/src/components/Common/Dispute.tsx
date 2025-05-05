import { ArrowLeftIcon, ShieldXIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { createDispute } from "@/api/dispute";

export const DisputeButton = ({ feedbackResponseId }: { feedbackResponseId: number }) => {

    const [reason, setReason] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<string>("");
    const [showPaymentScreen, setShowPaymentScreen] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-3 py-1 w-max flex gap-1 items-center rounded-full border-none outline-none bg-red-300 text-red-800 text-sm font-medium">
                    <ShieldXIcon className="w-4 h-4" />
                    Open a Dispute
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        {
                            showPaymentScreen && <ArrowLeftIcon onClick={() => setShowPaymentScreen(false)} />
                        }
                        <ShieldXIcon />
                        Open a dispute
                    </DialogTitle>
                    <DialogDescription>you can dispute a review here. All the disputed reviews are removed immediately and they undergo testing to prove there validity.</DialogDescription>
                </DialogHeader>

                <div className={showPaymentScreen ? "flex flex-col items-start gap-4 text-left" : "hidden"}>
                    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 w-full">
                        <h3 className="text-base font-semibold text-yellow-800 mb-1">Dispute Review Fee – $100</h3>
                        <p className="text-sm text-yellow-700">
                            To continue, you’ll need to pay a <strong>$100 non-refundable fee</strong>. This ensures only serious disputes are processed and helps us verify claims fairly and transparently.
                        </p>
                    </div>

                    <Button variant="default" className="self-end" onClick={() => createDispute(feedbackResponseId, { reason, additionalInfo })}>
                        Proceed to Payment
                    </Button>
                </div>

                <div className={ showPaymentScreen ? "hidden" : "flex flex-col gap-4" }>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Reason</Label>
                        <Textarea placeholder="this review is misleading because..." className="min-h-40" 
                            onChange={(e) => setReason(e.target.value)} required
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label>Additional Information</Label>
                        <Textarea placeholder="supporting facts about your claim etc... (optional)" 
                            onChange={(e) => setAdditionalInfo(e.target.value)} required
                        />
                    </div>
                    <div/>
                    <Button variant="default" className="self-end" onClick={() => setShowPaymentScreen(true)}>
                        Open Dispute
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
