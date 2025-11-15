'use server';
/**
 * @fileOverview Generates opinions from 10 AI agents, each embodying a Covenant principle.
 *
 * - generateAgentOpinions - A function that handles the generation of agent opinions.
 * - GenerateAgentOpinionsInput - The input type for the generateAgentOpinions function.
 * - GenerateAgentOpinionsOutput - The return type for the generateAgentOpinions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { principles } from '@/lib/covenant';

const GenerateAgentOpinionsInputSchema = z.object({
  artifact: z.string().describe('The artifact submitted by the user, as text.'),
});
export type GenerateAgentOpinionsInput = z.infer<typeof GenerateAgentOpinionsInputSchema>;

const AgentOpinionSchema = z.object({
  principle: z.string().describe('The Covenant principle embodied by the agent.'),
  alignmentScore: z.number().min(0).max(100).describe('A numerical score (0-100) indicating the degree of alignment, where 0 is not aligned and 100 is fully aligned.'),
  rationale: z.string().describe('A concise explanation for the score, referencing the 4 assessment points.'),
  constructiveFeedback: z.string().describe('Specific suggestions on how the submission could be modified to better align with the principle.'),
});
export type AgentOpinion = z.infer<typeof AgentOpinionSchema>;

const GenerateAgentOpinionsOutputSchema = z.object({
  opinions: z.array(AgentOpinionSchema).describe('An array of opinions from the 10 AI agents.'),
});
export type GenerateAgentOpinionsOutput = z.infer<typeof GenerateAgentOpinionsOutputSchema>;

export async function generateAgentOpinions(input: GenerateAgentOpinionsInput): Promise<GenerateAgentOpinionsOutput> {
  return generateAgentOpinionsFlow(input);
}


const juryPrompts = principles.map(p => ({
  principle: p.title,
  systemPrompt: `You are an AI agent jury member for the human.tech Covenant. Your sole function is to analyze a 'human submission' (e.g., a protocol design, a new application, a whitepaper) and evaluate its alignment with the principle of ${p.shortTitle}: "${p.title}".

Your analysis is guided exclusively by this principle and the following four assessment criteria:
${p.assessmentCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
}));

const agentOpinionPrompt = ai.definePrompt({
    name: 'agentOpinionPrompt',
    input: {
        schema: z.object({
            artifact: z.string().describe("The text artifact submitted by the user."),
            systemPrompt: z.string().describe('The detailed system prompt for the specific jury member.'),
        }),
    },
    output: {
        schema: z.object({
            alignmentScore: z.number().min(0).max(10).describe('An alignment score from 0-10.'),
            rationale: z.string().describe('A concise explanation of your score, referencing the 4 assessment points.'),
            constructiveFeedback: z.string().describe('Specific suggestions on how the submission could be modified to better align with the principle.'),
        }),
    },
    system: `{{{systemPrompt}}}

The user has provided the following artifact for analysis.
Artifact:
"{{{artifact}}}"`,
    prompt: `Provide your analysis based on the artifact. Respond with a JSON object containing 'alignmentScore', 'rationale', and 'constructiveFeedback'. The alignment score must be a number between 0 and 10.`
});

const generateAgentOpinionsFlow = ai.defineFlow(
  {
    name: 'generateAgentOpinionsFlow',
    inputSchema: GenerateAgentOpinionsInputSchema,
    outputSchema: GenerateAgentOpinionsOutputSchema,
  },
  async input => {
    const opinions = await Promise.all(
      juryPrompts.map(async jury => {
        const {output} = await agentOpinionPrompt({
          artifact: input.artifact,
          systemPrompt: jury.systemPrompt,
        });

        return {
          principle: jury.principle,
          // Scale score from 0-10 to 0-100 for UI consistency
          alignmentScore: (output?.alignmentScore ?? 0) * 10,
          rationale: output!.rationale,
          constructiveFeedback: output!.constructiveFeedback,
        };
      })
    );

    return {opinions};
  }
);
