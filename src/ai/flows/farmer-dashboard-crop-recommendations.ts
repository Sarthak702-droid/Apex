'use server';
/**
 * @fileOverview Provides AI-driven crop recommendations tailored to the farmer's region and current crop prices.
 *
 * - getCropRecommendations - A function that retrieves crop recommendations.
 * - CropRecommendationsInput - The input type for the getCropRecommendations function.
 * - CropRecommendationsOutput - The return type for the getCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationsInputSchema = z.object({
  region: z.string().describe('The region for which to provide crop recommendations.'),
  currentCropPrices: z.string().describe('The current market prices for various crops.'),
  farmSize: z.number().describe('The size of the farm in acres.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  waterAvailability: z.string().describe('The availability of water for irrigation (e.g., high, medium, low).'),
  farmerPreferences: z.string().optional().describe('Any specific crop preferences the farmer may have.'),
});
export type CropRecommendationsInput = z.infer<typeof CropRecommendationsInputSchema>;

const CropRecommendationsOutputSchema = z.object({
  recommendedCrops: z.array(z.string()).describe('A list of recommended crops for the given region and conditions.'),
  reasoning: z.string().describe('The reasoning behind the crop recommendations, considering regional data, crop prices, and farm conditions.'),
  profitabilityInsights: z.string().describe('Insights into the potential profitability of each recommended crop.'),
});
export type CropRecommendationsOutput = z.infer<typeof CropRecommendationsOutputSchema>;

export async function getCropRecommendations(input: CropRecommendationsInput): Promise<CropRecommendationsOutput> {
  return cropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationsPrompt',
  input: {schema: CropRecommendationsInputSchema},
  output: {schema: CropRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides crop recommendations to farmers based on their region, current crop prices, farm size, soil type, water availability, and farmer preferences.\n\nRegion: {{{region}}}\nCurrent Crop Prices: {{{currentCropPrices}}}\nFarm Size: {{{farmSize}}} acres\nSoil Type: {{{soilType}}}\nWater Availability: {{{waterAvailability}}}\nFarmer Preferences: {{{farmerPreferences}}}\n\nBased on this information, recommend the best crops for the farmer to plant and explain your reasoning. Also, provide insights into the potential profitability of each recommended crop.\n\nFormat your output to be valid JSON that matches the schema descriptions provided. Return only the JSON, nothing else. Do not include any introductory or concluding remarks.\n`,
});

const cropRecommendationsFlow = ai.defineFlow(
  {
    name: 'cropRecommendationsFlow',
    inputSchema: CropRecommendationsInputSchema,
    outputSchema: CropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
