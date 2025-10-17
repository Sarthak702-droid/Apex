'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-image');
  const goals = [
    "Empower farmers with data-driven insights.",
    "Create a transparent and efficient supply chain.",
    "Promote sustainable agricultural practices.",
    "Ensure fair prices for producers and buyers."
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Connecting Roots, Cultivating Futures
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tel-Samriddhi is a government-backed initiative designed to revolutionize the agricultural landscape. Our platform serves as a central hub for Farmers, FPOs, Buyers, and Government agencies to interact, transact, and grow together.
            </p>
            <div className="mt-8 space-y-4">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{goal}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
