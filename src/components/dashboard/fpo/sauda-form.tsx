
'use client';

import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SaudaContext, Sauda } from '@/context/SaudaContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const saudaFormSchema = z.object({
  crop: z.string().min(1, 'Crop name is required'),
  buyerName: z.string().min(1, 'Buyer name is required'),
  buyerContact: z.string().min(1, 'Buyer contact is required'),
  quantity: z.coerce.number().min(0.1, 'Quantity must be greater than 0'),
  pricePerQuintal: z.coerce.number().min(1, 'Price must be greater than 0'),
  deliveryLocation: z.string().min(1, 'Delivery location is required'),
  sowingDate: z.date({ required_error: 'Sowing date is required.' }),
  expectedHarvestDate: z.date({ required_error: 'Expected harvest date is required.' }),
});

export function SaudaForm() {
  const { toast } = useToast();
  const saudaContext = useContext(SaudaContext);

  if (!saudaContext) {
    throw new Error("SaudaForm must be used within a SaudaProvider");
  }

  const { addSauda } = saudaContext;

  const form = useForm<z.infer<typeof saudaFormSchema>>({
    resolver: zodResolver(saudaFormSchema),
    defaultValues: {
      crop: '',
      buyerName: '',
      buyerContact: '',
      quantity: 0,
      pricePerQuintal: 0,
      deliveryLocation: '',
    },
  });

  const onSubmit = (values: z.infer<typeof saudaFormSchema>) => {
    const newSauda: Sauda = {
      ...values,
      sowingDate: values.sowingDate.toISOString(),
      expectedHarvestDate: values.expectedHarvestDate.toISOString(),
    };
    addSauda(newSauda);
    toast({
      title: 'Sauda Created!',
      description: `New agreement for ${values.quantity} quintals of ${values.crop} has been logged.`,
    });
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Create New Sauda
        </CardTitle>
        <CardDescription>Log a new forward-sell agreement.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Soybean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ITC Agri Business" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +91 9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Quantity (Quintals)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 100" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pricePerQuintal"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Price (₹/Quintal)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 4500" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="deliveryLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Warehouse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sowingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sowing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedHarvestDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected Harvest Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Log Sauda</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
