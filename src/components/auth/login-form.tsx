'use client';

import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const emailSchema = z.object({
  role: z.enum(ROLES, { required_error: 'Please select a role.' }),
  email: z.string().email('Please enter a valid email address.'),
});

const mobileSchema = z.object({
  role: z.enum(ROLES, { required_error: 'Please select a role.' }),
  mobile: z.string().min(10, 'Please enter a valid 10-digit mobile number.').max(10),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const mobileForm = useForm<z.infer<typeof mobileSchema>>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: '' },
  });

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    emailForm.setValue('role', role as any);
    mobileForm.setValue('role', role as any);
  };
  
  const onOtpSubmit = (role: string) => {
    setLoading(true);
    // Mock authentication
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Login Successful',
        description: `Welcome, ${role}! Redirecting to your dashboard...`,
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
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>
            Select your role and sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
             <div className="space-y-2">
                <Label>I am a...</Label>
                <Select onValueChange={handleRoleChange}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                    {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                        {role}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                 {!selectedRole && emailForm.formState.isSubmitted && (
                    <p className="text-sm font-medium text-destructive">Please select a role.</p>
                )}
            </div>

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="mobile">Mobile</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email">
                            <Form {...emailForm}>
                                <form onSubmit={emailForm.handleSubmit(() => onOtpSubmit(emailForm.getValues('role')))} className="space-y-4 pt-4">
                                     <FormField
                                        control={emailForm.control}
                                        name="email"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                            <Input
                                                placeholder="e.g., user@example.com"
                                                {...field}
                                                disabled={loading}
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Send Email OTP
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="mobile">
                             <Form {...mobileForm}>
                                <form onSubmit={mobileForm.handleSubmit(() => onOtpSubmit(mobileForm.getValues('role')))} className="space-y-4 pt-4">
                                     <FormField
                                        control={mobileForm.control}
                                        name="mobile"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                            <Input
                                                placeholder="e.g., 9876543210"
                                                {...field}
                                                disabled={loading}
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={loading} className="w-full">
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Send Mobile OTP
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </motion.div>
              )}
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
