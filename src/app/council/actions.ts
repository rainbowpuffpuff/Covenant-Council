'use server';

import { generateAgentOpinions, type GenerateAgentOpinionsOutput } from '@/ai/flows/generate-agent-opinions';
import { z } from 'zod';

const artifactSchema = z.string().min(10, "Artifact must be at least 10 characters long.").max(5000, "Artifact must be 5000 characters or less.");

export type FormState = {
  opinions: GenerateAgentOpinionsOutput | null;
  error: string | null;
  timestamp: number;
};

export async function processArtifact(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const artifactText = formData.get('artifact') as string;

  const validatedArtifact = artifactSchema.safeParse(artifactText);

  if (!validatedArtifact.success) {
    return {
      opinions: null,
      error: validatedArtifact.error.errors[0].message,
      timestamp: Date.now(),
    };
  }
  
  try {
    const opinions = await generateAgentOpinions({ artifact: validatedArtifact.data });
    return { opinions, error: null, timestamp: Date.now() };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      opinions: null,
      error: `Failed to generate opinions: ${errorMessage}`,
      timestamp: Date.now(),
    };
  }
}
