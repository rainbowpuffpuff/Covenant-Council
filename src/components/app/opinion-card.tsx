import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { type Principle } from '@/lib/covenant';
import { ThumbsUp, ThumbsDown, ListChecks } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface OpinionCardProps {
  principle: Principle;
  rationale: string;
  constructiveFeedback: string;
  alignmentScore: number;
}

export function OpinionCard({
  principle,
  rationale,
  constructiveFeedback,
  alignmentScore,
}: OpinionCardProps) {
  const scoreColorClass = alignmentScore > 66 ? 'bg-green-500' : alignmentScore > 33 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <AccordionItem value={`item-${principle.id}`}>
      <AccordionTrigger>
        <div className="flex items-center gap-4 w-full pr-4">
          <principle.icon className="h-6 w-6 shrink-0 text-primary" />
          <span className="font-semibold text-left">{principle.shortTitle}</span>
          <div className="flex-1 flex items-center gap-2 justify-end">
            <span className={`text-sm font-mono`}>{alignmentScore}%</span>
            <Progress value={alignmentScore} className="w-24 h-2" indicatorClassName={scoreColorClass} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="prose prose-sm dark:prose-invert max-w-none px-2 text-foreground/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ThumbsUp className="h-5 w-5 text-green-500"/> Rationale</h4>
                <ReactMarkdown>{rationale}</ReactMarkdown>
            </div>
            <div className="rounded-lg border p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ThumbsDown className="h-5 w-5 text-red-500"/> Constructive Feedback</h4>
                <ReactMarkdown>{constructiveFeedback}</ReactMarkdown>
            </div>
        </div>
        {principle.assessmentCriteria && (
            <div className="rounded-lg border p-4 mt-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><ListChecks className="h-5 w-5 text-blue-500"/> Assessment Criteria</h4>
                <ul className="list-disc pl-5 space-y-1">
                    {principle.assessmentCriteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                    ))}
                </ul>
            </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
