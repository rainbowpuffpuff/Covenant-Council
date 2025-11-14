import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { type Principle } from '@/lib/covenant';
import { type EthicalValueAnalysis } from '@/ai/flows/generate-agent-opinions';

interface OpinionCardProps {
  principle: Principle;
  opinion: string;
  alignmentScore?: number;
  isEstimate: boolean;
  ethicalValueAnalysis: EthicalValueAnalysis;
}

const ethicalValueLabels: { key: keyof EthicalValueAnalysis, label: string }[] = [
    { key: 'autonomy', label: 'Autonomy' },
    { key: 'equity', label: 'Equity' },
    { key: 'transparency', label: 'Transparency' },
    { key: 'safety', label: 'Safety' },
];

export function OpinionCard({
  principle,
  opinion,
  alignmentScore = 0,
  isEstimate,
  ethicalValueAnalysis,
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
        {isEstimate && <p className="text-xs italic mt-2">Principle alignment score is an estimate.</p>}

        <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-foreground mb-2">Ethical Value Analysis</h4>
            <div className="space-y-2">
                {ethicalValueLabels.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-4 w-full">
                        <span className="w-24 text-xs font-medium">{label}</span>
                        <Progress value={ethicalValueAnalysis[key]} className="flex-1 h-2" />
                        <span className="text-xs font-mono w-8 text-right">{ethicalValueAnalysis[key]}%</span>
                    </div>
                ))}
            </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
