'use client';

import { type GenerateAgentOpinionsOutput } from "@/ai/flows/generate-agent-opinions";
import { AlignmentChart } from "./alignment-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubmissionHistoryProps {
    history: GenerateAgentOpinionsOutput[];
}

export function SubmissionHistory({ history }: SubmissionHistoryProps) {
    // We want to show history in reverse chronological order
    const reversedHistory = [...history].reverse();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reversedHistory.map((analysis, index) => {
                const chartData = analysis.opinions.map(opinion => ({
                    principle: opinion.principle,
                    score: opinion.alignmentScore,
                    isEstimate: false,
                }));
                const submissionNumber = reversedHistory.length - index;

                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">Submission #{submissionNumber}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <AlignmentChart data={chartData} />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
