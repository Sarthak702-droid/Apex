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
import { FaGoogle } from 'react-icons/fa';
import { ROLES, Role } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  role: z.enum(ROLES, {
    required_error: 'Please select a role.',
  }),
  identifier: z.string().min(1, 'Please enter your email or mobile number.'),
});

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile' | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Login Successful',
        description: `Welcome, ${values.role}! Redirecting to your dashboard...`,
      });
      const dashboardPath = `/dashboard/${values.role.toLowerCase().replace(' ', '-')}`;
      router.push(dashboardPath);
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    const role = form.getValues('role');
    if (!role) {
      form.setError('role', { message: 'Please select a role before signing in with Google.' });
      return;
    }
    setLoading(true);
    // Mock Google sign-in
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Google Sign-In Successful',
        description: `Welcome, ${role}! Redirecting to your dashboard...`,
      });
      const dashboardPath = `/dashboard/${role.toLowerCase().replace(' ', '-')}`;
      router.push(dashboardPath);
    }, 1500);
  };
  
  const selectedRole = form.watch('role');

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a...</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Sign in with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., user@example.com or 9876543210"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Button type="submit" disabled={loading} onClick={() => setAuthMethod('email')}>
                      {loading && authMethod === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Email OTP
                    </Button>
                    <Button type="submit" disabled={loading} onClick={() => setAuthMethod('mobile')}>
                      {loading && authMethod === 'mobile' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Mobile OTP
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </Form>
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
