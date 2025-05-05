"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    BadgeCheckIcon,
    CircleEllipsisIcon,
    EyeIcon,
    XIcon,
    ClipboardCheckIcon,
    SearchCheckIcon,
    CheckCircleIcon,
    BanIcon
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { listDisputes, updateDispute } from "@/api/dispute";
import { User } from "@/api/manage-users";
import { FeedbackResponse } from "@/api/feedback-response";

interface Dispute {
    id: string;
    disputedBy: User;
    feedbackResponse: FeedbackResponse;
    reason: string;
    additionalInfo?: string;
    status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
    adminNotes: string;
    createdAt: Date;
    updatedAt: Date;
}

export const DisputesTable = () => {
    const [disputes, setDisputes] = useState<Dispute[]>([]);
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [adminNotes, setAdminNotes] = useState<string>("");

    useEffect(() => {
        listDisputes().then(disputes => setDisputes(disputes));
    }, []);

    const handleStatusChange = (id: string, status: Dispute["status"]) => {
        if (selectedDispute) {
            setDisputes(prev =>
                prev.map(d => (d.id === id ? { ...d, status, adminNotes } : d))
            );
            updateDispute(id, { status, adminNotes });
        }
    };

    const openNotesDialog = (dispute: Dispute) => {
        setSelectedDispute(dispute);
        setAdminNotes(dispute.adminNotes || "");
    };

    const handleSaveNotes = () => {
        if (selectedDispute) {
            updateDispute(selectedDispute.id, { status: selectedDispute.status, adminNotes });
        }
    };

    return (
        <>
            <Table>
                <TableCaption>Manage Feedback Disputes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Disputed By</TableHead>
                        <TableHead>Feedback Title</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {disputes.map(dispute => (
                        <TableRow key={dispute.id}>
                            <TableCell>
                                {dispute.disputedBy?.username || "UNKNOWN"}
                            </TableCell>
                            <TableCell>
                                {dispute.feedbackResponse?.feedbackForm.title || "Untitled"}
                            </TableCell>
                            <TableCell>
                                {dispute.reason.length > 40
                                    ? dispute.reason.slice(0, 40) + "..."
                                    : dispute.reason}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                        {
                                            pending: "bg-yellow-100 text-yellow-800",
                                            reviewed: "bg-blue-100 text-blue-800",
                                            resolved: "bg-green-100 text-green-800",
                                            rejected: "bg-red-100 text-red-800",
                                        }[dispute.status]
                                    }`}
                                >
                                    {dispute.status}
                                </span>
                            </TableCell>
                            <TableCell className="space-x-2">
                                {/* View Reason Dialog */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
                                            size="icon"
                                            onClick={() => openNotesDialog(dispute)}
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Dispute Reason</DialogTitle>
                                            <DialogDescription>
                                                {selectedDispute?.reason}
                                            </DialogDescription>
                                            {selectedDispute?.additionalInfo && (
                                                <div className="mt-4 text-sm text-muted-foreground">
                                                    <strong>Additional Info:</strong> {selectedDispute.additionalInfo}
                                                </div>
                                            )}

                                            {/* Admin Notes Section */}
                                            <div className="mt-4">
                                                <strong>Admin Notes:</strong>
                                                <textarea
                                                    value={adminNotes}
                                                    onChange={(e) => setAdminNotes(e.target.value)}
                                                    className="w-full p-2 border rounded mt-2"
                                                    placeholder="Enter notes for this dispute..."
                                                />
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                                {/* Action Buttons */}
                                <Button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
                                    onClick={() => handleStatusChange(dispute.id, "reviewed")}
                                >
                                    <SearchCheckIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                                    onClick={() => handleStatusChange(dispute.id, "resolved")}
                                >
                                    <CheckCircleIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                    onClick={() => handleStatusChange(dispute.id, "rejected")}
                                >
                                    <BanIcon className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
