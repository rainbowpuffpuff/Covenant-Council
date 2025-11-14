import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { type Principle } from '@/lib/covenant';

interface OpinionCardProps {
  principle: Principle;
  opinion: string;
  alignmentScore?: number;
  isEstimate: boolean;
}

export function OpinionCard({
  principle,
  opinion,
  alignmentScore = 0,
  isEstimate,
}: OpinionCardProps) {
  return (
    <AccordionItem value={`item-${principle.id}`}>
      <AccordionTrigger>
        <div className="flex items-center gap-4 w-full pr-4">
          <principle.icon className="h-6 w-6 shrink-0 text-primary" />
          <span className="font-semibold text-left">{principle.shortTitle}</span>
          <div className="flex-1 flex items-center gap-2 justify-end">
            <span className={`text-sm font-mono ${isEstimate ? 'text-muted-foreground' : ''}`}>{alignmentScore}%</span>
            <Progress value={alignmentScore} className="w-24 h-2" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="prose prose-sm dark:prose-invert max-w-none px-2 text-foreground/80">
        <p>{opinion}</p>
        {isEstimate && <p className="text-xs italic mt-2">Alignment score is an estimate.</p>}
      </AccordionContent>
    </AccordionItem>
  );
}
