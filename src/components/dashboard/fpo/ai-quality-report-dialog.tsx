
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Bot, Sparkles, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateAIQualityReport } from '@/ai/flows/buyer-dashboard-ai-quality-reports';
import type { Sauda } from '@/context/SaudaContext';

type AIQualityReportDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  sauda: Sauda;
};

export function AIQualityReportDialog({ isOpen, onOpenChange, sauda }: AIQualityReportDialogProps) {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ qualityScore: number; report: string } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateReport = async () => {
    if (!imageFile) {
      toast({
        variant: 'destructive',
        title: 'Image Required',
        description: 'Please upload an image of the produce.',
      });
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
            const imageUri = reader.result as string;
            const reportResult = await generateAIQualityReport({
                produceName: sauda.crop,
                produceDescription: description,
                imageUri: imageUri,
            });
            setResult(reportResult);
        };
    } catch (err) {
      console.error(err);
      toast({
        variant: 'destructive',
        title: 'Error Generating Report',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setLoading(false);
  }

  const handleDialogStateChange = (open: boolean) => {
    if(!open) {
        resetState();
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogStateChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Quality Report Generator
          </DialogTitle>
          <DialogDescription>
            Generate an AI-powered quality assessment for your harvested produce ({sauda.crop}).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload" className="font-semibold">Upload Produce Image</Label>
              <div className="mt-2 aspect-video border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden">
                {imagePreview ? (
                    <img src={imagePreview} alt="Produce Preview" className="h-full w-full object-cover" />
                ) : (
                    <div className="text-center text-muted-foreground p-4">
                        <Upload className="mx-auto h-8 w-8" />
                        <p className="mt-2 text-sm">Click to upload or drag & drop</p>
                    </div>
                )}
                <Input id="image-upload" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="font-semibold">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder={`e.g., "Harvested today, uniform size, minor blemishes on <5% of batch."`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-center mb-4">Generated Report</h4>
            <div className="bg-secondary/50 rounded-lg p-4 flex-grow flex items-center justify-center">
              {loading && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>AI is analyzing the image...</p>
                </div>
              )}
              {!loading && !result && (
                <div className="text-center text-muted-foreground">
                    <Sparkles className="mx-auto h-8 w-8" />
                    <p className="mt-2">Your report will appear here.</p>
                </div>
              )}
              {result && (
                <div className="space-y-4 text-sm">
                    <div>
                        <Label className="font-bold text-base">Quality Score</Label>
                        <p className="text-3xl font-bold text-primary">{result.qualityScore.toFixed(2)} / 1.00</p>
                    </div>
                    <div>
                        <Label className="font-bold text-base">AI Assessment</Label>
                        <p className="text-muted-foreground">{result.report}</p>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleGenerateReport} disabled={loading || !imageFile}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
