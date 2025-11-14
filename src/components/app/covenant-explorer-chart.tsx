'use client';

import * as React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { principleScores, dimensions } from '@/lib/covenant-dimensions';

const chartConfig = {
  individualism: { label: 'Individualism', color: 'hsl(var(--chart-1))' },
  collectivism: { label: 'Collectivism', color: 'hsl(var(--chart-2))' },
  decentralization: { label: 'Decentralization', color: 'hsl(var(--chart-3))' },
  privacy: { label: 'Privacy', color: 'hsl(var(--chart-4))' },
  security: { label: 'Security', color: 'hsl(var(--chart-5))' },
};

export function CovenantExplorerChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[600px]"
    >
      <RadarChart data={principleScores}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis dataKey="principle" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <PolarGrid />
        {dimensions.map((dim) => (
          <Radar
            key={dim.key}
            name={dim.label}
            dataKey={dim.key}
            fill={`var(--color-${dim.key})`}
            fillOpacity={0.1}
            stroke={`var(--color-${dim.key})`}
          />
        ))}
        <Legend />
      </RadarChart>
    </ChartContainer>
  );
}
