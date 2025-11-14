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

const GenerateAgentOpinionsInputSchema = z.object({
  artifact: z.string().describe('The artifact submitted by the user. This can be text, or a data URI for an image or video.'),
  mimeType: z.string().optional().describe('The MIME type of the artifact, if it is a file.'),
});
export type GenerateAgentOpinionsInput = z.infer<typeof GenerateAgentOpinionsInputSchema>;

const GenerateAgentOpinionsOutputSchema = z.object({
  opinions: z.array(
    z.object({
      principle: z.string().describe('The Covenant principle embodied by the agent.'),
      opinion: z.string().describe('The opinion of the agent on the artifact.'),
      alignmentScore: z.number().optional().describe('Optional alignment score of the artifact with the principle.'),
    })
  ).describe('An array of opinions from the 10 AI agents.'),
});
export type GenerateAgentOpinionsOutput = z.infer<typeof GenerateAgentOpinionsOutputSchema>;

export async function generateAgentOpinions(input: GenerateAgentOpinionsInput): Promise<GenerateAgentOpinionsOutput> {
  return generateAgentOpinionsFlow(input);
}

const covenantPrinciples = [
  'Universal Personhood: Your status as a person is neither issued nor revoked by any institution – it is inherent.',
  'Inalienable Ownership: To own oneself is to own one’s keys, that are yours and yours only.',
  'Privacy by Default: Encryption safeguards self-determination.',
  'Free flow of Information: Open source the collective imagination with open data networks.',
  'Free flow of Capital: Open source the collective imagination with open data networks.',
  'Capital Serves Public Goods: Public goods are the greatest basins for capital flow.',
  'Universal Security: To act freely, one must be secure against key loss, surveillance, and intrusion.',
  'Voluntary Accountability: Consent fosters cooperation; accountability prevents exploitation.',
  'Earth Public Goods: The digital realm and physical world are intertwined.',
  'A Covenant of Adaptive Resilience: Networks must empower human agency, not collude with power.',
];

const agentOpinionPrompt = ai.definePrompt({
  name: 'agentOpinionPrompt',
  input: {
    schema: z.object({
      artifact: z.string().describe("The artifact submitted by the user. Can be text or a data URI if it's a file."),
      principle: z.string().describe('The Covenant principle embodied by the agent.'),
      isMedia: z.boolean().describe('Whether the artifact is media or text.'),
    }),
  },
  output: {
    schema: z.object({
      opinion: z.string().describe('The opinion of the agent on the artifact.'),
    }),
  },
  prompt: `You are a member of a council of wise, thoughtful individuals. You are not an AI.
Your guiding principle is: "{{{principle}}}"

You have been presented with an artifact for your consideration. Please offer your personal opinion on it, speaking in a natural, human-like voice. Your response should be a direct reflection of your unique perspective, shaped by your principle. Avoid formal, robotic language.

Artifact:
{{#if isMedia}}
{{media url=artifact}}
{{else}}
"{{{artifact}}}"
{{/if}}

Based on your principle, what is your opinion on this artifact?`,
});

const assessAlignmentTool = ai.defineTool({
  name: 'assessAlignment',
  description: 'Assesses the degree to which the artifact aligns with the principle.',
  inputSchema: z.object({
    artifact: z.string().describe('The artifact submitted by the user.'),
    principle: z.string().describe('The Covenant principle.'),
  }),
  outputSchema: z.number().describe('The alignment score (0-100).'),
},
async (input) => {
  // Placeholder implementation for alignment assessment.
  // In a real application, this would involve a more sophisticated analysis.
  return Math.floor(Math.random() * 101);
});

const generateAgentOpinionsFlow = ai.defineFlow(
  {
    name: 'generateAgentOpinionsFlow',
    inputSchema: GenerateAgentOpinionsInputSchema,
    outputSchema: GenerateAgentOpinionsOutputSchema,
  },
  async input => {
    const opinions = await Promise.all(
      covenantPrinciples.map(async principle => {
        const isMedia = input.mimeType?.startsWith('image/') || input.mimeType?.startsWith('video/');
        
        const {output} = await agentOpinionPrompt({
          artifact: input.artifact,
          principle,
          isMedia: !!isMedia,
        });

        // Decide whether to use the alignment tool.
        const alignmentScore = Math.random() < 0.5 ? await assessAlignmentTool({artifact: input.artifact, principle}) : undefined;

        return {
          principle,
          opinion: output!.opinion,
          alignmentScore,
        };
      })
    );

    return {opinions};
  }
);
