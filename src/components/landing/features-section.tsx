'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, BarChart, Map, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Demand & Supply Forecasting',
    description: 'Use time-series forecasting to predict food demand and potential supply gaps based on weather, consumption, and price trends.',
    image: PlaceHolderImages.find(p => p.id === 'feature-crop-recommendation'),
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: 'Disruption Prediction',
    description: 'Our ML models analyze rainfall, market trends, and logistics data to predict disruptions before they happen.',
    image: PlaceHolderImages.find(p => p.id === 'feature-quality-report'),
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Supply Route Optimization',
    description: 'In a crisis, our algorithms find the best alternate supply routes to redistribute food between markets and urban zones efficiently.',
    image: PlaceHolderImages.find(p => p.id === 'feature-market-linkage'),
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'Urban Planning Integration',
    description: 'Provide city officials with a "City Food Vulnerability Index" and simulation tools for robust emergency planning.',
    image: PlaceHolderImages.find(p => p.id === 'about-image'),
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            An AI-Powered Resilience Toolkit
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our platform offers a suite of powerful AI tools for every stakeholder in the urban food supply chain.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                    <CardDescription className="mt-1">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {feature.image && (
                    <div className="aspect-video relative mt-4">
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={feature.image.imageHint}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
