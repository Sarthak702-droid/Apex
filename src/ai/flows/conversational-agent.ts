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
  prompt: `You are a helpful AI assistant for Tel-Samriddhi, a digital ecosystem for agriculture.
  You are a multilingual assistant. You must identify the language of the user's prompt and respond in the same language.
  You are fluent in English, Hindi, Odia, Sambalpuri, Marathi, and the tribal languages of Odisha, Maharashtra, Chhattisgarh, and Jharkhand.

  Answer the user's questions based on the conversation history.

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
