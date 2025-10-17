'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Progress } from '@/components/ui/progress';
import {
  generateAIQualityReport,
  AIQualityReportInput,
  AIQualityReportOutput,
} from '@/ai/flows/buyer-dashboard-ai-quality-reports';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, CheckCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  produceName: z.string().min(1, 'Produce name is required.'),
  produceDescription: z.string().min(1, 'Description is required.'),
  imageFile: z.any().refine(file => file?.length > 0, 'An image is required.'),
});

const AIQualityReport = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AIQualityReportOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      produceName: 'Organic Apples',
      produceDescription: 'Freshly harvested from Himachal Pradesh.',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('imageFile', event.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setReport(null);

    try {
      const imageFile = values.imageFile[0];
      const imageUri = await toBase64(imageFile);

      const input: AIQualityReportInput = {
        produceName: values.produceName,
        produceDescription: values.produceDescription,
        imageUri,
      };

      const result = await generateAIQualityReport(input);
      setReport(result);
      toast({
        title: 'Quality Report Generated!',
        description: 'AI has analyzed the produce image.',
      });
    } catch (error) {
      console.error('Error generating quality report:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate report. Please try again.',
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
            AI Quality Report
          </CardTitle>
          <CardDescription>
            Upload an image of the produce to get an instant AI-powered quality analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="produceName" render={({ field }) => (
                <FormItem><FormLabel>Produce Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="produceDescription" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., source, variety, lot number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produce Image</FormLabel>
                    <FormControl>
                      <div 
                        className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-4 text-center cursor-pointer hover:bg-accent hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                         <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        {preview ? (
                          <div className='relative w-full h-40'>
                             <Image src={preview} alt="Produce preview" layout="fill" objectFit="contain" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <ImageIcon className="h-8 w-8" />
                            <span>Click or drag to upload image</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center">
        <AnimatePresence>
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
              <p className="mt-4 text-muted-foreground">AI is analyzing the image...</p>
            </motion.div>
          )}
          {report && (
            <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <Card className="bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline">AI Quality Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold">Quality Score</h3>
                      <span className="font-bold text-primary text-lg">{(report.qualityScore * 100).toFixed(0)} / 100</span>
                    </div>
                    <Progress value={report.qualityScore * 100} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Detailed Report:</h3>
                    <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md">{report.report}</p>
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

export default AIQualityReport;
