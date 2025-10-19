'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { DollarSign, Landmark, Network, Leaf, Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Start Your Journey',
    description: 'Traditional farming has risks. Discover how oilseeds can provide a stable and profitable alternative.',
    imageId: 'comic-panel-1',
  },
  {
    icon: DollarSign,
    title: 'Boost Your Income',
    description: 'Oilseeds are in high demand. Earn significantly more per acre compared to traditional crops and secure your family\'s future.',
    imageId: 'comic-page-9',
  },
  {
    icon: Landmark,
    title: 'Government Support',
    description: 'The "Tel-Samriddhi" mission provides subsidies, better seeds, and crop insurance, reducing your risks.',
    imageId: 'comic-panel-3',
  },
  {
    icon: Network,
    title: 'Direct Market Access',
    description: 'Connect directly with buyers and FPOs through our platform. No more middlemen, ensuring you get the best price.',
    imageId: 'feature-market-linkage',
  },
  {
    icon: Leaf,
    title: 'Sustainable Future',
    description: 'Oilseed crops improve soil health and require less water, making your farm more resilient and eco-friendly.',
    imageId: 'comic-page-6',
  },
  {
    icon: Award,
    title: 'Become a Leader',
    description: 'Inspire your community. Your success can motivate other farmers to join the oilseed revolution.',
    imageId: 'comic-page-10',
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
  index: number;
}) {
  const image = PlaceHolderImages.find(p => p.id === benefit.imageId);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`md:order-${isEven ? 1 : 2}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <benefit.icon className="w-6 h-6" />
          </div>
          <h3 className="font-headline text-2xl font-bold">{benefit.title}</h3>
        </div>
        <p className="text-muted-foreground text-lg">{benefit.description}</p>
      </div>
      <div className={`relative aspect-video rounded-lg overflow-hidden shadow-xl md:order-${isEven ? 2 : 1}`}>
        {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
    </motion.div>
  );
}

export function OilseedMotivation() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={scrollRef} className="relative mt-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2">
        <motion.div
          className="w-full h-full bg-primary origin-top"
          style={{ scaleY: scaleX }}
        />
      </div>

      <div className="relative z-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="relative py-4">
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
               <motion.div 
                 className="w-6 h-6 rounded-full bg-background border-2 border-primary"
                 style={{
                   scale: scrollYProgress.to(
                     [index / benefits.length, (index + 0.5) / benefits.length],
                     [1, 1.5]
                   )
                 }}
               />
             </div>
            <BenefitCard benefit={benefit} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
