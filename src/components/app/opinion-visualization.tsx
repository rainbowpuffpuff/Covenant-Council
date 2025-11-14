'use client';

import * as React from 'react';
import { type GenerateAgentOpinionsOutput } from '@/ai/flows/generate-agent-opinions';
import { Accordion } from '@/components/ui/accordion';
import { principles } from '@/lib/covenant';
import { AlignmentChart } from './alignment-chart';
import { OpinionCard } from './opinion-card';

interface OpinionVisualizationProps {
  analysis: GenerateAgentOpinionsOutput;
}

export function OpinionVisualization({ analysis }: OpinionVisualizationProps) {
  const chartData = React.useMemo(() => {
    return analysis.opinions.map(opinion => ({
        principle: opinion.principle,
        score: opinion.alignmentScore,
        isEstimate: false, // Scores are now always provided
    }));
  }, [analysis]);

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h3 className="text-2xl font-bold text-center mb-4 font-headline">Alignment Analysis</h3>
            <AlignmentChart data={chartData} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-center mb-4 font-headline">Council Opinions</h3>
            <Accordion type="single" collapsible className="w-full">
            {analysis.opinions.map((opinion, index) => {
                const principleDetails = principles.find(p => p.title === opinion.principle);
                if (!principleDetails) return null;

                return (
                    <OpinionCard
                        key={index}
                        principle={principleDetails}
                        rationale={opinion.rationale}
                        constructiveFeedback={opinion.constructiveFeedback}
                        alignmentScore={opinion.alignmentScore}
                    />
                );
            })}
            </Accordion>
        </div>
    </div>
  );
}
