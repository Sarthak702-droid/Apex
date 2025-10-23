'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, FilePlus, Landmark } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ROLES } from '@/lib/constants';

const schemeSchema = z.object({
  schemeName: z.string().min(3, 'Scheme name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  targetAudience: z.string().min(1, 'Please select a target audience.'),
  targetRegion: z.string().min(2, 'Target region is required.'),
  benefits: z.string().min(10, 'Benefits description is required.'),
  startDate: z.date({ required_error: 'Start date is required.' }),
  endDate: z.date({ required_error: 'End date is required.' }),
});

export default function NewSchemeForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schemeSchema>>({
    resolver: zodResolver(schemeSchema),
    defaultValues: {
      schemeName: '',
      description: '',
      targetAudience: '',
      targetRegion: '',
      benefits: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schemeSchema>) => {
    console.log(values);
    toast({
      title: 'Scheme Created Successfully!',
      description: `The scheme "${values.schemeName}" has been launched.`,
    });
    router.push('/dashboard/government');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
          <Landmark className="h-7 w-7 text-primary" />
          Create New Government Scheme
        </CardTitle>
        <CardDescription>
          Define and launch a new scheme to support the agricultural community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="schemeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheme Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., National Mission on Oilseeds" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Region</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., All India, or specific state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheme Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Provide a detailed description of the scheme, its goals, and objectives." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits & Subsidies</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Detail the financial and non-financial benefits, subsidies, and support offered." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select target group" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Farmer">Farmers</SelectItem>
                                <SelectItem value="FPO">FPOs</SelectItem>
                                <SelectItem value="All">All</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={'outline'}
                                className={cn('justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={'outline'}
                                className={cn('justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="flex justify-end gap-4 !mt-8">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Launch Scheme
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
