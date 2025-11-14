'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing the alignment of a user-submitted artifact with a given Covenant principle.
 *
 * - assessPrincipleAlignment -  The function that triggers the assessment flow.
 * - AssessPrincipleAlignmentInput - The input type for the assessPrincipleAlignment function.
 * - AssessPrincipleAlignmentOutput - The output type for the assessPrincipleAlignment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessPrincipleAlignmentInputSchema = z.object({
  artifact: z.string().describe('The text content of the artifact to be assessed.'),
  principle: z.string().describe('The Covenant principle to assess alignment with.'),
});
export type AssessPrincipleAlignmentInput = z.infer<typeof AssessPrincipleAlignmentInputSchema>;

const AssessPrincipleAlignmentOutputSchema = z.object({
  alignmentScore: z.number().describe('A numerical score (0-1) indicating the degree of alignment, where 0 is not aligned and 1 is fully aligned.'),
  justification: z.string().describe('A textual justification for the assigned alignment score.'),
});
export type AssessPrincipleAlignmentOutput = z.infer<typeof AssessPrincipleAlignmentOutputSchema>;

export async function assessPrincipleAlignment(input: AssessPrincipleAlignmentInput): Promise<AssessPrincipleAlignmentOutput> {
  return assessPrincipleAlignmentFlow(input);
}

const assessPrincipleAlignmentPrompt = ai.definePrompt({
  name: 'assessPrincipleAlignmentPrompt',
  input: {schema: AssessPrincipleAlignmentInputSchema},
  output: {schema: AssessPrincipleAlignmentOutputSchema},
  prompt: `You are an AI agent embodying the following Covenant principle: {{{principle}}}.

  Assess the extent to which the following artifact aligns with your principle. Provide an alignment score between 0 and 1 (inclusive), where 0 means no alignment and 1 means full alignment. Also, provide a brief justification for the assigned score.

  Artifact: {{{artifact}}}

  Respond with a JSON object that contains the alignmentScore and justification, formatted as specified in the output schema.`,
});

const assessPrincipleAlignmentFlow = ai.defineFlow(
  {
    name: 'assessPrincipleAlignmentFlow',
    inputSchema: AssessPrincipleAlignmentInputSchema,
    outputSchema: AssessPrincipleAlignmentOutputSchema,
  },
  async input => {
    const {output} = await assessPrincipleAlignmentPrompt(input);
    return output!;
  }
);
