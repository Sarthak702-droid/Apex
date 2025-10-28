
'use server';

/**
 * @fileOverview AI-based quality reports on produce for buyers.
 *
 * - generateAIQualityReport - A function that generates the AI quality report.
 * - AIQualityReportInput - The input type for the generateAIQualityReport function.
 * - AIQualityReportOutput - The return type for the generateAIQualityReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIQualityReportInputSchema = z.object({
  produceName: z.string().describe('The name of the produce.'),
  produceDescription: z.string().describe('The description of the produce.'),
  imageUri: z.string().describe("A photo of the produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type AIQualityReportInput = z.infer<typeof AIQualityReportInputSchema>;

const AIQualityReportOutputSchema = z.object({
  qualityScore: z.number().describe('A score from 0 to 1 indicating the overall quality of the produce.'),
  report: z.string().describe('A detailed report on the quality of the produce, including any defects or issues.'),
});
export type AIQualityReportOutput = z.infer<typeof AIQualityReportOutputSchema>;

export async function generateAIQualityReport(input: AIQualityReportInput): Promise<AIQualityReportOutput> {
  return generateAIQualityReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiQualityReportPrompt',
  input: {schema: AIQualityReportInputSchema},
  output: {schema: AIQualityReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating quality reports for produce.

  Analyze the following information to generate a quality report, including a quality score and a detailed description of the produce's quality.

  Produce Name: {{{produceName}}}
  Description: {{{produceDescription}}}
  Image: {{media url=imageUri}}

  Provide a quality score between 0 and 1 and generate the report based on the provided information, including any potential defects or issues.
  The quality score and report description must be comprehensive.
  Ensure that the output is in a well-structured JSON format.
  `,
});

const generateAIQualityReportFlow = ai.defineFlow(
  {
    name: 'generateAIQualityReportFlow',
    inputSchema: AIQualityReportInputSchema,
    outputSchema: AIQualityReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
