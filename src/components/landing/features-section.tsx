'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BarChart, Bot, FileText, LandPlot } from 'lucide-react';

const features = [
  {
    icon: <LandPlot className="h-8 w-8 text-primary" />,
    title: 'For Farmers',
    description: 'Get AI-powered crop recommendations, manage digital contracts, and get fair market access.',
    image: PlaceHolderImages.find(p => p.id === 'feature-crop-recommendation'),
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'For Buyers',
    description: 'Source produce directly, view AI quality reports, and manage contracts seamlessly.',
    image: PlaceHolderImages.find(p => p.id === 'feature-quality-report'),
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI-Driven Insights',
    description: 'Leverage cutting-edge AI for profitability analysis, quality assessment, and market trends.',
    image: PlaceHolderImages.find(p => p.id === 'feature-market-linkage'),
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'For Government & FPOs',
    description: 'Access real-time data, monitor policy impact, and manage organization members efficiently.',
    image: PlaceHolderImages.find(p => p.id === 'about-image'),
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            An Ecosystem for Growth
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Tel-Samriddhi offers a suite of powerful tools tailored for every stakeholder in the agricultural value chain.
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
