import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Principle } from '@/lib/covenant';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface PrincipleDetailsProps {
  principle: Principle;
}

export function PrincipleDetails({ principle }: PrincipleDetailsProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <principle.icon className="h-8 w-8 text-primary" />
          <span className="font-headline text-3xl">{principle.shortTitle}</span>
        </DialogTitle>
        <DialogDescription className="text-lg font-semibold !mt-2 text-foreground/90">
          {principle.title.split(': ')[1]}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh] pr-6">
        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 space-y-6 py-4">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2 not-prose"><ThumbsUp className="h-5 w-5"/> The Promise (Utopia)</h4>
                <p>{principle.utopia}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2 not-prose"><ThumbsDown className="h-5 w-5"/> The Peril (Dystopia)</h4>
                <p>{principle.dystopia}</p>
            </div>
        </div>
      </ScrollArea>
    </>
  );
}
