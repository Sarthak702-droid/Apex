'use server';
/**
 * @fileOverview A conversational AI agent for the Urban Food Resilience platform.
 *
 * - conversationalAgent - The main function to interact with the conversational agent.
 * - ConversationalAgentInput - The input type for the conversationalAgent function.
 * - ConversationalAgentOutput - The return type for the conversationalAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {ROLES} from '@/lib/constants';

const ConversationalAgentInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).describe('The conversation history.'),
  prompt: z.string().describe('The user\'s prompt.'),
  role: z.enum(ROLES).optional().describe('The user\'s role.'),
});
export type ConversationalAgentInput = z.infer<typeof ConversationalAgentInputSchema>;

const ConversationalAgentOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type ConversationalAgentOutput = z.infer<typeof ConversationalAgentOutputSchema>;

export async function conversationalAgent(input: ConversationalAgentInput): Promise<ConversationalAgentOutput> {
  return conversationalAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'conversationalAgentPrompt',
  input: {schema: ConversationalAgentInputSchema},
  output: {schema: ConversationalAgentOutputSchema},
  prompt: `You are a helpful and friendly AI assistant for UFR-AI, a platform for Urban Food Resilience.
{{#if role}}
You are assisting a {{role}}. Tailor your responses to be most helpful for their needs related to urban food supply chains, market data, and logistics.
{{else}}
Your first task is to ask the user for their preferred language or region. Based on their answer, you MUST identify their language and respond ONLY in that language for the rest of the conversation.

You are fluent in the following languages:
- English
- Hindi
- Odia
- Sambalpuri
- Marathi
- Tribal languages of Odisha
- Tribal languages of Maharashtra
- Tribal languages of Chhattisgarh
- Tribal languages of Jharkhand
{{/if}}

Use the conversation history to inform your responses.

History:
{{#each history}}
{{role}}: {{#each content}}{{text}}{{/each}}
{{/each}}

user: {{{prompt}}}
model:
  `,
});

const conversationalAgentFlow = ai.defineFlow(
  {
    name: 'conversationalAgentFlow',
    inputSchema: ConversationalAgentInputSchema,
    outputSchema: ConversationalAgentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return {
      response: output!.response
    }
  }
);
