
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertTriangle,
  Bot,
  BrainCircuit,
  Lightbulb,
  LineChart,
  Map,
  Send,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const quickQueries = [
  'What are the current food security risks in the city?',
  'Predict potential supply disruptions for the next 7 days',
  'Which commodities are at risk of price spikes?',
  'Recommend optimal distribution routes for Zone A',
  'Analyze current supply chain efficiency',
];

const aiCapabilities = [
  {
    icon: <LineChart className="h-6 w-6 text-blue-500" />,
    title: 'Predictive Analytics',
    description: 'Forecast supply disruptions and price changes',
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
    title: 'Risk Assessment',
    description: 'Identify vulnerable zones and commodities',
  },
  {
    icon: <Map className="h-6 w-6 text-green-500" />,
    title: 'Route Optimization',
    description: 'Smart logistics and distribution planning',
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
    title: 'Natural Language',
    description: 'Ask questions in plain English',
  },
];

export default function AIInsightsPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Bot className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold">
            AI Insights Engine
          </h1>
          <p className="text-muted-foreground">
            Powered by advanced machine learning
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="h-5 w-5 text-primary" />
                Ask AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Ask about supply predictions, risk analysis, or recommendations..."
                  rows={6}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-secondary/50"
                />
                <Button size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Get AI Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-lg">
                <Lightbulb className="h-5 w-5" />
                Quick Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQueries.map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setQuery(q)}
                >
                  {q}
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-lg">
                <Bot className="h-5 w-5" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiCapabilities.map((cap) => (
                <div key={cap.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{cap.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
