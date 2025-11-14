'use server';

/**
 * @fileOverview Summarizes user-submitted artifacts for efficient processing by AI agents.
 *
 * - summarizeArtifact - A function that summarizes the artifact.
 * - SummarizeArtifactInput - The input type for the summarizeArtifact function.
 * - SummarizeArtifactOutput - The return type for the summarizeArtifact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArtifactInputSchema = z.object({
  artifact: z.string().describe('The artifact to summarize, which could be text or the content of a file.'),
});
export type SummarizeArtifactInput = z.infer<typeof SummarizeArtifactInputSchema>;

const SummarizeArtifactOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the artifact.'),
});
export type SummarizeArtifactOutput = z.infer<typeof SummarizeArtifactOutputSchema>;

export async function summarizeArtifact(input: SummarizeArtifactInput): Promise<SummarizeArtifactOutput> {
  return summarizeArtifactFlow(input);
}

const summarizeArtifactPrompt = ai.definePrompt({
  name: 'summarizeArtifactPrompt',
  input: {schema: SummarizeArtifactInputSchema},
  output: {schema: SummarizeArtifactOutputSchema},
  prompt: `Summarize the following artifact into a concise summary that captures the main points:\n\n{{{artifact}}}`, 
});

const summarizeArtifactFlow = ai.defineFlow(
  {
    name: 'summarizeArtifactFlow',
    inputSchema: SummarizeArtifactInputSchema,
    outputSchema: SummarizeArtifactOutputSchema,
  },
  async input => {
    const {output} = await summarizeArtifactPrompt(input);
    return output!;
  }
);
