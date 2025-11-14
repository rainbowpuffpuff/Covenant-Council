import { config } from 'dotenv';
config();

import '@/ai/flows/assess-principle-alignment.ts';
import '@/ai/flows/generate-agent-opinions.ts';
import '@/ai/flows/summarize-artifact-for-agents.ts';