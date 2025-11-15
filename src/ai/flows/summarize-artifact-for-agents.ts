'use server';

/**
 * @fileOverview Summarizes user-submitted artifacts for efficient processing by AI agents.
 * For images, it generates a detailed description. For text, it provides a summary.
 *
 * - summarizeArtifact - A function that summarizes the artifact.
 * - SummarizeArtifactInput - The input type for the summarizeArtifact function.
 * - SummarizeArtifactOutput - The return type for the summarizeArtifact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArtifactInputSchema = z.object({
  artifact: z.string().describe('The artifact to summarize, which could be text or a data URI of a file.'),
  mimeType: z.string().optional().describe('The MIME type of the artifact, if it is a file.'),
});
export type SummarizeArtifactInput = z.infer<typeof SummarizeArtifactInputSchema>;

const SummarizeArtifactOutputSchema = z.object({
  summary: z.string().describe('A concise summary or description of the artifact.'),
});
export type SummarizeArtifactOutput = z.infer<typeof SummarizeArtifactOutputSchema>;

export async function summarizeArtifact(input: SummarizeArtifactInput): Promise<SummarizeArtifactOutput> {
  return summarizeArtifactFlow(input);
}

const summarizeArtifactPrompt = ai.definePrompt({
  name: 'summarizeArtifactPrompt',
  input: {schema: z.object({
    artifact: z.string(),
    isMedia: z.boolean(),
  })},
  output: {schema: SummarizeArtifactOutputSchema},
  prompt: `
{{#if isMedia}}
Analyze the following image in detail. Describe the key elements, composition, mood, and any potential symbolic meaning. Provide a rich, descriptive text that can be used by other AI agents to understand the core concepts of the artifact.
Image: {{media url=artifact}}
{{else}}
Summarize the following artifact into a concise summary that captures the main points. The summary should be detailed enough for other AI agents to perform a thorough analysis of its concepts.
Artifact: {{{artifact}}}
{{/if}}
`,
});

const summarizeArtifactFlow = ai.defineFlow(
  {
    name: 'summarizeArtifactFlow',
    inputSchema: SummarizeArtifactInputSchema,
    outputSchema: SummarizeArtifactOutputSchema,
  },
  async input => {
    const isMedia = !!input.mimeType?.startsWith('image/');
    const {output} = await summarizeArtifactPrompt({
        artifact: input.artifact,
        isMedia,
    });
    return output!;
  }
);
