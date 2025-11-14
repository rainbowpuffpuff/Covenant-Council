'use server';

import { generateAgentOpinions, type GenerateAgentOpinionsOutput } from '@/ai/flows/generate-agent-opinions';
import { z } from 'zod';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const artifactSchema = z.object({
  text: z.string().optional(),
  file: z.instanceof(File).optional(),
})
.refine(data => data.text || data.file, {
  message: "Either text or a file must be provided.",
})
.refine(data => !(data.text && data.file), {
    message: "Provide either text or a file, not both.",
})
.refine(data => {
    if (!data.file) return true;
    return data.file.size > 0;
}, {
    message: "File cannot be empty.",
    path: ['file']
})
.refine(data => {
    if (!data.file) return true;
    return data.file.size <= MAX_FILE_SIZE_BYTES;
}, {
    message: `File size must be ${MAX_FILE_SIZE_MB}MB or less.`,
    path: ['file']
})
.refine(data => {
    if (data.text) {
        return data.text.length >= 10 && data.text.length <= 5000;
    }
    return true;
}, {
    message: "Artifact text must be between 10 and 5000 characters long.",
    path: ['text']
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
    text: artifactFile && artifactFile.size > 0 ? '' : artifactText, 
    file: artifactFile 
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
    let opinions;
    if (validatedArtifact.data.file && validatedArtifact.data.file.size > 0) {
        const file = validatedArtifact.data.file;
        const buffer = await file.arrayBuffer();
        const dataUri = toDataURI(buffer, file.type);
        opinions = await generateAgentOpinions({ artifact: dataUri, mimeType: file.type });
    } else if (validatedArtifact.data.text) {
        opinions = await generateAgentOpinions({ artifact: validatedArtifact.data.text });
    } else {
        return {
            opinions: null,
            error: 'No artifact provided.',
            timestamp: Date.now(),
        };
    }

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
