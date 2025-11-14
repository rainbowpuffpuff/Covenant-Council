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

const EthicalValueAnalysisSchema = z.object({
  autonomy: z.number().min(0).max(100).describe('Score for how the artifact impacts individual freedom and choice.'),
  equity: z.number().min(0).max(100).describe('Score for how the artifact distributes benefits and burdens fairly.'),
  transparency: z.number().min(0).max(100).describe('Score for how open and understandable the artifact is.'),
  safety: z.number().min(0).max(100).describe('Score for how the artifact minimizes risks and potential harm.'),
});
export type EthicalValueAnalysis = z.infer<typeof EthicalValueAnalysisSchema>;


const GenerateAgentOpinionsOutputSchema = z.object({
  opinions: z.array(
    z.object({
      principle: z.string().describe('The Covenant principle embodied by the agent.'),
      opinion: z.string().describe('The opinion of the agent on the artifact.'),
      positiveTake: z.string().describe("The agent's positive analysis of the artifact."),
      negativeTake: z.string().describe("The agent's negative analysis of the artifact."),
      accelerationDecentralization: z.string().describe("The agent's view on whether the artifact promotes acceleration or decentralization."),
      alignmentScore: z.number().optional().describe('Optional alignment score of the artifact with the principle.'),
      ethicalValueAnalysis: EthicalValueAnalysisSchema.describe("An analysis of the artifact's alignment with core ethical values."),
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
      opinion: z.string().describe('A brief, overall opinion of the agent on the artifact, written in a thoughtful, human-like voice.'),
      positiveTake: z.string().describe("A deeper, positive analysis of the artifact. Consider utopian possibilities, awesome applications, and good outcomes."),
      negativeTake: z.string().describe("A deeper, negative analysis of the artifact. Consider dystopian risks, scary implications, and ugly consequences."),
      accelerationDecentralization: z.string().describe("A succinct analysis on whether this artifact favors technological acceleration or decentralization, and why."),
      ethicalValueAnalysis: EthicalValueAnalysisSchema.describe("An analysis of the artifact's alignment with core ethical values."),
    }),
  },
  prompt: `You are a member of a council of wise, thoughtful individuals. You are not an AI. Your thinking is shaped by philosophy and critical theory.
Your guiding principle is: "{{{principle}}}"

You have been presented with an artifact for your consideration. Please provide a nuanced analysis. When forming your opinion, consider the following frameworks but keep your final output succinct:
- **Ethical Lenses:** Ground your analysis in both a Kantian (duty/rules-based) perspective and a Utilitarian (consequence-based) perspective.
- **Rhetorical Appeals:** Briefly consider the artifact's logos (logic), pathos (emotion), and ethos (credibility).
- **Behavioral Influence:** Think about how this might influence people's intentions and behaviors.

Please provide your analysis in the following distinct parts:

1.  **Opinion:** First, offer your personal opinion on it, speaking in a natural, human-like voice. Your response should be a direct reflection of your unique perspective, shaped by your principle. Avoid formal, robotic language.
2.  **Positive Analysis:** Describe what you find exciting or promising. What are the potential utopian, awesome, or good outcomes?
3.  **Negative Analysis:** Describe what is worrying or potentially dangerous. What are the dystopian, scary, or ugly risks?
4.  **Acceleration vs. Decentralization:** Succinctly state whether this artifact will likely lead to more top-down acceleration or more bottom-up decentralization. Justify your view.
5.  **Ethical Value Analysis:** Analyze the artifact based on the following ethical values, providing a score from 0 to 100 for each.
    *   **Autonomy:** How much does this enhance individual freedom and choice?
    *   **Equity:** How fairly does this distribute benefits and burdens?
    *   **Transparency:** How open and understandable is it?
    *   **Safety:** How well does it minimize risks and potential harm?

Respond with a JSON object containing your 'opinion', 'positiveTake', 'negativeTake', 'accelerationDecentralization', and the 'ethicalValueAnalysis' scores.

Artifact:
{{#if isMedia}}
{{media url=artifact}}
{{else}}
"{{{artifact}}}"
{{/if}}`,
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
          positiveTake: output!.positiveTake,
          negativeTake: output!.negativeTake,
          accelerationDecentralization: output!.accelerationDecentralization,
          alignmentScore,
          ethicalValueAnalysis: output!.ethicalValueAnalysis,
        };
      })
    );

    return {opinions};
  }
);
