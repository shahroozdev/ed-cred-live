"use client";

import { useEffect } from "react";
import { getRequest } from "@/api/config";
import { FeedbackResponse } from "@/api/feedback-response";
import { Title } from "@/components/Common/Title";
import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AllResponsePage = () => {

    const [responses, setResponses] = useState<FeedbackResponse[]>([]);
    useEffect(() => {
        const setup = async() => { 
            const res = await getRequest('/feedback-form');
            if (!res) return;
            const body = await res.json();
            const responses : FeedbackResponse[] = [];
            body.forEach((form: any) => responses.push(...form.responses))
            setResponses(responses);
        }
        setup();
    }, []);

    return (
        <div className="mx-auto my-10 flex flex-col px-20">
            <Title 
                title="All Feedbacks Responses"
                desc=""
            />
            <FeedbackResponsesTable responses={responses} />
        </div>
    )
}

const FeedbackResponsesTable = ({
    responses,
}: {
        responses: FeedbackResponse[];
    }) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});

    // Always define hook-dependent values before conditional returns
    const detailKeys = useMemo(() => {
        if (responses.length === 0) return [];
        return Object.keys(responses[0].details || {});
    }, [responses]);

    const formatValue = (key: string, value: any) => {
        if (key === "reportingPeriod") {
            const formatter = new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            return `${formatter.format(new Date(value.from))} to ${formatter.format(
new Date(value.to)
)}`;
        }
        return String(value);
    };

    const filteredResponses = useMemo(() => {
        return responses.filter((response) => {
            const submittedBy = response.author?.username || "Anonymous";
            if (
                filters["Submitted by"] &&
                    !submittedBy.toLowerCase().includes(filters["Submitted by"].toLowerCase())
            ) {
                return false;
            }

            for (const key of detailKeys) {
                const val = formatValue(key, response.details[key]);
                if (
                    filters[key] &&
                        !val.toLowerCase().includes(filters[key].toLowerCase())
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [responses, filters, detailKeys]);

    if (!responses || responses.length === 0) {
        return <p className="text-muted-foreground">No responses available.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Submitted by</TableHead>
                    {detailKeys.map((key) => (
                        <TableHead key={key} className="capitalize">
                            {key}
                        </TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>

                {/* Filters Row */}
                <TableRow>
                    <TableCell>
                        <Input
                            placeholder="Filter..."
                            value={filters["Submitted by"] || ""}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    ["Submitted by"]: e.target.value,
                                }))
                            }
                        />
                    </TableCell>
                    {detailKeys.map((key) => (
                        <TableCell key={key}>
                            <Input
                                placeholder="Filter..."
                                value={filters[key] || ""}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        </TableCell>
                    ))}
                    <TableCell />
                </TableRow>
            </TableHeader>

            <TableBody>
                {filteredResponses.map((response) => (
                    <TableRow key={response.id}>
                        <TableCell>
                            {response.author ? response.author.username : "Anonymous"}
                        </TableCell>
                        {detailKeys.map((key) => (
                            <TableCell key={key}>
                                {/* @ts-ignore */}
                                {formatValue(key, response.details[key])}
                            </TableCell>
                        ))}
                        <TableCell className="text-right space-x-2">
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="secondary" className="text-black">
                                Edit
                            </Button>
                            <Button size="sm" variant="destructive">
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AllResponsePage;
