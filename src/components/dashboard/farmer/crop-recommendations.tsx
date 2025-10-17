'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  getCropRecommendations,
  CropRecommendationsInput,
  CropRecommendationsOutput,
} from '@/ai/flows/farmer-dashboard-crop-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wheat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  region: z.string().min(1, 'Region is required.'),
  farmSize: z.coerce.number().min(0.1, 'Farm size must be positive.'),
  soilType: z.string().min(1, 'Soil type is required.'),
  waterAvailability: z.string().min(1, 'Water availability is required.'),
  farmerPreferences: z.string().optional(),
});

const CropRecommendations = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendationsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: 'Telangana',
      farmSize: 10,
      soilType: 'Red Sandy Loam',
      waterAvailability: 'Medium',
      farmerPreferences: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setRecommendations(null);

    const input: CropRecommendationsInput = {
      ...values,
      // Mocking current crop prices as the AI flow requires it
      currentCropPrices: 'Cotton: ₹6000/quintal, Rice: ₹2000/quintal, Maize: ₹1800/quintal, Soybean: ₹4500/quintal',
    };

    try {
      const result = await getCropRecommendations(input);
      setRecommendations(result);
      toast({
        title: 'Recommendations Generated!',
        description: 'AI has analyzed your farm data.',
      });
    } catch (error) {
      console.error('Error getting crop recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate crop recommendations. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            AI Crop Recommender
          </CardTitle>
          <CardDescription>
            Fill in your farm details to get personalized, AI-driven crop recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="region" render={({ field }) => (
                  <FormItem><FormLabel>Region</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="farmSize" render={({ field }) => (
                  <FormItem><FormLabel>Farm Size (acres)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="soilType" render={({ field }) => (
                  <FormItem><FormLabel>Soil Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="waterAvailability" render={({ field }) => (
                  <FormItem><FormLabel>Water Availability</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="farmerPreferences" render={({ field }) => (
                <FormItem><FormLabel>Preferences (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., prefer low-water crops" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center">
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">AI is analyzing your data...</p>
            </motion.div>
          )}
          {recommendations && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <Card className="bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline">Your AI-Powered Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Recommended Crops:</h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.recommendedCrops.map(crop => (
                        <Badge key={crop} variant="secondary" className="text-base flex items-center gap-2 py-1 px-3">
                          <Wheat className="h-4 w-4" />
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reasoning:</h3>
                    <p className="text-sm text-muted-foreground">{recommendations.reasoning}</p>
                  </div>
                   <div>
                    <h3 className="font-semibold mb-2">Profitability Insights:</h3>
                    <p className="text-sm text-muted-foreground">{recommendations.profitabilityInsights}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CropRecommendations;
