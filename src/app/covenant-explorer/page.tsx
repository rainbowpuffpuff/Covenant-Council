import Header from '@/components/app/header';
import { CovenantExplorerChart } from '@/components/app/covenant-explorer-chart';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Share2 } from 'lucide-react';

export default function CovenantExplorerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex items-center gap-2">
                <Share2 className="h-8 w-8 text-primary" />
                <span>Explore the Covenant</span>
              </CardTitle>
              <CardDescription className="text-foreground/80">
                This visualization shows how the 10 Covenant principles relate
                to five core dimensions. Hover over the chart to see how each
                principle scores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CovenantExplorerChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
