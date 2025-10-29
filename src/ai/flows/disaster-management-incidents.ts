
'use server';
/**
 * @fileOverview Generates a list of simulated real-time disaster management incidents.
 *
 * - getLiveIncidents - Fetches a list of simulated live incidents.
 * - Incident - The schema for a single incident.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IncidentSchema = z.object({
  type: z.enum(['logistics', 'weather', 'supply', 'traffic']).describe('The category of the incident.'),
  severity: z.enum(['low', 'medium', 'high']).describe('The severity level of the incident.'),
  title: z.string().describe('A concise title for the incident.'),
  zone: z.string().describe('The city zone where the incident is occurring (e.g., "Rasulgarh", "Old Town", "Patia").'),
  description: z.string().describe('A brief description of the incident.'),
});

export type Incident = z.infer<typeof IncidentSchema>;

const IncidentListSchema = z.object({
  incidents: z.array(IncidentSchema).describe('A list of recent incidents.'),
});

export async function getLiveIncidents(): Promise<Incident[]> {
  const result = await liveIncidentGenerationFlow();
  return result.incidents;
}

const liveIncidentGenerationFlow = ai.defineFlow(
  {
    name: 'liveIncidentGenerationFlow',
    outputSchema: IncidentListSchema,
  },
  async () => {
    const prompt = `
      You are a crisis monitoring system for the city of Bhubaneswar, India.
      Your task is to generate a list of 5 to 7 plausible, recent incidents that could impact the urban food supply chain.
      The incidents should be varied in type (logistics, weather, supply, traffic) and severity (low, medium, high).
      Use realistic but brief titles and descriptions.
      Provide your response as a JSON object adhering to the required schema.
    `;

    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      config: {
        output: { schema: IncidentListSchema, format: 'json' },
      },
    });

    if (!output) {
      throw new Error('Failed to generate incidents.');
    }

    return output;
  }
);
