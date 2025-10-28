'use server';
/**
 * @fileOverview Provides AI-driven insights for the Municipalities Corporation dashboard.
 *
 * - getDashboardInsights - A function that retrieves insights based on a user query.
 * - AIInsightInput - The input type for the getDashboardInsights function.
 * - AIInsightOutput - The return type for the getDashboardInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AIInsightInputSchema = z.object({
  query: z.string().describe('The natural language query from the user.'),
});
export type AIInsightInput = z.infer<typeof AIInsightInputSchema>;

const KeyMetricSchema = z.object({
  label: z.string().describe('The label for the metric.'),
  value: z.string().describe('The value of the metric.'),
  change: z.string().optional().describe('The change from the previous period (e.g., "+5.2%").'),
});

const ChartDataPointSchema = z.object({
  name: z.string().describe('The label for the data point (e.g., a date, a category).'),
  value: z.number().describe('The numerical value of the data point.'),
});

const ChartSchema = z.object({
  type: z.enum(['bar', 'line', 'pie']).describe('The type of chart to display.'),
  title: z.string().describe('The title of the chart.'),
  data: z.array(ChartDataPointSchema).describe('The data points for the chart.'),
});

const AIInsightOutputSchema = z.object({
  title: z.string().describe('A concise title for the generated insight report.'),
  summary: z.string().describe('A text summary of the findings, answering the user\'s query.'),
  keyMetrics: z.array(KeyMetricSchema).optional().describe('A list of key metrics to highlight.'),
  charts: z.array(ChartSchema).optional().describe('A list of charts to visualize the data.'),
  recommendations: z.array(z.string()).optional().describe('A list of actionable recommendations.'),
});
export type AIInsightOutput = z.infer<typeof AIInsightOutputSchema>;


export async function getDashboardInsights(input: AIInsightInput): Promise<AIInsightOutput> {
    // In a real application, you would fetch real data from your database here based on the query.
    // For this demo, we are providing comprehensive mock data to the model.
    const mockData = {
        foodSecurityScore: 72,
        activeAlerts: 3,
        avgSupplyKg: 4500,
        monitoredZones: 5,
        supplyByCommodity: [
            { commodity: 'Rice', supply: 5200, demand: 4800, wastage: 2.3 },
            { commodity: 'Wheat', supply: 4100, demand: 4000, wastage: 1.8 },
            { commodity: 'Tomatoes', supply: 1200, demand: 2000, wastage: 18.7 },
            { commodity: 'Onions', supply: 3000, demand: 3200, wastage: 8.1 },
            { commodity: 'Potatoes', supply: 3800, demand: 3500, wastage: 5.5 },
        ],
        supplyByZone: [
            { zone: 'Zone A', supply: 8000, alerts: 1, status: 'Warning' },
            { zone: 'Zone B', supply: 9500, alerts: 0, status: 'Stable' },
            { zone: 'Zone C', supply: 6200, alerts: 2, status: 'Critical' },
        ]
    };

    return getDashboardInsightsFlow({ query: input.query, mockData });
}

const getDashboardInsightsFlow = ai.defineFlow(
  {
    name: 'getDashboardInsightsFlow',
    inputSchema: z.object({
      query: z.string(),
      mockData: z.any(),
    }),
    outputSchema: AIInsightOutputSchema,
  },
  async ({ query, mockData }) => {
    const prompt = `
      You are an AI analyst for a city's food resilience dashboard. Your task is to respond to a user's query by analyzing the provided real-time data and generating a structured, insightful report in JSON format.

      User Query: "${query}"

      Available Data (JSON):
      ${JSON.stringify(mockData, null, 2)}

      Based on the user's query and the available data, generate a response that includes:
      1.  **title**: A clear, descriptive title for the report.
      2.  **summary**: A concise narrative that directly answers the user's query, highlighting the most important findings from the data.
      3.  **keyMetrics**: (Optional) A list of 2-4 crucial metrics that are most relevant to the query. Include the label, value, and any notable change.
      4.  **charts**: (Optional) One or two simple charts ('bar', 'line', or 'pie') that visually represent the key data related to the query. For each chart, provide a title and the data points.
      5.  **recommendations**: (Optional) A list of 2-3 actionable recommendations based on your analysis.

      IMPORTANT:
      - Your entire response must be a single, valid JSON object that strictly adheres to the output schema.
      - Do not include any text or formatting outside of the JSON object.
      - If the query is about "food security risks", focus on supply vs. demand gaps, price volatility, and alerts. Create charts for commodity wastage and supply status by zone.
      - If the query is about "supply disruptions", analyze supply levels vs. demand and identify commodities with the largest deficits. Create a bar chart showing supply vs. demand.
    `;
    
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      config: {
        output: { schema: AIInsightOutputSchema, format: 'json' },
      },
    });

    const output = llmResponse.output;
    if (!output) {
      throw new Error('Failed to generate AI insights.');
    }
    return output;
  }
);
