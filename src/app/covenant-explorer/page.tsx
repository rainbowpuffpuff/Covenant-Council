'use client';

import * as React from 'react';
import Header from '@/components/app/header';
import { CovenantExplorerChart } from '@/components/app/covenant-explorer-chart';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PrincipleDetails } from '@/components/app/principle-details';
import { principles, type Principle } from '@/lib/covenant';
import { Share2 } from 'lucide-react';

export default function CovenantExplorerPage() {
  const [selectedPrinciple, setSelectedPrinciple] = React.useState<
    Principle | undefined
  >(undefined);

  const handlePrincipleClick = (principleShortTitle: string) => {
    const principle = principles.find(
      (p) => p.shortTitle === principleShortTitle
    );
    setSelectedPrinciple(principle);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedPrinciple(undefined);
    }
  };

  return (
    <Dialog open={!!selectedPrinciple} onOpenChange={handleOpenChange}>
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
                  to five core dimensions. Click on a principle name to see its
                  details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CovenantExplorerChart
                  onPrincipleClick={handlePrincipleClick}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      {selectedPrinciple && (
        <DialogContent className="max-w-3xl">
          <PrincipleDetails principle={selectedPrinciple} />
        </DialogContent>
      )}
    </Dialog>
  );
}
