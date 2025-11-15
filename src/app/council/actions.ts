'use server';

import { generateAgentOpinions, type GenerateAgentOpinionsOutput } from '@/ai/flows/generate-agent-opinions';
import { summarizeArtifact } from '@/ai/flows/summarize-artifact-for-agents';
import { z } from 'zod';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const artifactSchema = z.object({
  text: z.string().optional(),
  file: z.instanceof(File).optional(),
})
.superRefine((data, ctx) => {
    const hasText = data.text && data.text.trim().length > 0;
    const hasFile = data.file && data.file.size > 0;

    if (!hasText && !hasFile) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Either text or a file must be provided.",
        });
    }

    if (hasText && hasFile) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Provide either text or a file, not both.",
        });
    }

    if (hasFile) {
        if (data.file!.size > MAX_FILE_SIZE_BYTES) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `File size must be ${MAX_FILE_SIZE_MB}MB or less.`,
                path: ['file'],
            });
        }
        if (!data.file!.type.startsWith('image/')) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Only image files are supported.',
                path: ['file'],
            });
        }
    }
    
    if (hasText) {
        if (data.text!.length < 10 || data.text!.length > 20000) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Artifact text must be between 10 and 20000 characters long.",
                path: ['text'],
            });
        }
    }
});


export type FormState = {
  opinions: GenerateAgentOpinionsOutput | null;
  error: string | null;
  timestamp: number;
};


function toDataURI(buffer: ArrayBuffer, mimeType: string) {
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    let binary = '';
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return `data:${mimeType};base64,${base64}`;
}


export async function processArtifact(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const artifactText = formData.get('artifact') as string | null;
  const artifactFile = formData.get('artifactFile') as File | null;

  const validatedArtifact = artifactSchema.safeParse({ 
    text: artifactText ?? undefined, 
    file: artifactFile ?? undefined 
  });

  if (!validatedArtifact.success) {
    const error = validatedArtifact.error.errors[0];
    return {
      opinions: null,
      error: error.message,
      timestamp: Date.now(),
    };
  }
  
  try {
    const { file, text } = validatedArtifact.data;
    let artifactToAnalyze: string;

    if (file && file.size > 0) {
        const buffer = await file.arrayBuffer();
        const dataUri = toDataURI(buffer, file.type);
        // First, get a description of the image.
        const { summary } = await summarizeArtifact({ artifact: dataUri, mimeType: file.type });
        artifactToAnalyze = summary;
    } else if (text) {
        artifactToAnalyze = text;
    } else {
        // This case should not be reached due to validation, but as a fallback:
        return {
            opinions: null,
            error: 'No artifact provided.',
            timestamp: Date.now(),
        };
    }
    
    // Now, send the text-based artifact to the agents.
    const opinions = await generateAgentOpinions({ artifact: artifactToAnalyze });

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
