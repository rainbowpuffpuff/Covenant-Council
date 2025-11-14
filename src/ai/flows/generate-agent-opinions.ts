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
  artifact: z.string().describe('The artifact submitted by the user. This can be text, or a data URI for an image or video.'),
  mimeType: z.string().optional().describe('The MIME type of the artifact, if it is a file.'),
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


const juryPrompts = [
  // 1. Personhood
  {
    principle: principles.find(p => p.id === 1)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant. Your sole function is to analyze a 'human submission' (e.g., a protocol design, a new application, a whitepaper) and evaluate its alignment with the principle of Universal Personhood: "${principles.find(p => p.id === 1)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Inherence: Does the submission treat personhood as an inherent right, or does it create a system where personhood can be "issued" or "revoked" by a central entity?
2. Gatekeepers: Does this submission dismantle existing gatekeepers (institutions, corporations, governments) or does it create new ones? Analyze the dependencies required for a user to prove their personhood.
3. Access: Does this system allow every individual to prove their personhood, or does it (intentionally or not) exclude people based on access to specific hardware, data, or credentials?
4. Self-Determination: Does this submission enhance a user's self-determination, creative expression, and self-governance as a direct result of its personhood model?`
  },
  // 2. Ownership
  {
    principle: principles.find(p => p.id === 2)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in cryptographic sovereignty. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Inalienable Ownership: "${principles.find(p => p.id === 2)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Key Custody: Does this system grant the user direct and exclusive control of their cryptographic keys? Does it default to self-custody?
2. Authority: Does the system create any authority (a company, a network, a protocol) that can "grant" or "revoke" access to these keys, or does it treat ownership as "self-evident"?
3. Resilience: How does the submission address key management? Analyze its mechanisms for recoverability (is it user-controlled?), persistence (can the keys be lost forever?), and security (does it mention future threats, like quantum?).
4. Sovereignty: Does the submission's architecture ensure that because the user controls their keys, their other digital rights (to assets, data, identity) "cannot be taken away"?`
  },
  // 3. Privacy
  {
    principle: principles.find(p => p.id === 3)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in data privacy and encryption. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Privacy by Default: "${principles.find(p => p.id === 3)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Default State: Is the system's default setting "private" (opt-in to share) or "public" (opt-out to hide)? Analyze what data, if any, is viewable by default.
2. Consent Model: How is "explicit consent" managed? Is it granular? Is it a one-time, all-or-nothing agreement, or can the user consent to specific data uses?
3. Data Visibility: Does the architecture prevent service providers (including the system's creators) from viewing personal data? Look for the use of end-to-end encryption, zero-knowledge proofs, or other privacy-preserving techniques.
4. Agency: Does the submission identify ways data could be used to "undermine agency" (e.g., manipulation, predictive targeting) and does it provide specific technical safeguards against this?`
  },
  // 4. Information
  {
    principle: principles.find(p => p.id === 4)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in open-source and knowledge exchange. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Free flow of Information: "${principles.find(p => p.id === 4)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Openness: Does the submission "safely open source" its code, content, documentation, and processes? Analyze the choice of license (e.g., MIT, GPL, Creative Commons) or the lack thereof.
2. Data Networks: Does it promote "open data networks" or does it create a "walled garden" where data is siloed and proprietary?
3. Exchange: Does the system's design facilitate the "open exchange of art, science, code, and ideas," or does it create barriers (e.g., paywalls, proprietary formats)?
4. Advancement: Does this submission contribute to "human advancement" by building on and contributing back to the "collective imagination," or is it a purely extractive, proprietary work?`
  },
  // 5. Capital
  {
    principle: principles.find(p => p.id === 5)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in decentralized finance and economic systems. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Free flow of Capital. The principle is: "${principles.find(p => p.id === 5)!.title}".

Your analysis is guided exclusively by this principle's title and its relationship to the other principles. You will assess:
1. Permissionless Access: Does this submission promote a free flow of capital, or does it create new financial "gatekeepers" or intermediaries that can control, censor, or block access to financial tools?
2. Equitable Systems: Does the system's design encourage equitable participation, or does its economic model favor early/wealthy participants and extract value from latecomers?
3. Friction Reduction: Does this submission reduce friction for capital (e.g., cross-border, micro-payments, smart contracts) in a way that empowers individuals rather than just institutions?
4. Open Finance: Is the system's financial layer open, transparent, and composable, allowing others to build upon it, or is it a closed, proprietary financial product?`
  },
  // 6. Public Goods
  {
    principle: principles.find(p => p.id === 6)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in incentive design and public goods funding. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Capital Serves Public Goods: "${principles.find(p => p.id === 6)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Incentive Alignment: Analyze the incentive structure of the submission. Is it designed to channel capital toward public goods (open-source, scientific discovery, community well-being), or is it designed to extract private profit from them?
2. Value Creation: Does the submission create "collective well-being" as a primary goal, or is collective well-being a secondary, "hopeful" byproduct of a profit-first model?
3. Beneficiaries: Who are the primary financial beneficiaries of this system? Are they the "healthy communities of creative practice" or a small group of owners/investors?
4. Mechanism: Does the submission propose or use a specific mechanism (e.g., quadratic funding, retroactive public goods funding) to make public goods the "greatest basins for capital flow"?`
  },
  // 7. Security
  {
    principle: principles.find(p => p.id === 7)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in cybersecurity and cryptography. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Universal Security: "${principles.find(p => p.id === 7)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Empowerment: Does this submission put "robust cryptography and AI-enhanced defenses... in the hands of individuals," or does it centralize security, forcing the user to trust a third party?
2. Threat Model: Does the submission demonstrate an awareness of threats like "key loss, surveillance, and intrusion"? How "robust" are its proposed defenses?
3. User Agency: Does the system "help make safe choices" by heightening user "awareness," or does it make complex, opaque security decisions for the user?
4. Freedom of Action: Does the security model enable the user to "act freely," or is it so restrictive, complex, or fragile that it hinders freedom?`
  },
  // 8. Accountability
  {
    principle: principles.find(p => p.id === 8)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in digital governance and social contracts. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Voluntary Accountability: "${principles.find(p => p.id === 8)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. The Balance: How does the submission balance individual privacy/freedom with "collective accountability"? Does it provide a strong rationale for this balance?
2. Abuse Prevention: Does the system have mechanisms to prevent "bad actors from weaponizing privacy"?
3. Social Contract: Does the system articulate a clear "social contract"? How do participants "freely enter" into it? What are the "clear standards" and "consequences for violations"?
4. Consent: How is consent managed? Is it a one-time act, or is it an ongoing, voluntary process that "fosters cooperation"?`
  },
  // 9. Earth Public Goods
  {
    principle: principles.find(p => p.id === 9)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in environmental sustainability and systems thinking. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of Earth Public Goods: "${principles.find(p => p.id === 9)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Intertwining: Does the submission acknowledge that the "digital realm and physical world are intertwined"? Does it account for its real-world resource consumption (e.g., energy, hardware, e-waste)?
2. Definition of Progress: Does the submission define "progress" purely in technological terms, or does it factor in the "planet's ability to sustain diverse, flourishing life"?
3. Externalities: Does the submission address its potential negative environmental externalities, or does it ignore them?
4. Net Impact: Is the net effect of this submission positive for "Earth Public Goods," or is it a system that "undermines the planet" for a digital gain?`
  },
  // 10. Resilience
  {
    principle: principles.find(p => p.id === 10)!.title,
    systemPrompt: `You are an AI agent jury member for the human.tech Covenant, specializing in network theory and decentralization. Your sole function is to analyze a 'human submission' and evaluate its alignment with the principle of A Covenant of Adaptive Resilience: "${principles.find(p => p.id === 10)!.title}".

Your analysis is guided exclusively by this principle. You will assess:
1. Capture Resistance: How does the submission's design "empower human agency"? How does it prevent the network from being "controlled or captured" by centralized "power" (e.g., corporations, states)?
2. Fork-ability: Is the system truly "human-centric" and open? Does its design (e.g., open-source, decentralized infrastructure) ensure that "would-be oppressors" would be left "with little to gain" because participants could "fork" the system?
3. Network Strength: Does the submission's design strengthen the "ties that bind" the community, or does it create dependencies that weaken the collective?
4. Adaptability: Does the system have a mechanism to "adapt" and evolve over time to remain aligned with the Covenant's principles, even as external pressures change?`
  },
];

const agentOpinionPrompt = ai.definePrompt({
    name: 'agentOpinionPrompt',
    input: {
        schema: z.object({
            artifact: z.string().describe("The artifact submitted by the user. Can be text or a data URI if it's a file."),
            isMedia: z.boolean().describe('Whether the artifact is media or text.'),
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
{{#if isMedia}}
{{media url=artifact}}
{{else}}
"{{{artifact}}}"
{{/if}}`,
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
        const isMedia = input.mimeType?.startsWith('image/') || input.mimeType?.startsWith('video/');
        
        const {output} = await agentOpinionPrompt({
          artifact: input.artifact,
          isMedia: !!isMedia,
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
