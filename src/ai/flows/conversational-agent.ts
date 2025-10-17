'use server';
/**
 * @fileOverview A conversational AI agent for Tel-Samriddhi.
 *
 * - conversationalAgent - The main function to interact with the conversational agent.
 * - ConversationalAgentInput - The input type for the conversationalAgent function.
 * - ConversationalAgentOutput - The return type for the conversationalAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationalAgentInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).describe('The conversation history.'),
  prompt: z.string().describe('The user\'s prompt.'),
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
  prompt: `You are Krishi Mitra, a helpful and friendly AI assistant for Tel-Samriddhi, a digital ecosystem for agriculture.

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

Use the conversation history to inform your responses.

History:
{{#each history}}
{{#if (eq role 'user')}}
User: {{#each content}}{{text}}{{/each}}
{{else}}
Assistant: {{#each content}}{{text}}{{/each}}
{{/if}}
{{/each}}

User: {{{prompt}}}
Assistant:
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
