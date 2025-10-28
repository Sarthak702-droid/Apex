'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const goals = [
    "Forecast food demand and supply gaps in cities.",
    "Predict disruptions using machine learning models.",
    "Optimize alternate supply routes during crises.",
    "Integrate with urban dashboards for emergency planning."
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              From Fragile to Agile
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
             Urban food systems are vulnerable to disruptions like floods, transport bottlenecks, and policy shifts, leading to price spikes and shortages. Our AI-driven platform monitors, predicts, and prepares cities for these challenges, ensuring a stable and secure food supply.
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
