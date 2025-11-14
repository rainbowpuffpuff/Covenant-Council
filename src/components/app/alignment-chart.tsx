'use client';

import * as React from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { principles } from '@/lib/covenant';

type AlignmentChartProps = {
  data: {
    principle: string;
    score: number;
    isEstimate: boolean;
  }[];
};

const chartConfig = {
  score: {
    label: 'Alignment Score',
    color: 'hsl(var(--primary))',
  },
  estimatedScore: {
    label: 'Estimated Score',
    color: 'hsl(var(--muted-foreground))',
  }
} satisfies ChartConfig;


export function AlignmentChart({ data }: AlignmentChartProps) {
  const formattedData = React.useMemo(() => {
    return principles.map(p => {
        const matchingData = data.find(d => d.principle === p.title);
        const score = matchingData?.score ?? 0;
        const isEstimate = matchingData?.isEstimate ?? true;

        return {
            principle: p.shortTitle,
            score: !isEstimate ? score : 0,
            estimatedScore: isEstimate ? score : 0,
        };
    });
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[450px]">
      <RadarChart
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        outerRadius="80%"
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis dataKey="principle" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
        <PolarGrid gridType="circle" />
        <Radar
          dataKey="score"
          fill="var(--color-score)"
          fillOpacity={0.6}
          stroke="var(--color-score)"
        />
        <Radar
            dataKey="estimatedScore"
            fill="var(--color-estimatedScore)"
            fillOpacity={0.4}
            stroke="var(--color-estimatedScore)"
            dot={false}
        />
      </RadarChart>
    </ChartContainer>
  );
}
