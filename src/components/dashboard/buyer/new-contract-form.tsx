
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';

const contractSchema = z.object({
  crop: z.string().min(1, 'Crop selection is required.'),
  farmerName: z.string().min(1, 'Farmer name is required.'),
  farmerContact: z.string().min(1, 'Farmer contact is required.'),
  quantity: z.coerce.number().min(0.1, 'Quantity must be greater than 0.'),
  pricePerQuintal: z.coerce.number().min(1, 'Price must be greater than 0.'),
  deliveryLocation: z.string().min(1, 'Delivery location is required.'),
});

const crops = [
  'Soybean',
  'Groundnut',
  'Rapeseed',
  'Mustard',
  'Sesame',
  'Sunflower',
  'Castor',
  'Linseed',
  'Nigerseed',
  'Safflower',
];

const NewContractForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [totalValue, setTotalValue] = useState(0);

  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      quantity: 0,
      pricePerQuintal: 0,
      farmerName: '',
      farmerContact: '',
      deliveryLocation: '',
    },
  });

  const { watch, handleSubmit, control } = form;
  const quantity = watch('quantity');
  const pricePerQuintal = watch('pricePerQuintal');

  useEffect(() => {
    const value = (quantity || 0) * (pricePerQuintal || 0);
    setTotalValue(value);
  }, [quantity, pricePerQuintal]);

  const onSubmit = (values: z.infer<typeof contractSchema>) => {
    toast({
      title: 'Contract Proposal Sent!',
      description: `Your proposal for ${values.quantity} quintals of ${values.crop} has been sent to ${values.farmerName}.`,
    });
    router.push('/dashboard/buyer');
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div className="bg-background p-8 rounded-lg shadow-md border-2 border-foreground max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 font-headline tracking-wider">CREATE NEW CONTRACT</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              control={control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">CROP</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-foreground rounded-md text-base">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {crops.map(crop => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="farmerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">FARMER NAME</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter farmer's name" {...field} className="h-12 border-2 border-foreground rounded-md text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="farmerContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">FARMER CONTACT</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone or email" {...field} className="h-12 border-2 border-foreground rounded-md text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">QUANTITY (QUINTALS)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-12 border-2 border-foreground rounded-md text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="pricePerQuintal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">PRICE PER QUINTAL (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-12 border-2 border-foreground rounded-md text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="deliveryLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold tracking-widest">DELIVERY LOCATION</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} className="h-12 border-2 border-foreground rounded-md text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="!mt-10 bg-yellow-400 text-black p-4 flex justify-between items-center border-2 border-foreground rounded-md">
            <span className="font-bold text-lg tracking-wider">TOTAL CONTRACT VALUE:</span>
            <span className="font-bold text-2xl">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="!mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button type="button" onClick={onCancel} variant="outline" className="h-12 border-2 border-foreground rounded-md text-base font-bold tracking-wider">
              CANCEL
            </Button>
            <Button type="submit" className="h-12 border-2 border-foreground bg-green-500 hover:bg-green-600 text-white rounded-md text-base font-bold tracking-wider">
              <CheckCircle className="mr-2 h-5 w-5" />
              SEND PROPOSAL
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewContractForm;
