'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const baseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  role: z.enum(ROLES, { required_error: 'Please select a role.' }),
});

const signupSchema = z.discriminatedUnion('signupMethod', [
  z.object({
    signupMethod: z.literal('email'),
    email: z.string().email('Please enter a valid email.'),
    mobile: z.string().min(10, 'Please enter a valid 10-digit mobile number.').max(10, 'Please enter a valid 10-digit mobile number.'),
  }).merge(baseSchema),
  z.object({
    signupMethod: z.literal('mobile'),
    mobile: z.string().min(10, 'Please enter a valid 10-digit mobile number.').max(10, 'Please enter a valid 10-digit mobile number.'),
    email: z.string().email('Please enter a valid email.').optional(),
  }).merge(baseSchema)
]);

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [signupMethod, setSignupMethod] = useState<'email' | 'mobile'>('email');

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { 
      name: '', 
      email: '', 
      mobile: '',
      signupMethod: 'email'
    },
  });

  // Watch signupMethod to update form default
  const watchedSignupMethod = form.watch('signupMethod');
  if (watchedSignupMethod !== signupMethod) {
    setSignupMethod(watchedSignupMethod);
  }

  React.useEffect(() => {
    form.setValue('signupMethod', signupMethod);
  }, [signupMethod, form]);


  const handleSignup = (values: z.infer<typeof signupSchema>) => {
    setLoading(true);
    // Mock OTP sending
    setTimeout(() => {
      setLoading(false);
      setShowOtp(true);
      toast({
        title: 'Verification Code Sent',
        description: `An OTP has been sent to your mobile number.`,
      });
    }, 1500);
  };
  
  const handleOtpVerification = () => {
    setLoading(true);
    // Mock OTP verification
    setTimeout(() => {
        setLoading(false);
        const role = form.getValues('role');
        toast({
            title: 'Signup Successful',
            description: `Welcome! Your account has been created.`,
        });
        const dashboardPath = `/dashboard/${role.toLowerCase().replace(' ', '-')}`;
        router.push(dashboardPath);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Join the agricultural revolution today!
          </CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
                <CardContent>
                {!showOtp ? (
                    <>
                    <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setSignupMethod(value as 'email' | 'mobile')}>
                        <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="email">Email Sign Up</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email" className="space-y-4 pt-4">
                        <FormField control={form.control} name="role" render={({ field }) => (
                            <FormItem><FormLabel>I am a...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger></FormControl><SelectContent>{ROLES.map((role) => (<SelectItem key={role} value={role}>{role}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="e.g., john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="mobile" render={({ field }) => (
                            <FormItem><FormLabel>Mobile for Verification</FormLabel><FormControl><Input type="tel" placeholder="e.g., 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        </TabsContent>
                        <TabsContent value="mobile" className="space-y-4 pt-4">
                        <FormField control={form.control} name="role" render={({ field }) => (
                            <FormItem><FormLabel>I am a...</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger></FormControl><SelectContent>{ROLES.map((role) => (<SelectItem key={role} value={role}>{role}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="mobile" render={({ field }) => (
                            <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input type="tel" placeholder="e.g., 9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        </TabsContent>
                    </Tabs>
                    <Button type="submit" disabled={loading} className="w-full mt-4">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Verification Code
                    </Button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Enter Verification Code</Label>
                            <Input placeholder="6-digit code" />
                        </div>
                        <Button onClick={handleOtpVerification} disabled={loading} className="w-full">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Verify and Sign Up
                        </Button>
                        <Button variant="link" onClick={() => setShowOtp(false)} className="w-full">
                            Back to Sign Up
                        </Button>
                    </div>
                )}
                </CardContent>
            </form>
        </Form>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignupForm;